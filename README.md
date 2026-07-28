# GLP1LAUNCH 🚀

A Node.js/Express API with MetaMask integration and x402 micropayment functionality for GLP-1 information endpoints.

## Features

- ✅ Express.js REST API
- ✅ MetaMask wallet integration
- ✅ x402 micropayment protocol on Base network
- ✅ Free and paid API endpoints
- ✅ Responsive frontend with wallet connection
- ✅ Ready for Render deployment

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
