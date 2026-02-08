"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { FoodLogEntry, SleepLogEntry, DailyMoodEntry, WaterEntry, NutrientGoals } from "@/types";
import { DEFAULT_NUTRIENT_GOALS } from "@/lib/nutrientConfig";

export function useDailyTracker() {
  const [foodLog, setFoodLog, foodHydrated] = useLocalStorage<FoodLogEntry[]>("food_log", []);
  const [sleepLog, setSleepLog, sleepHydrated] = useLocalStorage<SleepLogEntry[]>("sleep_log", []);
  const [moodLog, setMoodLog, moodHydrated] = useLocalStorage<DailyMoodEntry[]>("daily_mood", []);
  const [waterEntries, setWaterEntries, waterHydrated] = useLocalStorage<WaterEntry[]>("water_entries", []);
  const [dailyWaterGoal] = useLocalStorage<number>("daily_water_goal", 2500);
  const [nutrientGoals, setNutrientGoals, goalsHydrated] = useLocalStorage<NutrientGoals>("nutrient_goals", DEFAULT_NUTRIENT_GOALS);

  const isHydrated = foodHydrated && sleepHydrated && moodHydrated && waterHydrated && goalsHydrated;

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const todayFood = useMemo(
    () => foodLog.filter((e) => e.date === today),
    [foodLog, today]
  );

  const todayCalories = useMemo(
    () => todayFood.reduce((sum, e) => sum + e.calories, 0),
    [todayFood]
  );

  const todayProtein = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.protein || 0), 0),
    [todayFood]
  );

  const todayCarbs = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.carbs || 0), 0),
    [todayFood]
  );

  const todayFat = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.fat || 0), 0),
    [todayFood]
  );

  const todayFiber = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.fiber || 0), 0),
    [todayFood]
  );

  const todaySugar = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.sugar || 0), 0),
    [todayFood]
  );

  const todaySodium = useMemo(
    () => todayFood.reduce((sum, e) => sum + (e.sodium || 0), 0),
    [todayFood]
  );

  const todayNutrients = useMemo(() => ({
    calories: todayCalories,
    protein: todayProtein,
    carbs: todayCarbs,
    fat: todayFat,
    fiber: todayFiber,
    sugar: todaySugar,
    sodium: todaySodium,
  }), [todayCalories, todayProtein, todayCarbs, todayFat, todayFiber, todaySugar, todaySodium]);

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

  const removeFoodEntry = (id: string) => {
    setFoodLog((prev) => prev.filter((e) => e.id !== id));
  };

  const updateNutrientGoals = (updates: Partial<NutrientGoals>) => {
    setNutrientGoals((prev) => ({ ...prev, ...updates }));
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
    todayNutrients,
    nutrientGoals,
    todayWater,
    waterPercentage,
    dailyWaterGoal,
    todaySleep,
    todayMoodEntry,
    addFoodEntry,
    removeFoodEntry,
    updateNutrientGoals,
    addWater,
    setSleep,
    setMood,
  };
}
