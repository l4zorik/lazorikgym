"use client";

import { useState, useEffect } from "react";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import Modal from "@/components/ui/Modal";
import {
  Check,
  Target,
  Zap,
  Dumbbell,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface BodyPartSlotSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPartIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

// Predefined templates
const templates = [
  {
    id: "push",
    name: "Push Day",
    description: "Hrudník, Ramena, Triceps",
    icon: "💪",
    color: "#ff6b35",
    parts: ["chest", "shoulders", "arms"],
  },
  {
    id: "pull",
    name: "Pull Day",
    description: "Záda, Biceps, Core",
    icon: "🏋️",
    color: "#3b82f6",
    parts: ["back", "arms", "core"],
  },
  {
    id: "legs",
    name: "Leg Day",
    description: "Nohy, Core, Záda",
    icon: "🦵",
    color: "#10b981",
    parts: ["legs", "core", "back"],
  },
  {
    id: "upper",
    name: "Upper Body",
    description: "Horní polovina těla",
    icon: "👆",
    color: "#8b5cf6",
    parts: ["chest", "back", "shoulders", "arms", "neck"],
  },
  {
    id: "lower",
    name: "Lower Body",
    description: "Dolní polovina těla",
    icon: "👇",
    color: "#ec4899",
    parts: ["legs", "core", "abs"],
  },
  {
    id: "fullbody",
    name: "Full Body",
    description: "Celé tělo rovnoměrně",
    icon: "🔥",
    color: "#f59e0b",
    parts: ["chest", "back", "legs", "shoulders", "core"],
  },
  {
    id: "weak",
    name: "Slabé partie",
    description: "Zaměření na nejslabší",
    icon: "🎯",
    color: "#ef4444",
    parts: [], // Will be computed dynamically
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Vyváženě všechny partie",
    icon: "⚖️",
    color: "#06b6d4",
    parts: ["chest", "back", "shoulders", "legs", "abs"],
  },
];

type TabType = "templates" | "custom";

export default function BodyPartSlotSelector({
  isOpen,
  onClose,
  selectedPartIds,
  onSelectionChange,
}: BodyPartSlotSelectorProps) {
  const [tempSelection, setTempSelection] = useState<string[]>(selectedPartIds);
  const [activeTab, setActiveTab] = useState<TabType>("templates");

  // Reset temp selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelection(selectedPartIds);
    }
  }, [isOpen, selectedPartIds]);

  const togglePart = (partId: string) => {
    setTempSelection((prev) => {
      if (prev.includes(partId)) {
        return prev.filter((id) => id !== partId);
      } else {
        if (prev.length < 5) {
          return [...prev, partId];
        }
        return prev;
      }
    });
  };

  const applyTemplate = (template: typeof templates[0]) => {
    let parts = template.parts;

    // For "weak" template, get actual weak parts
    if (template.id === "weak") {
      const weakParts = getWeakBodyParts();
      parts = weakParts.slice(0, 5).map(p => p.id);
    }

    // Limit to 5 parts
    setTempSelection(parts.slice(0, 5));
  };

  const movePartUp = (index: number) => {
    if (index === 0) return;
    setTempSelection((prev) => {
      const newArr = [...prev];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return newArr;
    });
  };

  const movePartDown = (index: number) => {
    if (index === tempSelection.length - 1) return;
    setTempSelection((prev) => {
      const newArr = [...prev];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      return newArr;
    });
  };

  const removePart = (partId: string) => {
    setTempSelection((prev) => prev.filter((id) => id !== partId));
  };

  const handleSave = () => {
    onSelectionChange(tempSelection);
    onClose();
  };

  const canSave = tempSelection.length >= 1 && tempSelection.length <= 5;

  // Get body part data by ID
  const getPartById = (id: string) => bodyPartsData.find((p) => p.id === id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vyber svoje partie" size="lg">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
          <button
            onClick={() => setActiveTab("templates")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "templates"
                ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Šablony
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "custom"
                ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Vlastní výběr
          </button>
        </div>

        {/* Current Selection Preview */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-400">Aktuální výběr</span>
            <span className="text-xs text-[#ff6b35] font-bold">{tempSelection.length}/5 partií</span>
          </div>

          {tempSelection.length > 0 ? (
            <div className="space-y-2">
              {tempSelection.map((partId, index) => {
                const part = getPartById(partId);
                if (!part) return null;

                return (
                  <div
                    key={partId}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white/5 group"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium">{part.name}</span>
                    <span className="text-xs text-gray-500">{part.progress}%</span>

                    {/* Reorder buttons */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => movePartUp(index)}
                        disabled={index === 0}
                        className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => movePartDown(index)}
                        disabled={index === tempSelection.length - 1}
                        className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removePart(partId)}
                        className="p-1 rounded hover:bg-red-500/20 text-red-400"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Vyber šablonu nebo vlastní partie
            </p>
          )}
        </div>

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => {
              const isActive =
                template.parts.length > 0 &&
                template.parts.slice(0, 5).every((p) => tempSelection.includes(p)) &&
                tempSelection.every((p) => template.parts.includes(p));

              return (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`
                    p-4 rounded-xl border-2 transition-all text-left group
                    ${isActive
                      ? "border-[#ff6b35] bg-[#ff6b35]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{template.name}</h3>
                        {isActive && (
                          <Check className="w-4 h-4 text-[#ff6b35]" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-[10px] text-gray-600">
                          {template.id === "weak"
                            ? `${getWeakBodyParts().length} partií`
                            : `${Math.min(template.parts.length, 5)} partií`
                          }
                        </span>
                        <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#ff6b35] transition-colors" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom Selection Tab */}
        {activeTab === "custom" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Klikni na partii pro přidání/odebrání z výběru.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {bodyPartsData.map((part) => {
                const isSelected = tempSelection.includes(part.id);
                const isWeak = part.progress < 45;
                const isDisabled = !isSelected && tempSelection.length >= 5;
                const selectionIndex = tempSelection.indexOf(part.id);

                return (
                  <button
                    key={part.id}
                    onClick={() => !isDisabled && togglePart(part.id)}
                    disabled={isDisabled}
                    className={`
                      p-4 rounded-xl border-2 transition-all text-left relative
                      ${isSelected
                        ? "border-[#ff6b35] bg-[#ff6b35]/10"
                        : isDisabled
                        ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }
                    `}
                  >
                    {/* Selection number */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#ff6b35] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{selectionIndex + 1}</span>
                      </div>
                    )}

                    {/* Weak indicator */}
                    {isWeak && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-[10px] font-bold text-white">
                        Priorita
                      </span>
                    )}

                    <div className={`${isWeak ? "mt-5" : ""}`}>
                      <h3 className="font-semibold text-white">{part.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isWeak
                                ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                                : "bg-gradient-to-r from-green-500 to-emerald-500"
                            }`}
                            style={{ width: `${part.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{part.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {part.exercises.length} cviků
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[#2a2a2a]">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl bg-[#1a1a1a] text-white font-semibold border border-[#2a2a2a] hover:bg-[#222222] transition-colors"
          >
            Zrušit
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`
              flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
              ${canSave
                ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white hover:opacity-90"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <Target className="w-4 h-4" />
            Uložit výběr
          </button>
        </div>
      </div>
    </Modal>
  );
}
