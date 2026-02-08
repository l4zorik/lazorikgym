"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Target,
  Zap,
  Clock,
  Dumbbell,
  Flame,
  Star,
  ChevronRight,
  Lock,
  Check,
  Gift,
  Crown,
  Medal,
  Sword,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MobileNav } from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly" | "special";
  category: "workout" | "nutrition" | "consistency" | "strength";
  target: number;
  current: number;
  unit: string;
  reward: number;
  completed: boolean;
  claimed: boolean;
  deadline?: string;
  difficulty: "easy" | "medium" | "hard" | "epic";
}

const difficultyConfig = {
  easy: { color: "#10b981", icon: Star, label: "Lehká" },
  medium: { color: "#f59e0b", icon: Medal, label: "Střední" },
  hard: { color: "#ef4444", icon: Trophy, label: "Těžká" },
  epic: { color: "#8b5cf6", icon: Crown, label: "Epická" },
};

const categoryConfig = {
  workout: { color: "#ff6b35", icon: Dumbbell, label: "Trénink" },
  nutrition: { color: "#10b981", icon: Target, label: "Výživa" },
  consistency: { color: "#3b82f6", icon: Clock, label: "Konzistence" },
  strength: { color: "#ef4444", icon: Flame, label: "Síla" },
};

const initialChallenges: Challenge[] = [
  {
    id: "daily-workout",
    title: "Denní trénink",
    description: "Dokonči dnes alespoň 30 minut tréninku",
    type: "daily",
    category: "workout",
    target: 30,
    current: 0,
    unit: "min",
    reward: 50,
    completed: false,
    claimed: false,
    difficulty: "easy",
  },
  {
    id: "daily-water",
    title: "Hydratační cíl",
    description: "Vypij dnes alespoň 2.5 litru vody",
    type: "daily",
    category: "nutrition",
    target: 2500,
    current: 0,
    unit: "ml",
    reward: 30,
    completed: false,
    claimed: false,
    difficulty: "easy",
  },
  {
    id: "weekly-3-workouts",
    title: "Týdenní maraton",
    description: "Dokonči tento týden 3 tréninky",
    type: "weekly",
    category: "workout",
    target: 3,
    current: 1,
    unit: "tréninky",
    reward: 150,
    completed: false,
    claimed: false,
    difficulty: "medium",
  },
  {
    id: "weekly-streak",
    title: "Streak master",
    description: "Udrž 7-denní tréninkovou sérii",
    type: "weekly",
    category: "consistency",
    target: 7,
    current: 4,
    unit: "dny",
    reward: 200,
    completed: false,
    claimed: false,
    difficulty: "medium",
  },
  {
    id: "monthly-20-workouts",
    title: "Měsíční výzva",
    description: "Dokonči tento měsíc 20 tréninků",
    type: "monthly",
    category: "workout",
    target: 20,
    current: 12,
    unit: "tréninky",
    reward: 500,
    completed: false,
    claimed: false,
    difficulty: "hard",
  },
  {
    id: "special-push-ups",
    title: "Klikový král",
    description: "Udělej 100 kliků v jednom tréninku",
    type: "special",
    category: "strength",
    target: 100,
    current: 0,
    unit: "kliky",
    reward: 300,
    completed: false,
    claimed: false,
    difficulty: "epic",
  },
  {
    id: "special-squats",
    title: "Dřepový šampion",
    description: "Udělej 200 dřepů v jednom tréninku",
    type: "special",
    category: "strength",
    target: 200,
    current: 0,
    unit: "dřepy",
    reward: 400,
    completed: false,
    claimed: false,
    difficulty: "epic",
  },
];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>("challenges", initialChallenges);
  const [activeFilter, setActiveFilter] = useState<"all" | "daily" | "weekly" | "monthly" | "special">("all");
  const [userPoints] = useLocalStorage("challenge_points", 0);

  const filteredChallenges = challenges.filter(c => 
    activeFilter === "all" || c.type === activeFilter
  );

  const completedCount = challenges.filter(c => c.completed).length;
  const claimedCount = challenges.filter(c => c.claimed).length;

  const claimReward = (id: string) => {
    setChallenges(challenges.map(c => 
      c.id === id ? { ...c, claimed: true } : c
    ));
  };

  const updateProgress = (id: string, newCurrent: number) => {
    setChallenges(challenges.map(c => {
      if (c.id === id) {
        const completed = newCurrent >= c.target;
        return { ...c, current: newCurrent, completed };
      }
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Výzvy & Questy</h1>
                <p className="text-sm text-gray-500">Plň úkoly a získávej odměny</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935]">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">{userPoints} bodů</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <span className="text-sm text-gray-400">Aktivní</span>
            </div>
            <p className="text-2xl font-bold">
              {challenges.filter(c => !c.completed).length}
            </p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="text-sm text-gray-400">Splněno</span>
            </div>
            <p className="text-2xl font-bold">{completedCount}</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <span className="text-sm text-gray-400">Odměny</span>
            </div>
            <p className="text-2xl font-bold">{claimedCount}</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all", label: "Všechny" },
            { id: "daily", label: "Denní" },
            { id: "weekly", label: "Týdenní" },
            { id: "monthly", label: "Měsíční" },
            { id: "special", label: "Speciální" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white shadow-lg shadow-[#ff6b35]/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredChallenges.map((challenge) => {
              const progress = Math.min((challenge.current / challenge.target) * 100, 100);
              const diffConfig = difficultyConfig[challenge.difficulty];
              const catConfig = categoryConfig[challenge.category];
              const DiffIcon = diffConfig.icon;
              const CatIcon = catConfig.icon;

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card
                    className={`p-5 transition-all ${
                      challenge.completed && !challenge.claimed
                        ? "ring-2 ring-[#10b981]"
                        : challenge.claimed
                        ? "opacity-60"
                        : ""
                    }`}
                    hover={!challenge.claimed}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${catConfig.color}20` }}
                        >
                          <CatIcon className="w-6 h-6" style={{ color: catConfig.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${diffConfig.color}20`, color: diffConfig.color }}
                            >
                              {diffConfig.label}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">{challenge.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#f59e0b]" />
                        <span className="font-semibold text-[#f59e0b]">+{challenge.reward}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">
                          {challenge.current} / {challenge.target} {challenge.unit}
                        </span>
                        <span className="font-semibold">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: challenge.completed
                              ? "linear-gradient(90deg, #10b981, #34d399)"
                              : "linear-gradient(90deg, #ff6b35, #e53935)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {challenge.completed && !challenge.claimed ? (
                        <Button
                          fullWidth
                          className="bg-[#10b981] hover:opacity-90"
                          onClick={() => claimReward(challenge.id)}
                        >
                          <Gift className="w-4 h-4" />
                          Vyzvednout odměnu
                        </Button>
                      ) : challenge.claimed ? (
                        <Button fullWidth disabled className="bg-[#10b981]/50">
                          <Check className="w-4 h-4" />
                          Vyřešeno
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => updateProgress(challenge.id, Math.min(challenge.current + 1, challenge.target))}
                          >
                            <Plus className="w-4 h-4" />
                            +1
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={() => updateProgress(challenge.id, challenge.target)}
                          >
                            <Check className="w-4 h-4" />
                            Hotovo
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredChallenges.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Žádné výzvy</h3>
            <p className="text-gray-500">V této kategorii zatím nejsou žádné výzvy</p>
          </Card>
        )}

        {/* Leaderboard Preview */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Crown className="w-6 h-6 text-[#f59e0b]" />
            Žebříček nejlepších
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              {[
                { name: "Tomáš P.", points: 12500, avatar: "TP" },
                { name: "Lucie M.", points: 11200, avatar: "LM" },
                { name: "David H.", points: 10800, avatar: "DH" },
                { name: "Markéta V.", points: 9500, avatar: "MV" },
                { name: "Petr S.", points: 9200, avatar: "PS" },
              ].map((user, index) => (
                <div
                  key={user.name}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/5"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0
                      ? "bg-yellow-500 text-black"
                      : index === 1
                      ? "bg-gray-300 text-black"
                      : index === 2
                      ? "bg-amber-700 text-white"
                      : "bg-white/10 text-gray-400"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center font-bold text-sm">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#f59e0b]" />
                    <span className="font-bold">{user.points.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
