# 🍪 CookieAI Hub — cApp on Cookie Chain (SVM)

[![Cookie Chain](https://img.shields.io/badge/Blockchain-Cookie%20Chain%20%28SVM%29-amber)](https://cookiechain.wtf)
[![Superteam Bounty](https://img.shields.io/badge/Superteam-Bounty%20Submission-indigo)](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app)
[![Nightly Wallet](https://img.shields.io/badge/Wallet-Nightly%20Supported-purple)](https://nightly.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**CookieAI Hub** is a next-generation Web3 application (cApp) built on **Cookie Chain (Solana Virtual Machine)** for the Superteam Earn bounty *“Create an App on Cookie Chain”*.

It combines an **Agentic Natural Language Assistant (`cookie-mcp`)**, **Cookieswap AMM**, **On-Chain Transfers**, **Real-Time RPC Stats**, and full **Nightly Wallet** integration.

---

## ✨ Features & Ecosystem Integrations

- **🦊 Nightly Wallet Support (Required Requirement)**: Native support for Nightly Wallet alongside standard Solana adapters (Phantom, Solflare).
- **🤖 `cookie-mcp` AI Agent Assistant**: Natural language prompt processing interface for executing Web3 transactions (transfers, swaps, balance queries).
- **⚡ Sub-Second On-Chain Transactions**: Connected directly to Cookie Chain RPC (`https://rpc.cookiescan.io`).
- **🔄 Cookieswap AMM Integration**: Simulated sub-second token swap interface for COOK -> USDC.
- **📊 Cookie DAS & Explorer Analytics**: Real-time RPC health monitoring, block height (#14,892,100+), TPS metrics, and transaction explorer links (`https://cookiescan.io`).
- **🌉 Bridge & Onboarding Guide**: Built-in walkthrough guiding users from Solana Mainnet/Devnet to Cookie Chain.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + Glassmorphism Web3 Styling + Lucide Icons
- **Blockchain**: `@solana/web3.js`, `@solana/wallet-adapter-react`, `@solana/wallet-adapter-wallets` (Nightly Wallet)
- **Network**: Cookie Chain RPC (`https://rpc.cookiescan.io`) & Explorer (`https://cookiescan.io`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm / yarn
- **Nightly Wallet Chrome Extension** (or Phantom / Solflare)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cookie-chain-capp.git
cd cookie-chain-capp

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser with your Nightly Wallet active!

---

## 🌐 Network Resources & Links

- **Cookie Chain Homepage**: [cookiechain.wtf](https://www.cookiechain.wtf)
- **Cookie Chain Documentation**: [docs.cookiechain.wtf](https://docs.cookiechain.wtf)
- **Cookie Chain RPC Endpoint**: `https://rpc.cookiescan.io`
- **Cookie Chain Explorer**: [cookiescan.io](https://cookiescan.io)
- **Superteam Earn Bounty**: [Create an App on Cookie Chain](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app)

---

## 🎥 Submission & X (Twitter) Demo Checklist

1. Connect Nightly Wallet to Cookie Chain.
2. Enter a prompt in the **`cookie-mcp` AI Agent** (e.g., *"Transfer 0.05 COOK"* or *"Swap 10 COOK"*).
3. Confirm the transaction in Nightly Wallet.
4. Record video walkthrough and share X (Twitter) thread.
5. Post X thread link in the [Cookie Chain Telegram Community](https://t.me/TheCookieNetChain).
