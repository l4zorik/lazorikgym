"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface LoginStreakData {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string | null;
  totalLogins: number;
}

const DEFAULT_DATA: LoginStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastLoginDate: null,
  totalLogins: 0,
};

export function useLoginStreak() {
  const [data, setData] = useLocalStorage<LoginStreakData>("login_streak", DEFAULT_DATA);

  const recordLogin = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    setData((prev) => {
      // Already logged in today
      if (prev.lastLoginDate === today) return prev;

      let newStreak: number;
      if (!prev.lastLoginDate) {
        // First ever login
        newStreak = 1;
      } else {
        const last = new Date(prev.lastLoginDate);
        const now = new Date(today);
        const diffMs = now.getTime() - last.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day
          newStreak = prev.currentStreak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      }

      return {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastLoginDate: today,
        totalLogins: prev.totalLogins + 1,
      };
    });
  }, [setData]);

  return {
    ...data,
    recordLogin,
  };
}
