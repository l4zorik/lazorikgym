"use client";

import { Utensils, Droplets, Moon, Smile, Dumbbell } from "lucide-react";
import { ScheduledWorkout } from "@/types";

interface TodayOverviewProps {
  calories: number;
  waterPercentage: number;
  sleepHours: number | null;
  mood: number | null;
  todayWorkoutsCount: number;
  isHydrated: boolean;
}

export default function TodayOverview({
  calories,
  waterPercentage,
  sleepHours,
  mood,
  todayWorkoutsCount,
  isHydrated,
}: TodayOverviewProps) {
  const stats = [
    {
      label: "Kalorie",
      value: calories > 0 ? `${calories}` : "—",
      unit: calories > 0 ? "kcal" : "",
      icon: Utensils,
      color: "#10b981",
    },
    {
      label: "Voda",
      value: `${waterPercentage}`,
      unit: "%",
      icon: Droplets,
      color: "#3b82f6",
    },
    {
      label: "Spánek",
      value: sleepHours !== null ? `${sleepHours}` : "—",
      unit: sleepHours !== null ? "h" : "",
      icon: Moon,
      color: "#8b5cf6",
    },
    {
      label: "Nálada",
      value: mood !== null ? ["", "😞", "😐", "🙂", "😊", "🤩"][mood] : "—",
      unit: "",
      icon: Smile,
      color: "#f59e0b",
    },
    {
      label: "Tréninky",
      value: `${todayWorkoutsCount}`,
      unit: "dnes",
      icon: Dumbbell,
      color: "#ff6b35",
    },
  ];

  if (!isHydrated) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
            <div className="w-12 h-6 bg-white/10 rounded mb-1" />
            <div className="w-16 h-3 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: `${stat.color}15` }}
          >
            <stat.icon className="w-4.5 h-4.5" style={{ color: stat.color }} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{stat.value}</span>
            {stat.unit && <span className="text-xs text-gray-500">{stat.unit}</span>}
          </div>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
