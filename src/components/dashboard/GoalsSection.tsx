"use client";

import { useState } from "react";
import { Target, Plus, Play, X, Star, Trophy, Dumbbell, Clock, ChevronRight, Sparkles, BookOpen, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ExtendedGoal, ScheduledWorkout } from "@/types";
import { getPlanById } from "@/lib/goalPlans";
import { bodyPartsData } from "@/lib/data";
import { getMartialArtById } from "@/lib/martialArtsData";
import { getBookById } from "@/lib/booksData";
import { getFacilityById } from "@/lib/facilitiesData";

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
  goals: ExtendedGoal[];
  canAddGoal: boolean;
  onAddGoal: () => void;
  onRemoveGoal: (goalId: string) => void;
  onStartGoalWorkout: (workout: ScheduledWorkout) => void;
  onRateGoal: (goalId: string, rating: number) => void;
  onIncrementWorkout: (goalId: string) => void;
  onUpdateBookProgress: (goalId: string, pagesRead: number) => void;
  onIncrementVisit: (goalId: string) => void;
}

export default function GoalsSection({
  goals,
  canAddGoal,
  onAddGoal,
  onRemoveGoal,
  onStartGoalWorkout,
  onRateGoal,
  onIncrementWorkout,
  onUpdateBookProgress,
  onIncrementVisit,
}: GoalsSectionProps) {
  const [confirmAbandon, setConfirmAbandon] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [bookPagesInput, setBookPagesInput] = useState<Record<string, string>>({});

  const handleStartWorkout = (goal: ExtendedGoal) => {
    if (goal.category === "body_part" || !goal.category) {
      const plan = goal.planId ? getPlanById(goal.planId) : null;
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
    }
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
              {goals.length} aktivní{goals.length === 1 ? " cíl" : goals.length < 5 ? " cíle" : " cílů"}
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
          <span className="text-xs text-gray-600 px-3 py-1.5 rounded-lg bg-white/5">Maximum 5 cílů</span>
        )}
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {goals.map((goal, i) => {
            const category = goal.category || "body_part";
            const isCompleted = goal.status === "completed";

            // Body part goal
            if (category === "body_part") {
              return (
                <BodyPartGoalCard
                  key={goal.id}
                  goal={goal}
                  index={i}
                  isCompleted={isCompleted}
                  confirmAbandon={confirmAbandon}
                  hoverRating={hoverRating}
                  onStartWorkout={() => handleStartWorkout(goal)}
                  onRemoveGoal={onRemoveGoal}
                  onRateGoal={onRateGoal}
                  setConfirmAbandon={setConfirmAbandon}
                  setHoverRating={setHoverRating}
                />
              );
            }

            // Martial art goal
            if (category === "martial_art") {
              return (
                <MartialArtGoalCard
                  key={goal.id}
                  goal={goal}
                  index={i}
                  isCompleted={isCompleted}
                  confirmAbandon={confirmAbandon}
                  hoverRating={hoverRating}
                  onIncrementWorkout={onIncrementWorkout}
                  onRemoveGoal={onRemoveGoal}
                  onRateGoal={onRateGoal}
                  setConfirmAbandon={setConfirmAbandon}
                  setHoverRating={setHoverRating}
                />
              );
            }

            // Book goal
            if (category === "book") {
              return (
                <BookGoalCard
                  key={goal.id}
                  goal={goal}
                  index={i}
                  isCompleted={isCompleted}
                  confirmAbandon={confirmAbandon}
                  hoverRating={hoverRating}
                  bookPagesInput={bookPagesInput}
                  onUpdateBookProgress={onUpdateBookProgress}
                  onRemoveGoal={onRemoveGoal}
                  onRateGoal={onRateGoal}
                  setConfirmAbandon={setConfirmAbandon}
                  setHoverRating={setHoverRating}
                  setBookPagesInput={setBookPagesInput}
                />
              );
            }

            // Facility goal
            if (category === "facility") {
              return (
                <FacilityGoalCard
                  key={goal.id}
                  goal={goal}
                  index={i}
                  isCompleted={isCompleted}
                  confirmAbandon={confirmAbandon}
                  hoverRating={hoverRating}
                  onIncrementVisit={onIncrementVisit}
                  onRemoveGoal={onRemoveGoal}
                  onRateGoal={onRateGoal}
                  setConfirmAbandon={setConfirmAbandon}
                  setHoverRating={setHoverRating}
                />
              );
            }

            return null;
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ==================== Body Part Goal Card ====================
function BodyPartGoalCard({
  goal, index, isCompleted, confirmAbandon, hoverRating,
  onStartWorkout, onRemoveGoal, onRateGoal, setConfirmAbandon, setHoverRating,
}: {
  goal: ExtendedGoal; index: number; isCompleted: boolean;
  confirmAbandon: string | null; hoverRating: number;
  onStartWorkout: () => void;
  onRemoveGoal: (id: string) => void; onRateGoal: (id: string, r: number) => void;
  setConfirmAbandon: (v: string | null) => void; setHoverRating: (v: number) => void;
}) {
  const plan = goal.planId ? getPlanById(goal.planId) : null;
  const bodyPart = bodyPartsData.find((p) => p.id === goal.bodyPartId);
  if (!plan || !bodyPart) return null;

  const progress = (goal.totalWorkoutsNeeded ?? 0) > 0
    ? Math.round(((goal.completedWorkouts ?? 0) / (goal.totalWorkoutsNeeded ?? 1)) * 100)
    : 0;
  const currentProgressionIndex = Math.min(
    (goal.weekNumber ?? 1) - 1,
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
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border overflow-hidden ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-500/5 to-green-500/5 border-emerald-500/20"
          : "bg-white/[0.02] border-white/10 hover:border-[#ff6b35]/20"
      } transition-all`}
    >
      <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: `${bodyPart.color}10` }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{bodyPartEmoji[goal.bodyPartId!] || "💪"}</span>
          <span className="font-bold text-sm">{bodyPart.name}</span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Dokončeno</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400">
          Týden {goal.weekNumber} z {Math.ceil(plan.durationWeeks)}
        </span>
      </div>

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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{goal.completedWorkouts} / {goal.totalWorkoutsNeeded} tréninků</span>
            <span className="text-xs font-bold" style={{ color: bodyPart.color }}>{progress}%</span>
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

        {currentProgression && !isCompleted && (
          <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-xs text-gray-400">
              <span className="text-[#ff6b35] font-medium">Aktuální:</span> {currentProgression}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {exerciseNames.map((ex) => (
            <span
              key={ex!.id}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
              style={{ backgroundColor: `${bodyPart.color}12`, color: bodyPart.color }}
            >
              {ex!.name}
            </span>
          ))}
        </div>

        <CompletedRating goal={goal} isCompleted={isCompleted} onRateGoal={onRateGoal} hoverRating={hoverRating} setHoverRating={setHoverRating} />

        {!isCompleted && (
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onStartWorkout}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all"
            >
              <Play className="w-4 h-4" />
              Cvičit teď
            </button>
            <AbandonButton goalId={goal.id} confirmAbandon={confirmAbandon} onRemoveGoal={onRemoveGoal} setConfirmAbandon={setConfirmAbandon} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== Martial Art Goal Card ====================
function MartialArtGoalCard({
  goal, index, isCompleted, confirmAbandon, hoverRating,
  onIncrementWorkout, onRemoveGoal, onRateGoal, setConfirmAbandon, setHoverRating,
}: {
  goal: ExtendedGoal; index: number; isCompleted: boolean;
  confirmAbandon: string | null; hoverRating: number;
  onIncrementWorkout: (id: string) => void;
  onRemoveGoal: (id: string) => void; onRateGoal: (id: string, r: number) => void;
  setConfirmAbandon: (v: string | null) => void; setHoverRating: (v: number) => void;
}) {
  const ma = goal.martialArtId ? getMartialArtById(goal.martialArtId) : null;
  if (!ma) return null;

  const progress = (goal.totalWorkoutsNeeded ?? 0) > 0
    ? Math.round(((goal.completedWorkouts ?? 0) / (goal.totalWorkoutsNeeded ?? 1)) * 100)
    : 0;

  return (
    <motion.div
      key={goal.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border overflow-hidden ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-500/5 to-green-500/5 border-emerald-500/20"
          : "bg-white/[0.02] border-white/10 hover:border-white/20"
      } transition-all`}
    >
      <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: `${ma.color}10` }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{ma.emoji}</span>
          <span className="font-bold text-sm">{ma.name}</span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Dokončeno</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400">
          {ma.durationWeeks} týdnů • {ma.frequencyPerWeek}x/týd.
        </span>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-gray-400">{ma.description}</p>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{goal.completedWorkouts ?? 0} / {goal.totalWorkoutsNeeded ?? 0} tréninků</span>
            <span className="text-xs font-bold" style={{ color: ma.color }}>{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: ma.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ma.techniques.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-1 rounded-lg text-[11px] font-medium"
              style={{ backgroundColor: `${ma.color}12`, color: ma.color }}
            >
              {tech.split("(")[0].trim()}
            </span>
          ))}
          {ma.techniques.length > 4 && (
            <span className="px-2 py-1 rounded-lg text-[11px] text-gray-500 bg-white/5">
              +{ma.techniques.length - 4} dalších
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ma.benefits.slice(0, 3).map((b) => (
            <span key={b} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-gray-400">{b}</span>
          ))}
        </div>

        <CompletedRating goal={goal} isCompleted={isCompleted} onRateGoal={onRateGoal} hoverRating={hoverRating} setHoverRating={setHoverRating} />

        {!isCompleted && (
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onIncrementWorkout(goal.id)}
              className="flex-1 px-4 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${ma.color}, ${ma.color}cc)` }}
            >
              <Dumbbell className="w-4 h-4" />
              Zaznamenat trénink
            </button>
            <AbandonButton goalId={goal.id} confirmAbandon={confirmAbandon} onRemoveGoal={onRemoveGoal} setConfirmAbandon={setConfirmAbandon} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== Book Goal Card ====================
function BookGoalCard({
  goal, index, isCompleted, confirmAbandon, hoverRating, bookPagesInput,
  onUpdateBookProgress, onRemoveGoal, onRateGoal, setConfirmAbandon, setHoverRating, setBookPagesInput,
}: {
  goal: ExtendedGoal; index: number; isCompleted: boolean;
  confirmAbandon: string | null; hoverRating: number; bookPagesInput: Record<string, string>;
  onUpdateBookProgress: (id: string, pages: number) => void;
  onRemoveGoal: (id: string) => void; onRateGoal: (id: string, r: number) => void;
  setConfirmAbandon: (v: string | null) => void; setHoverRating: (v: number) => void;
  setBookPagesInput: (v: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
}) {
  const book = goal.bookId ? getBookById(goal.bookId) : null;
  if (!book) return null;

  const pagesRead = goal.pagesRead ?? 0;
  const totalPages = goal.totalPages ?? book.pages;
  const progress = totalPages > 0 ? Math.round((pagesRead / totalPages) * 100) : 0;

  const handleAddPages = () => {
    const input = bookPagesInput[goal.id];
    if (!input) return;
    const add = parseInt(input, 10);
    if (isNaN(add) || add <= 0) return;
    onUpdateBookProgress(goal.id, pagesRead + add);
    setBookPagesInput((prev: Record<string, string>) => ({ ...prev, [goal.id]: "" }));
  };

  return (
    <motion.div
      key={goal.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border overflow-hidden ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-500/5 to-green-500/5 border-emerald-500/20"
          : "bg-white/[0.02] border-white/10 hover:border-[#8b5cf6]/20"
      } transition-all`}
    >
      <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: "#8b5cf610" }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{book.emoji}</span>
          <span className="font-bold text-sm">{book.title}</span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Přečteno</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400">
          <BookOpen className="w-3 h-3 inline mr-1" />
          {book.author}
        </span>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-gray-400">{book.description}</p>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{pagesRead} / {totalPages} stran</span>
            <span className="text-xs font-bold text-[#8b5cf6]">{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] font-medium">{tag}</span>
          ))}
        </div>

        <CompletedRating goal={goal} isCompleted={isCompleted} onRateGoal={onRateGoal} hoverRating={hoverRating} setHoverRating={setHoverRating} />

        {!isCompleted && (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="number"
              placeholder="Stran..."
              min="1"
              value={bookPagesInput[goal.id] || ""}
              onChange={(e) => setBookPagesInput((prev: Record<string, string>) => ({ ...prev, [goal.id]: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleAddPages()}
              className="w-20 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#8b5cf6]/50"
            />
            <button
              onClick={handleAddPages}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#8b5cf6]/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Přidat stránky
            </button>
            <AbandonButton goalId={goal.id} confirmAbandon={confirmAbandon} onRemoveGoal={onRemoveGoal} setConfirmAbandon={setConfirmAbandon} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== Facility Goal Card ====================
function FacilityGoalCard({
  goal, index, isCompleted, confirmAbandon, hoverRating,
  onIncrementVisit, onRemoveGoal, onRateGoal, setConfirmAbandon, setHoverRating,
}: {
  goal: ExtendedGoal; index: number; isCompleted: boolean;
  confirmAbandon: string | null; hoverRating: number;
  onIncrementVisit: (id: string) => void;
  onRemoveGoal: (id: string) => void; onRateGoal: (id: string, r: number) => void;
  setConfirmAbandon: (v: string | null) => void; setHoverRating: (v: number) => void;
}) {
  const facility = goal.facilityId ? getFacilityById(goal.facilityId) : null;
  if (!facility) return null;

  const visits = goal.visitCount ?? 0;
  const target = goal.targetVisits ?? facility.recommendedVisits;
  const progress = target > 0 ? Math.round((visits / target) * 100) : 0;

  return (
    <motion.div
      key={goal.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border overflow-hidden ${
        isCompleted
          ? "bg-gradient-to-r from-emerald-500/5 to-green-500/5 border-emerald-500/20"
          : "bg-white/[0.02] border-white/10 hover:border-white/20"
      } transition-all`}
    >
      <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: `${facility.color}10` }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{facility.emoji}</span>
          <span className="font-bold text-sm">{facility.name}</span>
          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Splněno</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400">
          <MapPin className="w-3 h-3 inline mr-1" />
          {facility.visitUnit}
        </span>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-gray-400">{facility.description}</p>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-500">{visits} / {target} {facility.visitUnit}</span>
            <span className="text-xs font-bold" style={{ color: facility.color }}>{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: facility.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {facility.benefits.map((b) => (
            <span key={b} className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: `${facility.color}12`, color: facility.color }}>
              {b}
            </span>
          ))}
        </div>

        <CompletedRating goal={goal} isCompleted={isCompleted} onRateGoal={onRateGoal} hoverRating={hoverRating} setHoverRating={setHoverRating} />

        {!isCompleted && (
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onIncrementVisit(goal.id)}
              className="flex-1 px-4 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${facility.color}, ${facility.color}cc)` }}
            >
              <MapPin className="w-4 h-4" />
              Zaznamenat návštěvu
            </button>
            <AbandonButton goalId={goal.id} confirmAbandon={confirmAbandon} onRemoveGoal={onRemoveGoal} setConfirmAbandon={setConfirmAbandon} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== Shared Components ====================

function CompletedRating({
  goal, isCompleted, onRateGoal, hoverRating, setHoverRating,
}: {
  goal: ExtendedGoal; isCompleted: boolean;
  onRateGoal: (id: string, r: number) => void;
  hoverRating: number; setHoverRating: (v: number) => void;
}) {
  if (isCompleted && !goal.userRating) {
    return (
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
        <p className="text-sm font-bold text-emerald-400 mb-2">
          <Trophy className="w-4 h-4 inline mr-1" />
          Gratulujeme k dokončení!
        </p>
        <p className="text-xs text-gray-400 mb-3">Ohodnoť tento cíl:</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => onRateGoal(goal.id, star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star className={`w-6 h-6 ${star <= (hoverRating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (goal.userRating) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <span>Tvé hodnocení:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-3 h-3 ${star <= goal.userRating! ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} />
        ))}
      </div>
    );
  }

  return null;
}

function AbandonButton({
  goalId, confirmAbandon, onRemoveGoal, setConfirmAbandon,
}: {
  goalId: string; confirmAbandon: string | null;
  onRemoveGoal: (id: string) => void; setConfirmAbandon: (v: string | null) => void;
}) {
  if (confirmAbandon === goalId) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => { onRemoveGoal(goalId); setConfirmAbandon(null); }}
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
    );
  }

  return (
    <button
      onClick={() => setConfirmAbandon(goalId)}
      className="px-3 py-2.5 rounded-xl bg-white/5 text-gray-500 text-xs font-medium hover:bg-white/10 hover:text-gray-300 transition-colors"
    >
      Vzdát se
    </button>
  );
}
