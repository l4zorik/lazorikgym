"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BodyPartGoal, BodyPartPlan } from "@/types";
import { bodyPartsData } from "@/lib/data";

export function useGoals() {
  const [goals, setGoals, isHydrated] = useLocalStorage<BodyPartGoal[]>("body_part_goals", []);

  const activeGoals = goals.filter((g) => g.status === "active");
  const canAddGoal = activeGoals.length < 3;
  const existingGoalPartIds = activeGoals.map((g) => g.bodyPartId);

  function addGoal(bodyPartId: string, planId: string, plan: BodyPartPlan) {
    if (!canAddGoal) return;
    if (existingGoalPartIds.includes(bodyPartId)) return;

    const bodyPart = bodyPartsData.find((p) => p.id === bodyPartId);
    const startProgress = bodyPart?.progress ?? 0;

    const newGoal: BodyPartGoal = {
      id: `goal-${Date.now()}`,
      bodyPartId,
      planId,
      startProgress,
      targetProgress: Math.min(startProgress + 25, 100),
      createdAt: new Date().toISOString(),
      status: "active",
      completedWorkouts: 0,
      totalWorkoutsNeeded: plan.frequencyPerWeek * plan.durationWeeks,
      weekNumber: 1,
    };

    setGoals((prev) => [...prev, newGoal]);
  }

  function removeGoal(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, status: "abandoned" as const } : g))
    );
  }

  function completeGoal(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, status: "completed" as const } : g))
    );
  }

  function incrementWorkout(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const newCompleted = g.completedWorkouts + 1;
        const newWeek = Math.min(
          Math.floor(newCompleted / (g.totalWorkoutsNeeded / (g.totalWorkoutsNeeded / (g.totalWorkoutsNeeded > 0 ? Math.ceil(g.totalWorkoutsNeeded / 4) : 1)))) + 1,
          Math.ceil(g.totalWorkoutsNeeded / 3) // approximate weeks
        );
        return {
          ...g,
          completedWorkouts: newCompleted,
          weekNumber: Math.max(1, Math.ceil((newCompleted / g.totalWorkoutsNeeded) * (g.totalWorkoutsNeeded / 3))),
          status: newCompleted >= g.totalWorkoutsNeeded ? ("completed" as const) : g.status,
        };
      })
    );
  }

  function rateGoal(goalId: string, rating: number) {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, userRating: rating } : g))
    );
  }

  return {
    goals,
    activeGoals,
    canAddGoal,
    existingGoalPartIds,
    addGoal,
    removeGoal,
    completeGoal,
    incrementWorkout,
    rateGoal,
    isHydrated,
  };
}
