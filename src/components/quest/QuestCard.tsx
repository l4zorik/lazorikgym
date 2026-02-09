"use client";

import React from "react";
import { Trophy, X, Dumbbell } from "lucide-react";
import { Quest } from "@/types";
import { bodyPartsData } from "@/lib/data";
import QuestObjectiveRow from "./QuestObjectiveRow";

interface QuestCardProps {
  quest: Quest;
  onAbandon: (questId: string) => void;
  onComplete: (questId: string) => void;
}

export default function QuestCard({ quest, onAbandon, onComplete }: QuestCardProps) {
  const bodyPart = bodyPartsData.find((p) => p.id === quest.bodyPartId);
  const color = bodyPart?.color || "#ff6b35";
  const completedCount = quest.objectives.filter((o) => o.completed).length;
  const totalCount = quest.objectives.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allComplete = completedCount === totalCount;

  const daysLeft = quest.deadlineDate
    ? Math.max(0, Math.ceil((new Date(quest.deadlineDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div
      className="relative p-5 rounded-2xl border transition-all overflow-hidden"
      style={{
        backgroundColor: `${color}08`,
        borderColor: allComplete ? "#10b98140" : `${color}30`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Dumbbell className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <h3 className="font-bold text-base">{quest.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">{bodyPart?.name}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                {quest.difficulty}
              </span>
              {daysLeft !== null && (
                <span className={`text-xs font-medium ${daysLeft <= 3 ? "text-red-400" : "text-gray-500"}`}>
                  {daysLeft} dní zbývá
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Abandon button */}
        {!allComplete && (
          <button
            onClick={() => onAbandon(quest.id)}
            className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            title="Vzdát se mise"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Overall progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${overallProgress}%`,
              backgroundColor: allComplete ? "#10b981" : color,
            }}
          />
        </div>
        <span className="text-xs font-bold" style={{ color: allComplete ? "#10b981" : color }}>
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Objectives list */}
      <div className="space-y-1">
        {quest.objectives.map((obj) => (
          <QuestObjectiveRow key={obj.id} objective={obj} />
        ))}
      </div>

      {/* XP Reward */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-bold text-yellow-500">+{quest.xpReward} XP</span>
        </div>
        {allComplete && (
          <button
            onClick={() => onComplete(quest.id)}
            className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-colors"
          >
            Dokončit misi!
          </button>
        )}
      </div>
    </div>
  );
}
