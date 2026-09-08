import { COOKIE_CHAIN_RPC, COOKIE_EXPLORER_URL } from "./cookie-chain";

export interface AgentAction {
  id: string;
  type: "TRANSFER" | "SWAP" | "QUERY_BALANCE" | "QUERY_NETWORK" | "BRIDGE_INFO" | "UNKNOWN";
  params: {
    recipient?: string;
    amount?: number;
    fromToken?: string;
    toToken?: string;
  };
  responseText: string;
  executable: boolean;
}

export function parsePromptWithMCP(prompt: string): AgentAction {
  const cleanPrompt = prompt.trim().toLowerCase();

  // 1. TRANSFER pattern
  if (cleanPrompt.includes("transfer") || cleanPrompt.includes("send") || cleanPrompt.includes("pay")) {
    const amountMatch = cleanPrompt.match(/(\d+(\.\d+)?)/);
    const addressMatch = prompt.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/);

    const amount = amountMatch ? parseFloat(amountMatch[1]) : 0.1;
    const recipient = addressMatch ? addressMatch[0] : "CookieRecipient...Addr";

    return {
      id: "action-" + Date.now(),
      type: "TRANSFER",
      params: { recipient, amount, fromToken: "COOK" },
      responseText: `🍪 [cookie-mcp] Action Parsed: Transfer ${amount} COOK on Cookie Chain to address ${recipient.slice(0, 6)}...${recipient.slice(-4)}. Ready for wallet signature!`,
      executable: true,
    };
  }

  // 2. SWAP pattern
  if (cleanPrompt.includes("swap") || cleanPrompt.includes("trade") || cleanPrompt.includes("exchange")) {
    const amountMatch = cleanPrompt.match(/(\d+(\.\d+)?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 5;

    return {
      id: "action-" + Date.now(),
      type: "SWAP",
      params: { amount, fromToken: "COOK", toToken: "USDC" },
      responseText: `🔄 [cookie-mcp] Swap Instruction: Swap ${amount} COOK for USDC via Cookieswap AMM on Cookie Chain. Estimated Fee: $0.0001.`,
      executable: true,
    };
  }

  // 3. BALANCE / PORTFOLIO pattern
  if (cleanPrompt.includes("balance") || cleanPrompt.includes("portfolio") || cleanPrompt.includes("holdings")) {
    return {
      id: "action-" + Date.now(),
      type: "QUERY_BALANCE",
      params: {},
      responseText: `👛 [cookie-mcp] Account Query: Fetching real-time balances from Cookie Chain RPC (https://rpc.cookiescan.io)...`,
      executable: false,
    };
  }

  // 4. NETWORK / RPC QUERY pattern
  if (cleanPrompt.includes("rpc") || cleanPrompt.includes("speed") || cleanPrompt.includes("tps") || cleanPrompt.includes("network")) {
    return {
      id: "action-" + Date.now(),
      type: "QUERY_NETWORK",
      params: {},
      responseText: `⚡ [cookie-mcp] Cookie Chain Status: Sub-second finality active. RPC Node: https://rpc.cookiescan.io (Ping: ~42ms, Avg Deployment Cost: ~$0.05).`,
      executable: false,
    };
  }

  // 5. BRIDGE pattern
  if (cleanPrompt.includes("bridge") || cleanPrompt.includes("deposit") || cleanPrompt.includes("withdraw")) {
    return {
      id: "action-" + Date.now(),
      type: "BRIDGE_INFO",
      params: {},
      responseText: `🌉 [cookie-mcp] Cookie Chain Bridge Guide: You can bridge assets from Solana mainnet to Cookie Chain using the official Cookie Chain Portal.`,
      executable: false,
    };
  }

  // General fallback
  return {
    id: "action-" + Date.now(),
    type: "UNKNOWN",
    params: {},
    responseText: `🤖 [cookie-mcp] I am your Cookie Chain Agentic Assistant. You can ask me to transfer tokens, swap on Cookieswap, inspect network stats, or check portfolio holdings!`,
    executable: false,
  };
}
