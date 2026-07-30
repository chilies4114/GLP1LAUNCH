const { getPremiumPayload, premiumPeptides, compoundReference } = require('./peptides-data');

describe('premium peptide & longevity payload', () => {
  const p = getPremiumPayload();

  test('is a successful, versioned payload', () => {
    expect(p.success).toBe(true);
    expect(p.version).toBe('1.0');
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

  test('includes a 6-row compound reference table', () => {
    expect(p.compound_reference).toHaveLength(6);
    for (const d of compoundReference) {
      expect(d.compound && d.class && d.fda_status).toBeTruthy();
    }
  });

  test('premium_features summary matches the data', () => {
    expect(p.premium_features.total_questions).toBe(premiumPeptides.length);
    expect(p.premium_features.categories.length).toBeGreaterThanOrEqual(4);
  });
});
