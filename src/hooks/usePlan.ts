"use client";

import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { WorkoutPlan, MealPlan } from "@/types";
import { workoutPlansData, mealPlansData } from "@/lib/data";

export function usePlan() {
  const [activeWorkoutPlanId, setActiveWorkoutPlanId] = useLocalStorage<string | null>("active_workout_plan", null);
  const [activeMealPlanId, setActiveMealPlanId] = useLocalStorage<string | null>("active_meal_plan", null);
  const [planStartDate, setPlanStartDate] = useLocalStorage<string | null>("plan_start_date", null);

  const activeWorkoutPlan = activeWorkoutPlanId
    ? workoutPlansData.find(p => p.id === activeWorkoutPlanId)
    : null;

  const activeMealPlan = activeMealPlanId
    ? mealPlansData.find(p => p.id === activeMealPlanId)
    : null;

  const currentWeekNumber = useMemo(() => {
    if (!planStartDate) return 1;
    const start = new Date(planStartDate);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.floor(diffDays / 7) + 1);
  }, [planStartDate]);

  const activateWorkoutPlan = (id: string) => {
    setActiveWorkoutPlanId(id);
    setPlanStartDate(new Date().toISOString().split("T")[0]);
  };

  const deactivateWorkoutPlan = () => {
    setActiveWorkoutPlanId(null);
    setPlanStartDate(null);
  };

  const activateMealPlan = (id: string) => {
    setActiveMealPlanId(id);
  };

  return {
    activeWorkoutPlan,
    activeMealPlan,
    activateWorkoutPlan,
    deactivateWorkoutPlan,
    activateMealPlan,
    activeWorkoutPlanId,
    activeMealPlanId,
    planStartDate,
    currentWeekNumber,
  };
}
