"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UserXPProfile, PenaltyRecord, XPEvent, ScheduledWorkout } from "@/types";

// XP Constants
export const XP_VALUES = {
  WORKOUT_COMPLETE: 100,
  STREAK_BONUS_PER_DAY: 50,
  WEEKLY_PLAN_COMPLETE: 200,
  MISSED_WORKOUT: -75,
  STREAK_BROKEN_SHORT: -50,  // <7 days
  STREAK_BROKEN_LONG: -150,  // 7+ days
} as const;

// Level definitions
export type LevelDef = {
  level: number;
  name: string;
  minXP: number;
  icon: "shield" | "award" | "crown";
};

export const LEVELS: LevelDef[] = [
  { level: 1, name: "Novic", minXP: 0, icon: "shield" },
  { level: 2, name: "Pravidelný", minXP: 500, icon: "shield" },
  { level: 3, name: "Pokročilý", minXP: 1500, icon: "award" },
  { level: 4, name: "Silný", minXP: 3000, icon: "award" },
  { level: 5, name: "Elita", minXP: 5000, icon: "crown" },
  { level: 6, name: "Legenda", minXP: 8000, icon: "crown" },
];

const DEFAULT_XP_PROFILE: UserXPProfile = {
  totalXP: 0,
  currentLevel: 1,
  levelName: "Novic",
  events: [],
  penaltyStreak: 0,
  lastCheckedDate: new Date().toISOString().split("T")[0],
};

export function useXPSystem() {
  const [xpProfile, setXPProfile] = useLocalStorage<UserXPProfile>("user_xp_profile", DEFAULT_XP_PROFILE);
  const [penaltyRecords, setPenaltyRecords] = useLocalStorage<PenaltyRecord[]>("penalty_records", []);

  const calculateLevel = useCallback((xp: number) => {
    let currentLevel = LEVELS[0];
    for (const level of LEVELS) {
      if (xp >= level.minXP) {
        currentLevel = level;
      } else {
        break;
      }
    }
    return currentLevel;
  }, []);

  const getXPToNextLevel = useCallback((xp: number) => {
    const currentLevel = calculateLevel(xp);
    const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
    if (!nextLevel) return { current: xp - currentLevel.minXP, needed: 0, percentage: 100 };
    const current = xp - currentLevel.minXP;
    const needed = nextLevel.minXP - currentLevel.minXP;
    return { current, needed, percentage: Math.min(100, Math.round((current / needed) * 100)) };
  }, [calculateLevel]);

  const addXP = useCallback((
    type: XPEvent["type"],
    xp: number,
    description: string,
    workoutId?: string
  ) => {
    const event: XPEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      xp,
      description,
      createdAt: new Date().toISOString(),
      workoutId,
    };

    setXPProfile(prev => {
      const newTotalXP = Math.max(0, prev.totalXP + xp);
      const newLevel = calculateLevel(newTotalXP);
      return {
        ...prev,
        totalXP: newTotalXP,
        currentLevel: newLevel.level,
        levelName: newLevel.name,
        events: [event, ...prev.events].slice(0, 100), // keep last 100 events
        penaltyStreak: xp < 0 ? prev.penaltyStreak + 1 : 0,
      };
    });

    return event;
  }, [setXPProfile, calculateLevel]);

  const applyPenalty = useCallback((
    type: PenaltyRecord["type"],
    xpLost: number,
    description: string,
    workoutDate?: string
  ) => {
    const penalty: PenaltyRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      xpLost: Math.abs(xpLost),
      description,
      workoutDate,
      resolved: false,
      createdAt: new Date().toISOString(),
    };

    setPenaltyRecords(prev => [penalty, ...prev]);
    addXP(
      type === "missed_workout" ? "missed_workout" : "streak_broken_short",
      -Math.abs(xpLost),
      description
    );

    return penalty;
  }, [setPenaltyRecords, addXP]);

  const checkMissedWorkouts = useCallback((scheduledWorkouts: ScheduledWorkout[]) => {
    const today = new Date().toISOString().split("T")[0];
    const lastChecked = xpProfile.lastCheckedDate;

    // Find workouts that are past due and not completed, since last check
    const missedWorkouts = scheduledWorkouts.filter(w =>
      w.date < today &&
      w.date > lastChecked &&
      !w.completed &&
      w.type !== "rest"
    );

    const penalties: PenaltyRecord[] = [];
    for (const workout of missedWorkouts) {
      const penalty = applyPenalty(
        "missed_workout",
        Math.abs(XP_VALUES.MISSED_WORKOUT),
        `Zmeškaný trénink: ${workout.title} (${new Date(workout.date).toLocaleDateString("cs-CZ")})`,
        workout.date
      );
      penalties.push(penalty);
    }

    // Update last checked date
    setXPProfile(prev => ({ ...prev, lastCheckedDate: today }));

    return penalties;
  }, [xpProfile.lastCheckedDate, applyPenalty, setXPProfile]);

  const resolveDebt = useCallback((penaltyId: string) => {
    setPenaltyRecords(prev =>
      prev.map(p =>
        p.id === penaltyId
          ? { ...p, resolved: true, resolvedAt: new Date().toISOString() }
          : p
      )
    );

    // Give back partial XP (50% of lost XP)
    const penalty = penaltyRecords.find(p => p.id === penaltyId);
    if (penalty) {
      const recoveredXP = Math.round(penalty.xpLost * 0.5);
      addXP("debt_resolved", recoveredXP, `Dluh vyrovnán: +${recoveredXP} XP vráceno`);
    }
  }, [setPenaltyRecords, penaltyRecords, addXP]);

  const awardWorkoutXP = useCallback((workoutId: string, currentStreak: number) => {
    // Base workout XP
    addXP("workout_complete", XP_VALUES.WORKOUT_COMPLETE, "Dokončený trénink: +100 XP", workoutId);

    // Streak bonus
    if (currentStreak > 1) {
      const streakBonus = XP_VALUES.STREAK_BONUS_PER_DAY * Math.min(currentStreak, 7);
      addXP("streak_bonus", streakBonus, `Streak bonus (${currentStreak} dní): +${streakBonus} XP`, workoutId);
    }
  }, [addXP]);

  const applyStreakBreak = useCallback((previousStreak: number) => {
    if (previousStreak <= 0) return;

    const xpLost = previousStreak >= 7
      ? Math.abs(XP_VALUES.STREAK_BROKEN_LONG)
      : Math.abs(XP_VALUES.STREAK_BROKEN_SHORT);

    applyPenalty(
      "streak_broken",
      xpLost,
      `Streak přerušen po ${previousStreak} dnech: -${xpLost} XP`
    );
  }, [applyPenalty]);

  const unresolvedDebts = penaltyRecords.filter(p => !p.resolved);
  const totalDebt = unresolvedDebts.reduce((sum, p) => sum + p.xpLost, 0);

  return {
    xpProfile,
    penaltyRecords,
    unresolvedDebts,
    totalDebt,
    calculateLevel,
    getXPToNextLevel,
    addXP,
    applyPenalty,
    checkMissedWorkouts,
    resolveDebt,
    awardWorkoutXP,
    applyStreakBreak,
    LEVELS,
    XP_VALUES,
  };
}
