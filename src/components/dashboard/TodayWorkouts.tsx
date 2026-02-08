"use client";

import { useState, useMemo } from "react";
import { Play, Check, Calendar, Clock, Dumbbell, Target, Flame, Plus, Pencil, Trash2, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScheduledWorkout } from "@/types";
import { bodyPartsData } from "@/lib/data";
import Link from "next/link";

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const workoutTypeIcons: Record<string, { color: string; icon: LucideIcon }> = {
  strength: { color: "#ff6b35", icon: Dumbbell },
  cardio: { color: "#3b82f6", icon: Target },
  flexibility: { color: "#8b5cf6", icon: Clock },
  rest: { color: "#10b981", icon: Clock },
  hiit: { color: "#f59e0b", icon: Flame },
};

const typeLabels: Record<string, string> = {
  strength: "Posilování",
  cardio: "Kardio",
  flexibility: "Flexibilita",
  rest: "Odpočinek",
  hiit: "HIIT",
};

const bodyPartEmoji: Record<string, string> = {
  "Krční páteř": "🦴",
  "Ramena": "🤸",
  "Prsa": "🏋️",
  "Ruce": "💪",
  "Břicho": "🔥",
  "Core": "🎯",
  "Záda": "🔙",
  "Nohy": "🦵",
};

function resolveExercise(exName: string) {
  for (const part of bodyPartsData) {
    const found = part.exercises.find(
      (e) => e.name.toLowerCase() === exName.toLowerCase()
    );
    if (found) {
      return {
        name: found.name,
        bodyPart: part.name,
        emoji: bodyPartEmoji[part.name] || "💪",
        color: part.color,
      };
    }
  }
  return { name: exName, bodyPart: "—", emoji: "💪", color: "#666" };
}

interface TodayWorkoutsProps {
  scheduledWorkouts: ScheduledWorkout[];
  onStartWorkout: (workout: ScheduledWorkout) => void;
  onOpenPlanner: () => void;
  onDeleteWorkout: (id: string) => void;
  onEditWorkout: (workout: ScheduledWorkout) => void;
}

export default function TodayWorkouts({
  scheduledWorkouts,
  onStartWorkout,
  onOpenPlanner,
  onDeleteWorkout,
  onEditWorkout,
}: TodayWorkoutsProps) {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const todayWorkouts = useMemo(
    () => scheduledWorkouts.filter((w) => w.date === today),
    [scheduledWorkouts, today]
  );
  const tomorrowWorkouts = useMemo(
    () => scheduledWorkouts.filter((w) => w.date === tomorrow),
    [scheduledWorkouts, tomorrow]
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDuration, setEditDuration] = useState(60);

  const startEdit = (workout: ScheduledWorkout) => {
    setEditingId(workout.id);
    setEditTitle(workout.title);
    setEditDuration(workout.duration);
  };

  const saveEdit = (workout: ScheduledWorkout) => {
    onEditWorkout({ ...workout, title: editTitle, duration: editDuration });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const renderWorkoutCard = (workout: ScheduledWorkout, i: number) => {
    const typeInfo = workoutTypeIcons[workout.type] || workoutTypeIcons.strength;
    const TypeIcon = typeInfo.icon;
    const isEditing = editingId === workout.id;

    return (
      <motion.div
        key={workout.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className={`p-5 rounded-2xl border transition-all ${
          workout.completed
            ? "bg-white/[0.01] border-white/5 opacity-60"
            : "bg-gradient-to-r from-white/[0.03] to-white/[0.01] border-white/10 hover:border-[#ff6b35]/30"
        }`}
      >
        {isEditing ? (
          /* Edit mode */
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#ff6b35] transition-colors"
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Délka:</label>
              <div className="flex gap-1.5 flex-1">
                {[30, 45, 60, 75, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setEditDuration(d)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      editDuration === d
                        ? "bg-[#ff6b35] text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-xs font-medium hover:bg-white/10 transition-colors"
              >
                Zrušit
              </button>
              <button
                onClick={() => saveEdit(workout)}
                className="px-4 py-2 rounded-lg bg-[#ff6b35] text-white text-xs font-bold hover:bg-[#e55a2b] transition-colors"
              >
                Uložit
              </button>
            </div>
          </div>
        ) : (
          /* Normal view */
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${typeInfo.color}15` }}
            >
              {workout.completed ? (
                <Check className="w-6 h-6 text-emerald-400" />
              ) : (
                <TypeIcon className="w-6 h-6" style={{ color: typeInfo.color }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-base ${workout.completed ? "line-through text-gray-500" : ""}`}>
                {workout.title}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {workout.duration} min
                </span>
                <span>{typeLabels[workout.type] || workout.type}</span>
              </div>
              {workout.exercises && workout.exercises.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {workout.exercises.map((exName, idx) => {
                    const ex = resolveExercise(exName);
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
                        style={{
                          backgroundColor: `${ex.color}12`,
                          color: ex.color,
                        }}
                      >
                        <span>{ex.emoji}</span>
                        {ex.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {!workout.completed && (
                <>
                  <button
                    onClick={() => startEdit(workout)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
                    title="Upravit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteWorkout(workout.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-gray-500 hover:text-red-400"
                    title="Odstranit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onStartWorkout(workout)}
                    className="px-4 py-2.5 rounded-xl bg-[#ff6b35] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#e55a2b] transition-colors ml-1"
                  >
                    <Play className="w-4 h-4" />
                    Zahájit
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* TODAY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Dnešní tréninky
          </h3>
          {todayWorkouts.length > 0 && (
            <span className="text-xs text-gray-600">{todayWorkouts.length} trénink{todayWorkouts.length > 1 ? "y" : ""}</span>
          )}
        </div>

        {todayWorkouts.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-sm text-gray-500 mb-3">Žádný trénink na dnes</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onOpenPlanner}
                className="px-4 py-2 rounded-xl bg-[#ff6b35] text-white text-sm font-medium hover:bg-[#e55a2b] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Naplánovat
              </button>
            </div>
          </div>
        ) : (
          todayWorkouts.map((w, i) => renderWorkoutCard(w, i))
        )}
      </div>

      {/* TOMORROW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Zítra
          </h3>
          <button
            onClick={onOpenPlanner}
            className="text-xs text-[#ff6b35] font-medium hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Přidat
          </button>
        </div>

        {tomorrowWorkouts.length === 0 ? (
          <div className="p-5 rounded-2xl border border-dashed border-white/10 text-center">
            <p className="text-sm text-gray-500 mb-3">Žádný trénink na zítra</p>
            <button
              onClick={onOpenPlanner}
              className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Naplánovat na zítra
            </button>
          </div>
        ) : (
          tomorrowWorkouts.map((w, i) => renderWorkoutCard(w, i))
        )}
      </div>
    </div>
  );
}
