"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Dumbbell, Flame, Clock, TrendingUp, Trophy, Target } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WorkoutSession } from "@/types";

type Period = "day" | "month" | "year";

const periodLabels: Record<Period, string> = {
  day: "Denní",
  month: "Měsíční",
  year: "Roční",
};

export default function PeriodOverview() {
  const [period, setPeriod] = useState<Period>("day");
  const [history] = useLocalStorage<WorkoutSession[]>("workout_history", []);

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  const filteredWorkouts = useMemo(() => {
    return history.filter((w) => {
      const d = new Date(w.date);
      switch (period) {
        case "day":
          return new Date(w.date).toISOString().split("T")[0] === todayStr;
        case "month":
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        case "year":
          return d.getFullYear() === now.getFullYear();
        default:
          return false;
      }
    });
  }, [history, period, todayStr, now]);

  const totalWorkouts = filteredWorkouts.length;
  const totalMinutes = filteredWorkouts.reduce((s, w) => s + (w.duration || 0), 0);
  const totalSets = filteredWorkouts.reduce(
    (s, w) => s + w.items.reduce((ss, item) => ss + item.sets.filter((set) => set.completed).length, 0),
    0
  );
  const totalVolume = filteredWorkouts.reduce(
    (s, w) =>
      s +
      w.items.reduce(
        (ss, item) =>
          ss +
          item.sets
            .filter((set) => set.completed)
            .reduce((sss, set) => sss + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0),
        0
      ),
    0
  );
  const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Unique body parts trained
  const trainedParts = new Set(filteredWorkouts.flatMap((w) => w.items.map((i) => i.bodyPart)));

  const periodLabel = period === "day"
    ? now.toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })
    : period === "month"
      ? now.toLocaleDateString("cs-CZ", { month: "long", year: "numeric" })
      : now.getFullYear().toString();

  const stats = [
    { label: "Tréninky", value: totalWorkouts, unit: "", icon: Dumbbell, color: "#ff6b35" },
    { label: "Čas", value: totalMinutes, unit: "min", icon: Clock, color: "#3b82f6" },
    { label: "Série", value: totalSets, unit: "", icon: Target, color: "#8b5cf6" },
    { label: "Objem", value: totalVolume > 1000 ? `${(totalVolume / 1000).toFixed(1)}k` : totalVolume, unit: "kg", icon: TrendingUp, color: "#10b981" },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Přehled</h2>
            <p className="text-sm text-gray-500">{periodLabel}</p>
          </div>
        </div>

        {/* Period switcher */}
        <div className="flex bg-white/[0.03] rounded-xl p-1 border border-white/5">
          {(["day", "month", "year"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                period === p
                  ? "bg-[#ff6b35] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.unit && <span className="text-xs text-gray-500">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Extra info row */}
      <div className="flex flex-wrap gap-3">
        {avgDuration > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <Clock className="w-3 h-3 text-blue-400" />
            <span className="text-gray-400">Prům. délka: <span className="text-white font-bold">{avgDuration} min</span></span>
          </div>
        )}
        {trainedParts.size > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className="text-gray-400">Partie: <span className="text-white font-bold">{trainedParts.size}</span></span>
          </div>
        )}
        {totalWorkouts === 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <Flame className="w-3 h-3 text-gray-500" />
            <span className="text-gray-500">Zatím žádný trénink v tomto období</span>
          </div>
        )}
      </div>
    </section>
  );
}
