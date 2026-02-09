"use client";

import React from "react";
import { Trophy, Clock, Dumbbell, Utensils, Flame, Droplets, Moon, Swords } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { QuestTemplate } from "@/lib/questTemplates";
import { bodyPartsData } from "@/lib/data";

const objectiveTypeIcons: Record<string, React.ElementType> = {
  workout: Dumbbell,
  nutrition: Utensils,
  streak: Flame,
  hydration: Droplets,
  recovery: Moon,
};

interface QuestStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: QuestTemplate[];
  onStartQuest: (template: QuestTemplate) => void;
}

export default function QuestStartModal({
  isOpen,
  onClose,
  templates,
  onStartQuest,
}: QuestStartModalProps) {
  const handleStart = (template: QuestTemplate) => {
    onStartQuest(template);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dostupné mise" size="lg">
      <div className="space-y-6">
        {templates.length === 0 ? (
          <div className="text-center py-8">
            <Swords className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Všechny mise jsou aktivní nebo splněné.</p>
          </div>
        ) : (
          templates.map((template) => {
            const bodyPart = bodyPartsData.find((p) => p.id === template.bodyPartId);
            const color = bodyPart?.color || "#ff6b35";

            return (
              <div
                key={template.id}
                className="p-5 rounded-2xl border border-white/5 hover:border-white/15 transition-all"
                style={{ backgroundColor: `${color}05` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Dumbbell className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{template.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{bodyPart?.name}</span>
                        <span className="text-xs font-medium" style={{ color }}>
                          {bodyPart?.progress}%
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                          {template.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">{template.description}</p>

                {/* Objectives preview */}
                <div className="space-y-2 mb-4">
                  {template.objectives.map((obj, i) => {
                    const Icon = objectiveTypeIcons[obj.type] || Flame;
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>{obj.title}</span>
                        <span className="text-gray-600 ml-auto text-xs">+{obj.xpReward} XP</span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{template.durationDays} dní</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                      <Trophy className="w-3 h-3" />
                      <span>+{template.xpReward} XP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleStart(template)}
                    className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-colors"
                    style={{ backgroundColor: color }}
                  >
                    Přijmout misi
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}
