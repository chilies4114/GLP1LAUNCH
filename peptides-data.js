// peptides-data.js
// Premium peptide & longevity compound content served by the paid
// (x402-protected) endpoint. Same module pattern as glp1-data.js and
// supplements-data.js so server.js payment logic stays clean.

const lastUpdated = new Date().toISOString();

const premiumPeptides = [
  {
    id: 1,
    question: "What is BPC-157 and what is it used for?",
    category: "healing-recovery",
    trending_score: 93,
    detailed_answer:
      "BPC-157 ('Body Protection Compound') is a synthetic peptide derived from a protein in gastric juice. It is studied primarily in animal models for tissue healing — tendon, ligament, muscle, and gut lining — and appears to promote angiogenesis (new blood vessel formation). Important: BPC-157 is NOT FDA-approved, has no large human trials, and in 2023 the FDA placed it on a list restricting compounding pharmacy use. Most evidence is preclinical (rodent) or anecdotal.",
    sources: ["J Physiol Pharmacol 2018;69:3", "FDA 503A Bulk Substances Review 2023", "Curr Pharm Des 2018;24:18"],
    expert_rating: 4.2,
  },
  {
    id: 2,
    question: "What does the peptide TB-500 do?",
    category: "healing-recovery",
    trending_score: 81,
    detailed_answer:
      "TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring protein involved in cell migration and repair. It is researched for wound healing, flexibility, and reducing inflammation, largely in animal and veterinary contexts. Like BPC-157, human clinical evidence is minimal, it is not FDA-approved for human use, and it is banned by WADA for athletes. It is frequently paired anecdotally with BPC-157 in 'recovery stacks.'",
    sources: ["Ann N Y Acad Sci 2012;1269", "WADA Prohibited List", "Expert Opin Biol Ther 2018;18:sup1"],
    expert_rating: 4.0,
  },
  {
    id: 3,
    question: "What are growth hormone secretagogues like Ipamorelin?",
    category: "growth-hormone",
    trending_score: 85,
    detailed_answer:
      "Ipamorelin is a selective growth hormone secretagogue — it stimulates the pituitary to release the body's own growth hormone (GH) in a pulsatile way, with minimal effect on cortisol or prolactin. It is studied for GH-related applications and popular in anti-aging/bodybuilding circles, often stacked with CJC-1295. It is not an FDA-approved drug; use is research/compounding-based. Effects on body composition are modest and depend heavily on sleep, training, and diet.",
    sources: ["Growth Horm IGF Res 2015;25:1", "J Clin Endocrinol Metab 2004;89:5", "Endocrine Reviews GH Axis"],
    expert_rating: 4.1,
  },
  {
    id: 4,
    question: "What is CJC-1295 and how does it pair with Ipamorelin?",
    category: "growth-hormone",
    trending_score: 79,
    detailed_answer:
      "CJC-1295 is a growth-hormone-releasing hormone (GHRH) analog that increases the amplitude of GH pulses and has an extended half-life (especially the DAC version). It is commonly combined with Ipamorelin (a GH secretagogue) because they act on complementary pathways — GHRH plus a ghrelin-mimetic — theoretically producing a stronger, more natural GH release. Human safety/efficacy data are limited; neither is FDA-approved for anti-aging.",
    sources: ["J Clin Endocrinol Metab 2006;91:3", "Clin Pharmacol 2019", "Peptide Therapeutics Review 2020"],
    expert_rating: 4.0,
  },
  {
    id: 5,
    question: "Is NAD+ or NMN effective for longevity?",
    category: "longevity",
    trending_score: 90,
    detailed_answer:
      "NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are NAD+ precursors. NAD+ declines with age and is central to cellular energy and DNA repair, making it a leading longevity target. Human trials show NMN/NR reliably raise blood NAD+ levels and are generally well-tolerated, but hard evidence for extended human lifespan or reversed aging is still lacking — most dramatic results are in mice. Note: in 2022 the FDA signaled NMN may not be marketable as a supplement, creating regulatory uncertainty.",
    sources: ["Cell Metab 2018;27:3", "Nature Aging 2021", "FDA NDI Ruling on NMN 2022"],
    expert_rating: 4.3,
  },
  {
    id: 6,
    question: "What is the evidence for rapamycin as a longevity drug?",
    category: "longevity",
    trending_score: 87,
    detailed_answer:
      "Rapamycin (sirolimus) is an FDA-approved immunosuppressant that inhibits mTOR, a key nutrient-sensing pathway. Intermittent low-dose rapamycin extends lifespan in mice more robustly than almost any other intervention, driving intense interest in 'off-label' longevity use. Human longevity data do not yet exist; risks include immune suppression and metabolic effects. It is prescription-only and should never be self-sourced — this is an area of active clinical trials (e.g., PEARL).",
    sources: ["Nature 2009;460 (NIA ITP)", "Science Transl Med 2016", "PEARL Trial (clinicaltrials.gov)"],
    expert_rating: 4.4,
  },
  {
    id: 7,
    question: "What does the peptide Semax do?",
    category: "cognitive",
    trending_score: 72,
    detailed_answer:
      "Semax is a synthetic peptide developed in Russia, where it is an approved nootropic/neuroprotective drug (not approved in the US/EU). It is studied for cognitive enhancement, focus, and stroke recovery, and is thought to modulate BDNF and the dopaminergic/serotonergic systems. Evidence outside Russian literature is limited, and quality/purity of research-sourced material is a real concern. Not FDA-approved.",
    sources: ["Neurosci Behav Physiol 2007;37", "Russian Ministry of Health Registry", "Front Pharmacol 2021 review"],
    expert_rating: 3.8,
  },
  {
    id: 8,
    question: "What is GHK-Cu (copper peptide) used for?",
    category: "skin-aging",
    trending_score: 83,
    detailed_answer:
      "GHK-Cu is a naturally occurring copper-binding tripeptide that declines with age. It has the strongest evidence of the 'cosmetic' peptides: topical GHK-Cu is shown in controlled studies to improve skin firmness, reduce fine lines, and support wound healing by stimulating collagen and antioxidant pathways. Topical cosmetic use is well-established and low-risk; injectable use for systemic anti-aging is not well-studied in humans.",
    sources: ["J Cosmet Dermatol 2015;14:1", "Biomed Res Int 2015", "Int J Mol Sci 2018;19:7"],
    expert_rating: 4.5,
  },
  {
    id: 9,
    question: "Are peptides legal and FDA-approved?",
    category: "safety-legality",
    trending_score: 95,
    detailed_answer:
      "It depends on the peptide. A few are FDA-approved drugs (e.g., semaglutide, tirzepatide, sermorelin). Many popular 'research peptides' (BPC-157, TB-500, CJC-1295, Ipamorelin) are NOT FDA-approved for human use, are sold 'for research use only,' and several were restricted for pharmacy compounding by the FDA in 2023. Buying research-grade peptides for personal injection is a legal gray area with real safety risks (purity, sterility, dosing). Always involve a licensed clinician.",
    sources: ["FDA 503A/503B Compounding Lists 2023", "FTC Enforcement Actions", "USADA/WADA Guidance"],
    expert_rating: 4.6,
  },
  {
    id: 10,
    question: "What is senolytics and the 'zombie cell' theory of aging?",
    category: "longevity",
    trending_score: 84,
    detailed_answer:
      "Senolytics are compounds that selectively clear senescent ('zombie') cells — cells that stop dividing but resist death and secrete inflammatory factors (the SASP) that drive aging. The most-studied combo is dasatinib + quercetin. Mouse studies show impressive healthspan gains, and early human trials (e.g., for idiopathic pulmonary fibrosis and diabetic kidney disease) are underway. It remains experimental for general anti-aging; dasatinib is a prescription chemotherapy drug.",
    sources: ["Nature Medicine 2018;24", "EBioMedicine 2019;40", "Mayo Clinic Senolytics Program"],
    expert_rating: 4.3,
  },
  {
    id: 11,
    question: "Do collagen peptides actually improve skin and joints?",
    category: "skin-aging",
    trending_score: 88,
    detailed_answer:
      "Oral collagen (hydrolyzed collagen peptides) has the broadest human evidence of any peptide supplement. Randomized trials show modest but real improvements in skin elasticity/hydration and reductions in joint pain in some populations. The peptides are broken into amino acids and bioactive di/tripeptides that may signal fibroblasts. It is a food-grade supplement (low risk) — effects are real but moderate, not dramatic, and take 8-12 weeks.",
    sources: ["J Cosmet Dermatol 2019;18:1", "Nutrients 2019;11:1079", "Appl Physiol Nutr Metab 2017;42"],
    expert_rating: 4.4,
  },
  {
    id: 12,
    question: "What lifestyle factors have the strongest longevity evidence?",
    category: "longevity",
    trending_score: 91,
    detailed_answer:
      "Before any peptide or compound, the interventions with the strongest human longevity evidence are unglamorous: regular exercise (especially zone-2 cardio + resistance training), adequate protein, quality sleep (7-9h), not smoking, moderate/no alcohol, maintaining muscle mass and VO2 max, and social connection. VO2 max and grip strength are among the best-validated predictors of all-cause mortality — outperforming most supplements studied to date.",
    sources: ["JAMA 2018;319:2 (VO2 max)", "Lancet 2018 (alcohol)", "BMJ 2022 (protein & muscle)"],
    expert_rating: 4.8,
  },
];

// Structured peptide/compound reference table — high value for AI agents
// answering "what is X, is it approved, what's the evidence" queries.
const compoundReference = [
  {
    compound: "BPC-157",
    class: "Healing peptide",
    fda_status: "Not approved; compounding restricted (2023)",
    primary_use: "Tissue/tendon/gut healing (preclinical)",
    evidence_level: "Animal / anecdotal",
  },
  {
    compound: "Ipamorelin",
    class: "GH secretagogue",
    fda_status: "Not approved (research/compounding)",
    primary_use: "Stimulate natural GH release",
    evidence_level: "Limited human",
  },
  {
    compound: "NMN / NR",
    class: "NAD+ precursor",
    fda_status: "Supplement status contested (FDA 2022)",
    primary_use: "Raise cellular NAD+ (longevity)",
    evidence_level: "Human (biomarker) / mouse (lifespan)",
  },
  {
    compound: "Rapamycin",
    class: "mTOR inhibitor",
    fda_status: "FDA-approved (immunosuppressant); off-label longevity",
    primary_use: "Longevity (experimental)",
    evidence_level: "Strong in mice; human trials ongoing",
  },
  {
    compound: "GHK-Cu",
    class: "Copper peptide",
    fda_status: "Cosmetic ingredient (topical)",
    primary_use: "Skin firmness, collagen, wound healing",
    evidence_level: "Human (topical)",
  },
  {
    compound: "Collagen peptides",
    class: "Food-grade supplement",
    fda_status: "Dietary supplement (allowed)",
    primary_use: "Skin elasticity, joint comfort",
    evidence_level: "Human (moderate)",
  },
];

const disclaimer =
  "This content is for informational and educational purposes only and is not medical advice. Many peptides and longevity compounds are NOT FDA-approved for human use, are sold 'for research use only,' and carry real safety, purity, and legal risks. Nothing here endorses self-administration. Always consult a licensed healthcare provider before using any peptide, hormone, or investigational compound.";

function getPremiumPayload() {
  return {
    success: true,
    message: "Premium peptide & longevity insights (paid access)",
    version: "1.0",
    last_updated: lastUpdated,
    disclaimer,
    data: premiumPeptides,
    compound_reference: compoundReference,
    premium_features: {
      detailed_answers: true,
      expert_sources: true,
      cited_research: true,
      ratings_included: true,
      fda_status_flags: true,
      evidence_level_ratings: true,
      safety_legality_guidance: true,
      compound_reference_table: true,
      total_questions: premiumPeptides.length,
      categories: [...new Set(premiumPeptides.map((q) => q.category))],
    },
  };
}

module.exports = { getPremiumPayload, premiumPeptides, compoundReference };
