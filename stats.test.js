const { createStats, API_PATHS } = require('./stats');
const A = 'a'.repeat(64), B = 'b'.repeat(64);

// A small in-process PG contract fake checks the caller's SQL and transaction shape.
// The live integration check is run separately against a non-production campaign.
const fakePool = () => {
  const calls = [];
  const client = { query: async (sql, params = []) => {
    calls.push([sql, params]);
    if (sql.includes('SELECT since FROM stats_campaign')) return { rows: [{ since: new Date('2026-09-27T00:00:00Z') }] };
    if (sql.includes('SELECT endpoint, requests')) return { rows: [{ endpoint: '/glp1/top-questions', requests: '2', paid_unlocks: '0' }] };
    if (sql.includes('SELECT kind, count')) return { rows: [{ kind: 'free', n: 1 }] };
    if (sql.includes('SELECT count(*)::int AS n FROM (')) return { rows: [{ n: 0 }] };
    return { rows: [] };
  }, release: () => {} };
  return { calls, pool: { query: client.query, connect: async () => client, end: async () => {} } };
};

test('six API paths only, including paid attempts but excluding stats and root', async () => {
  const { pool, calls } = fakePool(); const s = createStats({ pool });
  expect(API_PATHS.size).toBe(6);
  await s.track('/stats', A); await s.track('/', A);
  expect(calls).toHaveLength(0);
  await s.track('/glp1/top-questions', A); await s.track('/glp1/top-questions-paid', A);
  expect(calls.filter(([sql]) => sql.includes('INSERT INTO stats_counter'))).toHaveLength(2);
  expect(calls.filter(([sql]) => sql.includes('INSERT INTO stats_visitor'))).toHaveLength(1);
  expect(calls.filter(([sql]) => sql === 'COMMIT')).toHaveLength(2);
});

test('paid event, pseudonym and unlock update share one transaction; malformed/absent hashes stay untagged', async () => {
  const { pool, calls } = fakePool(); const s = createStats({ pool });
  await s.trackPaidUnlock('/glp1/top-questions-paid', B);
  await s.trackPaidUnlock('/glp1/top-questions-paid', 'raw-local-id');
  expect(calls.filter(([sql]) => sql.includes('INSERT INTO stats_paid_event')).map(([, p]) => p[2])).toEqual([B, null]);
  expect(calls.filter(([sql]) => sql.includes('INSERT INTO stats_visitor'))).toHaveLength(1);
  expect(calls.filter(([sql]) => sql === 'COMMIT')).toHaveLength(2);
});

test('failed writes fail open; stats read stays database-backed and does not leak hashes', async () => {
  const { pool } = fakePool();
  pool.connect = async () => { throw Object.assign(new Error('unavailable'), { code: 'DOWN' }); };
  const s = createStats({ pool });
  await expect(s.trackPaidUnlock('/glp1/top-questions-paid', A)).resolves.toBeUndefined();
  const snap = await s.snapshot();
  expect(snap.metrics_status).toBe('degraded');
  expect(snap.total_requests).toBe(2);
  expect(JSON.stringify(snap)).not.toContain(A);
  expect(snap.retention_note).toContain('seven-day');
  expect(pool.query.mock).toBeUndefined();
});

test('read query uses exact seven days, not retention buffer', async () => {
  const { pool, calls } = fakePool(); const s = createStats({ pool });
  await s.snapshot();
  expect(calls.some(([sql]) => sql.includes("completed_at >= now() - interval '7 days'"))).toBe(true);
  expect(calls.some(([sql]) => sql.includes("completed_at < now() - interval '8 days'"))).toBe(false);
});
