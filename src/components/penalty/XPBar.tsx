"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp } from "lucide-react";
import { useXPSystem, LEVELS } from "@/hooks/useXPSystem";

export default function XPBar() {
  const { xpProfile, getXPToNextLevel } = useXPSystem();
  const progress = getXPToNextLevel(xpProfile.totalXP);
  const currentLevelDef = LEVELS.find(l => l.level === xpProfile.currentLevel) || LEVELS[0];
  const nextLevelDef = LEVELS.find(l => l.level === xpProfile.currentLevel + 1);

  const isDegrading = xpProfile.penaltyStreak >= 2;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#f59e0b]" />
          <span className="text-sm font-bold">{xpProfile.totalXP} XP</span>
        </div>
        {nextLevelDef && (
          <span className="text-xs text-gray-500">
            {progress.current}/{progress.needed} do Lv.{nextLevelDef.level}
          </span>
        )}
      </div>

      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isDegrading
              ? "bg-gradient-to-r from-red-500 to-red-400"
              : "bg-gradient-to-r from-[#f59e0b] to-[#ff6b35]"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {isDegrading && (
          <motion.div
            className="absolute inset-0 bg-red-500/20 rounded-full"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{currentLevelDef.name}</span>
        {nextLevelDef ? (
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {nextLevelDef.name}
          </span>
        ) : (
          <span>Max level!</span>
        )}
      </div>
    </div>
  );
}
