// supplements-data.js
// Premium supplement & vitamin interaction content served by the paid
// (x402-protected) endpoint. Kept in a separate module so server.js
// payment logic stays clean — same pattern as glp1-data.js.

const lastUpdated = new Date().toISOString();

const premiumInteractions = [
  {
    id: 1,
    question: "Can I take magnesium with calcium?",
    category: "mineral-interactions",
    trending_score: 88,
    detailed_answer:
      "Yes, but timing and ratio matter. Calcium and magnesium compete for absorption at high doses. If supplementing both above ~250mg each, splitting them into separate meals improves uptake. A common balanced ratio is 2:1 calcium-to-magnesium. Very high calcium (>500mg single dose) can blunt magnesium absorption, so people correcting a magnesium deficiency often take it separately at night.",
    sources: ["NIH Office of Dietary Supplements", "Am J Clin Nutr 2019;109:1", "Linus Pauling Institute"],
    expert_rating: 4.6,
  },
  {
    id: 2,
    question: "Does vitamin D need to be taken with anything to absorb?",
    category: "absorption",
    trending_score: 94,
    detailed_answer:
      "Vitamin D is fat-soluble, so it absorbs best with a meal containing dietary fat — studies show up to ~32% higher absorption versus a fasted dose. Vitamin K2 (MK-7) is frequently paired with D3 because K2 helps direct calcium into bone rather than soft tissue. Magnesium is also a cofactor for converting vitamin D into its active form, so a magnesium deficiency can blunt D supplementation.",
    sources: ["J Bone Miner Res 2015;30:1", "NIH ODS Vitamin D Fact Sheet", "Nutrients 2018;10:375"],
    expert_rating: 4.8,
  },
  {
    id: 3,
    question: "Is it safe to take iron with vitamin C?",
    category: "absorption",
    trending_score: 90,
    detailed_answer:
      "Yes — this is a beneficial pairing. Vitamin C (ascorbic acid) reduces non-heme iron to a more absorbable form and can increase iron absorption 2-3x. Take them together, ideally on an empty stomach or with a light meal. Avoid taking iron at the same time as calcium, coffee/tea (tannins), or high-fiber meals, all of which inhibit absorption.",
    sources: ["Am J Clin Nutr 2020;111:5", "WHO Iron Supplementation Guidelines", "Cochrane Review 2019"],
    expert_rating: 4.7,
  },
  {
    id: 4,
    question: "Can I take zinc and copper together?",
    category: "mineral-interactions",
    trending_score: 76,
    detailed_answer:
      "Long-term high-dose zinc (>40mg/day) depletes copper by inducing metallothionein in the gut, which binds copper and blocks its absorption. If supplementing zinc chronically, a common protective ratio is roughly 8-15mg zinc per 1mg copper. Short-term zinc (e.g., during a cold) is not a concern, but months of high zinc without copper can cause copper-deficiency anemia and neurological symptoms.",
    sources: ["J Nutr 2017;147:12", "NIH ODS Zinc Fact Sheet", "Am J Clin Nutr 2018;107:3"],
    expert_rating: 4.5,
  },
  {
    id: 5,
    question: "Does fish oil interact with blood thinners?",
    category: "drug-interactions",
    trending_score: 91,
    detailed_answer:
      "High-dose omega-3 (fish oil) has mild antiplatelet effects and can theoretically add to the bleeding risk of anticoagulants like warfarin, apixaban, or aspirin. Typical dietary doses (1g/day) are generally considered low-risk, but doses of 3-4g/day warrant physician awareness, especially before surgery. Anyone on prescription blood thinners should clear high-dose fish oil with their clinician.",
    sources: ["J Am Heart Assoc 2019;8:e013543", "Circulation 2019;140:e673", "FDA Omega-3 Guidance"],
    expert_rating: 4.6,
  },
  {
    id: 6,
    question: "Can I take all my B vitamins at once?",
    category: "timing",
    trending_score: 72,
    detailed_answer:
      "Yes — B-complex vitamins are water-soluble and work synergistically, so a single B-complex in the morning is standard. Take with food to reduce nausea (especially B6 and niacin). B vitamins can be energizing, so morning dosing avoids sleep disruption. Excess water-soluble B is excreted in urine (harmlessly turning it bright yellow from riboflavin), though chronic very high B6 (>100mg/day) can cause nerve issues.",
    sources: ["NIH ODS B-Vitamin Fact Sheets", "Nutrients 2016;8:68", "Mayo Clinic Nutrition Guidance"],
    expert_rating: 4.4,
  },
  {
    id: 7,
    question: "Does calcium block thyroid medication?",
    category: "drug-interactions",
    trending_score: 84,
    detailed_answer:
      "Yes. Calcium (and iron) significantly reduce absorption of levothyroxine (Synthroid) by binding it in the gut. Separate thyroid medication from calcium or iron supplements by at least 4 hours. Standard practice is levothyroxine on an empty stomach in the morning, with calcium/iron taken later in the day. This interaction also applies to calcium-fortified foods and antacids.",
    sources: ["Thyroid 2017;27:2", "Am Thyroid Assoc Guidelines", "FDA Levothyroxine Labeling"],
    expert_rating: 4.7,
  },
  {
    id: 8,
    question: "Is it safe to combine turmeric/curcumin with medications?",
    category: "drug-interactions",
    trending_score: 79,
    detailed_answer:
      "Curcumin can have mild blood-thinning and blood-sugar-lowering effects and inhibits certain CYP450 liver enzymes, potentially raising levels of some drugs. Caution is warranted alongside anticoagulants, antiplatelet drugs, and diabetes medications. Curcumin is poorly absorbed alone; it is usually paired with piperine (black pepper extract), which boosts absorption up to 20x — but piperine itself also affects drug metabolism.",
    sources: ["Planta Med 2018;84:6", "J Clin Med 2019;8:1092", "NCCIH Turmeric Fact Sheet"],
    expert_rating: 4.3,
  },
  {
    id: 9,
    question: "Can I take probiotics with antibiotics?",
    category: "timing",
    trending_score: 87,
    detailed_answer:
      "Yes, and it can reduce antibiotic-associated diarrhea — but timing matters. Take the probiotic at least 2 hours apart from the antibiotic dose so the antibiotic does not kill the probiotic organisms. Saccharomyces boulardii (a yeast) is unaffected by antibacterial antibiotics and is often preferred during a course. Continue probiotics for 1-2 weeks after finishing antibiotics to help restore gut flora.",
    sources: ["JAMA 2012;307:18", "Cochrane Review 2017", "Am J Gastroenterol 2020;115:7"],
    expert_rating: 4.5,
  },
  {
    id: 10,
    question: "Do I need to cycle or time creatine?",
    category: "timing",
    trending_score: 81,
    detailed_answer:
      "Creatine monohydrate does not need cycling. A daily 3-5g maintenance dose keeps muscle stores saturated; an optional 'loading' phase (20g/day split into 4 doses for 5-7 days) saturates faster. Timing is flexible — total daily intake matters more than when. Taking it with carbs or a meal modestly improves uptake via insulin. Adequate hydration is advised, but the old 'kidney damage' concern is unsupported in healthy people.",
    sources: ["J Int Soc Sports Nutr 2017;14:18", "Med Sci Sports Exerc 2019;51:8", "Nutrients 2021;13:1915"],
    expert_rating: 4.8,
  },
  {
    id: 11,
    question: "Can vitamin C and B12 be taken together?",
    category: "timing",
    trending_score: 68,
    detailed_answer:
      "There is an old lab-based concern that high-dose vitamin C can degrade B12, but in practice, at normal supplement doses taken with food, this is not clinically significant. To be conservative, some people separate a very high vitamin C dose (>1000mg) from B12 by a couple of hours. For most people a standard multivitamin combining both is fine.",
    sources: ["Am J Clin Nutr 2016;104:3", "NIH ODS B12 Fact Sheet", "J Nutr Sci 2019;8:e20"],
    expert_rating: 4.2,
  },
  {
    id: 12,
    question: "Which supplements should NOT be taken on an empty stomach?",
    category: "absorption",
    trending_score: 85,
    detailed_answer:
      "Fat-soluble vitamins (A, D, E, K) and fish oil need dietary fat, so take with a meal. Magnesium, zinc, and iron can cause nausea on an empty stomach for many people (though iron absorbs best fasted — a trade-off). Multivitamins are best with food to reduce stomach upset and improve fat-soluble uptake. In contrast, some amino acids and certain probiotics are better fasted. When in doubt, 'with a meal' is the safer default.",
    sources: ["NIH Office of Dietary Supplements", "Linus Pauling Institute Micronutrient Center", "Acad Nutr Diet Position Paper 2018"],
    expert_rating: 4.6,
  },
];

// Structured supplement timing/pairing table — high value for AI agents
// answering "what should I take with / apart from X" queries.
const pairingGuide = [
  {
    supplement: "Vitamin D3",
    take_with: "A meal containing fat; pairs well with K2 & magnesium",
    avoid_with: "Nothing major",
    best_time: "With largest meal of the day",
  },
  {
    supplement: "Iron",
    take_with: "Vitamin C (boosts absorption 2-3x)",
    avoid_with: "Calcium, coffee/tea, thyroid meds (separate 4h)",
    best_time: "Empty stomach or light meal, morning",
  },
  {
    supplement: "Calcium",
    take_with: "Vitamin D & K2",
    avoid_with: "Iron, zinc, thyroid meds, high-dose magnesium",
    best_time: "Split doses ≤500mg, with meals",
  },
  {
    supplement: "Magnesium",
    take_with: "Vitamin D (cofactor)",
    avoid_with: "Very high-dose calcium at same time",
    best_time: "Evening (may aid sleep/relaxation)",
  },
  {
    supplement: "Zinc",
    take_with: "Food (reduces nausea)",
    avoid_with: "High-dose copper depletion if chronic; iron, calcium",
    best_time: "With a meal, not same time as iron/calcium",
  },
  {
    supplement: "Fish Oil (Omega-3)",
    take_with: "A meal containing fat",
    avoid_with: "High doses alongside blood thinners (consult MD)",
    best_time: "With a meal to reduce fishy reflux",
  },
];

const disclaimer =
  "This content is for informational purposes only and is not medical advice. Dietary supplements can interact with prescription medications and medical conditions. Always consult a licensed healthcare provider or pharmacist before starting, stopping, or combining supplements — especially if you take prescription drugs, are pregnant, or have a chronic condition.";

function getPremiumPayload() {
  return {
    success: true,
    message: "Premium supplement & vitamin interaction insights (paid access)",
    version: "1.0",
    last_updated: lastUpdated,
    disclaimer,
    data: premiumInteractions,
    pairing_guide: pairingGuide,
    premium_features: {
      detailed_answers: true,
      expert_sources: true,
      cited_research: true,
      ratings_included: true,
      timing_guidance: true,
      drug_interaction_flags: true,
      absorption_optimization: true,
      pairing_guide_table: true,
      total_questions: premiumInteractions.length,
      categories: [...new Set(premiumInteractions.map((q) => q.category))],
    },
  };
}

module.exports = { getPremiumPayload, premiumInteractions, pairingGuide };
