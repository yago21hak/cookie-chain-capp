"use client";

import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { getAccountBalance, createTransferTx, COOKIE_EXPLORER_URL } from "@/lib/cookie-chain";
import { ArrowRightLeft, Send, Wallet, CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";

export function QuickTransfer() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [activeTab, setActiveTab] = useState<"send" | "swap">("send");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0.1");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [txResult, setTxResult] = useState<{ signature?: string; error?: string } | null>(null);

  // Swap tab states
  const [fromAmount, setFromAmount] = useState("10");
  const [toAmount, setToAmount] = useState("1.5");

  useEffect(() => {
    if (connected && publicKey) {
      getAccountBalance(publicKey.toBase58()).then((bal) => setBalance(bal));
    }
  }, [connected, publicKey]);

  const handleRefreshBalance = async () => {
    if (publicKey) {
      const bal = await getAccountBalance(publicKey.toBase58());
      setBalance(bal);
    }
  };

  const handleSendTx = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert("Please connect your wallet (e.g. Nightly Wallet) first!");
      return;
    }

    try {
      setLoading(true);
      setTxResult(null);

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error("Invalid transfer amount.");
      }

      // Build & Send transaction
      const tx = await createTransferTx(
        publicKey.toBase58(),
        recipient.trim() || publicKey.toBase58(), // Default fallback self if empty demo
        parsedAmount
      );

      const signature = await sendTransaction(tx, connection);
      setTxResult({ signature });
      handleRefreshBalance();
    } catch (err: any) {
      console.error("Transfer error:", err);
      setTxResult({ error: err?.message || "Transaction cancelled or failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      setLoading(true);
      setTxResult(null);

      // Simulate sub-second Cookieswap execution
      await new Promise((res) => setTimeout(res, 800));
      const mockSignature = "5xP9m" + Math.random().toString(36).substring(2, 12) + "SwapTx";
      setTxResult({ signature: mockSignature });
    } catch (err: any) {
      setTxResult({ error: "Swap execution error." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl flex flex-col h-[520px]">
      {/* Tab Selectors */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("send")}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === "send"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Quick Transfer
          </button>
          <button
            onClick={() => setActiveTab("swap")}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === "swap"
                ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Cookieswap AMM
          </button>
        </div>

        {/* Balance badge */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <Wallet className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Balance:</span>
          <span className="font-bold text-white">
            {balance !== null ? `${balance.toFixed(4)} COOK` : "0.0000 COOK"}
          </span>
          <button
            onClick={handleRefreshBalance}
            className="text-slate-400 hover:text-amber-400 transition ml-1"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Send Form */}
      {activeTab === "send" ? (
        <form onSubmit={handleSendTx} className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Recipient Address (Cookie Chain / Solana SVM)
              </label>
              <input
                type="text"
                placeholder="Enter recipient pubkey (e.g. 7xKv...9aB2)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Amount (COOK Tokens)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition placeholder:text-slate-600 pr-16"
                />
                <span className="absolute right-4 top-3.5 text-xs font-bold text-amber-400">
                  COOK
                </span>
              </div>
            </div>

            {/* Fee summary */}
            <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Network Fee:</span>
                <span className="text-emerald-400 font-medium">~$0.0001 (Sub-second)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>RPC Node:</span>
                <span className="text-slate-200">rpc.cookiescan.io</span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>⏳ Signing with Wallet...</>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Transaction on Cookie Chain
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Swap Form */
        <form onSubmit={handleSwap} className="space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>You Pay</span>
                <span>Balance: {balance?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => {
                    setFromAmount(e.target.value);
                    setToAmount((parseFloat(e.target.value || "0") * 0.15).toFixed(2));
                  }}
                  className="bg-transparent text-xl font-bold text-white focus:outline-none w-1/2"
                />
                <span className="bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-lg">
                  COOK
                </span>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="bg-slate-800 p-2 rounded-full text-slate-400 border border-slate-700">
                <ArrowRightLeft className="w-4 h-4 rotate-90" />
              </div>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>You Receive (Estimated)</span>
                <span>Rate: 1 COOK = 0.15 USDC</span>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  readOnly
                  value={toAmount}
                  className="bg-transparent text-xl font-bold text-emerald-400 focus:outline-none w-1/2"
                />
                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs px-3 py-1.5 rounded-lg">
                  USDC
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>⏳ Swapping on Cookieswap...</>
              ) : (
                <>
                  <ArrowRightLeft className="w-4 h-4" /> Swap on Cookieswap AMM
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Transaction Result Alert */}
      {txResult?.signature && (
        <div className="mt-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Success! Tx: {txResult.signature.slice(0, 10)}...</span>
          </div>
          <a
            href={`${COOKIE_EXPLORER_URL}/tx/${txResult.signature}`}
            target="_blank"
            rel="noreferrer"
            className="underline flex items-center gap-1 font-bold hover:text-white"
          >
            Explorer <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {txResult?.error && (
        <div className="mt-3 bg-rose-950/60 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-300">
          ❌ Error: {txResult.error}
        </div>
      )}
    </div>
  );
}
