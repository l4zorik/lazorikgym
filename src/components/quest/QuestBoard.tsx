"use client";

import React, { useState, useCallback } from "react";
import { Swords, Plus, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Quest } from "@/types";
import { QuestTemplate } from "@/lib/questTemplates";
import { useXPSystem } from "@/hooks/useXPSystem";
import QuestCard from "./QuestCard";
import QuestStartModal from "./QuestStartModal";
import QuestCompletionCelebration from "./QuestCompletionCelebration";

interface QuestBoardProps {
  activeQuests: Quest[];
  availableTemplates: QuestTemplate[];
  onStartQuest: (template: QuestTemplate) => void;
  onAbandonQuest: (questId: string) => void;
  onCompleteQuest: (questId: string) => number;
}

export default function QuestBoard({
  activeQuests,
  availableTemplates,
  onStartQuest,
  onAbandonQuest,
  onCompleteQuest,
}: QuestBoardProps) {
  const [showStartModal, setShowStartModal] = useState(false);
  const [celebration, setCelebration] = useState<{ title: string; xp: number } | null>(null);
  const { addXP } = useXPSystem();

  const handleComplete = useCallback(
    (questId: string) => {
      const quest = activeQuests.find((q) => q.id === questId);
      if (!quest) return;
      const xp = onCompleteQuest(questId);
      addXP("workout_complete", xp, `Quest dokončen: ${quest.title}`);
      setCelebration({ title: quest.title, xp });
    },
    [activeQuests, onCompleteQuest, addXP]
  );

  const hasQuests = activeQuests.length > 0;
  const hasTemplates = availableTemplates.length > 0;

  // Don't render if no active quests and no templates available
  if (!hasQuests && !hasTemplates) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
              <Swords className="w-6 h-6 text-[#ff6b35]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Mise</h2>
              <p className="text-sm text-gray-500">
                {hasQuests
                  ? `${activeQuests.length} aktivní ${activeQuests.length === 1 ? "mise" : "mise"}`
                  : "Tvé slabé partie potřebují pozornost!"}
              </p>
            </div>
          </div>

          {hasTemplates && (
            <button
              onClick={() => setShowStartModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] text-sm font-bold hover:bg-[#ff6b35]/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nová mise
            </button>
          )}
        </div>

        {/* Active quests */}
        {hasQuests ? (
          <div className="grid md:grid-cols-2 gap-4">
            {activeQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onAbandon={onAbandonQuest}
                onComplete={handleComplete}
              />
            ))}
          </div>
        ) : (
          /* Empty state - prompt to start */
          <button
            onClick={() => setShowStartModal(true)}
            className="w-full p-8 rounded-2xl border border-dashed border-[#ff6b35]/30 bg-[#ff6b35]/5 hover:bg-[#ff6b35]/10 transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b35]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-[#ff6b35]" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-white mb-1">
                  Přijmi svou první misi
                </h3>
                <p className="text-sm text-gray-400">
                  {availableTemplates.length} {availableTemplates.length === 1 ? "mise čeká" : "misí čeká"} na tebe. Zaměř se na slabé partie a získej XP!
                </p>
              </div>
            </div>
          </button>
        )}
      </motion.section>

      {/* Start modal */}
      <QuestStartModal
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
        templates={availableTemplates}
        onStartQuest={onStartQuest}
      />

      {/* Completion celebration */}
      {celebration && (
        <QuestCompletionCelebration
          questTitle={celebration.title}
          xpGained={celebration.xp}
          onClose={() => setCelebration(null)}
        />
      )}
    </>
  );
}
