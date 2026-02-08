"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { FoodLogEntry, SleepLogEntry, DailyMoodEntry, WaterEntry } from "@/types";

export function useDailyTracker() {
  const [foodLog, setFoodLog, foodHydrated] = useLocalStorage<FoodLogEntry[]>("food_log", []);
  const [sleepLog, setSleepLog, sleepHydrated] = useLocalStorage<SleepLogEntry[]>("sleep_log", []);
  const [moodLog, setMoodLog, moodHydrated] = useLocalStorage<DailyMoodEntry[]>("daily_mood", []);
  const [waterEntries, setWaterEntries, waterHydrated] = useLocalStorage<WaterEntry[]>("water_entries", []);
  const [dailyWaterGoal] = useLocalStorage<number>("daily_water_goal", 2500);

  const isHydrated = foodHydrated && sleepHydrated && moodHydrated && waterHydrated;

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const todayFood = useMemo(
    () => foodLog.filter((e) => e.date === today),
    [foodLog, today]
  );

  const todayCalories = useMemo(
    () => todayFood.reduce((sum, e) => sum + e.calories, 0),
    [todayFood]
  );

  const todayWater = useMemo(
    () => waterEntries.filter((e) => e.date === today).reduce((sum, e) => sum + e.amount, 0),
    [waterEntries, today]
  );

  const waterPercentage = useMemo(
    () => Math.min(Math.round((todayWater / dailyWaterGoal) * 100), 100),
    [todayWater, dailyWaterGoal]
  );

  const todaySleep = useMemo(
    () => sleepLog.find((e) => e.date === today) || null,
    [sleepLog, today]
  );

  const todayMoodEntry = useMemo(
    () => moodLog.find((e) => e.date === today) || null,
    [moodLog, today]
  );

  const addFoodEntry = (entry: Omit<FoodLogEntry, "id" | "date" | "time">) => {
    const newEntry: FoodLogEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      date: today,
      time: new Date().toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
    };
    setFoodLog((prev) => [...prev, newEntry]);
  };

  const addWater = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: today,
      amount,
      time: new Date().toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
    };
    setWaterEntries((prev) => [...prev, newEntry]);
  };

  const setSleep = (hours: number, quality: SleepLogEntry["quality"]) => {
    const existing = sleepLog.findIndex((e) => e.date === today);
    const entry: SleepLogEntry = {
      id: existing >= 0 ? sleepLog[existing].id : Math.random().toString(36).substr(2, 9),
      date: today,
      hours,
      quality,
    };
    if (existing >= 0) {
      setSleepLog((prev) => prev.map((e, i) => (i === existing ? entry : e)));
    } else {
      setSleepLog((prev) => [...prev, entry]);
    }
  };

  const setMood = (mood: number, energy: number) => {
    const existing = moodLog.findIndex((e) => e.date === today);
    const entry: DailyMoodEntry = {
      id: existing >= 0 ? moodLog[existing].id : Math.random().toString(36).substr(2, 9),
      date: today,
      mood,
      energy,
    };
    if (existing >= 0) {
      setMoodLog((prev) => prev.map((e, i) => (i === existing ? entry : e)));
    } else {
      setMoodLog((prev) => [...prev, entry]);
    }
  };

  return {
    isHydrated,
    todayFood,
    todayCalories,
    todayWater,
    waterPercentage,
    dailyWaterGoal,
    todaySleep,
    todayMoodEntry,
    addFoodEntry,
    addWater,
    setSleep,
    setMood,
  };
}
