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
        premium-body-card relative p-4 group cursor-pointer
        ${isWeak ? "glow-weak-pulse" : ""}
      `}
      onClick={onViewPlan}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      style={{
        borderColor: isWeak ? 'rgba(255, 107, 53, 0.3)' : undefined,
      }}
    >
      {/* Edit button */}
      {onEditSlot && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditSlot();
          }}
          className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Upravit slot"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3 pr-6">
        <h3 className="font-semibold text-white text-sm group-hover:text-[#ff6b35] transition-colors duration-300">
          {bodyPart.name}
        </h3>
        <span className={`text-xs font-bold transition-all duration-300 ${
          isWeak
            ? "text-[#ff6b35] group-hover:scale-110"
            : "text-gray-500 group-hover:text-emerald-400"
        }`}>
          {bodyPart.progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out progress-animated ${
            isWeak
              ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}
          style={{ width: `${bodyPart.progress}%` }}
        />
      </div>

      {/* Exercise preview with stagger effect */}
      <div className="space-y-2 mb-4">
        {bodyPart.exercises.slice(0, 2).map((exercise, index) => (
          <div
            key={exercise.id}
            className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-300 transition-all duration-300"
            style={{
              transitionDelay: `${index * 50}ms`,
              transform: 'translateX(0)',
            }}
          >
            <Dumbbell className="w-3 h-3 flex-shrink-0 group-hover:text-[#ff6b35] transition-colors duration-300" />
            <span className="truncate">{exercise.name}</span>
          </div>
        ))}
        {bodyPart.exercises.length > 2 && (
          <div className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
            +{bodyPart.exercises.length - 2} dalších
          </div>
        )}
      </div>

      {/* Action button */}
      <button
        className="w-full py-2.5 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#ff6b35]/20 transition-all duration-300 group-hover:scale-[1.02]"
        onClick={(e) => {
          e.stopPropagation();
          onViewPlan();
        }}
      >
        Zobrazit plán
        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* Weak indicator with pulse */}
      {isWeak && (
        <div className="absolute -top-1.5 -right-1.5">
          <div className="w-4 h-4 bg-gradient-to-r from-[#ff6b35] to-[#e53935] rounded-full animate-pulse-glow" />
          <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-[#ff6b35] to-[#e53935] rounded-full animate-ping opacity-75" />
        </div>
      )}

      {/* Bottom gradient line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
