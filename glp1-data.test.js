const { getPremiumPayload, premiumQuestions, drugComparison } = require('./glp1-data');

describe('premium GLP-1 payload', () => {
  const p = getPremiumPayload();

  test('is a successful, versioned payload', () => {
    expect(p.success).toBe(true);
    expect(p.version).toBe('2.0');
    expect(typeof p.last_updated).toBe('string');
    expect(p.disclaimer).toMatch(/not medical advice/i);
  });

  test('serves 12 questions with unique ids', () => {
    expect(p.data).toHaveLength(12);
    expect(new Set(p.data.map((q) => q.id)).size).toBe(12);
  });

  test('every question is fully populated', () => {
    for (const q of p.data) {
      expect(q.detailed_answer.length).toBeGreaterThan(40);
      expect(q.sources.length).toBeGreaterThan(0);
      expect(q.expert_rating).toBeGreaterThan(0);
      expect(q.category).toBeTruthy();
    }
  });

  test('includes a 5-drug comparison table', () => {
    expect(p.drug_comparison).toHaveLength(5);
    for (const d of drugComparison) {
      expect(d.brand && d.generic && d.max_dose).toBeTruthy();
    }
  });

  test('premium_features summary matches the data', () => {
    expect(p.premium_features.total_questions).toBe(premiumQuestions.length);
    expect(p.premium_features.categories.length).toBeGreaterThanOrEqual(10);
  });
});
