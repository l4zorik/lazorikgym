"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Star,
  Sparkles,
  Crown,
  Flame,
  Target,
  Calendar,
  Zap,
  Award,
  Filter,
  Search,
  Lock,
  ChevronDown,
} from "lucide-react";
import { achievementsData, getAchievementStats, calculateProgress } from "@/lib/achievements";
import { Achievement } from "@/types";
import AchievementCard, { AchievementStats, AchievementGrid } from "@/components/AchievementCard";

// Sample user stats (would come from backend in real app)
const sampleUserStats = {
  totalWorkouts: 23,
  totalMinutes: 1380,
  totalCalories: 11500,
  streak: 7,
  daysActive: 30,
  bodyPartProgress: {
    neck: 30,
    shoulders: 60,
    chest: 50,
    arms: 45,
    abs: 20,
    core: 40,
    back: 55,
    legs: 65,
  },
};

const sampleUnlockedIds = ["first-workout", "five-workouts", "one-hour", "burn-1000", "streak-3"];

export default function AchievementsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  // Get unlocked achievements
  const unlockedAchievements = useMemo(() => {
    return achievementsData.filter((a) => sampleUnlockedIds.includes(a.id));
  }, []);

  // Get locked achievements
  const lockedAchievements = useMemo(() => {
    return achievementsData.filter((a) => !sampleUnlockedIds.includes(a.id));
  }, []);

  // Filter achievements based on search and filters
  const filteredAchievements = useMemo(() => {
    let filtered = [...achievementsData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query)
      );
    }

    // Rarity filter
    if (selectedRarity !== "all") {
      filtered = filtered.filter((a) => a.rarity === selectedRarity);
    }

    // Category filter based on condition type
    if (selectedCategory !== "all") {
      filtered = filtered.filter((a) => {
        switch (selectedCategory) {
          case "workouts":
            return a.condition.type === "workouts";
          case "time":
            return a.condition.type === "minutes";
          case "calories":
            return a.condition.type === "calories";
          case "streak":
            return a.condition.type === "streak";
          case "progress":
            return a.condition.type === "body_part_progress";
          case "consistency":
            return a.condition.type === "days_active";
          default:
            return true;
        }
      });
    }

    // Unlocked filter
    if (showUnlockedOnly) {
      filtered = filtered.filter((a) => sampleUnlockedIds.includes(a.id));
    }

    return filtered;
  }, [searchQuery, selectedRarity, selectedCategory, showUnlockedOnly]);

  // Get stats
  const stats = getAchievementStats(unlockedAchievements);

  // Category options
  const categories = [
    { value: "all", label: "Všechny kategorie", icon: Award },
    { value: "workouts", label: "Tréninky", icon: Target },
    { value: "time", label: "Čas", icon: Calendar },
    { value: "calories", label: "Kalorie", icon: Flame },
    { value: "streak", label: "Série", icon: Zap },
    { value: "progress", label: "Progrese partií", icon: Trophy },
    { value: "consistency", label: "Konzistence", icon: Star },
  ];

  // Rarity options
  const rarities = [
    { value: "all", label: "Všechny rarity", color: "text-gray-400" },
    { value: "common", label: "Běžné", color: "text-gray-400" },
    { value: "rare", label: "Vzácné", color: "text-blue-400" },
    { value: "epic", label: "Epické", color: "text-purple-400" },
    { value: "legendary", label: "Legendární", color: "text-yellow-400" },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#ff6b35]/10 to-[#ff3366]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#8b5cf6]/10 to-[#3b82f6]/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-8">
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/dashboard"
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Achievements</h1>
              <p className="text-gray-400">Sbírej odznaky a odemykej nové cíle</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#ff3366]/10 border border-[#ff6b35]/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[#ff6b35]" />
                </div>
                <span className="text-sm text-gray-400">Získáno</span>
              </div>
              <p className="text-3xl font-bold">{stats.unlocked}</p>
              <p className="text-sm text-gray-500">z {stats.total}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#10b981]" />
                </div>
                <span className="text-sm text-gray-400">Progrese</span>
              </div>
              <p className="text-3xl font-bold">{stats.percentage}%</p>
              <p className="text-sm text-gray-500">dokončeno</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <span className="text-sm text-gray-400">Série</span>
              </div>
              <p className="text-3xl font-bold">{sampleUserStats.streak}</p>
              <p className="text-sm text-gray-500">dní za sebou</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <span className="text-sm text-gray-400">Tréninky</span>
              </div>
              <p className="text-3xl font-bold">{sampleUserStats.totalWorkouts}</p>
              <p className="text-sm text-gray-500">celkem</p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Hledat achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b35]/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none px-5 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff6b35]/50 transition-colors cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-[#1a1a1a]">
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Rarity Filter */}
            <div className="relative">
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="appearance-none px-5 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff6b35]/50 transition-colors cursor-pointer"
              >
                {rarities.map((rarity) => (
                  <option key={rarity.value} value={rarity.value} className="bg-[#1a1a1a]">
                    {rarity.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            {/* Unlocked Only Toggle */}
            <button
              onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
              className={`px-5 py-3 rounded-xl border transition-colors flex items-center gap-2 ${
                showUnlockedOnly
                  ? "bg-[#ff6b35]/20 border-[#ff6b35]/50 text-[#ff6b35]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Lock className="w-5 h-5" />
              <span>Jen odemčené</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="relative z-10 pb-20">
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Recently Unlocked */}
          {unlockedAchievements.length > 0 && !showUnlockedOnly && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Nedávno odemčené
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {unlockedAchievements.slice(0, 5).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AchievementCard
                      achievement={achievement}
                      isUnlocked={true}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Achievements */}
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gray-400" />
              </div>
              {showUnlockedOnly ? "Odemčené achievements" : "Všechny achievements"}
              <span className="ml-auto text-sm text-gray-500">
                {filteredAchievements.length} nalezených
              </span>
            </h2>

            {filteredAchievements.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAchievements.map((achievement, index) => {
                  const isUnlocked = sampleUnlockedIds.includes(achievement.id);
                  const progress = calculateProgress(achievement, sampleUserStats);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
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
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg">Žádné achievements nenalezeny</p>
                <p className="text-gray-600 text-sm mt-2">
                  Zkuste změnit filtry nebo vyhledávací dotaz
                </p>
              </div>
            )}
          </div>

          {/* Rarity Guide */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Crown className="w-6 h-6 text-[#f59e0b]" />
              Průvodce rarity
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  rarity: "common",
                  label: "Běžný",
                  color: "#9ca3af",
                  description: "Snadno získatelné achievementy pro začátečníky",
                  chance: "50%",
                },
                {
                  rarity: "rare",
                  label: "Vzácný",
                  color: "#3b82f6",
                  description: "Vyžadují pravidelnost a odhodlání",
                  chance: "30%",
                },
                {
                  rarity: "epic",
                  label: "Epický",
                  color: "#8b5cf6",
                  description: "Pro oddané sportovce",
                  chance: "15%",
                },
                {
                  rarity: "legendary",
                  label: "Legendární",
                  color: "#f59e0b",
                  description: "Extrémně vzácné, vyžadují mimořádné úsilí",
                  chance: "5%",
                },
              ].map((item) => (
                <div key={item.rarity} className="text-center">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: `${item.color}20`,
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    {item.rarity === "common" && "⭐"}
                    {item.rarity === "rare" && "🏆"}
                    {item.rarity === "epic" && "💎"}
                    {item.rarity === "legendary" && "👑"}
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.label}</h4>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <p
                    className="text-sm font-bold"
                    style={{ color: item.color }}
                  >
                    {item.chance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
