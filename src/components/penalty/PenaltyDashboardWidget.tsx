"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Zap, TrendingDown } from "lucide-react";
import { useXPSystem } from "@/hooks/useXPSystem";
import XPBar from "./XPBar";
import LevelBadge from "./LevelBadge";
import DebtCounter from "./DebtCounter";
import PenaltyCard from "./PenaltyCard";

export default function PenaltyDashboardWidget() {
  const { xpProfile, unresolvedDebts, penaltyRecords } = useXPSystem();

  const recentPenalties = penaltyRecords
    .filter(p => !p.resolved)
    .slice(0, 3);

  return (
    <section className="space-y-4">
      {/* XP & Level Header */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <LevelBadge size="md" />
          <DebtCounter compact />
        </div>
        <XPBar />
      </div>

      {/* Penalty Cards */}
      {recentPenalties.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-red-400">Nevyrovnané dluhy</h3>
          </div>
          {recentPenalties.map(penalty => (
            <PenaltyCard key={penalty.id} penalty={penalty} />
          ))}
          {unresolvedDebts.length > 3 && (
            <p className="text-xs text-gray-500 text-center">
              +{unresolvedDebts.length - 3} dalších dluhů
            </p>
          )}
        </div>
      )}

      {/* Recent XP Activity */}
      {xpProfile.events.length > 0 && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Poslední XP aktivita
          </h3>
          <div className="space-y-2">
            {xpProfile.events.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  {event.xp >= 0 ? (
                    <Zap className="w-3 h-3 text-[#f59e0b]" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className="text-xs text-gray-400 truncate max-w-[180px]">
                    {event.description}
                  </span>
                </div>
                <span className={`text-xs font-bold ${event.xp >= 0 ? "text-[#10b981]" : "text-red-400"}`}>
                  {event.xp >= 0 ? "+" : ""}{event.xp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
