"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/types";
import { getRarityColor, getRarityLabel, calculateProgress } from "@/lib/achievements";
import { Lock, Star, Trophy, Sparkles, Zap, Crown, Info, Check } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  progress?: number;
  isUnlocked?: boolean;
  showDetails?: boolean;
  onClick?: () => void;
}

const rarityIcons = {
  common: Star,
  rare: Trophy,
  epic: Sparkles,
  legendary: Crown,
};

const rarityGradients = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-500",
};

export default function AchievementCard({
  achievement,
  progress = 0,
  isUnlocked = false,
  showDetails = false,
  onClick,
}: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const RarityIcon = rarityIcons[achievement.rarity];
  const rarityColor = getRarityColor(achievement.rarity);
  const gradient = rarityGradients[achievement.rarity];

  const handleClick = () => {
    if (onClick) onClick();
    setShowTooltip(!showTooltip);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`relative group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Glow effect for unlocked achievements */}
      {isUnlocked && (
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px ${rarityColor}40`,
              `0 0 40px ${rarityColor}60`,
              `0 0 20px ${rarityColor}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ff6b35]/20 to-[#ff3366]/20 blur-xl"
        />
      )}

      {/* Card */}
      <div
        className={`relative p-4 rounded-2xl transition-all duration-300 ${
          isUnlocked
            ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
            : "bg-white/5 border border-white/10 opacity-60"
        }`}
        style={{
          boxShadow: isUnlocked
            ? `0 10px 40px -10px ${rarityColor}40`
            : "none",
        }}
      >
        {/* Icon */}
        <div className="relative mb-3">
          <div
            className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
              isUnlocked
                ? `bg-gradient-to-br ${gradient} shadow-lg`
                : "bg-gray-700 grayscale"
            }`}
          >
            {isUnlocked ? (
              achievement.icon
            ) : (
              <Lock className="w-6 h-6 text-gray-500" />
            )}
          </div>

          {/* Rarity badge */}
          {isUnlocked && (
            <div
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                isUnlocked
                  ? `bg-gradient-to-br ${gradient}`
                  : "bg-gray-600"
              }`}
            >
              <RarityIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Name */}
        <h4
          className={`text-sm font-bold text-center mb-1 transition-colors ${
            isUnlocked ? "text-white" : "text-gray-500"
          }`}
        >
          {achievement.name}
        </h4>

        {/* Rarity label */}
        <p
          className={`text-xs text-center mb-3 ${
            isUnlocked ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {getRarityLabel(achievement.rarity)}
        </p>

        {/* Progress bar */}
        {!isUnlocked && progress > 0 && (
          <div className="mb-3">
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff3366]"
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Unlocked checkmark */}
        {isUnlocked && (
          <div className="flex justify-center">
            <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-[#10b981]" />
            </div>
          </div>
        )}

        {/* Tooltip on hover */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 rounded-xl bg-[#1a1a1a]/95 border border-white/10 backdrop-blur-xl shadow-2xl"
              style={{ pointerEvents: "none" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 bg-gradient-to-br ${gradient}`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-white mb-1">
                    {achievement.name}
                  </h5>
                  <div
                    className="inline-block px-2 py-0.5 rounded-full text-xs mb-2"
                    style={{
                      backgroundColor: `${rarityColor}20`,
                      color: rarityColor,
                    }}
                  >
                    {getRarityLabel(achievement.rarity)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                  {progress > 0 && !isUnlocked && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#ff3366]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(progress)}% dokončeno
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] border-r border-b border-white/10 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Achievement Grid Component
interface AchievementGridProps {
  achievements: Achievement[];
  userStats: {
    totalWorkouts: number;
    totalMinutes: number;
    totalCalories: number;
    streak: number;
    daysActive: number;
    bodyPartProgress?: Record<string, number>;
  };
  unlockedIds?: string[];
  columns?: 2 | 3 | 4 | 5;
}

export function AchievementGrid({
  achievements,
  userStats,
  unlockedIds = [],
  columns = 4,
}: AchievementGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {achievements.map((achievement, index) => {
        const isUnlocked = unlockedIds.includes(achievement.id);
        const progress = calculateProgress(achievement, userStats);

        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <AchievementCard
              achievement={achievement}
              progress={progress}
              isUnlocked={isUnlocked}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Achievement Stats Component
interface AchievementStatsProps {
  total: number;
  unlocked: number;
  byRarity: Record<string, number>;
  percentage: number;
}

export function AchievementStats({
  total,
  unlocked,
  byRarity,
  percentage,
}: AchievementStatsProps) {
  const rarityStats = [
    { key: "common", label: "Běžné", icon: Star, color: "text-gray-400" },
    { key: "rare", label: "Vzácné", icon: Trophy, color: "text-blue-400" },
    { key: "epic", label: "Epické", icon: Sparkles, color: "text-purple-400" },
    { key: "legendary", label: "Legendární", icon: Crown, color: "text-yellow-400" },
  ];

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Achievements</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#ff6b35]">{unlocked}</p>
          <p className="text-sm text-gray-500">z {total}</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Celkový pokrok</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ff3366]"
          />
        </div>
      </div>

      {/* Rarity breakdown */}
      <div className="space-y-3">
        {rarityStats.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5"
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm text-gray-300">{label}</span>
            </div>
            <span className={`font-bold ${color}`}>{byRarity[key] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
