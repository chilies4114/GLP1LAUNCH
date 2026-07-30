const { getPremiumPayload, premiumInteractions, pairingGuide } = require('./supplements-data');

describe('premium supplement payload', () => {
  const p = getPremiumPayload();

  test('is a successful, versioned payload', () => {
    expect(p.success).toBe(true);
    expect(p.version).toBe('1.0');
    expect(typeof p.last_updated).toBe('string');
    expect(p.disclaimer).toMatch(/not medical advice/i);
  });

  test('serves 12 interactions with unique ids', () => {
    expect(p.data).toHaveLength(12);
    expect(new Set(p.data.map((q) => q.id)).size).toBe(12);
  });

  test('every interaction is fully populated', () => {
    for (const q of p.data) {
      expect(q.detailed_answer.length).toBeGreaterThan(40);
      expect(q.sources.length).toBeGreaterThan(0);
      expect(q.expert_rating).toBeGreaterThan(0);
      expect(q.category).toBeTruthy();
    }
  });

  test('includes a 6-row pairing guide table', () => {
    expect(p.pairing_guide).toHaveLength(6);
    for (const d of pairingGuide) {
      expect(d.supplement && d.take_with && d.best_time).toBeTruthy();
    }
  });

  test('premium_features summary matches the data', () => {
    expect(p.premium_features.total_questions).toBe(premiumInteractions.length);
    expect(p.premium_features.categories.length).toBeGreaterThanOrEqual(4);
  });
});
