"use client";

import { Shield, Award, Crown } from "lucide-react";
import { useXPSystem, LEVELS } from "@/hooks/useXPSystem";

const LEVEL_ICONS = {
  shield: Shield,
  award: Award,
  crown: Crown,
};

const LEVEL_COLORS: Record<number, string> = {
  1: "#6b7280",
  2: "#3b82f6",
  3: "#8b5cf6",
  4: "#f59e0b",
  5: "#ef4444",
  6: "#ff6b35",
};

interface LevelBadgeProps {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export default function LevelBadge({ size = "md", showName = true }: LevelBadgeProps) {
  const { xpProfile } = useXPSystem();
  const levelDef = LEVELS.find(l => l.level === xpProfile.currentLevel) || LEVELS[0];
  const Icon = LEVEL_ICONS[levelDef.icon];
  const color = LEVEL_COLORS[levelDef.level] || "#6b7280";

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center relative`}
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className={iconSizes[size]} style={{ color }} />
        <span
          className="absolute -bottom-1 -right-1 text-[10px] font-black bg-[var(--bg-primary)] rounded-full w-5 h-5 flex items-center justify-center border-2"
          style={{ borderColor: color, color }}
        >
          {levelDef.level}
        </span>
      </div>
      {showName && (
        <div>
          <p className="text-sm font-bold" style={{ color }}>{levelDef.name}</p>
          <p className="text-[10px] text-gray-500">Level {levelDef.level}</p>
        </div>
      )}
    </div>
  );
}
