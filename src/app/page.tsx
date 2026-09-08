"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { NetworkStats } from "@/components/NetworkStats";
import { AgentChat } from "@/components/AgentChat";
import { QuickTransfer } from "@/components/QuickTransfer";
import { Analytics } from "@/components/Analytics";
import { BridgeGuide } from "@/components/BridgeGuide";
import { Bot, ArrowRightLeft, BarChart3, HelpCircle, Sparkles, ExternalLink } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"agent" | "transfer" | "analytics" | "bridge">("agent");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-white">
      {/* Top Header Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-1">
        {/* Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-amber-950/30 mb-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Cookie Chain Ecosystem dApp
                </span>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  Solana Virtual Machine (SVM)
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Empowering Cookie Chain with <span className="text-amber-400">cookie-mcp AI Agent</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl mt-1">
                Sub-second transaction finality, near-zero fees, Nightly Wallet support, and agentic natural language execution on <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono">https://rpc.cookiescan.io</code>.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://rpc.cookiescan.io"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-800 transition flex items-center gap-1.5"
              >
                RPC Node <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://cookiechain.wtf"
                target="_blank"
                rel="noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition"
              >
                Cookie Chain Portal
              </a>
            </div>
          </div>
        </div>

        {/* Live Network Health Stats */}
        <NetworkStats />

        {/* Interactive Workspace Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("agent")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "agent"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Bot className="w-4 h-4" />
              🤖 cookie-mcp AI Agent
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "transfer"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              ⚡ Swaps & Transfer
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "analytics"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              📊 DAS Analytics
            </button>
            <button
              onClick={() => setActiveTab("bridge")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                activeTab === "bridge"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              🌉 Bridge & Guide
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            {activeTab === "agent" && <AgentChat />}
            {activeTab === "transfer" && <QuickTransfer />}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "bridge" && <BridgeGuide />}
          </div>

          {/* Sidebar Highlight Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                🍪 Why Cookie Chain?
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Nightly Wallet Support:</strong> Built for multichain SVM wallet interaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Sub-Second Finality:</strong> Real-time confirmation without delays.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Low Transaction Fees:</strong> Average fee is ~$0.0001 per action.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>$0.05 Program Deployments:</strong> Ship custom Solana Rust / Anchor programs effortlessly.</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 font-bold text-sm">💡 Demo Instructions</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your Nightly Wallet, select any action in the AI Agent chat, click <strong>"Execute on Cookie Chain"</strong>, and verify your transaction on <a href="https://cookiescan.io" target="_blank" rel="noreferrer" className="text-amber-400 underline">cookiescan.io</a>!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 glass-panel mt-12 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 CookieAI Hub. Built for Cookie Chain Bounty on Superteam Earn.</p>
          <div className="flex items-center gap-4">
            <a href="https://docs.cookiechain.wtf" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">Docs</a>
            <a href="https://api.cookiescan.io" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">API</a>
            <a href="https://rpc.cookiescan.io" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">RPC</a>
            <a href="https://t.me/TheCookieNetChain" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
