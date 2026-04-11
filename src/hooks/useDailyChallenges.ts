"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { DailyChallenge, generateRandomChallenge, generateChallengeSet } from "@/lib/dailyChallenges";

export function useDailyChallenges() {
  const [challenges, setChallenges] = useLocalStorage<DailyChallenge[]>("daily_challenges", []);

  const activeChallenges = useMemo(() => challenges.filter(c => c.status === "active" || c.status === "pending"), [challenges]);
  const completedChallenges = useMemo(() => challenges.filter(c => c.status === "completed"), [challenges]);

  useEffect(() => {
    const now = new Date();
    const updated = challenges.map(c => {
      if (c.status === "active" || c.status === "pending") {
        const expires = new Date(c.expiresAt);
        if (expires < now) return { ...c, status: "expired" as const };
      }
      return c;
    });
    const hasChanges = updated.some((c, i) => c.status !== challenges[i]?.status);
    if (hasChanges) setChallenges(updated);
  }, [challenges, setChallenges]);

  const generateChallenge = useCallback((bodyPartIds: string[]): DailyChallenge => {
    const challenge = generateRandomChallenge(bodyPartIds);
    setChallenges(prev => [...prev, challenge]);
    return challenge;
  }, [setChallenges]);

  const generateChallengeSetForParts = useCallback((bodyPartIds: string[]): DailyChallenge[] => {
    const newChallenges = generateChallengeSet(bodyPartIds);
    setChallenges(prev => [...prev, ...newChallenges]);
    return newChallenges;
  }, [setChallenges]);

  const startChallenge = useCallback((challengeId: string): void => {
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, status: "active" as const, startedAt: new Date().toISOString() } : c));
  }, [setChallenges]);

  const updateProgress = useCallback((challengeId: string, progress: number): void => {
    setChallenges(prev => prev.map(c => c.id === challengeId && c.status === "active" ? { ...c, progress: Math.min(100, Math.max(0, progress)) } : c));
  }, [setChallenges]);

  const addReps = useCallback((challengeId: string, amount: number = 1): number => {
    let totalReps = 0;
    setChallenges(prev => prev.map(c => {
      if (c.id !== challengeId || c.status !== "active") return c;
      const newReps = (c.currentReps || 0) + amount;
      const totalTarget = c.exercises.reduce((sum, ex) => sum + ex.target, 0);
      const newProgress = Math.min(100, Math.round((newReps / totalTarget) * 100));
      totalReps = newReps;
      return { ...c, currentReps: newReps, progress: newProgress };
    }));
    return totalReps;
  }, [setChallenges]);

  const completeChallenge = useCallback((challengeId: string): { xpGained: number; bonusXp: number } => {
    let xpGained = 0, bonusXp = 0;
    setChallenges(prev => prev.map(c => {
      if (c.id !== challengeId) return c;
      xpGained = c.xpReward;
      bonusXp = c.progress >= 100 ? c.bonusXp : 0;
      return { ...c, status: "completed" as const, completedAt: new Date().toISOString(), progress: 100 };
    }));
    return { xpGained, bonusXp };
  }, [setChallenges]);

  const failChallenge = useCallback((challengeId: string): void => {
    setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, status: "failed" as const } : c));
  }, [setChallenges]);

  const deleteChallenge = useCallback((challengeId: string): void => {
    setChallenges(prev => prev.filter(c => c.id !== challengeId));
  }, [setChallenges]);

  const getChallengeById = useCallback((challengeId: string): DailyChallenge | undefined => {
    return challenges.find(c => c.id === challengeId);
  }, [challenges]);

  const stats = useMemo(() => {
    const completed = challenges.filter(c => c.status === "completed");
    const totalXp = completed.reduce((sum, c) => sum + c.xpReward + c.bonusXp, 0);
    return { totalXp, totalChallenges: completed.length };
  }, [challenges]);

  return { challenges, activeChallenges, completedChallenges, stats, generateChallenge, generateChallengeSetForParts, startChallenge, updateProgress, addReps, completeChallenge, failChallenge, deleteChallenge, getChallengeById };
}
