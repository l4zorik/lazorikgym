"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { PlanNotification, ScheduledWorkout, PlanProgress, PlanMilestone } from "@/types";

interface NotificationWithCount extends PlanNotification {
  unreadCount: number;
}

export function usePlanNotifications() {
  const [notifications, setNotifications] = useLocalStorage<PlanNotification[]>("plan_notifications", []);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read);
    setUnreadCount(unread.length);
  }, [notifications]);

  const addNotification = useCallback((notification: Omit<PlanNotification, "id" | "createdAt" | "read">) => {
    const newNotification: PlanNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  }, [setNotifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, [setNotifications]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [setNotifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, [setNotifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const checkMilestoneCompletion = useCallback((
    progress: PlanProgress,
    milestone: PlanMilestone,
    completedWorkouts: number,
    currentStreak: number
  ): PlanNotification | null => {
    if (milestone.completed) return null;

    let shouldComplete = false;
    let message = "";

    switch (milestone.type) {
      case 'completion':
        if (completedWorkouts >= milestone.targetWorkouts) {
          shouldComplete = true;
          message = `Skvělá práce! Dokončil/a jsi ${milestone.targetWorkouts} tréninků v plánu "${milestone.name}".`;
        }
        break;
      case 'streak':
        if (currentStreak >= (milestone.targetStreakDays || 0)) {
          shouldComplete = true;
          message = `Gratulujeme! Dosáhl/a jsi ${milestone.targetStreakDays}denního streaku!`;
        }
        break;
      case 'exercise_mastery':
        shouldComplete = true;
        message = `Výborně! Ovládáš cviky: ${milestone.targetExerciseIds?.join(", ")}`;
        break;
    }

    if (shouldComplete) {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: 'milestone',
        title: `Milník: ${milestone.name}`,
        message,
        planId: progress.planId,
        createdAt: new Date().toISOString(),
        read: false,
        priority: 'high',
      };
    }

    return null;
  }, []);

  const generateReminder = useCallback((
    nextWorkout: ScheduledWorkout,
    hoursUntil: number
  ): PlanNotification => {
    const timeText = hoursUntil < 1 
      ? "za méně než hodinu" 
      : `za ${hoursUntil} hodin`;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'reminder',
      title: 'Připomínka tréninku',
      message: `Tvůj další trénink "${nextWorkout.title}" je naplánován ${timeText}.`,
      workoutId: nextWorkout.id,
      planId: nextWorkout.planId,
      createdAt: new Date().toISOString(),
      read: false,
      priority: hoursUntil <= 2 ? 'high' : 'medium',
    };
  }, []);

  const generateMissedWarning = useCallback((
    missedWorkouts: ScheduledWorkout[]
  ): PlanNotification | null => {
    if (missedWorkouts.length === 0) return null;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'warning',
      title: 'Zmeškané tréninky',
      message: `Máš ${missedWorkouts.length} zmeškaných tréninků. Zvaž jejich dokončení nebo přeplánování.`,
      planId: missedWorkouts[0]?.planId,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'medium',
      actionUrl: '/dashboard/calendar',
    };
  }, []);

  const generatePenaltyNotification = useCallback((
    xpLost: number,
    reason: string
  ): PlanNotification => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'penalty',
      title: 'XP Penalta!',
      message: `${reason} Ztráta: -${xpLost} XP. Vyrovnej dluh extra tréninkem!`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high',
      actionUrl: '/workout/new',
    };
  }, []);

  const generateDebtWarning = useCallback((
    debtCount: number,
    totalDebt: number
  ): PlanNotification => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'penalty',
      title: 'Dluhové varování',
      message: `Máš ${debtCount} nevyrovnaných dluhů (-${totalDebt} XP). Začni trénovat a sniž svůj dluh!`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high',
      actionUrl: '/workout/new',
    };
  }, []);

  const generateDegradationWarning = useCallback((
    currentLevel: number,
    levelName: string
  ): PlanNotification => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'penalty',
      title: 'Hrozí degradace!',
      message: `Tvůj level ${currentLevel} (${levelName}) je ohrožen. Pokračuj v tréninku, aby sis ho udržel/a!`,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'high',
    };
  }, []);

  const generateProgressUpdate = useCallback((
    progress: PlanProgress
  ): PlanNotification => {
    const rate = progress.completionRate;
    let message = "";

    if (rate >= 75) {
      message = "Jsi téměř na konci! Zbývá jen pár tréninků.";
    } else if (rate >= 50) {
      message = "Už jsi v polovině plánu! Pokračuj ve stejném tempu.";
    } else if (rate >= 25) {
      message = "Skvělý pokrok! Máš za sebou čtvrtinu plánu.";
    } else {
      message = "Právě jsi začal/a. Vydrž a sleduj, jak se zlepšuješ!";
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'progress',
      title: 'Týdenní shrnutí',
      message: `${Math.round(progress.completionRate)}% plánu dokončeno. ${message}`,
      planId: progress.planId,
      createdAt: new Date().toISOString(),
      read: false,
      priority: 'low',
    };
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    checkMilestoneCompletion,
    generateReminder,
    generateMissedWarning,
    generateProgressUpdate,
    generatePenaltyNotification,
    generateDebtWarning,
    generateDegradationWarning,
  };
}
