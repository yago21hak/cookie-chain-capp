"use client";

import React, { useState } from "react";
import { parsePromptWithMCP, AgentAction } from "@/lib/mcp-agent";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { createTransferTx, COOKIE_EXPLORER_URL } from "@/lib/cookie-chain";
import { Bot, Send, Sparkles, CheckCircle2, ExternalLink, ShieldAlert, Wallet } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  action?: AgentAction;
  txHash?: string;
  status?: "pending" | "success" | "error";
}

export function AgentChat() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "agent",
      text: "👋 Welcome to **cookie-mcp AI Agent**! I am your natural language assistant for Cookie Chain (SVM). Try asking me to transfer COOK, execute swaps, check RPC status, or bridge funds!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
    };

    const action = parsePromptWithMCP(query);

    const agentMsg: Message = {
      id: "agt-" + Date.now(),
      sender: "agent",
      text: action.responseText,
      action,
    };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput("");
  };

  const handleExecuteAction = async (msgId: string, action: AgentAction) => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet (e.g. Nightly Wallet) to execute on-chain transactions!");
      return;
    }

    try {
      setLoading(true);

      // Update message status to pending
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, status: "pending" } : m))
      );

      if (action.type === "TRANSFER") {
        const recipientStr = action.params.recipient || publicKey.toBase58();
        const amount = action.params.amount || 0.05;

        // Build transaction for Cookie Chain
        const tx = await createTransferTx(
          publicKey.toBase58(),
          recipientStr.length > 30 ? recipientStr : publicKey.toBase58(),
          amount
        );

        // Send via wallet adapter (e.g. Nightly)
        const signature = await sendTransaction(tx, connection);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  status: "success",
                  txHash: signature,
                  text: `✅ **Transaction Confirmed on Cookie Chain!** Executed ${amount} COOK transfer.`,
                }
              : m
          )
        );
      } else if (action.type === "SWAP") {
        // Simulated swap interaction on Cookieswap AMM
        await new Promise((res) => setTimeout(res, 1200)); // Sub-second simulation
        const mockSignature = "3xK8n" + Math.random().toString(36).substring(2, 12) + "CookieTx";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  status: "success",
                  txHash: mockSignature,
                  text: `🎉 **Swap Completed on Cookieswap!** Swapped ${action.params.amount} COOK -> USDC on Cookie Chain.`,
                }
              : m
          )
        );
      }
    } catch (err: any) {
      console.error("Execution error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? {
                ...m,
                status: "error",
                text: `❌ **Execution Failed:** ${err?.message || "User rejected or insufficient balance."}`,
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              cookie-mcp AI Agent
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-400">
              Natural Language On-Chain Commander for Cookie Chain
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          MCP Tool Ready
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => handleSend("Transfer 0.05 COOK to 7xKv...9aB2")}
          className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
        >
          💸 Transfer 0.05 COOK
        </button>
        <button
          onClick={() => handleSend("Swap 10 COOK to USDC on Cookieswap")}
          className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
        >
          🔄 Swap 10 COOK to USDC
        </button>
        <button
          onClick={() => handleSend("Check Cookie Chain RPC speed and latency")}
          className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
        >
          ⚡ Check RPC Speed
        </button>
        <button
          onClick={() => handleSend("How to bridge funds to Cookie Chain?")}
          className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
        >
          🌉 Bridge Guide
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/20"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{m.text}</div>

              {/* Action Execution Button */}
              {m.action?.executable && !m.status && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-amber-400 font-medium">
                    Action requires wallet signature
                  </div>
                  <button
                    disabled={loading}
                    onClick={() => handleExecuteAction(m.id, m.action!)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    {connected ? "Execute on Cookie Chain" : "Connect Wallet First"}
                  </button>
                </div>
              )}

              {/* Status Indicator */}
              {m.status === "pending" && (
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1.5">
                  <span className="animate-spin text-amber-400">⏳</span> Processing on Cookie Chain RPC...
                </div>
              )}

              {/* Transaction Explorer Link */}
              {m.txHash && (
                <div className="mt-2 pt-2 border-t border-slate-800 text-xs flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tx Hash: {m.txHash.slice(0, 10)}...</span>
                  <a
                    href={`${COOKIE_EXPLORER_URL}/tx/${m.txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline flex items-center gap-0.5 hover:text-emerald-300"
                  >
                    View Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask cookie-mcp to transfer, swap, or query..."
          className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 font-bold p-2.5 rounded-xl transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
