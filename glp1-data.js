// glp1-data.js
// Premium GLP-1 content served by the paid (x402-protected) endpoint.
// Kept in a separate module so server.js payment logic stays clean.

const lastUpdated = new Date().toISOString();

const premiumQuestions = [
  {
    id: 1,
    question: "What is GLP-1 and how does it work?",
    category: "basics",
    trending_score: 95,
    detailed_answer:
      "GLP-1 (Glucagon-Like Peptide-1) is an incretin hormone released by intestinal L-cells after eating. GLP-1 receptor agonist medications mimic it through four mechanisms: (1) glucose-dependent insulin secretion, (2) suppression of glucagon, (3) delayed gastric emptying which prolongs satiety, and (4) direct action on hypothalamic appetite centers to reduce hunger and food noise.",
    sources: [
      { name: "STEP-1 trial, NEJM 2021;384:989", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
      { name: "ADA Standards of Care, Diabetes Care 2022;45:S125", url: "https://diabetesjournals.org/care/article/45/Supplement_1/S125/138908/9-Pharmacologic-Approaches-to-Glycemic-Treatment" },
      { name: "Nature Reviews Endocrinology", url: "https://www.nature.com/nrendo/" },
    ],
  },
  {
    id: 2,
    question: "What are the side effects of GLP-1 medications?",
    category: "safety",
    trending_score: 88,
    detailed_answer:
      "Most common (>10%): nausea, vomiting, diarrhea, constipation — usually dose-dependent and improving after 4-8 weeks. Less common: injection-site reactions, fatigue, gallstones with rapid weight loss. Serious but rare: pancreatitis, and a boxed warning for medullary thyroid carcinoma based on rodent studies (avoid with personal/family history of MTC or MEN2).",
    sources: [
      { name: "FDA prescribing information (Drugs@FDA)", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" },
      { name: "GLP-1 GI adverse events, JAMA 2023;329:1795", url: "https://jamanetwork.com/journals/jama/fullarticle/2810542" },
      { name: "STEP-1 trial safety data, NEJM 2021", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
    ],
  },
  {
    id: 3,
    question: "How much weight can I lose with GLP-1?",
    category: "results",
    trending_score: 92,
    detailed_answer:
      "Semaglutide 2.4mg (Wegovy): ~15% average body-weight loss at 68 weeks (STEP-1). Tirzepatide 15mg (Zepbound): ~20.9% at 72 weeks (SURMOUNT-1), the highest of any approved agent. Results depend on dose adherence, diet, and physical activity; a plateau typically appears around months 9-12.",
    sources: [
      { name: "STEP-1, NEJM 2021;384:989", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
      { name: "SURMOUNT-1, NEJM 2022;387:205", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
      { name: "Obesity Medicine Association", url: "https://obesitymedicine.org/" },
    ],
  },
  {
    id: 4,
    question: "Are GLP-1 medications covered by insurance?",
    category: "cost",
    trending_score: 85,
    detailed_answer:
      "Coverage is far more common for the diabetes indication (Ozempic, Mounjaro) than the obesity indication (Wegovy, Zepbound). Many commercial plans require prior authorization, a documented BMI ≥30 (or ≥27 with a comorbidity), and sometimes step therapy. Medicare currently does not cover drugs prescribed solely for weight loss.",
    sources: [
      { name: "CMS (Medicare coverage)", url: "https://www.cms.gov/" },
      { name: "KFF analysis of GLP-1 coverage", url: "https://www.kff.org/" },
      { name: "FDA approval documents (Drugs@FDA)", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" },
    ],
  },
  {
    id: 5,
    question: "Can I stop taking GLP-1 after reaching my goal weight?",
    category: "usage",
    trending_score: 79,
    detailed_answer:
      "Obesity is treated as a chronic condition. In the STEP-4 trial, patients who stopped semaglutide regained about two-thirds of lost weight within one year. Most clinicians treat GLP-1 therapy as long-term, sometimes with a maintenance (lower) dose. Any discontinuation should be gradual and physician-supervised.",
    sources: [
      { name: "STEP-4 withdrawal trial, JAMA 2021;325:1414", url: "https://jamanetwork.com/journals/jama/fullarticle/2777886" },
      { name: "Endocrine Society", url: "https://www.endocrine.org/" },
      { name: "STEP-5 two-year results, Nature Medicine 2022", url: "https://www.nature.com/articles/s41591-022-02026-4" },
    ],
  },
  {
    id: 6,
    question: "What's the difference between Ozempic, Wegovy, Mounjaro, and Zepbound?",
    category: "medications",
    trending_score: 94,
    detailed_answer:
      "Ozempic = semaglutide, FDA-approved for type 2 diabetes (up to 2.0mg). Wegovy = semaglutide, approved for obesity (2.4mg). Mounjaro = tirzepatide (dual GIP/GLP-1), approved for diabetes. Zepbound = tirzepatide, approved for obesity. Same active molecule differs by brand, indication, and max dose; tirzepatide's dual-receptor action tends to produce greater weight loss than semaglutide.",
    sources: [
      { name: "FDA approval documents (Drugs@FDA)", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" },
      { name: "SURPASS-2: tirzepatide vs semaglutide, NEJM 2021", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2107519" },
      { name: "SURMOUNT-1, NEJM 2022", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
    ],
  },
  {
    id: 7,
    question: "How long does it take to see results?",
    category: "timeline",
    trending_score: 86,
    detailed_answer:
      "Appetite suppression is often noticeable within 1-2 weeks of the first effective dose. Measurable weight loss typically begins at weeks 4-8 as the dose is titrated upward. Peak effect is generally 6-12 months in. Because doses escalate monthly, early weeks are about tolerance, not maximum results.",
    sources: [
      { name: "Wegovy prescribing information (titration schedule)", url: "https://www.novo-pi.com/wegovy.pdf" },
      { name: "STEP-1, NEJM 2021", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
      { name: "Obesity Medicine Association", url: "https://obesitymedicine.org/" },
    ],
  },
  {
    id: 8,
    question: "What is the standard dosing and titration schedule?",
    category: "dosing",
    trending_score: 90,
    detailed_answer:
      "Semaglutide (Wegovy) titrates over ~16-20 weeks: 0.25 → 0.5 → 1.0 → 1.7 → 2.4mg weekly, escalating roughly every 4 weeks as tolerated. Tirzepatide (Zepbound) titrates: 2.5 → 5 → 7.5 → 10 → 12.5 → 15mg weekly. Slow titration is the single biggest lever for minimizing GI side effects; staying longer at a dose is acceptable if side effects are strong.",
    sources: [
      { name: "Wegovy prescribing information", url: "https://www.novo-pi.com/wegovy.pdf" },
      { name: "Zepbound prescribing information", url: "https://pi.lilly.com/us/zepbound-uspi.pdf" },
      { name: "ADA Standards of Care", url: "https://diabetesjournals.org/care" },
    ],
  },
  {
    id: 9,
    question: "How do I manage nausea and GI side effects?",
    category: "side-effect-management",
    trending_score: 83,
    detailed_answer:
      "Evidence-informed strategies: eat smaller, more frequent low-fat meals; stop eating at first fullness (satiety signals are amplified); avoid greasy/fried and very sugary foods; stay hydrated; don't lie down right after eating. If nausea is severe, a clinician may slow titration or prescribe antiemetics. Persistent vomiting or severe abdominal pain radiating to the back warrants urgent evaluation (rule out pancreatitis).",
    sources: [
      { name: "Obesity Medicine Association", url: "https://obesitymedicine.org/" },
      { name: "Wegovy prescribing information", url: "https://www.novo-pi.com/wegovy.pdf" },
      { name: "STEP-1 safety data, NEJM 2021", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" },
    ],
  },
  {
    id: 10,
    question: "What are the cheapest ways to pay for GLP-1 medications?",
    category: "cost",
    trending_score: 91,
    detailed_answer:
      "Options in order of typical savings: (1) manufacturer savings cards for commercially insured patients (Wegovy/Zepbound programs can drop copays substantially); (2) manufacturer direct-pay programs offering vials at reduced cash prices; (3) telehealth compounded options where clinically appropriate; (4) discount cards (GoodRx) for the diabetes brands. Cash list prices run roughly $1,000-1,350/month before any discount.",
    sources: [
      { name: "NovoCare savings programs", url: "https://www.novocare.com/" },
      { name: "Zepbound (Lilly) official site", url: "https://zepbound.lilly.com/" },
      { name: "GoodRx price data", url: "https://www.goodrx.com/" },
    ],
  },
  {
    id: 11,
    question: "Can GLP-1 medications be used with other weight-loss drugs?",
    category: "interactions",
    trending_score: 74,
    detailed_answer:
      "Combination therapy is emerging but should be physician-directed. GLP-1 agonists are not combined with each other. Some clinicians layer metformin or, in select cases, other anti-obesity agents. Because GLP-1s delay gastric emptying, they can alter absorption of oral medications — oral contraceptive efficacy and rapidly absorbed drugs deserve special attention.",
    sources: [
      { name: "Endocrine Society", url: "https://www.endocrine.org/" },
      { name: "DailyMed (official drug labels)", url: "https://dailymed.nlm.nih.gov/" },
      { name: "FDA prescribing information (Drugs@FDA)", url: "https://www.accessdata.fda.gov/scripts/cder/daf/" },
    ],
  },
  {
    id: 12,
    question: "Are there natural or non-injectable alternatives?",
    category: "alternatives",
    trending_score: 80,
    detailed_answer:
      "Oral GLP-1 options exist: Rybelsus (oral semaglutide) is approved for diabetes, and oral obesity formulations are in late-stage trials. 'Natural GLP-1 boosters' (high-protein/high-fiber diets, certain foods) modestly raise endogenous GLP-1 but nowhere near pharmacologic levels. No supplement replicates prescription efficacy; claims otherwise are generally unsupported.",
    sources: [
      { name: "PIONEER-1 oral semaglutide, Diabetes Care 2019;42:1724", url: "https://pubmed.ncbi.nlm.nih.gov/31186300/" },
      { name: "Rybelsus prescribing information", url: "https://www.novo-pi.com/rybelsus.pdf" },
      { name: "Endocrine Society", url: "https://www.endocrine.org/" },
    ],
  },
];

// Structured drug comparison table — high value for AI agents answering comparisons
const drugComparison = [
  {
    brand: "Ozempic",
    generic: "semaglutide",
    manufacturer: "Novo Nordisk",
    indication: "Type 2 diabetes",
    delivery: "weekly injection",
    max_dose: "2.0 mg/week",
    avg_weight_loss: "~6-14%",
  },
  {
    brand: "Wegovy",
    generic: "semaglutide",
    manufacturer: "Novo Nordisk",
    indication: "Obesity / weight management",
    delivery: "weekly injection",
    max_dose: "2.4 mg/week",
    avg_weight_loss: "~15%",
  },
  {
    brand: "Mounjaro",
    generic: "tirzepatide",
    manufacturer: "Eli Lilly",
    indication: "Type 2 diabetes",
    delivery: "weekly injection",
    max_dose: "15 mg/week",
    avg_weight_loss: "~15-20%",
  },
  {
    brand: "Zepbound",
    generic: "tirzepatide",
    manufacturer: "Eli Lilly",
    indication: "Obesity / weight management",
    delivery: "weekly injection",
    max_dose: "15 mg/week",
    avg_weight_loss: "~20.9%",
  },
  {
    brand: "Rybelsus",
    generic: "semaglutide (oral)",
    manufacturer: "Novo Nordisk",
    indication: "Type 2 diabetes",
    delivery: "daily oral tablet",
    max_dose: "14 mg/day",
    avg_weight_loss: "~3-4%",
  },
];

const disclaimer =
  "This content is for informational purposes only and is not medical advice. GLP-1 medications require a prescription and physician supervision. Always consult a licensed healthcare provider before starting, stopping, or changing therapy.";

function getPremiumPayload() {
  return {
    success: true,
    message: "Premium GLP-1 insights (paid access)",
    version: "2.1",
    last_updated: lastUpdated,
    disclaimer,
    scoring: {
      trending_score:
        "Editorial priority score (0-100) assigned by the site maintainers to rank question importance. It is not derived from live trend or traffic data.",
    },
    data: premiumQuestions,
    drug_comparison: drugComparison,
    premium_features: {
      detailed_answers: true,
      cited_sources: true,
      source_links: true,
      cited_clinical_trials: true,
      dosing_schedules: true,
      side_effect_management: true,
      cost_saving_strategies: true,
      drug_comparison_table: true,
      total_questions: premiumQuestions.length,
      categories: [...new Set(premiumQuestions.map((q) => q.category))],
    },
  };
}

module.exports = { getPremiumPayload, premiumQuestions, drugComparison };
