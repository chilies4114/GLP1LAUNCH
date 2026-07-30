require('dotenv').config();
const express = require('express');
const { paymentMiddlewareFromConfig } = require('@x402/express');
const { HTTPFacilitatorClient } = require('@x402/core/server');
const { ExactEvmScheme } = require('@x402/evm/exact/server');
const { facilitator } = require('@coinbase/x402');
const { declareDiscoveryExtension } = require('@x402/extensions/bazaar');
const { getPremiumPayload } = require('./glp1-data');
const { getPremiumPayload: getSupplementsPayload } = require('./supplements-data');
const { getPremiumPayload: getPeptidesPayload } = require('./peptides-data');

const app = express();
const PORT = process.env.PORT || 3000;
const PAY_TO = process.env.PAY_TO;

// With CDP API keys: Coinbase facilitator + Base mainnet + Bazaar listing.
// Without keys: free x402.org facilitator + Base Sepolia testnet (dev fallback).
const HAS_CDP_KEYS = !!(process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET);
const NETWORK = HAS_CDP_KEYS ? 'eip155:8453' : 'eip155:84532';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// ---- x402 payment middleware (official protocol + Bazaar discovery) ----
if (PAY_TO) {
  const facilitatorClient = HAS_CDP_KEYS
    ? new HTTPFacilitatorClient(facilitator)
    : new HTTPFacilitatorClient({ url: 'https://x402.org/facilitator' });
  console.log(
    HAS_CDP_KEYS
      ? '✓ Using Coinbase CDP facilitator (Base mainnet — Bazaar discoverable)'
      : '⚠️  No CDP keys — using x402.org facilitator on Base Sepolia TESTNET'
  );

  const routes = {
    'GET /glp1/top-questions-paid': {
      accepts: {
        scheme: 'exact',
        network: NETWORK,
        payTo: PAY_TO,
        price: '$0.01',
      },
      description:
        'Premium GLP-1 medication insights: top trending questions with detailed expert answers, cited sources (NEJM, FDA, clinical trials), and expert ratings. Ideal for AI agents answering health queries about Ozempic, Wegovy, Mounjaro, and GLP-1 therapies.',
      mimeType: 'application/json',
      serviceName: 'GLP1 Launch API',
      tags: ['health', 'glp-1', 'medication', 'weight-loss', 'medical-data'],
      extensions: {
        ...declareDiscoveryExtension({
          method: 'GET',
          output: {
            example: {
              success: true,
              message: 'Premium GLP-1 insights (paid access)',
              data: [
                {
                  id: 1,
                  question: 'What is GLP-1 and how does it work?',
                  category: 'basics',
                  trending_score: 95,
                  detailed_answer:
                    'GLP-1 (Glucagon-Like Peptide-1) is a hormone naturally produced in your intestines...',
                  sources: ['NEJM', 'Diabetes Care Journal'],
                  expert_rating: 4.8,
                },
              ],
            },
          },
        }),
      },
    },
    'GET /supplements/interactions-paid': {
      accepts: {
        scheme: 'exact',
        network: NETWORK,
        payTo: PAY_TO,
        price: '$0.01',
      },
      description:
        'Premium supplement & vitamin interaction insights: how to combine vitamins, minerals, and supplements safely — absorption optimization, timing, and drug-interaction flags with cited research (NIH, NEJM, Cochrane). Ideal for AI agents answering health/nutrition queries about vitamin D, magnesium, iron, zinc, fish oil, probiotics, creatine, and supplement-drug interactions.',
      mimeType: 'application/json',
      serviceName: 'Supplement Interactions API',
      tags: ['health', 'supplements', 'vitamins', 'nutrition', 'drug-interactions', 'medical-data'],
      extensions: {
        ...declareDiscoveryExtension({
          method: 'GET',
          output: {
            example: {
              success: true,
              message: 'Premium supplement & vitamin interaction insights (paid access)',
              data: [
                {
                  id: 2,
                  question: 'Does vitamin D need to be taken with anything to absorb?',
                  category: 'absorption',
                  trending_score: 94,
                  detailed_answer:
                    'Vitamin D is fat-soluble, so it absorbs best with a meal containing dietary fat...',
                  sources: ['J Bone Miner Res 2015;30:1', 'NIH ODS Vitamin D Fact Sheet'],
                  expert_rating: 4.8,
                },
              ],
            },
          },
        }),
      },
    },
    'GET /peptides/longevity-paid': {
      accepts: {
        scheme: 'exact',
        network: NETWORK,
        payTo: PAY_TO,
        price: '$0.01',
      },
      description:
        'Premium peptide & longevity compound insights: what each peptide/compound is, FDA/legal status, evidence level, and safety flags with cited research (Nature, Cell Metab, JAMA, FDA). Covers BPC-157, TB-500, Ipamorelin, CJC-1295, NMN/NAD+, rapamycin, GHK-Cu, senolytics, and collagen. Ideal for AI agents answering longevity, anti-aging, recovery, and peptide-safety queries.',
      mimeType: 'application/json',
      serviceName: 'Peptides & Longevity API',
      tags: ['health', 'peptides', 'longevity', 'anti-aging', 'nad', 'rapamycin', 'medical-data'],
      extensions: {
        ...declareDiscoveryExtension({
          method: 'GET',
          output: {
            example: {
              success: true,
              message: 'Premium peptide & longevity insights (paid access)',
              data: [
                {
                  id: 5,
                  question: 'Is NAD+ or NMN effective for longevity?',
                  category: 'longevity',
                  trending_score: 90,
                  detailed_answer:
                    'NMN and NR are NAD+ precursors. NAD+ declines with age and is central to cellular energy and DNA repair...',
                  sources: ['Cell Metab 2018;27:3', 'Nature Aging 2021'],
                  expert_rating: 4.3,
                },
              ],
            },
          },
        }),
      },
    },
  };

  app.use(
    paymentMiddlewareFromConfig(routes, facilitatorClient, [
      { network: NETWORK, server: new ExactEvmScheme() },
    ])
  );
  console.log('✓ x402 payment middleware enabled (Base mainnet, Coinbase facilitator)');
} else {
  console.warn('⚠️  PAY_TO not set — paid endpoint is UNPROTECTED (no x402 middleware)');
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: "ok",
    message: "GLP1 API running",
    openapi: "https://glp1launch-1.onrender.com/openapi.json",
    ai_info: "https://glp1launch-1.onrender.com/ai.txt"
  });
});

// Free endpoint - Top GLP-1 questions
app.get('/glp1/top-questions', (req, res) => {
  res.json({
    success: true,
    message: "Top trending GLP-1 questions (free)",
    data: [
      {
        id: 1,
        question: "What is GLP-1 and how does it work?",
        category: "basics",
        trending_score: 95
      },
      {
        id: 2,
        question: "What are the side effects of GLP-1 medications?",
        category: "safety",
        trending_score: 88
      },
      {
        id: 3,
        question: "How much weight can I lose with GLP-1?",
        category: "results",
        trending_score: 92
      },
      {
        id: 4,
        question: "Are GLP-1 medications covered by insurance?",
        category: "cost",
        trending_score: 85
      },
      {
        id: 5,
        question: "Can I stop taking GLP-1 after reaching my goal weight?",
        category: "usage",
        trending_score: 79
      }
    ]
  });
});

// Paid endpoint - protected by x402 middleware above.
// Requests only reach this handler after payment is verified & settled.
app.get('/glp1/top-questions-paid', (req, res) => {
  res.json(getPremiumPayload());
});

// Free endpoint - Supplement & vitamin interaction basics
app.get('/supplements/interactions', (req, res) => {
  res.json({
    success: true,
    message: "Top supplement & vitamin interaction questions (free)",
    data: [
      {
        id: 1,
        question: "Can I take magnesium with calcium?",
        category: "mineral-interactions",
        trending_score: 88
      },
      {
        id: 2,
        question: "Does vitamin D need to be taken with anything to absorb?",
        category: "absorption",
        trending_score: 94
      },
      {
        id: 3,
        question: "Is it safe to take iron with vitamin C?",
        category: "absorption",
        trending_score: 90
      },
      {
        id: 4,
        question: "Does fish oil interact with blood thinners?",
        category: "drug-interactions",
        trending_score: 91
      },
      {
        id: 5,
        question: "Can I take probiotics with antibiotics?",
        category: "timing",
        trending_score: 87
      }
    ]
  });
});

// Paid endpoint - protected by x402 middleware above.
// Requests only reach this handler after payment is verified & settled.
app.get('/supplements/interactions-paid', (req, res) => {
  res.json(getSupplementsPayload());
});

// Free endpoint - Peptide & longevity basics
app.get('/peptides/longevity', (req, res) => {
  res.json({
    success: true,
    message: "Top peptide & longevity questions (free)",
    data: [
      {
        id: 1,
        question: "What is BPC-157 and what is it used for?",
        category: "healing-recovery",
        trending_score: 93
      },
      {
        id: 5,
        question: "Is NAD+ or NMN effective for longevity?",
        category: "longevity",
        trending_score: 90
      },
      {
        id: 6,
        question: "What is the evidence for rapamycin as a longevity drug?",
        category: "longevity",
        trending_score: 87
      },
      {
        id: 9,
        question: "Are peptides legal and FDA-approved?",
        category: "safety-legality",
        trending_score: 95
      },
      {
        id: 12,
        question: "What lifestyle factors have the strongest longevity evidence?",
        category: "longevity",
        trending_score: 91
      }
    ]
  });
});

// Paid endpoint - protected by x402 middleware above.
// Requests only reach this handler after payment is verified & settled.
app.get('/peptides/longevity-paid', (req, res) => {
  res.json(getPeptidesPayload());
});

// Start server
app.listen(PORT, () => {
  console.log(`GLP1 API running on port ${PORT}`);
  console.log(`Free endpoint: http://localhost:${PORT}/glp1/top-questions`);
  console.log(`Paid endpoint: http://localhost:${PORT}/glp1/top-questions-paid`);

  if (!PAY_TO) {
    console.warn('⚠️  WARNING: PAY_TO environment variable not set!');
  } else {
    console.log(`✓ PAY_TO address configured: ${PAY_TO}`);
  }
});
