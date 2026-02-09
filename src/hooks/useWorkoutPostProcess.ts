"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { usePlanNotifications } from "./usePlanNotifications";
import { useXPSystem } from "./useXPSystem";
import { ScheduledWorkout, PlanProgress, PlanMilestone } from "@/types";
import { usePlan } from "./usePlan";
import { useQuests } from "./useQuests";
import { bodyPartsData } from "@/lib/data";

interface WorkoutCompletionData {
  workoutId: string;
  workoutTitle: string;
  duration: number;
  exercises: string[];
  calories?: number;
  intensity?: "low" | "medium" | "high";
  averageRPE?: number;
}

export function useWorkoutPostProcess() {
  const { activeWorkoutPlanId, currentWeekNumber } = usePlan();
  const { addNotification, checkMilestoneCompletion, generateProgressUpdate, generatePenaltyNotification } = usePlanNotifications();
  const { awardWorkoutXP, applyStreakBreak, checkMissedWorkouts, unresolvedDebts } = useXPSystem();
  const { progressWorkoutObjectives, activeQuests } = useQuests();
  const [scheduledWorkouts, setScheduledWorkouts] = useLocalStorage<ScheduledWorkout[]>("scheduled_workouts", []);
  const [planProgress, setPlanProgress] = useLocalStorage<PlanProgress | null>("plan_progress", null);
  const [streak, setStreak] = useLocalStorage<number>("workout_streak", 0);
  const [lastWorkoutDate, setLastWorkoutDate] = useLocalStorage<string | null>("last_workout_date", null);

  const calculateNewStreak = useCallback((newWorkoutDate: Date): number => {
    if (!lastWorkoutDate) return 1;
    
    const last = new Date(lastWorkoutDate);
    const diffDays = Math.floor(
      (newWorkoutDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return streak;
    if (diffDays === 1) return streak + 1;
    if (diffDays <= 2) return 1;
    return 1;
  }, [lastWorkoutDate, streak]);

  const initializePlanProgress = useCallback((planId: string, totalWeeks: number, milestones: PlanMilestone[]): PlanProgress => {
    return {
      planId,
      startDate: new Date().toISOString(),
      currentWeek: 1,
      totalWeeks,
      completedWorkouts: 0,
      totalScheduledWorkouts: 0,
      currentStreak: 0,
      longestStreak: 0,
      weeklyProgress: Array.from({ length: totalWeeks }, (_, i) => ({
        week: i + 1,
        scheduled: 0,
        completed: 0,
        completionRate: 0,
      })),
      milestones: milestones.map(m => ({ ...m, completed: false })),
      currentPhase: 'Začáteční fáze',
      status: 'active',
      completionRate: 0,
    };
  }, []);

  const updatePlanProgress = useCallback((data: WorkoutCompletionData) => {
    if (!activeWorkoutPlanId) return null;

    const today = new Date().toISOString().split('T')[0];
    const workoutDate = new Date();

    let newProgress: PlanProgress;

    if (!planProgress) {
      newProgress = initializePlanProgress(activeWorkoutPlanId, 8, [
        { id: '1', name: 'První trénink', description: 'Dokončit první trénink', targetWeek: 1, targetWorkouts: 1, type: 'completion', completed: false },
        { id: '2', name: 'Týdenní streak', description: 'Trénovat 3 dny v řadě', targetWeek: 1, targetWorkouts: 3, type: 'streak', targetStreakDays: 3, completed: false },
        { id: '3', name: 'Polovina plánu', description: 'Dokončit 50% tréninků', targetWeek: 4, targetWorkouts: 0, type: 'completion', completed: false },
      ]);
    } else {
      newProgress = { ...planProgress };
    }

    const newStreak = calculateNewStreak(workoutDate);
    newProgress.currentStreak = newStreak;
    newProgress.longestStreak = Math.max(newProgress.longestStreak, newStreak);
    newProgress.completedWorkouts += 1;
    newProgress.lastActivityDate = today;

    const currentWeek = Math.ceil(
      (workoutDate.getTime() - new Date(newProgress.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    newProgress.currentWeek = Math.min(currentWeek, newProgress.totalWeeks);

    const weekProgressIndex = newProgress.currentWeek - 1;
    if (weekProgressIndex >= 0 && weekProgressIndex < newProgress.weeklyProgress.length) {
      newProgress.weeklyProgress[weekProgressIndex].completed += 1;
      const scheduled = newProgress.weeklyProgress[weekProgressIndex].scheduled || 3;
      newProgress.weeklyProgress[weekProgressIndex].completionRate = 
        Math.min(100, Math.round((newProgress.weeklyProgress[weekProgressIndex].completed / scheduled) * 100));
    }

    newProgress.completionRate = Math.round(
      (newProgress.completedWorkouts / (newProgress.totalScheduledWorkouts || 20)) * 100
    );

    if (newProgress.milestones) {
      newProgress.milestones = newProgress.milestones.map(m => {
        if (m.completed) return m;

        let shouldComplete = false;
        switch (m.type) {
          case 'completion':
            if (newProgress.completedWorkouts >= m.targetWorkouts) shouldComplete = true;
            break;
          case 'streak':
            if (newStreak >= (m.targetStreakDays || 0)) shouldComplete = true;
            break;
        }

        if (shouldComplete) {
          const notification = checkMilestoneCompletion(newProgress, m, newProgress.completedWorkouts, newStreak);
          if (notification) {
            addNotification(notification);
          }
          return { ...m, completed: true, completedAt: today };
        }
        return m;
      });

      const completedCount = newProgress.milestones.filter(m => m.completed).length;
      if (completedCount > 0) {
        addNotification({
          type: 'progress',
          title: 'Milník dokončen!',
          message: `Dokončil/a jsi ${completedCount} z ${newProgress.milestones.length} milníků.`,
          planId: activeWorkoutPlanId,
          priority: 'medium',
        });
      }
    }

    // Check if streak was broken (gap > 2 days means reset)
    const previousStreak = streak;
    if (newStreak === 1 && previousStreak > 1) {
      applyStreakBreak(previousStreak);
    }

    setPlanProgress(newProgress);
    setStreak(newStreak);
    setLastWorkoutDate(today);

    // Award XP for completing workout
    awardWorkoutXP(data.workoutId, newStreak);

    // Check for missed workouts and apply penalties
    const newPenalties = checkMissedWorkouts(scheduledWorkouts);
    for (const penalty of newPenalties) {
      const penaltyNotif = generatePenaltyNotification(penalty.xpLost, penalty.description);
      addNotification(penaltyNotif);
    }

    const progressNotification = generateProgressUpdate(newProgress);
    addNotification(progressNotification);

    markScheduledWorkoutComplete(data.workoutId);

    // Progress quest workout objectives based on exercised body parts
    if (activeQuests.length > 0 && data.exercises.length > 0) {
      const trainedBodyPartIds = new Set<string>();
      for (const exName of data.exercises) {
        for (const part of bodyPartsData) {
          const found = part.exercises.some(
            (e) => e.name.toLowerCase() === exName.toLowerCase() || e.id === exName
          );
          if (found) {
            trainedBodyPartIds.add(part.id);
            break;
          }
        }
      }
      for (const partId of trainedBodyPartIds) {
        progressWorkoutObjectives(partId);
      }
    }

    return newProgress;
  }, [
    activeWorkoutPlanId,
    planProgress,
    calculateNewStreak,
    initializePlanProgress,
    checkMilestoneCompletion,
    addNotification,
    generateProgressUpdate,
    generatePenaltyNotification,
    setPlanProgress,
    setStreak,
    setLastWorkoutDate,
    streak,
    awardWorkoutXP,
    applyStreakBreak,
    checkMissedWorkouts,
    scheduledWorkouts,
    activeQuests,
    progressWorkoutObjectives,
  ]);

  const markScheduledWorkoutComplete = useCallback((workoutId: string) => {
    setScheduledWorkouts(prev => 
      prev.map(w => 
        w.id === workoutId ? { ...w, completed: true } : w
      )
    );
  }, [setScheduledWorkouts]);

  const getNextScheduledWorkout = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return scheduledWorkouts.find(w => w.date >= today && !w.completed);
  }, [scheduledWorkouts]);

  const getMissedWorkouts = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return scheduledWorkouts.filter(w => w.date < today && !w.completed);
  }, [scheduledWorkouts]);

  const runPenaltyCheck = useCallback(() => {
    const penalties = checkMissedWorkouts(scheduledWorkouts);
    for (const penalty of penalties) {
      const penaltyNotif = generatePenaltyNotification(penalty.xpLost, penalty.description);
      addNotification(penaltyNotif);
    }
    return penalties;
  }, [checkMissedWorkouts, scheduledWorkouts, generatePenaltyNotification, addNotification]);

  return {
    updatePlanProgress,
    initializePlanProgress,
    calculateNewStreak,
    markScheduledWorkoutComplete,
    getNextScheduledWorkout,
    getMissedWorkouts,
    runPenaltyCheck,
    currentStreak: streak,
    lastWorkoutDate,
  };
}
