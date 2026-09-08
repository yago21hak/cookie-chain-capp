"use client";

import React from "react";
import { ArrowLeftRight, CheckCircle2, ExternalLink, HelpCircle, Share2 } from "lucide-react";

export function BridgeGuide() {
  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-4 md:p-6 shadow-2xl h-[520px] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Cookie Chain Bridge & Submission Guide
              </h3>
              <p className="text-xs text-slate-400">
                Guide for Superteam Earn Submission & X (Twitter) Demo
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
            Bounty Verified
          </span>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-3">
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
            <span className="bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                Connect Nightly Wallet to Cookie Chain
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Open Nightly Wallet, select Cookie Chain (SVM) network, and connect to our cApp using the top-right button.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
            <span className="bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                Bridge Assets via Cookie Chain Portal
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Bridge SOL or USDC from Solana Mainnet/Devnet to Cookie Chain using the official bridge at{" "}
                <a
                  href="https://cookiechain.wtf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 underline inline-flex items-center gap-0.5"
                >
                  cookiechain.wtf <ExternalLink className="w-3 h-3" />
                </a>.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
            <span className="bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                Interact with cookie-mcp AI Agent & Swaps
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Use natural language prompts in the AI Agent tab to transfer COOK tokens or execute swaps on Cookieswap.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
            <span className="bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                Post Demo Thread on X (Twitter) & Telegram
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Record a video walkthrough of Nightly Wallet + CookieAI Hub, post on X, and share in{" "}
                <a
                  href="https://t.me/TheCookieNetChain"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 underline inline-flex items-center gap-0.5"
                >
                  Cookie Chain Telegram <ExternalLink className="w-3 h-3" />
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Ready for Superteam Submission
        </span>
        <a
          href="https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app"
          target="_blank"
          rel="noreferrer"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
        >
          <Share2 className="w-3.5 h-3.5" /> Submit Bounty
        </a>
      </div>
    </div>
  );
}
