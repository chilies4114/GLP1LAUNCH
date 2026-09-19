// Privacy-preserving launch analytics.
//
// The browser creates a random first-party visitor ID in localStorage, derives
// a monthly rotating HMAC-SHA-256 pseudonym, and sends only that pseudonym. This module
// never receives or stores the local visitor ID. It also never reads or stores
// IP addresses, user agents, health queries, wallet addresses, request bodies,
// payment headers, or query strings.
//
// Pseudonyms and their paid-call timestamps are held in memory for 8 days so the
// public snapshot can report aggregate unique and 7-day repeat-paid counts.
// They reset on restart/redeploy and are never returned by snapshot().

const VISITOR_RE = /^[a-f0-9]{64}$/;
const FREE_PATHS = new Set([
  '/glp1/top-questions',
  '/supplements/interactions',
  '/peptides/longevity',
]);
const PAID_PATHS = new Set([
  '/glp1/top-questions-paid',
  '/supplements/interactions-paid',
  '/peptides/longevity-paid',
]);
const RETENTION_DAYS = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

function utcDay(value = new Date()) {
  return new Date(value).toISOString().slice(0, 10);
}

function createStats(options = {}) {
  const now = options.now || (() => new Date());
  const byEndpoint = {};
  const freeVisitors = new Set();
  const paidVisitors = new Set();
  const paidCallsByVisitor = new Map();
  let totalRequests = 0;
  let paidUnlocks = 0;
  const since = now().toISOString();

  function validVisitor(value) {
    return typeof value === 'string' && VISITOR_RE.test(value);
  }

  function prune() {
    const cutoff = new Date(now().getTime() - (RETENTION_DAYS - 1) * DAY_MS);
    const cutoffDay = utcDay(cutoff);
    for (const [visitor, calls] of paidCallsByVisitor) {
      const kept = calls.filter((time) => time >= cutoff.getTime());
      if (kept.length) paidCallsByVisitor.set(visitor, kept);
      else paidCallsByVisitor.delete(visitor);
    }
  }

  return {
    track(path, visitorHash) {
      totalRequests += 1;
      byEndpoint[path] = (byEndpoint[path] || 0) + 1;
      if (FREE_PATHS.has(path) && validVisitor(visitorHash)) freeVisitors.add(visitorHash);
    },
    trackPaidUnlock(path, visitorHash) {
      paidUnlocks += 1;
      if (!PAID_PATHS.has(path) || !validVisitor(visitorHash)) return;
      paidVisitors.add(visitorHash);
      const calls = paidCallsByVisitor.get(visitorHash) || [];
      calls.push(now().getTime());
      paidCallsByVisitor.set(visitorHash, calls);
      prune();
    },
    snapshot() {
      prune();
      let repeatPaid7d = 0;
      for (const calls of paidCallsByVisitor.values()) {
        if (calls.length >= 2) repeatPaid7d += 1;
      }
      return {
        since,
        total_requests: totalRequests,
        paid_unlocks: paidUnlocks,
        unique_free_users: freeVisitors.size,
        unique_paid_users: paidVisitors.size,
        repeat_paid_users_7d: repeatPaid7d,
        by_endpoint: { ...byEndpoint },
        privacy_note:
          'Pseudonymous measurement is enabled. The browser keeps a random first-party ID locally as an HMAC key and sends only a monthly rotating HMAC-SHA-256 pseudonym. The server keeps pseudonyms and paid-activity dates in memory for aggregate counts; it does not store health queries, wallet addresses, IP addresses, user agents, request bodies, payment headers, or query strings.',
        retention_note:
          'Paid-call timestamps are retained in memory for 8 days to calculate 7-day repeat use. Pseudonyms are not exposed by this endpoint.',
        rotation_note:
          'Browser pseudonyms rotate at the start of each UTC month. Repeat paid use counts pseudonyms with at least two completed paid calls in the trailing 7 days; the raw local visitor ID and HMAC key are never sent.',
        resets_note:
          'All server-side counters and pseudonymous records are in-memory and reset when the server restarts or redeploys. Clearing browser storage creates a new local visitor ID.',
      };
    },
  };
}

module.exports = { createStats };
