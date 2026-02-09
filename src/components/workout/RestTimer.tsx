"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X, RotateCcw } from "lucide-react";

interface RestTimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  percentage: number;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onStartPreset: (seconds: number) => void;
}

const PRESETS = [60, 90, 120];

export default function RestTimer({
  timeLeft,
  totalTime,
  isRunning,
  isPaused,
  percentage,
  onPause,
  onResume,
  onReset,
  onStartPreset,
}: RestTimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // SVG circle params
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  const isWarning = timeLeft <= 10 && timeLeft > 0;

  return (
    <AnimatePresence>
      {(isRunning || isPaused) ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
            isWarning
              ? "bg-red-500/20 border-red-500/30 shadow-red-500/20"
              : "bg-[var(--bg-secondary)]/90 border-white/10 shadow-black/40"
          }`}>
            {/* SVG Circle Timer */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40" cy="40" r={radius}
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"
                />
                <motion.circle
                  cx="40" cy="40" r={radius}
                  fill="none"
                  stroke={isWarning ? "#ef4444" : "#ff6b35"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-black tabular-nums ${isWarning ? "text-red-400" : "text-white"}`}>
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {isPaused ? (
                  <button
                    onClick={onResume}
                    className="w-10 h-10 rounded-xl bg-[#10b981]/20 text-[#10b981] flex items-center justify-center hover:bg-[#10b981]/30 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={onPause}
                    className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center hover:bg-[#f59e0b]/30 transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onReset}
                  className="w-10 h-10 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Preset buttons when timer not running */
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--bg-secondary)]/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40">
            <RotateCcw className="w-4 h-4 text-gray-500" />
            {PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => onStartPreset(preset)}
                className="px-4 py-2 rounded-xl bg-white/5 text-sm font-bold text-gray-300 hover:bg-[#ff6b35]/20 hover:text-[#ff6b35] transition-colors"
              >
                {preset}s
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
