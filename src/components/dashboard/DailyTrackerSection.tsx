"use client";

import { useState } from "react";
import { Droplets, Moon, Smile } from "lucide-react";
import { FoodLogEntry, SleepLogEntry, DailyMoodEntry, NutrientGoals } from "@/types";
import NutritionPanel from "./NutritionPanel";

const sleepQualityLabels: Record<SleepLogEntry["quality"], { label: string; color: string }> = {
  poor: { label: "Špatná", color: "#ef4444" },
  fair: { label: "Ucházející", color: "#f59e0b" },
  good: { label: "Dobrá", color: "#10b981" },
  excellent: { label: "Výborná", color: "#8b5cf6" },
};

const moodIcons = ["😞", "😐", "🙂", "😊", "🤩"];
const energyIcons = ["🔋", "⚡", "💪", "🔥", "⭐"];

interface DailyTrackerSectionProps {
  todayFood: FoodLogEntry[];
  todayCalories: number;
  todayNutrients: NutrientGoals;
  nutrientGoals: NutrientGoals;
  todayWater: number;
  waterPercentage: number;
  dailyWaterGoal: number;
  todaySleep: SleepLogEntry | null;
  todayMoodEntry: DailyMoodEntry | null;
  onOpenFoodModal: () => void;
  onOpenGoalsModal: () => void;
  onRemoveFoodEntry: (id: string) => void;
  onAddWater: (amount: number) => void;
  onSetSleep: (hours: number, quality: SleepLogEntry["quality"]) => void;
  onSetMood: (mood: number, energy: number) => void;
}

export default function DailyTrackerSection({
  todayFood,
  todayCalories,
  todayNutrients,
  nutrientGoals,
  todayWater,
  waterPercentage,
  dailyWaterGoal,
  todaySleep,
  todayMoodEntry,
  onOpenFoodModal,
  onOpenGoalsModal,
  onRemoveFoodEntry,
  onAddWater,
  onSetSleep,
  onSetMood,
}: DailyTrackerSectionProps) {
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState<SleepLogEntry["quality"]>("good");

  const handleSleepSubmit = () => {
    const hours = parseFloat(sleepHours);
    if (hours > 0 && hours <= 24) {
      onSetSleep(hours, sleepQuality);
      setSleepHours("");
    }
  };

  const waterQuickAdd = [250, 500, 750];

  // SVG circle for water progress
  const circleRadius = 40;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (waterPercentage / 100) * circumference;

  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
      <h3 className="text-lg font-bold mb-6">Denní přehled</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Nutrition Panel - replaces old Food Section */}
        <div className="md:row-span-2">
          <NutritionPanel
            todayFood={todayFood}
            todayNutrients={todayNutrients}
            nutrientGoals={nutrientGoals}
            onOpenFoodModal={onOpenFoodModal}
            onOpenGoalsModal={onOpenGoalsModal}
            onRemoveFoodEntry={onRemoveFoodEntry}
          />
        </div>

        {/* Water Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold">Voda</span>
          </div>

          <div className="flex items-center gap-5">
            {/* SVG Circle Progress */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={circleRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={circleRadius}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">{waterPercentage}%</span>
                <span className="text-[10px] text-gray-500">{todayWater} ml</span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xs text-gray-500">
                Cíl: {dailyWaterGoal} ml
              </p>
              <div className="flex gap-2">
                {waterQuickAdd.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => onAddWater(amount)}
                    className="flex-1 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                  >
                    +{amount} ml
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sleep Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold">Spánek</span>
          </div>

          {todaySleep ? (
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{todaySleep.hours}</span>
                  <span className="text-sm text-gray-500 ml-1">hodin</span>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${sleepQualityLabels[todaySleep.quality].color}20`,
                    color: sleepQualityLabels[todaySleep.quality].color,
                  }}
                >
                  {sleepQualityLabels[todaySleep.quality].label}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                placeholder="Hodiny"
                step="0.5"
                min="0"
                max="24"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <select
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value as SleepLogEntry["quality"])}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="poor">Špatná</option>
                <option value="fair">Ucházející</option>
                <option value="good">Dobrá</option>
                <option value="excellent">Výborná</option>
              </select>
              <button
                onClick={handleSleepSubmit}
                disabled={!sleepHours}
                className="px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-400 font-medium text-sm hover:bg-purple-500/30 transition-colors disabled:opacity-40"
              >
                Uložit
              </button>
            </div>
          )}
        </div>

        {/* Mood & Energy Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold">Nálada & Energie</span>
          </div>

          <div className="space-y-3">
            {/* Mood */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Jak se cítíš?</p>
              <div className="flex gap-2">
                {moodIcons.map((icon, i) => {
                  const value = i + 1;
                  const isActive = todayMoodEntry?.mood === value;
                  return (
                    <button
                      key={i}
                      onClick={() => onSetMood(value, todayMoodEntry?.energy || 3)}
                      className={`flex-1 py-2.5 rounded-xl text-center text-lg transition-all ${
                        isActive
                          ? "bg-amber-500/20 border border-amber-500/30 scale-110"
                          : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
                      }`}
                    >
                      {icon}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Energie</p>
              <div className="flex gap-2">
                {energyIcons.map((icon, i) => {
                  const value = i + 1;
                  const isActive = todayMoodEntry?.energy === value;
                  return (
                    <button
                      key={i}
                      onClick={() => onSetMood(todayMoodEntry?.mood || 3, value)}
                      className={`flex-1 py-2.5 rounded-xl text-center text-lg transition-all ${
                        isActive
                          ? "bg-orange-500/20 border border-orange-500/30 scale-110"
                          : "bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]"
                      }`}
                    >
                      {icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
