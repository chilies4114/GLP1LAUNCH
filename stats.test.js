const { createStats } = require('./stats');

const A = 'a'.repeat(64);
const B = 'b'.repeat(64);

describe('privacy-preserving stats', () => {
  test('counts routes, unique free/paid users, and 7-day repeat paid users', () => {
    let clock = new Date('2026-09-19T12:00:00Z');
    const s = createStats({ now: () => clock });
    s.track('/glp1/top-questions', A);
    s.track('/glp1/top-questions', A);
    s.track('/supplements/interactions', B);
    s.trackPaidUnlock('/glp1/top-questions-paid', A);
    clock = new Date('2026-09-20T12:00:00Z');
    s.trackPaidUnlock('/glp1/top-questions-paid', A);
    const snap = s.snapshot();
    expect(snap.total_requests).toBe(3);
    expect(snap.unique_free_users).toBe(2);
    expect(snap.unique_paid_users).toBe(1);
    expect(snap.paid_unlocks).toBe(2);
    expect(snap.repeat_paid_users_7d).toBe(1);
  });

  test('rejects malformed pseudonyms and never returns pseudonymous records', () => {
    const s = createStats();
    s.track('/glp1/top-questions', 'raw-local-id');
    s.trackPaidUnlock('/glp1/top-questions-paid', '0xwallet');
    const snap = s.snapshot();
    expect(snap.unique_free_users).toBe(0);
    expect(snap.unique_paid_users).toBe(0);
    const serialized = JSON.stringify(snap);
    expect(serialized).not.toContain(A);
    expect(serialized).not.toContain('raw-local-id');
    expect(serialized).not.toContain('0xwallet');
  });

  test('stores and returns no excluded fields or sensitive request content', () => {
    const s = createStats();
    s.track('/glp1/top-questions', A, {
      ip: '203.0.113.10', userAgent: 'SecretBrowser', query: 'nausea',
      wallet: '0x123', body: 'health query', paymentSignature: 'secret'
    });
    const snap = s.snapshot();
    const serialized = JSON.stringify(snap).toLowerCase();
    for (const secret of ['203.0.113.10', 'secretbrowser', 'nausea', '0x123', 'health query', 'payment-signature']) {
      expect(serialized).not.toContain(secret);
    }
    expect(snap.by_endpoint['/glp1/top-questions?nausea']).toBeUndefined();
  });

  test('public snapshot exposes only aggregates and documented privacy metadata', () => {
    const s = createStats();
    const keys = Object.keys(s.snapshot()).sort();
    expect(keys).toEqual([
      'by_endpoint', 'paid_unlocks', 'privacy_note', 'repeat_paid_users_7d',
      'resets_note', 'retention_note', 'rotation_note', 'since',
      'total_requests', 'unique_free_users', 'unique_paid_users'
    ].sort());
  });
});
