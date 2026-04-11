"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import DailyChallengeCard from "./DailyChallengeCard";
import { DailyChallenge, getDifficultyColor, getTypeIcon } from "@/lib/dailyChallenges";
import { Sparkles, Zap, Shuffle, ChevronDown, ChevronUp, Flame, Trophy } from "lucide-react";

interface DailyChallengeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParts: string[];
  partNames: string[];
  onChallengeStart?: (challenge: DailyChallenge) => void;
  onGenerate: (partIds: string[]) => DailyChallenge[];
}

export default function DailyChallengeGenerator({
  isOpen,
  onClose,
  selectedParts,
  partNames,
  onChallengeStart,
  onGenerate
}: DailyChallengeGeneratorProps) {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [totalXp, setTotalXp] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    const newChallenges = onGenerate(selectedParts);
    setChallenges(newChallenges);
    setTotalXp(newChallenges.reduce((sum, c) => sum + c.xpReward + c.bonusXp, 0));
    setHasGenerated(true);
  };

  const handleStartChallenge = (challenge: DailyChallenge) => {
    onChallengeStart?.(challenge);
  };

  const displayedChallenges = showAll ? challenges : challenges.slice(0, 1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Denní Výzvy" size="lg">
      <div className="space-y-6">
        {/* Header info */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Vygeneruj si výzvu!</h3>
              <p className="text-sm text-gray-400">Pro partie: {partNames.join(", ")}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            Každá výzva je unikátní a přizpůsobená tvému výběru. Dokonči je všechny pro bonusové XP!
          </p>
        </div>

        {!hasGenerated ? (
          /* Generate button */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <button
              onClick={handleGenerate}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 animate-pulse-slow"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-3">
                <Shuffle className="w-6 h-6" />
                GENERUJ VÝZVY
              </div>
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Získej 3 unikátní výzvy přizpůsobené tvým partiím
            </p>
          </motion.div>
        ) : (
          /* Generated challenges */
          <div className="space-y-4">
            {/* Total XP banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-950/50 to-orange-950/50 border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Potenciální odměny</p>
                    <p className="text-2xl font-bold text-yellow-400">+{totalXp} XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{challenges.length} výzev</p>
                  <p className="text-sm text-orange-400">
                    {challenges.filter(c => c.difficulty === "extreme").length}x Extreme
                  </p>
                </div>
              </div>
            </div>

            {/* Challenge list */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {displayedChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DailyChallengeCard
                      challenge={challenge}
                      onStart={() => handleStartChallenge(challenge)}
                      onAddRep={() => {}}
                      onComplete={() => {}}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show more/less */}
            {challenges.length > 1 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-5 h-5" />
                    Zobrazit méně
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5" />
                    Zobrazit všechny ({challenges.length - 1} dalších)
                  </>
                )}
              </button>
            )}

            {/* Re-generate */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleGenerate}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Přegenerovat
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Jdu na to!
              </button>
            </div>
          </div>
        )}

        {/* Difficulty legend */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          {(["easy", "medium", "hard", "extreme"] as const).map(diff => (
            <div key={diff} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getDifficultyColor(diff) }}
              />
              <span className="text-xs text-gray-500 capitalize">{diff}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
