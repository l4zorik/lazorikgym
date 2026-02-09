"use client";

import React from "react";
import { Flame, BatteryLow, Zap, Rocket, Crown, TrendingUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

interface WorkoutMoodEntry {
  date: string;
  motivation: number; // 1-5
  laziness: number;   // 1-5 (5 = very lazy)
}

const motivationLevels = [
  { value: 1, label: "Nula", icon: BatteryLow, color: "#ef4444", bg: "#ef444420" },
  { value: 2, label: "Slabá", icon: BatteryLow, color: "#f97316", bg: "#f9731620" },
  { value: 3, label: "OK", icon: Zap, color: "#f59e0b", bg: "#f59e0b20" },
  { value: 4, label: "Silná", icon: Rocket, color: "#10b981", bg: "#10b98120" },
  { value: 5, label: "Na max!", icon: Crown, color: "#8b5cf6", bg: "#8b5cf620" },
];

const lazinessLevels = [
  { value: 1, label: "Nic", color: "#10b981" },
  { value: 2, label: "Trochu", color: "#84cc16" },
  { value: 3, label: "Střed", color: "#f59e0b" },
  { value: 4, label: "Hodně", color: "#f97316" },
  { value: 5, label: "Max", color: "#ef4444" },
];

export default function WorkoutMoodTracker() {
  const today = new Date().toISOString().split("T")[0];
  const [moodLog, setMoodLog] = useLocalStorage<WorkoutMoodEntry[]>("workout_mood_log", []);

  const todayEntry = moodLog.find((e) => e.date === today);

  const setMotivation = (value: number) => {
    setMoodLog((prev) => {
      const existing = prev.findIndex((e) => e.date === today);
      const entry: WorkoutMoodEntry = {
        date: today,
        motivation: value,
        laziness: existing >= 0 ? prev[existing].laziness : 0,
      };
      if (existing >= 0) {
        return prev.map((e, i) => (i === existing ? entry : e));
      }
      return [...prev, entry];
    });
  };

  const setLaziness = (value: number) => {
    setMoodLog((prev) => {
      const existing = prev.findIndex((e) => e.date === today);
      const entry: WorkoutMoodEntry = {
        date: today,
        motivation: existing >= 0 ? prev[existing].motivation : 0,
        laziness: value,
      };
      if (existing >= 0) {
        return prev.map((e, i) => (i === existing ? entry : e));
      }
      return [...prev, entry];
    });
  };

  // Last 7 days trend
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    return moodLog.find((e) => e.date === dateStr) || null;
  });

  const avgMotivation = last7.filter(Boolean).length > 0
    ? Math.round(last7.filter(Boolean).reduce((s, e) => s + (e?.motivation || 0), 0) / last7.filter(Boolean).length * 10) / 10
    : 0;

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <Flame className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Tréninková nálada</h2>
          <p className="text-sm text-gray-500">Jak se dnes cítíš na trénink?</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Motivation */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Motivace</p>
          <div className="flex gap-2">
            {motivationLevels.map((level) => {
              const isActive = todayEntry?.motivation === level.value;
              const Icon = level.icon;
              return (
                <button
                  key={level.value}
                  onClick={() => setMotivation(level.value)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                    isActive
                      ? "border-white/20 scale-105"
                      : "border-transparent hover:bg-white/5"
                  }`}
                  style={isActive ? { backgroundColor: level.bg, borderColor: `${level.color}40` } : undefined}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? level.color : "#6b7280" }} />
                  <span className="text-[10px] font-medium" style={{ color: isActive ? level.color : "#6b7280" }}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Laziness */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Lenost</p>
          <div className="flex gap-2">
            {lazinessLevels.map((level) => {
              const isActive = todayEntry?.laziness === level.value;
              return (
                <button
                  key={level.value}
                  onClick={() => setLaziness(level.value)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                    isActive
                      ? "border-white/20 scale-105"
                      : "border-transparent hover:bg-white/5"
                  }`}
                  style={isActive ? { backgroundColor: `${level.color}20`, borderColor: `${level.color}40` } : undefined}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: isActive ? level.color : "#374151" }}
                  />
                  <span className="text-[10px] font-medium" style={{ color: isActive ? level.color : "#6b7280" }}>
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 7-day mini trend */}
      <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            Posledních 7 dní
          </p>
          {avgMotivation > 0 && (
            <span className="text-xs font-bold" style={{ color: avgMotivation >= 3.5 ? "#10b981" : avgMotivation >= 2 ? "#f59e0b" : "#ef4444" }}>
              Prům. motivace: {avgMotivation}/5
            </span>
          )}
        </div>
        <div className="flex gap-1 items-end h-12">
          {last7.map((entry, i) => {
            const mot = entry?.motivation || 0;
            const height = mot > 0 ? 20 + (mot / 5) * 80 : 10;
            const level = mot > 0 ? motivationLevels[mot - 1] : null;
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                className="flex-1 rounded-t-md"
                style={{ backgroundColor: level?.color || "#1f2937" }}
                title={entry ? `Motivace: ${mot}/5` : "Žádný záznam"}
              />
            );
          })}
        </div>
        <div className="flex gap-1 mt-1">
          {last7.map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return (
              <span key={i} className="flex-1 text-center text-[9px] text-gray-600">
                {d.toLocaleDateString("cs-CZ", { weekday: "narrow" })}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
