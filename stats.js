// stats.js
// Privacy-safe aggregate usage counters for the API.
// Counts requests per route and paid unlocks ONLY. Never stores health
// queries, wallet addresses, IP addresses, user agents, timestamps per
// request, or any per-user data. In-memory, so counters reset when the
// server restarts (e.g., on Render redeploys).

function createStats() {
  const byEndpoint = {};
  let totalRequests = 0;
  let paidUnlocks = 0;
  const since = new Date().toISOString();

  return {
    track(path) {
      totalRequests += 1;
      byEndpoint[path] = (byEndpoint[path] || 0) + 1;
    },
    trackPaidUnlock() {
      paidUnlocks += 1;
    },
    snapshot() {
      return {
        since,
        total_requests: totalRequests,
        paid_unlocks: paidUnlocks,
        by_endpoint: { ...byEndpoint },
        privacy_note:
          "Aggregate counts only. No health queries, wallet addresses, IP addresses, user agents, or any per-user data are collected or stored.",
        resets_note:
          "Counters are in-memory and reset when the server restarts or redeploys.",
      };
    },
  };
}

module.exports = { createStats };
