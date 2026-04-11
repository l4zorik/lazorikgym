"use client";

import { motion } from "framer-motion";
import { DailyChallenge, getDifficultyColor, getTypeIcon, getTimeRemaining } from "@/lib/dailyChallenges";
import { Flame, Trophy, Clock, Zap, Play, CheckCircle, X } from "lucide-react";

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  onStart?: () => void;
  onAddRep?: () => void;
  onComplete?: () => void;
  onAbandon?: () => void;
  compact?: boolean;
}

export default function DailyChallengeCard({
  challenge,
  onStart,
  onAddRep,
  onComplete,
  onAbandon,
  compact = false
}: DailyChallengeCardProps) {
  const difficultyColor = getDifficultyColor(challenge.difficulty);
  const typeIcon = getTypeIcon(challenge.type);
  const timeRemaining = getTimeRemaining(challenge);

  const statusColors = {
    pending: "border-gray-600 bg-gray-900/50",
    active: "border-orange-500 bg-orange-950/30",
    completed: "border-green-500 bg-green-950/30",
    failed: "border-red-500 bg-red-950/30",
    expired: "border-gray-700 bg-gray-900/20 opacity-60"
  };

  const statusLabels = {
    pending: "Čeká na start",
    active: "V průběhu",
    completed: "Dokončeno!",
    failed: "Vzdáno",
    expired: "Vypršelo"
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-3 rounded-xl border ${statusColors[challenge.status]} transition-all`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white truncate">{challenge.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span style={{ color: difficultyColor }}>{challenge.difficulty}</span>
              <span>•</span>
              <span>+{challenge.xpReward} XP</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{challenge.progress}%</div>
            {challenge.status === "active" && onAddRep && (
              <button
                onClick={onAddRep}
                className="text-xs px-2 py-1 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                +1
              </button>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${challenge.progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: difficultyColor }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl border-2 ${statusColors[challenge.status]} overflow-hidden`}
    >
      {/* Header */}
      <div 
        className="p-4"
        style={{ backgroundColor: `${difficultyColor}15` }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${difficultyColor}25` }}
            >
              {typeIcon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${difficultyColor}30`, color: difficultyColor }}
                >
                  {challenge.difficulty.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">
                  {statusLabels[challenge.status]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="font-bold">+{challenge.xpReward} XP</span>
            </div>
            {challenge.bonusXp > 0 && (
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Trophy className="w-3 h-3" />
                <span>+{challenge.bonusXp} bonus</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 bg-black/40">
        <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>

        {/* Exercises */}
        <div className="space-y-2 mb-4">
          {challenge.exercises.map((ex, i) => (
            <div 
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">
                  {i + 1}
                </span>
                <span className="text-sm text-white">{ex.exerciseName}</span>
              </div>
              <span className="text-sm font-semibold text-orange-400">
                {ex.target} {ex.unit}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="font-bold text-white">{challenge.progress}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${challenge.progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: difficultyColor }}
            />
          </div>
        </div>

        {/* Timer & Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
          {challenge.currentReps !== undefined && challenge.currentReps > 0 && (
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>{challenge.currentReps} reps</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {challenge.status === "pending" && onStart && (
            <button
              onClick={onStart}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Play className="w-5 h-5" />
              START VÝZVU
            </button>
          )}
          
          {challenge.status === "active" && (
            <>
              {onAddRep && (
                <button
                  onClick={onAddRep}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Zap className="w-5 h-5" />
                  +1 REP
                </button>
              )}
              {onComplete && (
                <button
                  onClick={onComplete}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <CheckCircle className="w-5 h-5" />
                  DOKONČIT
                </button>
              )}
            </>
          )}

          {(challenge.status === "pending" || challenge.status === "active") && onAbandon && (
            <button
              onClick={onAbandon}
              className="py-3 px-4 rounded-xl bg-white/10 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
