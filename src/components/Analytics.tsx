"use client";

import React from "react";
import { BarChart3, TrendingUp, ShieldCheck, Database, Layers, Coins } from "lucide-react";

export function Analytics() {
  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl h-[520px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Cookie Chain DAS Analytics
              </h3>
              <p className="text-xs text-slate-400">
                Powered by api.cookiescan.io Explorer API
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-full text-emerald-400 border border-slate-800">
            api.cookiescan.io
          </span>
        </div>

        {/* Token Ecosystem Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Native Token</span>
            </div>
            <p className="text-base font-bold text-white">COOK</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2% (24h)
            </p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>TVL (Cookieswap)</span>
            </div>
            <p className="text-base font-bold text-white">$4.82M</p>
            <p className="text-[10px] text-indigo-300 mt-0.5">Liquidity Pools</p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>24h Transactions</span>
            </div>
            <p className="text-base font-bold text-white">1,248,900</p>
            <p className="text-[10px] text-purple-300 mt-0.5">Sub-second Tx</p>
          </div>
        </div>

        {/* Simulated Explorer Activity Feed */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-300">
            Recent On-Chain Activity (Cookie Chain Mainnet)
          </h4>

          <div className="space-y-1.5 max-h-[210px] overflow-y-auto pr-1">
            {[
              { type: "Cookieswap Swap", detail: "100 COOK -> 15.2 USDC", time: "2s ago", tx: "4xK8...9aB2" },
              { type: "Token Transfer", detail: "2.5 COOK to Nightly Wallet", time: "8s ago", tx: "8mP1...3vC9" },
              { type: "Program Exec", detail: "Cookiebox Storage Write", time: "14s ago", tx: "2qZ7...1xL0" },
              { type: "Liquidity Add", detail: "500 COOK + 75 USDC", time: "28s ago", tx: "9nW4...8pR5" },
            ].map((row, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{row.type}</span>
                  <span className="text-slate-400 ml-2">({row.detail})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-500">{row.tx}</span>
                  <span className="text-[10px] text-amber-400 font-medium">{row.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Fully SVM Verified
        </span>
        <span>Explorer: https://cookiescan.io</span>
      </div>
    </div>
  );
}
