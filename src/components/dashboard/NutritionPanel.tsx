"use client";

import { useState } from "react";
import { Plus, Settings, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FoodLogEntry, NutrientGoals } from "@/types";
import { NUTRIENT_CONFIG } from "@/lib/nutrientConfig";

const mealTypeLabels: Record<FoodLogEntry["mealType"], string> = {
  breakfast: "Sn\u00EDdan\u011B",
  lunch: "Ob\u011Bd",
  dinner: "Ve\u010De\u0159e",
  snack: "Sva\u010Dina",
};

interface NutritionPanelProps {
  todayFood: FoodLogEntry[];
  todayNutrients: NutrientGoals;
  nutrientGoals: NutrientGoals;
  onOpenFoodModal: () => void;
  onOpenGoalsModal: () => void;
  onRemoveFoodEntry: (id: string) => void;
}

export default function NutritionPanel({
  todayFood,
  todayNutrients,
  nutrientGoals,
  onOpenFoodModal,
  onOpenGoalsModal,
  onRemoveFoodEntry,
}: NutritionPanelProps) {
  const [showFoodList, setShowFoodList] = useState(false);

  const foodByMeal = todayFood.reduce((acc, entry) => {
    if (!acc[entry.mealType]) acc[entry.mealType] = [];
    acc[entry.mealType].push(entry);
    return acc;
  }, {} as Record<string, FoodLogEntry[]>);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ff6b35]/20 flex items-center justify-center">
            <span className="text-sm">&#x1F525;</span>
          </div>
          <span className="text-sm font-semibold">Nutrienty</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGoalsModal}
            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Nastaven\u00ED c\u00EDl\u016F"
          >
            <Settings className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button
            onClick={onOpenFoodModal}
            className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* 7 Progress Bars */}
      <div className="space-y-3">
        {NUTRIENT_CONFIG.map((nutrient) => {
          const current = todayNutrients[nutrient.key];
          const goal = nutrientGoals[nutrient.key];
          const percentage = Math.min((current / goal) * 100, 100);
          const isOver = current > goal;
          const Icon = nutrient.icon;

          return (
            <div key={nutrient.key} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: nutrient.color }} />
                  <span className="text-xs text-gray-400">{nutrient.label}</span>
                </div>
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: isOver ? "#ef4444" : "rgb(209 213 219)" }}
                >
                  {current} / {goal} {nutrient.unit}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: isOver ? "#ef4444" : nutrient.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Food List */}
      {todayFood.length > 0 && (
        <div>
          <button
            onClick={() => setShowFoodList(!showFoodList)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors w-full justify-center py-1"
          >
            {showFoodList ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Skr\u00FDt j\u00EDdla
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Zobrazit j\u00EDdla ({todayFood.length})
              </>
            )}
          </button>

          <AnimatePresence>
            {showFoodList && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-2 max-h-48 overflow-y-auto">
                  {(Object.entries(foodByMeal) as [FoodLogEntry["mealType"], FoodLogEntry[]][]).map(
                    ([mealType, entries]) => (
                      <div key={mealType} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1.5">
                          {mealTypeLabels[mealType]}
                        </p>
                        {entries.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between text-sm group">
                            <span className="text-gray-300 truncate flex-1">{entry.name}</span>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <span className="text-xs text-gray-500">{entry.calories} kcal</span>
                              <button
                                onClick={() => onRemoveFoodEntry(entry.id)}
                                className="w-5 h-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Empty state */}
      {todayFood.length === 0 && (
        <button
          onClick={onOpenFoodModal}
          className="w-full p-4 rounded-xl border border-dashed border-white/10 text-gray-500 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          P\u0159idat j\u00EDdlo
        </button>
      )}
    </div>
  );
}
