"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { RestTimerConfig } from "@/types";

const DEFAULT_CONFIG: RestTimerConfig = {
  defaultSeconds: 90,
  autoStart: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

export function useRestTimer() {
  const [config, setConfig] = useLocalStorage<RestTimerConfig>("rest_timer_config", DEFAULT_CONFIG);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const playBeep = useCallback(() => {
    if (!config.soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 880;
      oscillator.type = "sine";
      gainNode.gain.value = 0.3;

      oscillator.start();

      // Triple beep
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + 0.25);
      gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.65);

      oscillator.stop(ctx.currentTime + 0.7);
    } catch {
      // Audio not available
    }
  }, [config.soundEnabled]);

  const vibrate = useCallback(() => {
    if (!config.vibrationEnabled) return;
    try {
      navigator?.vibrate?.([200, 100, 200, 100, 200]);
    } catch {
      // Vibration not available
    }
  }, [config.vibrationEnabled]);

  const onTimerEnd = useCallback(() => {
    cleanup();
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    playBeep();
    vibrate();
  }, [cleanup, playBeep, vibrate]);

  const tick = useCallback(() => {
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
    setTimeLeft(remaining);
    if (remaining <= 0) {
      onTimerEnd();
    }
  }, [onTimerEnd]);

  const startTimer = useCallback((seconds?: number) => {
    cleanup();
    const duration = seconds || config.defaultSeconds;
    setTotalTime(duration);
    setTimeLeft(duration);
    setIsRunning(true);
    setIsPaused(false);
    endTimeRef.current = Date.now() + duration * 1000;
    intervalRef.current = setInterval(tick, 100);
  }, [cleanup, config.defaultSeconds, tick]);

  const pauseTimer = useCallback(() => {
    if (!isRunning || isPaused) return;
    cleanup();
    setIsPaused(true);
    // Store remaining time
    const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
    setTimeLeft(remaining);
  }, [cleanup, isRunning, isPaused]);

  const resumeTimer = useCallback(() => {
    if (!isPaused) return;
    setIsPaused(false);
    endTimeRef.current = Date.now() + timeLeft * 1000;
    intervalRef.current = setInterval(tick, 100);
  }, [isPaused, timeLeft, tick]);

  const resetTimer = useCallback(() => {
    cleanup();
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setTotalTime(0);
  }, [cleanup]);

  const updateConfig = useCallback((updates: Partial<RestTimerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, [setConfig]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const percentage = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return {
    timeLeft,
    totalTime,
    isRunning,
    isPaused,
    percentage,
    config,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateConfig,
  };
}
