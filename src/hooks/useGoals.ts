"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ExtendedGoal, BodyPartPlan } from "@/types";
import { bodyPartsData } from "@/lib/data";
import { getMartialArtById } from "@/lib/martialArtsData";
import { getBookById } from "@/lib/booksData";
import { getFacilityById } from "@/lib/facilitiesData";

export function useGoals() {
  const [goals, setGoals, isHydrated] = useLocalStorage<ExtendedGoal[]>("body_part_goals", []);

  const activeGoals = goals.filter((g) => g.status === "active");
  const canAddGoal = activeGoals.length < 5;
  const existingGoalPartIds = activeGoals
    .filter((g) => g.category === "body_part" || !g.category)
    .map((g) => g.bodyPartId!)
    .filter(Boolean);

  // Body part goal (backward compatible)
  function addGoal(bodyPartId: string, planId: string, plan: BodyPartPlan) {
    if (!canAddGoal) return;
    if (existingGoalPartIds.includes(bodyPartId)) return;

    const bodyPart = bodyPartsData.find((p) => p.id === bodyPartId);
    const startProgress = bodyPart?.progress ?? 0;

    const newGoal: ExtendedGoal = {
      id: `goal-${Date.now()}`,
      category: "body_part",
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

  function addMartialArtGoal(martialArtId: string) {
    if (!canAddGoal) return;
    if (activeGoals.some((g) => g.category === "martial_art" && g.martialArtId === martialArtId)) return;

    const ma = getMartialArtById(martialArtId);
    if (!ma) return;

    const newGoal: ExtendedGoal = {
      id: `goal-${Date.now()}`,
      category: "martial_art",
      martialArtId,
      createdAt: new Date().toISOString(),
      status: "active",
      completedWorkouts: 0,
      totalWorkoutsNeeded: ma.frequencyPerWeek * ma.durationWeeks,
      weekNumber: 1,
    };

    setGoals((prev) => [...prev, newGoal]);
  }

  function addBookGoal(bookId: string) {
    if (!canAddGoal) return;
    if (activeGoals.some((g) => g.category === "book" && g.bookId === bookId)) return;

    const book = getBookById(bookId);
    if (!book) return;

    const newGoal: ExtendedGoal = {
      id: `goal-${Date.now()}`,
      category: "book",
      bookId,
      pagesRead: 0,
      totalPages: book.pages,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    setGoals((prev) => [...prev, newGoal]);
  }

  function addFacilityGoal(facilityId: string) {
    if (!canAddGoal) return;
    if (activeGoals.some((g) => g.category === "facility" && g.facilityId === facilityId)) return;

    const facility = getFacilityById(facilityId);
    if (!facility) return;

    const newGoal: ExtendedGoal = {
      id: `goal-${Date.now()}`,
      category: "facility",
      facilityId,
      visitCount: 0,
      targetVisits: facility.recommendedVisits,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    setGoals((prev) => [...prev, newGoal]);
  }

  function updateBookProgress(goalId: string, pagesRead: number) {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId || g.category !== "book") return g;
        const newPages = Math.min(pagesRead, g.totalPages ?? 0);
        return {
          ...g,
          pagesRead: newPages,
          status: newPages >= (g.totalPages ?? 0) ? ("completed" as const) : g.status,
        };
      })
    );
  }

  function incrementVisit(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId || g.category !== "facility") return g;
        const newCount = (g.visitCount ?? 0) + 1;
        return {
          ...g,
          visitCount: newCount,
          status: newCount >= (g.targetVisits ?? 0) ? ("completed" as const) : g.status,
        };
      })
    );
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
        if (g.category !== "body_part" && g.category !== "martial_art" && g.category !== undefined) return g;
        const newCompleted = (g.completedWorkouts ?? 0) + 1;
        const total = g.totalWorkoutsNeeded ?? 1;
        return {
          ...g,
          completedWorkouts: newCompleted,
          weekNumber: Math.max(1, Math.ceil((newCompleted / total) * (total / 3))),
          status: newCompleted >= total ? ("completed" as const) : g.status,
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
    addMartialArtGoal,
    addBookGoal,
    addFacilityGoal,
    updateBookProgress,
    incrementVisit,
    removeGoal,
    completeGoal,
    incrementWorkout,
    rateGoal,
    isHydrated,
  };
}
