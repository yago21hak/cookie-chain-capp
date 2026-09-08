"use client";

import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Cookie, ShieldCheck, Sparkles, Activity } from "lucide-react";

export function Navbar() {
  const { connected, publicKey } = useWallet();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
            <Cookie className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl tracking-tight text-white">
                Cookie<span className="text-amber-500">AI</span> Hub
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                cApp v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Cookie Chain (SVM) • Fast, Sub-Second Finality
            </p>
          </div>
        </div>

        {/* RPC Status & Nightly Wallet Highlight */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">rpc.cookiescan.io</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-300">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold">Nightly Wallet Supported</span>
          </div>
        </div>

        {/* Wallet Connect MultiButton */}
        <div className="flex items-center gap-3">
          <WalletMultiButton className="!bg-indigo-600 hover:!bg-indigo-700 !text-white !font-semibold !rounded-xl !h-10 !px-4 !text-sm shadow-lg shadow-indigo-600/30" />
        </div>
      </div>
    </header>
  );
}
