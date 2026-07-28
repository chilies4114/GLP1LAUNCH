require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: "ok", 
    message: "GLP1 API running" 
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

// Paid endpoint - For now, we'll implement basic version
// x402 integration will be configured during deployment
app.get('/glp1/top-questions-paid', (req, res) => {
  // Check for payment header (x402 will add this)
  const paymentProof = req.headers['x-payment-proof'];
  
  if (!paymentProof && process.env.NODE_ENV === 'production') {
    return res.status(402).json({
      error: 'Payment Required',
      message: 'This endpoint requires payment of $0.01 on Base network',
      payment_details: {
        scheme: 'exact',
        network: 'eip155:8453',
        price: '0.01',
        payTo: process.env.PAY_TO
      }
    });
  }
  
  res.json({
    success: true,
    message: "Premium GLP-1 insights (paid access)",
    data: [
      {
        id: 1,
        question: "What is GLP-1 and how does it work?",
        category: "basics",
        trending_score: 95,
        detailed_answer: "GLP-1 (Glucagon-Like Peptide-1) is a hormone naturally produced in your intestines. It helps regulate blood sugar, slows digestion, and signals fullness to your brain.",
        sources: ["NEJM", "Diabetes Care Journal"],
        expert_rating: 4.8
      },
      {
        id: 2,
        question: "What are the side effects of GLP-1 medications?",
        category: "safety",
        trending_score: 88,
        detailed_answer: "Common side effects include nausea, vomiting, diarrhea, and constipation. These usually decrease over time. Rare but serious side effects can include pancreatitis.",
        sources: ["FDA", "Clinical Trial Data"],
        expert_rating: 4.6
      },
      {
        id: 3,
        question: "How much weight can I lose with GLP-1?",
        category: "results",
        trending_score: 92,
        detailed_answer: "Clinical trials show average weight loss of 15-20% of body weight over 68 weeks. Individual results vary based on diet, exercise, and adherence.",
        sources: ["NEJM Trial Results", "Obesity Medicine"],
        expert_rating: 4.9
      },
      {
        id: 4,
        question: "Are GLP-1 medications covered by insurance?",
        category: "cost",
        trending_score: 85,
        detailed_answer: "Coverage varies. Most insurance covers GLP-1 for diabetes management. Weight loss coverage depends on your plan and may require prior authorization.",
        sources: ["Insurance Provider Data", "Healthcare.gov"],
        expert_rating: 4.3
      },
      {
        id: 5,
        question: "Can I stop taking GLP-1 after reaching my goal weight?",
        category: "usage",
        trending_score: 79,
        detailed_answer: "Most patients regain weight after stopping. GLP-1 medications are typically considered long-term treatments. Consult your doctor before discontinuing.",
        sources: ["Endocrinology Association", "Long-term Studies"],
        expert_rating: 4.7
      },
      {
        id: 6,
        question: "What's the difference between Ozempic, Wegovy, and Mounjaro?",
        category: "medications",
        trending_score: 94,
        detailed_answer: "Ozempic (semaglutide) is FDA-approved for diabetes. Wegovy (higher-dose semaglutide) is for weight loss. Mounjaro (tirzepatide) is a dual GIP/GLP-1 agonist.",
        sources: ["FDA Approval Documents", "Comparative Studies"],
        expert_rating: 4.9
      },
      {
        id: 7,
        question: "How long does it take to see results?",
        category: "timeline",
        trending_score: 86,
        detailed_answer: "Most patients notice appetite suppression within 1-2 weeks. Significant weight loss typically begins around week 4-8 with peak effects at 6+ months.",
        sources: ["Clinical Trial Timelines", "Patient Reports"],
        expert_rating: 4.5
      }
    ],
    premium_features: {
      detailed_answers: true,
      expert_sources: true,
      ratings_included: true,
      additional_insights: 2
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`GLP1 API running on port ${PORT}`);
  console.log(`Free endpoint: http://localhost:${PORT}/glp1/top-questions`);
  console.log(`Paid endpoint: http://localhost:${PORT}/glp1/top-questions-paid`);
  
  if (!process.env.PAY_TO) {
    console.warn('⚠️  WARNING: PAY_TO environment variable not set!');
  } else {
    console.log(`✓ PAY_TO address configured: ${process.env.PAY_TO}`);
  }
});
