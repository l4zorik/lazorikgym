"use client";

import { useMemo } from "react";
import { Clock, Dumbbell, Target, Flame, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScheduledWorkout } from "@/types";
import { bodyPartsData } from "@/lib/data";

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const workoutTypeConfig: Record<string, { color: string; icon: LucideIcon; label: string; gradient: string }> = {
  strength: { color: "#ff6b35", icon: Dumbbell, label: "Posilování", gradient: "from-[#ff6b35]/20 to-[#e53935]/10" },
  cardio: { color: "#3b82f6", icon: Target, label: "Kardio", gradient: "from-[#3b82f6]/20 to-[#06b6d4]/10" },
  flexibility: { color: "#8b5cf6", icon: Clock, label: "Flexibilita", gradient: "from-[#8b5cf6]/20 to-[#6366f1]/10" },
  rest: { color: "#10b981", icon: Clock, label: "Odpočinek", gradient: "from-[#10b981]/20 to-[#059669]/10" },
  hiit: { color: "#f59e0b", icon: Flame, label: "HIIT", gradient: "from-[#f59e0b]/20 to-[#ef4444]/10" },
};

interface WorkoutHoverPreviewProps {
  workout: ScheduledWorkout;
}

export default function WorkoutHoverPreview({ workout }: WorkoutHoverPreviewProps) {
  const config = workoutTypeConfig[workout.type] || workoutTypeConfig.strength;
  const TypeIcon = config.icon;

  // Resolve exercises to body parts
  const exerciseDetails = useMemo(() => {
    if (!workout.exercises || workout.exercises.length === 0) return [];
    return workout.exercises.map((exName) => {
      for (const part of bodyPartsData) {
        const found = part.exercises.find(
          (e) => e.name.toLowerCase() === exName.toLowerCase()
        );
        if (found) {
          return {
            name: found.name,
            bodyPart: part.name,
            bodyPartColor: part.color,
            equipment: found.equipment,
            difficulty: found.difficulty,
          };
        }
      }
      return { name: exName, bodyPart: "—", bodyPartColor: "#666", equipment: "—", difficulty: "—" as const };
    });
  }, [workout.exercises]);

  // Unique body parts hit
  const bodyPartsHit = useMemo(() => {
    const parts = new Map<string, string>();
    exerciseDetails.forEach((e) => {
      if (e.bodyPart !== "—") parts.set(e.bodyPart, e.bodyPartColor);
    });
    return Array.from(parts.entries());
  }, [exerciseDetails]);

  // Duration visualization
  const durationPercent = Math.min((workout.duration / 90) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute right-0 top-full mt-2 z-50 w-72 pointer-events-none"
    >
      <div className={`rounded-2xl bg-[var(--bg-secondary)] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden`}>
        {/* Header gradient */}
        <div className={`p-4 bg-gradient-to-r ${config.gradient} relative overflow-hidden`}>
          <div className="flex items-center gap-3 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${config.color}30` }}
            >
              <TypeIcon className="w-5 h-5" style={{ color: config.color }} />
            </motion.div>
            <div>
              <p className="font-bold text-sm">{workout.title}</p>
              <p className="text-xs" style={{ color: config.color }}>{config.label}</p>
            </div>
          </div>
          {/* Decorative circle */}
          <div
            className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: config.color }}
          />
        </div>

        <div className="p-4 space-y-4">
          {/* Duration bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-gray-500 uppercase font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Délka
              </span>
              <span className="text-xs font-bold" style={{ color: config.color }}>
                {workout.duration} min
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${durationPercent}%` }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: config.color }}
              />
            </div>
          </div>

          {/* Body parts chips */}
          {bodyPartsHit.length > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold mb-2 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Zapojené partie
              </p>
              <div className="flex flex-wrap gap-1.5">
                {bodyPartsHit.map(([name, color], i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Exercises list */}
          {exerciseDetails.length > 0 && (
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-semibold mb-2 flex items-center gap-1">
                <Dumbbell className="w-3 h-3" /> Cviky ({exerciseDetails.length})
              </p>
              <div className="space-y-1.5">
                {exerciseDetails.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03]"
                  >
                    <div
                      className="w-1.5 h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ex.bodyPartColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{ex.name}</p>
                      <p className="text-[10px] text-gray-600">{ex.equipment}</p>
                    </div>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        backgroundColor: `${ex.bodyPartColor}15`,
                        color: ex.bodyPartColor,
                      }}
                    >
                      {ex.difficulty}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* No exercises fallback */}
          {exerciseDetails.length === 0 && (
            <div className="text-center py-2">
              <p className="text-xs text-gray-500">Žádné cviky specifikované</p>
            </div>
          )}

          {/* Intensity indicator */}
          <div className="flex items-center gap-2 pt-1">
            <p className="text-[10px] text-gray-500 uppercase font-semibold">Intenzita</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => {
                const intensityLevel = workout.intensity === "high" ? 5 : workout.intensity === "medium" ? 3 : workout.duration >= 75 ? 4 : workout.duration >= 45 ? 3 : 2;
                const isActive = level <= intensityLevel;
                return (
                  <motion.div
                    key={level}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3 + level * 0.06 }}
                    className="w-3 rounded-sm origin-bottom"
                    style={{
                      height: `${8 + level * 3}px`,
                      backgroundColor: isActive ? config.color : "rgba(255,255,255,0.05)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
