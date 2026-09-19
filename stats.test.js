const { createStats } = require('./stats');

describe('privacy-safe stats', () => {
  test('counts requests per endpoint and paid unlocks', () => {
    const s = createStats();
    s.track('/glp1/top-questions');
    s.track('/glp1/top-questions');
    s.track('/stats');
    s.trackPaidUnlock();
    const snap = s.snapshot();
    expect(snap.total_requests).toBe(3);
    expect(snap.by_endpoint['/glp1/top-questions']).toBe(2);
    expect(snap.by_endpoint['/stats']).toBe(1);
    expect(snap.paid_unlocks).toBe(1);
    expect(typeof snap.since).toBe('string');
  });

  test('snapshot contains only aggregate fields - no per-user data', () => {
    const s = createStats();
    s.track('/glp1/top-questions-paid');
    const keys = Object.keys(s.snapshot()).sort();
    expect(keys).toEqual(
      ['by_endpoint', 'paid_unlocks', 'privacy_note', 'resets_note', 'since', 'total_requests'].sort()
    );
    // by_endpoint holds only route paths -> counts, nothing else
    for (const [k, v] of Object.entries(s.snapshot().by_endpoint)) {
      expect(k.startsWith('/')).toBe(true);
      expect(typeof v).toBe('number');
    }
  });

  test('does not record query strings or bodies', () => {
    const s = createStats();
    // server passes only req.path (query string excluded by Express)
    s.track('/glp1/top-questions');
    expect(s.snapshot().by_endpoint['/glp1/top-questions?symptom=nausea']).toBeUndefined();
  });
});
