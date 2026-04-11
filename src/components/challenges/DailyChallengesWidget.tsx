"use client";

import { motion } from "framer-motion";
import { useDailyChallenges } from "@/hooks/useDailyChallenges";
import DailyChallengeCard from "./DailyChallengeCard";
import { Flame, Trophy, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DailyChallengesWidget() {
  const { activeChallenges, completedChallenges, stats, startChallenge, addReps, completeChallenge, failChallenge } = useDailyChallenges();

  const activeCount = activeChallenges.length;
  const completedToday = completedChallenges.filter(c => {
    if (!c.completedAt) return false;
    const today = new Date().toDateString();
    return new Date(c.completedAt).toDateString() === today;
  }).length;

  if (activeCount === 0 && completedToday === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-orange-950/30 to-red-950/30 border border-orange-500/20 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Denní Výzvy</h3>
              <p className="text-xs text-gray-400">Nový způsob jak růst!</p>
            </div>
          </div>
        </div>
        
        <div className="text-center py-6">
          <div className="text-4xl mb-3">
            <Sparkles className="w-12 h-12 mx-auto text-orange-400 opacity-50" />
          </div>
          <p className="text-gray-400 text-sm mb-2">Zatím žádné výzvy</p>
          <p className="text-xs text-gray-500">
            Vyber si partie a nech si vygenerovat unikátní denní výzvu!
          </p>
        </div>

        <Link 
          href="/dashboard"
          className="block mt-2 py-2 px-4 rounded-xl bg-white/5 text-orange-400 text-sm font-semibold text-center hover:bg-orange-500/10 transition-colors"
        >
          Najít výzvu →
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-orange-950/30 to-red-950/30 border border-orange-500/20 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Denní Výzvy</h3>
            <p className="text-xs text-gray-400">
              {activeCount > 0 ? `${activeCount} aktivních` : "Dokončeno!"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {stats.totalXp > 0 && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-bold">{stats.totalXp} XP</span>
            </div>
          )}
          <Link 
            href="/dashboard"
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 ? (
        <div className="space-y-3">
          {activeChallenges.slice(0, 2).map(challenge => (
            <DailyChallengeCard
              key={challenge.id}
              challenge={challenge}
              compact
              onStart={() => startChallenge(challenge.id)}
              onAddRep={() => addReps(challenge.id)}
              onComplete={() => completeChallenge(challenge.id)}
              onAbandon={() => failChallenge(challenge.id)}
            />
          ))}
          
          {activeChallenges.length > 2 && (
            <Link 
              href="/dashboard"
              className="block py-2 text-center text-sm text-orange-400 hover:text-orange-300"
            >
              +{activeChallenges.length - 2} dalších výzev
            </Link>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">
            <Trophy className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-white font-semibold">Všechny výzvy splněny!</p>
          <p className="text-xs text-gray-500 mt-1">
            Zítra budou čekat nové výzvy
          </p>
        </div>
      )}

      {/* Today's summary */}
      {completedToday > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Dnes dokončeno</span>
            <span className="text-green-400 font-semibold">
              {completedToday} výzev
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
