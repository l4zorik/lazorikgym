"use client";

import React, { useState } from "react";
import { Flame, Trophy, Quote, ChevronRight, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginStreak } from "@/hooks/useLoginStreak";
import {
  getQuoteOfTheDay,
  getRandomQuote,
  getCategoryLabel,
  getAllCategories,
  type MotivationalQuote,
} from "@/lib/motivationalQuotes";

export default function LoginStreakBanner() {
  const { currentStreak, longestStreak, totalLogins } = useLoginStreak();
  const [quote, setQuote] = useState<MotivationalQuote>(getQuoteOfTheDay);
  const [selectedCategory, setSelectedCategory] = useState<MotivationalQuote["category"] | null>(null);
  const [showQuotes, setShowQuotes] = useState(false);

  const handleNewQuote = () => {
    setQuote(getRandomQuote(selectedCategory || undefined));
  };

  const streakColor = currentStreak >= 7 ? "#8b5cf6" : currentStreak >= 3 ? "#f59e0b" : "#ff6b35";
  const streakEmoji = currentStreak >= 30 ? "👑" : currentStreak >= 14 ? "🏆" : currentStreak >= 7 ? "🔥" : currentStreak >= 3 ? "⚡" : "💪";

  return (
    <div className="space-y-4 mb-10">
      {/* Login Streak */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-4 p-4 rounded-2xl border border-white/5"
        style={{ backgroundColor: `${streakColor}08` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${streakColor}20` }}
        >
          <Flame className="w-6 h-6" style={{ color: streakColor }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black" style={{ color: streakColor }}>
              {currentStreak} {currentStreak === 1 ? "den" : currentStreak < 5 ? "dny" : "dní"}
            </span>
            <span className="text-lg">{streakEmoji}</span>
          </div>
          <p className="text-xs text-gray-500">Přihlašovací streak</p>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm font-bold text-white">{longestStreak}</p>
            <p className="text-[10px] text-gray-500">Rekord</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-white">{totalLogins}</p>
            <p className="text-[10px] text-gray-500">Celkem</p>
          </div>
        </div>

        {/* Streak milestones */}
        <div className="hidden sm:flex items-center gap-1.5">
          {[3, 7, 14, 30].map((milestone) => (
            <div
              key={milestone}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border ${
                currentStreak >= milestone
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-white/5 text-gray-600"
              }`}
            >
              {milestone}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative group"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Quote className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200 leading-relaxed italic mb-2">
              &ldquo;{quote.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">— {quote.author}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                {getCategoryLabel(quote.category)}
              </span>
            </div>
          </div>

          {/* Refresh button */}
          <button
            onClick={handleNewQuote}
            className="p-1.5 rounded-lg text-gray-600 hover:text-amber-400 hover:bg-amber-400/10 transition-colors shrink-0"
            title="Nový citát"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Category filter toggle */}
        <button
          onClick={() => setShowQuotes(!showQuotes)}
          className="mt-3 flex items-center gap-1 text-[10px] text-gray-500 hover:text-amber-400 transition-colors"
        >
          Procházet kategorie
          <ChevronRight className={`w-3 h-3 transition-transform ${showQuotes ? "rotate-90" : ""}`} />
        </button>

        {/* Category filter */}
        <AnimatePresence>
          {showQuotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setQuote(getRandomQuote());
                  }}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    !selectedCategory
                      ? "bg-amber-500/20 text-amber-400 font-bold"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Všechny
                </button>
                {getAllCategories().map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setQuote(getRandomQuote(cat));
                    }}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      selectedCategory === cat
                        ? "bg-amber-500/20 text-amber-400 font-bold"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
