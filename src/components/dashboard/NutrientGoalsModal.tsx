"use client";

import { useState, useEffect } from "react";
import { X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NutrientGoals } from "@/types";
import { NUTRIENT_CONFIG, DEFAULT_NUTRIENT_GOALS } from "@/lib/nutrientConfig";

interface NutrientGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoals: NutrientGoals;
  onSave: (updates: Partial<NutrientGoals>) => void;
}

export default function NutrientGoalsModal({
  isOpen,
  onClose,
  currentGoals,
  onSave,
}: NutrientGoalsModalProps) {
  const [localGoals, setLocalGoals] = useState<NutrientGoals>(currentGoals);

  useEffect(() => {
    if (isOpen) {
      setLocalGoals(currentGoals);
    }
  }, [isOpen, currentGoals]);

  const handleSave = () => {
    onSave(localGoals);
    onClose();
  };

  const handleReset = () => {
    setLocalGoals(DEFAULT_NUTRIENT_GOALS);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Denn\u00ED c\u00EDle</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {NUTRIENT_CONFIG.map((nutrient) => {
                const Icon = nutrient.icon;
                return (
                  <div key={nutrient.key} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${nutrient.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: nutrient.color }} />
                    </div>
                    <span className="text-sm font-medium flex-1 min-w-0">{nutrient.label}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={localGoals[nutrient.key]}
                        onChange={(e) =>
                          setLocalGoals((prev) => ({
                            ...prev,
                            [nutrient.key]: Math.max(0, parseInt(e.target.value) || 0),
                          }))
                        }
                        className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-right focus:outline-none focus:border-[#ff6b35] transition-colors"
                        min="0"
                      />
                      <span className="text-xs text-gray-500 w-8">{nutrient.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                V\u00FDchoz\u00ED
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-[#ff6b35] text-white font-bold hover:bg-[#e55a2b] transition-colors"
              >
                Ulo\u017Eit c\u00EDle
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
