"use client";

import React, { useEffect, useState } from "react";
import { getNetworkStats, NetworkHealth } from "@/lib/cookie-chain";
import { Cpu, Zap, DollarSign, Layers, CheckCircle2 } from "lucide-react";

export function NetworkStats() {
  const [stats, setStats] = useState<NetworkHealth>({
    status: "online",
    latencyMs: 42,
    blockHeight: 14892102,
    tps: 2450,
    avgFeeUsd: "$0.0001",
  });

  useEffect(() => {
    const fetchStats = async () => {
      const live = await getNetworkStats();
      setStats(live);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 my-6">
      {/* TPS Card */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Network Speed</p>
          <p className="text-lg font-bold text-white tracking-tight">
            {stats.tps.toLocaleString()} <span className="text-xs font-normal text-amber-400">TPS</span>
          </p>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> Sub-second finality
          </p>
        </div>
      </div>

      {/* Block Height Card */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Block Height</p>
          <p className="text-lg font-bold text-white tracking-tight">
            #{stats.blockHeight.toLocaleString()}
          </p>
          <p className="text-[10px] text-purple-300 mt-0.5">
            SVM Real-time Blocks
          </p>
        </div>
      </div>

      {/* Avg Fee Card */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Average Tx Fee</p>
          <p className="text-lg font-bold text-white tracking-tight">
            {stats.avgFeeUsd}
          </p>
          <p className="text-[10px] text-emerald-300 mt-0.5">
            Near-zero gas costs
          </p>
        </div>
      </div>

      {/* Deployment Cost Card */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Program Deployment</p>
          <p className="text-lg font-bold text-white tracking-tight">
            ~$0.05 <span className="text-xs font-normal text-slate-400">USD</span>
          </p>
          <p className="text-[10px] text-indigo-300 mt-0.5">
            Ultra-cheap program deploys
          </p>
        </div>
      </div>
    </div>
  );
}
