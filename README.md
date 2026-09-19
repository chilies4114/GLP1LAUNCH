# GLP1LAUNCH 🚀

A Node.js/Express API with MetaMask integration and x402 micropayment functionality for GLP-1 information endpoints.

## Features

- ✅ Express.js REST API
- ✅ MetaMask wallet integration
- ✅ x402 micropayment protocol on Base network
- ✅ Free and paid API endpoints
- ✅ Responsive frontend with wallet connection
- ✅ Ready for Render deployment


## 60-Second Quickstart (for developers & AI agents)

**1. Free call - 10 seconds, no wallet:**
```bash
curl https://glp1launch-1.onrender.com/glp1/top-questions
```

**2. Paid call - $0.01 USDC on Base via x402:**
```bash
npm install @x402/fetch @x402/evm viem
```
```js
import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0xYourPrivateKey"); // agent wallet with USDC on Base
const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [{ network: "eip155:8453", client: new ExactEvmScheme(account) }],
});

const res = await fetchWithPayment(
  "https://glp1launch-1.onrender.com/glp1/top-questions-paid"
);
const data = await res.json();
```

**3. Browser demo:** open https://glp1launch-1.onrender.com with MetaMask
(on mobile, open inside the MetaMask app's browser).

### All paid endpoints ($0.01 each, x402 on Base mainnet)
- `GET /glp1/top-questions-paid` - GLP-1 research briefs
- `GET /supplements/interactions-paid` - supplement interaction briefs
- `GET /peptides/longevity-paid` - peptide & longevity briefs

### Usage stats
`GET /stats` returns aggregate request, paid-unlock, unique-free, unique-paid,
and 7-day repeat-paid counts. The browser stores a random first-party ID locally
and sends only pseudonymous hashes. The HMAC pseudonym rotates at the start of each UTC month, and the random
HMAC key never leaves the browser. A paid pseudonym with at least two completed
paid calls in the trailing 7 days counts as repeat paid use. This is pseudonymous measurement, not anonymous or
"no per-user data" measurement.

The server does not store health queries, wallet addresses, IP addresses, user
agents, request bodies, payment headers, or query strings. Pseudonyms and
paid-call timestamps stay in memory; paid timestamps are retained for 8 days. All
server counters and pseudonymous records reset on restart/redeploy, and clearing
browser storage creates a new local visitor ID.

### Data & scoring
Every premium answer cites named sources with links. `trending_score` is an
editorial priority score (0-100) assigned by the maintainers to rank question
importance - it is not derived from live trend or traffic data.

## API Endpoints

### 1. Health Check
```
GET /
```
Returns API status.

### 2. Free Endpoint
```
GET /glp1/top-questions
```
Returns trending GLP-1 questions (free access, no payment required).

### 3. Paid Endpoint
```
GET /glp1/top-questions-paid
```
Returns premium GLP-1 insights with detailed answers, expert sources, and ratings.
- **Cost:** $0.01 USD
- **Network:** Base (Chain ID: 8453)
- **Payment:** Via x402 protocol

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/GLP1LAUNCH.git
cd GLP1LAUNCH
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your MetaMask wallet address to `.env`:
```
PAY_TO=your_wallet_address_here
```

## Local Development

Start the server:
```bash
npm start
```

The API will run on `http://localhost:3000`

Visit `http://localhost:3000` in your browser to see the frontend.

## Testing

Run tests:
```bash
npm test
```

## Deployment on Render

### Environment Variables
Set the following environment variable in Render:
- `PAY_TO` - Your MetaMask wallet address (where payments will be sent)

### Build & Start Commands
- **Build Command:** `npm install`
- **Start Command:** `npm start`

## Technology Stack

- **Backend:** Node.js, Express.js
- **Payment:** x402 protocol (@coinbase/x402, @x402/express)
- **Blockchain:** Ethers.js
- **Network:** Base (EIP-155:8453)
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Wallet:** MetaMask (EIP-1193 provider)

## Security

- ✅ No private keys stored
- ✅ Environment variables for sensitive data
- ✅ On-chain payments via x402
- ✅ Network validation
- ✅ Wallet connection required for paid endpoints

## License

ISC

## Author

Built with Claude Code 🤖
