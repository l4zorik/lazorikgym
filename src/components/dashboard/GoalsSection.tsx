"use client";

import { useState } from "react";
import { Target, Plus, Play, X, Star, Trophy, Dumbbell, Clock, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPartGoal, ScheduledWorkout } from "@/types";
import { getPlanById } from "@/lib/goalPlans";
import { bodyPartsData } from "@/lib/data";

const bodyPartEmoji: Record<string, string> = {
  neck: "🦴",
  shoulders: "🤸",
  chest: "🏋️",
  arms: "💪",
  abs: "🔥",
  core: "🎯",
  back: "🔙",
  legs: "🦵",
};

interface GoalsSectionProps {
  goals: BodyPartGoal[];
  canAddGoal: boolean;
  onAddGoal: () => void;
  onRemoveGoal: (goalId: string) => void;
  onStartGoalWorkout: (workout: ScheduledWorkout) => void;
  onRateGoal: (goalId: string, rating: number) => void;
}

export default function GoalsSection({
  goals,
  canAddGoal,
  onAddGoal,
  onRemoveGoal,
  onStartGoalWorkout,
  onRateGoal,
}: GoalsSectionProps) {
  const [confirmAbandon, setConfirmAbandon] = useState<string | null>(null);
  const [ratingGoalId, setRatingGoalId] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStartWorkout = (goal: BodyPartGoal) => {
    const plan = getPlanById(goal.planId);
    if (!plan) return;

    const bodyPart = bodyPartsData.find((p) => p.id === goal.bodyPartId);
    const exerciseNames = plan.exercises
      .map((exId) => bodyPart?.exercises.find((e) => e.id === exId)?.name)
      .filter(Boolean) as string[];

    const workout: ScheduledWorkout = {
      id: `goal-workout-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      title: `${plan.name} - Týden ${goal.weekNumber}`,
      type: "strength",
      duration: plan.estimatedMinutes,
      completed: false,
      exercises: exerciseNames,
    };

    onStartGoalWorkout(workout);
  };

  // Empty state
  if (goals.length === 0) {
    return (
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-[#ff6b35]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Cíle</h2>
            <p className="text-sm text-gray-500">Zaměř se na slabé partie</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-[#ff6b35]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Vyber si partii, se kterou ti pomůžem</h3>
          <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
            Dostaneš na míru plán s přesným postupem krok za krokem. Žádné hádání, co cvičit.
          </p>

          <button
            onClick={onAddGoal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all inline-flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Nastav si cíl
          </button>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto">
            {[
              { icon: Sparkles, label: "Plán na míru" },
              { icon: ChevronRight, label: "Krok za krokem" },
              { icon: Trophy, label: "Viditelné výsledky" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
                  <item.icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // With active goals
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
            <Target className="w-6 h-6 text-[#ff6b35]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Cíle</h2>
            <p className="text-sm text-gray-500">
              {goals.length} aktivní {goals.length === 1 ? "cíl" : goals.length < 5 ? "cíle" : "cílů"}
            </p>
          </div>
        </div>

        {canAddGoal ? (
          <button
            onClick={onAddGoal}
            className="px-4 py-2 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] text-sm font-bold hover:bg-[#ff6b35]/20 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Přidat cíl
          </button>
        ) : (
          <span className="text-xs text-gray-600 px-3 py-1.5 rounded-lg bg-white/5">Maximum 3 cíle</span>
        )}
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {goals.map((goal, i) => {
            const plan = getPlanById(goal.planId);
            const bodyPart = bodyPartsData.find((p) => p.id === goal.bodyPartId);
            if (!plan || !bodyPart) return null;

            const progress = goal.totalWorkoutsNeeded > 0
              ? Math.round((goal.completedWorkouts / goal.totalWorkoutsNeeded) * 100)
              : 0;
            const isCompleted = goal.status === "completed";
            const currentProgressionIndex = Math.min(
              goal.weekNumber - 1,
              plan.weeklyProgression.length - 1
            );
            const currentProgression = plan.weeklyProgression[Math.max(0, currentProgressionIndex)];

            const exerciseNames = plan.exercises
              .map((exId) => bodyPart.exercises.find((e) => e.id === exId))
              .filter(Boolean);

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border overflow-hidden ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500/5 to-green-500/5 border-emerald-500/20"
                    : "bg-white/[0.02] border-white/10 hover:border-[#ff6b35]/20"
                } transition-all`}
              >
                {/* Header */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{ backgroundColor: `${bodyPart.color}10` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{bodyPartEmoji[goal.bodyPartId] || "💪"}</span>
                    <span className="font-bold text-sm">{bodyPart.name}</span>
                    {isCompleted && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        Dokončeno
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-400">
                    Týden {goal.weekNumber} z {Math.ceil(plan.durationWeeks)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-bold text-base mb-1">{plan.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{plan.frequencyPerWeek}x týdně</span>
                      <span className="text-gray-700">|</span>
                      <span>{plan.estimatedMinutes} min</span>
                      <span className="text-gray-700">|</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {plan.rating}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-500">
                        {goal.completedWorkouts} / {goal.totalWorkoutsNeeded} tréninků
                      </span>
                      <span className="text-xs font-bold" style={{ color: bodyPart.color }}>
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: bodyPart.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Current milestone */}
                  {currentProgression && !isCompleted && (
                    <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs text-gray-400">
                        <span className="text-[#ff6b35] font-medium">Aktuální:</span>{" "}
                        {currentProgression}
                      </p>
                    </div>
                  )}

                  {/* Exercise pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exerciseNames.map((ex) => (
                      <span
                        key={ex!.id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
                        style={{
                          backgroundColor: `${bodyPart.color}12`,
                          color: bodyPart.color,
                        }}
                      >
                        {ex!.name}
                      </span>
                    ))}
                  </div>

                  {/* Completed goal - rating */}
                  {isCompleted && !goal.userRating && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                      <p className="text-sm font-bold text-emerald-400 mb-2">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        Gratulujeme k dokončení!
                      </p>
                      <p className="text-xs text-gray-400 mb-3">Ohodnoť tento plán:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => {
                              onRateGoal(goal.id, star);
                              setRatingGoalId(null);
                            }}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= (hoverRating || 0)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {goal.userRating && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>Tvé hodnocení:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= goal.userRating!
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  {!isCompleted && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleStartWorkout(goal)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all"
                      >
                        <Play className="w-4 h-4" />
                        Cvičit teď
                      </button>

                      {confirmAbandon === goal.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              onRemoveGoal(goal.id);
                              setConfirmAbandon(null);
                            }}
                            className="px-3 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors"
                          >
                            Ano, vzdát
                          </button>
                          <button
                            onClick={() => setConfirmAbandon(null)}
                            className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmAbandon(goal.id)}
                          className="px-3 py-2.5 rounded-xl bg-white/5 text-gray-500 text-xs font-medium hover:bg-white/10 hover:text-gray-300 transition-colors"
                        >
                          Vzdát se
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
