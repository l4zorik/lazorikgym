"use client";

import { BodyPart } from "@/types";
import { Dumbbell, ChevronRight, Settings } from "lucide-react";

interface BodyPartSlotProps {
  bodyPart: BodyPart;
  onViewPlan: () => void;
  onEditSlot?: () => void;
}

export default function BodyPartSlot({
  bodyPart,
  onViewPlan,
  onEditSlot,
}: BodyPartSlotProps) {
  const isWeak = bodyPart.progress < 45;

  return (
    <div
      className={`
        relative p-4 rounded-2xl bg-white/[0.02] border transition-all cursor-pointer
        ${isWeak
          ? "border-[#ff6b35]/30 hover:border-[#ff6b35]/50"
          : "border-white/5 hover:border-white/10"
        }
      `}
      onClick={onViewPlan}
    >
      {/* Edit button */}
      {onEditSlot && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditSlot();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Upravit slot"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 pr-6">
        <h3 className="font-semibold text-white text-sm">{bodyPart.name}</h3>
        <span className={`text-xs font-bold ${isWeak ? "text-[#ff6b35]" : "text-gray-500"}`}>
          {bodyPart.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isWeak
              ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}
          style={{ width: `${bodyPart.progress}%` }}
        />
      </div>

      {/* Exercise preview */}
      <div className="space-y-2 mb-4">
        {bodyPart.exercises.slice(0, 2).map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center gap-2 text-xs text-gray-500"
          >
            <Dumbbell className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{exercise.name}</span>
          </div>
        ))}
        {bodyPart.exercises.length > 2 && (
          <div className="text-xs text-gray-600">
            +{bodyPart.exercises.length - 2} dalších
          </div>
        )}
      </div>

      {/* Action button */}
      <button
        className="w-full py-2 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#ff6b35]/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onViewPlan();
        }}
      >
        Zobrazit plán
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Weak indicator */}
      {isWeak && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#ff6b35] to-[#e53935] rounded-full" />
      )}
    </div>
  );
}
