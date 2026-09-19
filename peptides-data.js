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
    sources: [
      { name: "FDA - Bulk drug substances used in compounding", url: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding" },
      { name: "BPC-157 vascular/gut healing review, Curr Pharm Des 2018", url: "https://doi.org/10.2174/1381612824666180608101119" },
      { name: "Pharmacological properties of BPC 157", url: "https://pubmed.ncbi.nlm.nih.gov/17657443/" },
    ],
  },
  {
    id: 2,
    question: "What does the peptide TB-500 do?",
    category: "healing-recovery",
    trending_score: 81,
    detailed_answer:
      "TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring protein involved in cell migration and repair. It is researched for wound healing, flexibility, and reducing inflammation, largely in animal and veterinary contexts. Like BPC-157, human clinical evidence is minimal, it is not FDA-approved for human use, and it is banned by WADA for athletes. It is frequently paired anecdotally with BPC-157 in 'recovery stacks.'",
    sources: [
      { name: "WADA Prohibited List", url: "https://www.wada-ama.org/en/prohibited-list" },
      { name: "Annals of the New York Academy of Sciences", url: "https://nyaspubs.onlinelibrary.wiley.com/journal/17496632" },
      { name: "Expert Opinion on Biological Therapy", url: "https://www.tandfonline.com/" },
    ],
  },
  {
    id: 3,
    question: "What are growth hormone secretagogues like Ipamorelin?",
    category: "growth-hormone",
    trending_score: 85,
    detailed_answer:
      "Ipamorelin is a selective growth hormone secretagogue — it stimulates the pituitary to release the body's own growth hormone (GH) in a pulsatile way, with minimal effect on cortisol or prolactin. It is studied for GH-related applications and popular in anti-aging/bodybuilding circles, often stacked with CJC-1295. It is not an FDA-approved drug; use is research/compounding-based. Effects on body composition are modest and depend heavily on sleep, training, and diet.",
    sources: [
      { name: "Growth Hormone & IGF Research", url: "https://www.sciencedirect.com/journal/growth-hormone-and-igf-research" },
      { name: "Journal of Clinical Endocrinology & Metabolism", url: "https://academic.oup.com/jcem" },
      { name: "Endocrine Reviews", url: "https://academic.oup.com/edrv" },
    ],
  },
  {
    id: 4,
    question: "What is CJC-1295 and how does it pair with Ipamorelin?",
    category: "growth-hormone",
    trending_score: 79,
    detailed_answer:
      "CJC-1295 is a growth-hormone-releasing hormone (GHRH) analog that increases the amplitude of GH pulses and has an extended half-life (especially the DAC version). It is commonly combined with Ipamorelin (a GH secretagogue) because they act on complementary pathways — GHRH plus a ghrelin-mimetic — theoretically producing a stronger, more natural GH release. Human safety/efficacy data are limited; neither is FDA-approved for anti-aging.",
    sources: [
      { name: "CJC-1295 GH pulsatility, JCEM 2006;91:3", url: "https://doi.org/10.1210/jc.2006-1702" },
      { name: "Endocrine Society", url: "https://www.endocrine.org/" },
      { name: "Nature Reviews Drug Discovery", url: "https://www.nature.com/nrd/" },
    ],
  },
  {
    id: 5,
    question: "Is NAD+ or NMN effective for longevity?",
    category: "longevity",
    trending_score: 90,
    detailed_answer:
      "NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are NAD+ precursors. NAD+ declines with age and is central to cellular energy and DNA repair, making it a leading longevity target. Human trials show NMN/NR reliably raise blood NAD+ levels and are generally well-tolerated, but hard evidence for extended human lifespan or reversed aging is still lacking — most dramatic results are in mice. Note: in 2022 the FDA signaled NMN may not be marketable as a supplement, creating regulatory uncertainty.",
    sources: [
      { name: "Nicotinamide healthspan study, Cell Metab 2018;27:3", url: "https://www.cell.com/cell-metabolism/fulltext/S1550-4131(18)30112-8" },
      { name: "Nature Aging", url: "https://www.nature.com/nataging/" },
      { name: "FDA response on NMN as a supplement (2022)", url: "https://www.npanational.org/wp-content/uploads/2023/04/FDA-Letter-to-Effepharm.pdf" },
    ],
  },
  {
    id: 6,
    question: "What is the evidence for rapamycin as a longevity drug?",
    category: "longevity",
    trending_score: 87,
    detailed_answer:
      "Rapamycin (sirolimus) is an FDA-approved immunosuppressant that inhibits mTOR, a key nutrient-sensing pathway. Intermittent low-dose rapamycin extends lifespan in mice more robustly than almost any other intervention, driving intense interest in 'off-label' longevity use. Human longevity data do not yet exist; risks include immune suppression and metabolic effects. It is prescription-only and should never be self-sourced — this is an area of active clinical trials (e.g., PEARL).",
    sources: [
      { name: "Rapamycin extends lifespan in mice, Nature 2009;460", url: "https://doi.org/10.1038/nature08221" },
      { name: "PEARL trial, ClinicalTrials.gov NCT04488601", url: "https://clinicaltrials.gov/study/NCT04488601" },
      { name: "PEARL trial one-year results, Aging", url: "https://doi.org/10.18632/aging.206235" },
    ],
  },
  {
    id: 7,
    question: "What does the peptide Semax do?",
    category: "cognitive",
    trending_score: 72,
    detailed_answer:
      "Semax is a synthetic peptide developed in Russia, where it is an approved nootropic/neuroprotective drug (not approved in the US/EU). It is studied for cognitive enhancement, focus, and stroke recovery, and is thought to modulate BDNF and the dopaminergic/serotonergic systems. Evidence outside Russian literature is limited, and quality/purity of research-sourced material is a real concern. Not FDA-approved.",
    sources: [
      { name: "Neuroscience and Behavioral Physiology (Springer)", url: "https://link.springer.com/journal/11055" },
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { name: "Frontiers in Pharmacology", url: "https://www.frontiersin.org/journals/pharmacology" },
    ],
  },
  {
    id: 8,
    question: "What is GHK-Cu (copper peptide) used for?",
    category: "skin-aging",
    trending_score: 83,
    detailed_answer:
      "GHK-Cu is a naturally occurring copper-binding tripeptide that declines with age. It has the strongest evidence of the 'cosmetic' peptides: topical GHK-Cu is shown in controlled studies to improve skin firmness, reduce fine lines, and support wound healing by stimulating collagen and antioxidant pathways. Topical cosmetic use is well-established and low-risk; injectable use for systemic anti-aging is not well-studied in humans.",
    sources: [
      { name: "Copper peptides in regenerative aesthetic dermatology (review)", url: "https://doi.org/10.1002/der2.70067" },
      { name: "BioMed Research International", url: "https://www.hindawi.com/journals/bmri/" },
      { name: "International Journal of Molecular Sciences", url: "https://www.mdpi.com/journal/ijms" },
    ],
  },
  {
    id: 9,
    question: "Are peptides legal and FDA-approved?",
    category: "safety-legality",
    trending_score: 95,
    detailed_answer:
      "It depends on the peptide. A few are FDA-approved drugs (e.g., semaglutide, tirzepatide, sermorelin). Many popular 'research peptides' (BPC-157, TB-500, CJC-1295, Ipamorelin) are NOT FDA-approved for human use, are sold 'for research use only,' and several were restricted for pharmacy compounding by the FDA in 2023. Buying research-grade peptides for personal injection is a legal gray area with real safety risks (purity, sterility, dosing). Always involve a licensed clinician.",
    sources: [
      { name: "FDA - Human drug compounding", url: "https://www.fda.gov/drugs/human-drug-compounding" },
      { name: "FTC", url: "https://www.ftc.gov/" },
      { name: "USADA", url: "https://www.usada.org/" },
    ],
  },
  {
    id: 10,
    question: "What is senolytics and the 'zombie cell' theory of aging?",
    category: "longevity",
    trending_score: 84,
    detailed_answer:
      "Senolytics are compounds that selectively clear senescent ('zombie') cells — cells that stop dividing but resist death and secrete inflammatory factors (the SASP) that drive aging. The most-studied combo is dasatinib + quercetin. Mouse studies show impressive healthspan gains, and early human trials (e.g., for idiopathic pulmonary fibrosis and diabetic kidney disease) are underway. It remains experimental for general anti-aging; dasatinib is a prescription chemotherapy drug.",
    sources: [
      { name: "First-in-human senolytics pilot, EBioMedicine 2019;40", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6412088/" },
      { name: "Nature Medicine", url: "https://www.nature.com/nm/" },
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org/" },
    ],
  },
  {
    id: 11,
    question: "Do collagen peptides actually improve skin and joints?",
    category: "skin-aging",
    trending_score: 88,
    detailed_answer:
      "Oral collagen (hydrolyzed collagen peptides) has the broadest human evidence of any peptide supplement. Randomized trials show modest but real improvements in skin elasticity/hydration and reductions in joint pain in some populations. The peptides are broken into amino acids and bioactive di/tripeptides that may signal fibroblasts. It is a food-grade supplement (low risk) — effects are real but moderate, not dramatic, and take 8-12 weeks.",
    sources: [
      { name: "Collagen supplement RCT, Nutrients 2019;11:2494", url: "https://www.mdpi.com/2072-6643/11/10/2494" },
      { name: "Journal of Cosmetic Dermatology", url: "https://onlinelibrary.wiley.com/journal/14732165" },
      { name: "Applied Physiology, Nutrition, and Metabolism", url: "https://cdnsciencepub.com/journal/apnm" },
    ],
  },
  {
    id: 12,
    question: "What lifestyle factors have the strongest longevity evidence?",
    category: "longevity",
    trending_score: 91,
    detailed_answer:
      "Before any peptide or compound, the interventions with the strongest human longevity evidence are unglamorous: regular exercise (especially zone-2 cardio + resistance training), adequate protein, quality sleep (7-9h), not smoking, moderate/no alcohol, maintaining muscle mass and VO2 max, and social connection. VO2 max and grip strength are among the best-validated predictors of all-cause mortality — outperforming most supplements studied to date.",
    sources: [
      { name: "Cardiorespiratory fitness & mortality, JAMA Netw Open 2018", url: "https://doi.org/10.1001/jamanetworkopen.2018.3605" },
      { name: "Alcohol use & burden (GBD 2016), Lancet 2018", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-67361831310-2/fulltext" },
      { name: "BMJ", url: "https://www.bmj.com/" },
    ],
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
    version: "1.1",
    last_updated: lastUpdated,
    disclaimer,
    scoring: {
      trending_score:
        "Editorial priority score (0-100) assigned by the site maintainers to rank question importance. It is not derived from live trend or traffic data.",
    },
    data: premiumPeptides,
    compound_reference: compoundReference,
    premium_features: {
      detailed_answers: true,
      cited_sources: true,
      source_links: true,
      cited_research: true,
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
