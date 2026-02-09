"use client";

import React from "react";
import { Dumbbell, Utensils, Flame, Droplets, Moon, Check } from "lucide-react";
import { QuestObjective } from "@/types";

const objectiveIcons: Record<QuestObjective["type"], React.ElementType> = {
  workout: Dumbbell,
  nutrition: Utensils,
  streak: Flame,
  hydration: Droplets,
  recovery: Moon,
};

const objectiveColors: Record<QuestObjective["type"], string> = {
  workout: "#ff6b35",
  nutrition: "#8b5cf6",
  streak: "#f59e0b",
  hydration: "#3b82f6",
  recovery: "#6366f1",
};

interface QuestObjectiveRowProps {
  objective: QuestObjective;
}

export default function QuestObjectiveRow({ objective }: QuestObjectiveRowProps) {
  const Icon = objectiveIcons[objective.type];
  const color = objectiveColors[objective.type];
  const progress = objective.target > 0
    ? Math.min(Math.round((objective.current / objective.target) * 100), 100)
    : 0;

  return (
    <div className={`flex items-center gap-3 py-2 ${objective.completed ? "opacity-70" : ""}`}>
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        {objective.completed ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Icon className="w-4 h-4" style={{ color }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className={`text-sm font-medium truncate ${objective.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
            {objective.title}
          </p>
          <span className="text-xs font-bold shrink-0" style={{ color: objective.completed ? "#10b981" : color }}>
            {objective.current}/{objective.target}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: objective.completed ? "#10b981" : color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
