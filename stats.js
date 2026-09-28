// Launch analytics: only canonical endpoint names and client-supplied rotating
// pseudonyms are stored. No request objects, query/body, IP, wallet or payment data.
const { Pool } = require('pg');
const { randomUUID } = require('crypto');

const CAMPAIGN = 'launch-persistent-2026-09-27';
const VISITOR_RE = /^[a-f0-9]{64}$/;
const FREE_PATHS = new Set(['/glp1/top-questions', '/supplements/interactions', '/peptides/longevity']);
const PAID_PATHS = new Set(['/glp1/top-questions-paid', '/supplements/interactions-paid', '/peptides/longevity-paid']);
const API_PATHS = new Set([...FREE_PATHS, ...PAID_PATHS]);

const NOTES = {
  privacy_note: 'Only allowlisted API routes are counted. Unique users are distinct client-supplied monthly rotating 64-hex browser pseudonyms, not verified people. Untagged API clients count as requests but not unique users. No health queries, wallet addresses, IP addresses, user agents, request bodies, payment headers or query strings are stored.',
  retention_note: 'Paid-event timestamps are used for an exact trailing seven-day repeat query and pruned after eight days on startup and periodically. Cleanup can lag while the free service sleeps. Pseudonyms for campaign-wide unique counts persist through the campaign reporting window.',
  rotation_note: 'Browser pseudonyms rotate at the start of each UTC month. Repeat paid use across a rotation cannot be linked; clearing browser storage also creates a new identity. The client-supplied header can be spoofed.',
  resets_note: 'Measured since this persistent campaign began. Old in-memory counters were lost and cannot be backfilled. Database outages can undercount requests and paid unlocks; no exactly-once guarantee across outages.',
};

const SCHEMA = `
CREATE TABLE IF NOT EXISTS stats_campaign (campaign text PRIMARY KEY, since timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS stats_counter (
  campaign text NOT NULL, endpoint text NOT NULL, requests bigint NOT NULL DEFAULT 0,
  paid_unlocks bigint NOT NULL DEFAULT 0, PRIMARY KEY(campaign, endpoint));
CREATE TABLE IF NOT EXISTS stats_visitor (
  campaign text NOT NULL, kind text NOT NULL CHECK (kind IN ('free','paid')),
  pseudonym char(64) NOT NULL, first_seen_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(campaign, kind, pseudonym));
CREATE TABLE IF NOT EXISTS stats_paid_event (
  event_id uuid PRIMARY KEY, campaign text NOT NULL, pseudonym char(64),
  completed_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS stats_paid_recent ON stats_paid_event(campaign, completed_at, pseudonym);

`;

function createStats(options = {}) {
  const pool = options.pool || (process.env.DATABASE_URL ? new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2, connectionTimeoutMillis: 1800, query_timeout: 1800,
    statement_timeout: 1500, idleTimeoutMillis: 10000,
  }) : null);
  let initPromise;
  let degraded = false;
  let lastPrune = 0;
  let failedWrites = 0;
  const campaign = options.campaign || CAMPAIGN;

  function initialize() {
    if (!pool) return Promise.reject(new Error('DATABASE_URL is not configured'));
    if (!initPromise) {
      initPromise = pool.query(SCHEMA).then(() => pool.query('INSERT INTO stats_campaign(campaign) VALUES($1) ON CONFLICT DO NOTHING', [campaign])).catch(err => { initPromise = null; throw err; });
    }
    return initPromise;
  }
  async function pruneIfDue() {
    if (Date.now() - lastPrune < 60 * 60 * 1000) return;
    lastPrune = Date.now();
    try {
      await pool.query("DELETE FROM stats_paid_event WHERE campaign=$1 AND completed_at < now() - interval '8 days'", [campaign]);
    } catch (_) { lastPrune = 0; }
  }
  async function transaction(callback) {
    await initialize();
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await callback(client);
      await client.query('COMMIT');
    } catch (err) {
      try { await client.query('ROLLBACK'); } catch (_) { /* connection may be gone */ }
      throw err;
    } finally { client.release(); }
    void pruneIfDue();
  }
  async function guarded(operation, callback) {
    try { await transaction(callback); }
    catch (err) {
      degraded = true;
      failedWrites += 1;
      console.warn(`Metrics ${operation} write failed (${failedWrites} total): ${err.code || err.name || 'error'}`);
    }
  }
  async function counter(client, path, requestDelta, paidDelta) {
    await client.query(`INSERT INTO stats_counter(campaign,endpoint,requests,paid_unlocks)
      VALUES($1,$2,$3,$4) ON CONFLICT(campaign,endpoint) DO UPDATE SET
      requests=stats_counter.requests+EXCLUDED.requests,
      paid_unlocks=stats_counter.paid_unlocks+EXCLUDED.paid_unlocks`,
    [campaign, path, requestDelta, paidDelta]);
  }
  async function visitor(client, kind, hash) {
    if (typeof hash === 'string' && VISITOR_RE.test(hash)) {
      await client.query('INSERT INTO stats_visitor(campaign,kind,pseudonym) VALUES($1,$2,$3) ON CONFLICT DO NOTHING', [campaign, kind, hash]);
      return hash;
    }
    return null;
  }
  return {
    initialize,
    // A request attempt, including an unpaid 402. Never await this ahead of the payment gate.
    track(path, hash) {
      if (!API_PATHS.has(path)) return Promise.resolve();
      return guarded('request', async client => {
        await counter(client, path, 1, 0);
        if (FREE_PATHS.has(path)) await visitor(client, 'free', hash);
      });
    },
    // Only the paid handler, after settlement, calls this. A failed write cannot break its response.
    trackPaidUnlock(path, hash) {
      if (!PAID_PATHS.has(path)) return Promise.resolve();
      const eventId = randomUUID();
      return guarded('paid', async client => {
        const validHash = await visitor(client, 'paid', hash);
        await client.query('INSERT INTO stats_paid_event(event_id,campaign,pseudonym) VALUES($1,$2,$3)', [eventId, campaign, validHash]);
        await counter(client, path, 0, 1);
      });
    },
    async snapshot() {
      await initialize();
      const [since, counters, uniques, repeats] = await Promise.all([
        pool.query('SELECT since FROM stats_campaign WHERE campaign=$1', [campaign]),
        pool.query('SELECT endpoint, requests, paid_unlocks FROM stats_counter WHERE campaign=$1', [campaign]),
        pool.query('SELECT kind, count(*)::int AS n FROM stats_visitor WHERE campaign=$1 GROUP BY kind', [campaign]),
        pool.query(`SELECT count(*)::int AS n FROM (
          SELECT pseudonym FROM stats_paid_event WHERE campaign=$1 AND pseudonym IS NOT NULL
          AND completed_at >= now() - interval '7 days' GROUP BY pseudonym HAVING count(*) >= 2
        ) repeats`, [campaign]),
      ]);
      const by_endpoint = {};
      for (const row of counters.rows) by_endpoint[row.endpoint] = Number(row.requests);
      const unique = Object.fromEntries(uniques.rows.map(row => [row.kind, Number(row.n)]));
      return {
        since: since.rows[0].since.toISOString(), as_of: new Date().toISOString(),
        metrics_status: degraded ? 'degraded' : 'ok',
        total_requests: counters.rows.reduce((sum, row) => sum + Number(row.requests), 0),
        paid_unlocks: counters.rows.reduce((sum, row) => sum + Number(row.paid_unlocks), 0),
        unique_free_users: unique.free || 0, unique_paid_users: unique.paid || 0,
        repeat_paid_users_7d: repeats.rows[0].n, by_endpoint, ...NOTES,
      };
    },
    close: () => pool?.end(),
  };
}
module.exports = { createStats, FREE_PATHS, PAID_PATHS, API_PATHS };
