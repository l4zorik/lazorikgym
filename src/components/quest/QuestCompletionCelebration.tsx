"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Sparkles } from "lucide-react";

interface QuestCompletionCelebrationProps {
  questTitle: string;
  xpGained: number;
  onClose: () => void;
}

export default function QuestCompletionCelebration({
  questTitle,
  xpGained,
  onClose,
}: QuestCompletionCelebrationProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const colors = ["#ff6b35", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#e53935"];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Confetti particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: p.color, left: `${p.x}%`, top: "-5%" }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: "120vh",
              opacity: [1, 1, 0],
              rotate: Math.random() * 720 - 360,
              x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Center card */}
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
          className="relative p-8 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-red-500/10 border border-yellow-500/30 max-w-sm mx-4 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-yellow-500/5 blur-xl" />

          <div className="relative z-10">
            {/* Trophy icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-yellow-500/30"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">
                  Mise dokončena!
                </span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{questTitle}</h2>
            </motion.div>

            {/* XP gained */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 mt-4"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-xl font-black text-yellow-400">+{xpGained} XP</span>
            </motion.div>

            {/* Close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xs text-gray-500 mt-5"
            >
              Klikni kamkoli pro zavření
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
