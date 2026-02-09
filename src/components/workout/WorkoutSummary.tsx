"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  Trophy,
  Clock,
  Zap,
  Target,
  ChevronRight,
  Calendar,
  Star,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useWorkoutPostProcess } from "@/hooks/useWorkoutPostProcess";
import { useXPSystem, LEVELS } from "@/hooks/useXPSystem";

interface ExerciseNote {
  exercise: string;
  notes: string;
}

interface WorkoutSummaryProps {
  workoutTitle: string;
  duration: number;
  exercises: string[];
  calories?: number;
  intensity?: "low" | "medium" | "high";
  averageRPE?: number;
  exerciseNotes?: ExerciseNote[];
}

const RPE_LABELS: Record<number, string> = {
  1: "Odpočinek", 2: "Velmi lehké", 3: "Lehké", 4: "Mírné",
  5: "Střední", 6: "Náročné", 7: "Těžké", 8: "Velmi těžké",
  9: "Extrém", 10: "Maximum",
};

export default function WorkoutSummary({
  workoutTitle,
  duration,
  exercises,
  calories,
  intensity = "medium",
  averageRPE,
  exerciseNotes,
}: WorkoutSummaryProps) {
  const router = useRouter();
  const { updatePlanProgress, currentStreak, getNextScheduledWorkout } = useWorkoutPostProcess();
  const { xpProfile, getXPToNextLevel } = useXPSystem();

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpBefore] = useState(xpProfile.totalXP);
  const [levelBefore] = useState(xpProfile.currentLevel);

  const nextWorkout = getNextScheduledWorkout();

  const handleComplete = () => {
    updatePlanProgress({
      workoutId: `workout-${Date.now()}`,
      workoutTitle,
      duration,
      exercises,
      calories,
      intensity,
      averageRPE,
    });

    // Check for level up after XP is awarded
    setTimeout(() => {
      if (xpProfile.currentLevel > levelBefore) {
        setShowLevelUp(true);
      }
    }, 500);

    router.push("/dashboard/treninkove-plany");
  };

  const handleViewSchedule = () => {
    updatePlanProgress({
      workoutId: `workout-${Date.now()}`,
      workoutTitle,
      duration,
      exercises,
      calories,
      intensity,
      averageRPE,
    });
    router.push("/dashboard/calendar");
  };

  const xpGained = 100 + (currentStreak > 1 ? Math.min(currentStreak, 7) * 50 : 0);
  const progress = getXPToNextLevel(xpProfile.totalXP);

  const intensityColors = {
    low: { bg: "from-green-500/20", text: "text-green-400" },
    medium: { bg: "from-orange-500/20", text: "text-orange-400" },
    high: { bg: "from-red-500/20", text: "text-red-400" },
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-2xl shadow-[#10b981]/40"
          >
            <CheckCircle2 className="w-14 h-14 text-white" />
          </motion.div>

          <div>
            <h1 className="text-3xl font-black">Skvělá práce!</h1>
            <p className="text-gray-400 mt-2">Trénink dokončen</p>
          </div>
        </motion.div>

        {/* XP Gained Banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-[#f59e0b]/10 to-[#ff6b35]/10 border border-[#f59e0b]/20"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Získáno XP</p>
                <p className="text-2xl font-black text-[#f59e0b]">+{xpGained}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Level {xpProfile.currentLevel}</p>
              <p className="text-sm font-bold text-[#f59e0b]">{xpProfile.levelName}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Celkem: {xpProfile.totalXP} XP</span>
              <span>{progress.percentage}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ff6b35]"
                initial={{ width: 0 }}
                animate={{ width: `${progress.percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#ff6b35]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Trvání</p>
                <p className="text-xl font-bold">{duration} minut</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Intenzita</p>
                <p className={`text-xl font-bold ${intensityColors[intensity].text}`}>
                  {intensity === "low" ? "Nízká" : intensity === "medium" ? "Střední" : "Vysoká"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#10b981]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-bold">Cviky</p>
              <p className="text-xl font-bold">{exercises.length} cviků</p>
            </div>
          </div>

          {calories && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Spáleno</p>
                <p className="text-xl font-bold">~{calories} kcal</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Average RPE */}
        {averageRPE && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="p-5 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-5 h-5 text-[#f59e0b]" />
              <h3 className="font-bold">Průměrné RPE</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-[#f59e0b]">{averageRPE.toFixed(1)}</div>
              <div>
                <p className="text-sm text-gray-400">{RPE_LABELS[Math.round(averageRPE)] || "Střední"}</p>
                <div className="h-2 w-32 bg-white/5 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#ef4444]"
                    style={{ width: `${averageRPE * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Exercise Notes */}
        {exerciseNotes && exerciseNotes.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-3xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-[#8b5cf6]" />
              <h3 className="font-bold">Poznámky ke cvikům</h3>
            </div>
            <div className="space-y-2">
              {exerciseNotes.map((note, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02]">
                  <p className="text-xs font-bold text-[#8b5cf6] mb-1">{note.exercise}</p>
                  <p className="text-sm text-gray-400">{note.notes}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Streak */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="p-6 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <h3 className="font-bold text-lg">Aktuální streak</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={(currentStreak % 7) / 7 * 100} variant="warning" size="lg" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-orange-400">{currentStreak}</p>
              <p className="text-xs text-gray-500">dní</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {currentStreak >= 7
              ? "Neuvěřitelné! Celý týden v řadě!"
              : currentStreak >= 3
              ? "Skvělá konzistence! Pokračuj!"
              : "Buduj si momentum..."}
          </p>
        </motion.div>

        {/* Next Workout */}
        {nextWorkout && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#6366f1]/10 border border-[#8b5cf6]/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-[#8b5cf6]" />
              <h3 className="font-bold text-lg">Další trénink</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{nextWorkout.title}</p>
                <p className="text-sm text-gray-400">
                  {new Date(nextWorkout.date).toLocaleDateString('cs-CZ', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
              <button
                onClick={handleViewSchedule}
                className="p-3 rounded-xl bg-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            onClick={handleComplete}
            className="w-full h-14 text-lg rounded-2xl bg-[#ff6b35] hover:bg-[#ff6b35]/90"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Zobrazit pokrok plánu
          </Button>

          <Button
            variant="outline"
            onClick={handleViewSchedule}
            className="w-full h-14 text-lg rounded-2xl border-white/10"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Zobrazit kalendář
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            Zpět na dashboard
          </button>
        </motion.div>
      </div>

      {/* Level Up Celebration */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center space-y-6 p-8"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#f59e0b] to-[#ff6b35] flex items-center justify-center shadow-2xl shadow-[#f59e0b]/40"
              >
                <TrendingUp className="w-12 h-12 text-white" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-black text-[#f59e0b]">LEVEL UP!</h2>
                <p className="text-xl text-gray-300 mt-2">
                  Level {xpProfile.currentLevel}: {xpProfile.levelName}
                </p>
              </div>
              <p className="text-gray-500">Klikni pro pokračování</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
