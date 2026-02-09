"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  Calendar,
  Dumbbell,
  Plus,
  TrendingUp,
  Target,
  Utensils,
  Users,
  Trophy,
  ChevronRight,
  LogOut,
  Lightbulb,
  Play,
  Clock,
  Flame,
  Heart,
  Brain,
  Zap,
  Moon,
  Shield,
  Smile,
  Info,
  BarChart3,
  Droplets,
  Check,
  Sparkles,
  Scale,
  Layers,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDailyTracker } from "@/hooks/useDailyTracker";
import BodyMapModal from "@/components/BodyMapModal";
import BodyPartGrid from "@/components/BodyPartGrid";
import AIAssistantCard from "@/components/AIAssistantCard";
import TodayOverview from "@/components/dashboard/TodayOverview";
import TodayWorkouts from "@/components/dashboard/TodayWorkouts";
import QuickPlannerButton from "@/components/dashboard/QuickPlannerButton";
import DailyTrackerSection from "@/components/dashboard/DailyTrackerSection";
import WorkoutPlannerModal from "@/components/dashboard/WorkoutPlannerModal";
import FoodLogModal from "@/components/dashboard/FoodLogModal";
import NutrientGoalsModal from "@/components/dashboard/NutrientGoalsModal";
import EquipmentModal from "@/components/dashboard/EquipmentModal";
import WorkoutHoverPreview from "@/components/dashboard/WorkoutHoverPreview";
import GoalsSection from "@/components/dashboard/GoalsSection";
import AddGoalModal from "@/components/dashboard/AddGoalModal";
import WorkoutMoodTracker from "@/components/dashboard/WorkoutMoodTracker";
import PeriodOverview from "@/components/dashboard/PeriodOverview";
import { BodyPart, WorkoutSession, ScheduledWorkout } from "@/types";
import { MobileNav } from "@/components/MobileNav";
import { usePlan } from "@/hooks/usePlan";
import { useGoals } from "@/hooks/useGoals";
import { useWorkoutPostProcess } from "@/hooks/useWorkoutPostProcess";
import PenaltyDashboardWidget from "@/components/penalty/PenaltyDashboardWidget";
import LevelBadge from "@/components/penalty/LevelBadge";
import DebtCounter from "@/components/penalty/DebtCounter";
import QuestBoard from "@/components/quest/QuestBoard";
import { useQuests } from "@/hooks/useQuests";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const workoutTypeIcons: Record<string, { color: string; icon: LucideIcon }> = {
  strength: { color: "#ff6b35", icon: Dumbbell },
  cardio: { color: "#3b82f6", icon: Target },
  flexibility: { color: "#8b5cf6", icon: Clock },
  rest: { color: "#10b981", icon: Clock },
  hiit: { color: "#f59e0b", icon: Flame },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history] = useLocalStorage<WorkoutSession[]>("workout_history", []);
  const [scheduledWorkouts, setScheduledWorkouts, isHydrated] = useLocalStorage<ScheduledWorkout[]>("scheduled_workouts", []);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const { activeWorkoutPlan, activeWorkoutPlanId, currentWeekNumber } = usePlan();
  const [showPlanner, setShowPlanner] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showEquipment, setShowEquipment] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showNutrientGoalsModal, setShowNutrientGoalsModal] = useState(false);
  const [hoveredWorkoutId, setHoveredWorkoutId] = useState<string | null>(null);
  const [userEquipment, setUserEquipment] = useLocalStorage<string[]>("user_equipment", ["Vlastní váha"]);
  const tracker = useDailyTracker();
  const goals = useGoals();
  const { runPenaltyCheck, currentStreak } = useWorkoutPostProcess();
  const questSystem = useQuests();

  // Run penalty check on dashboard load
  useEffect(() => {
    if (!isHydrated) return;
    runPenaltyCheck();
  }, [isHydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-progress quest objectives (streak, hydration, sleep, nutrition)
  useEffect(() => {
    if (!tracker.isHydrated || questSystem.activeQuests.length === 0) return;
    const proteinMet = tracker.nutrientGoals.protein > 0
      && tracker.todayNutrients.protein >= tracker.nutrientGoals.protein;
    questSystem.checkAutoProgress({
      currentStreak,
      waterPercentage: tracker.waterPercentage,
      sleepHours: tracker.todaySleep?.hours ?? null,
      proteinMet,
    });
  }, [tracker.isHydrated, tracker.waterPercentage, tracker.todaySleep?.hours, tracker.todayNutrients.protein]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize date and always seed tomorrow's workouts if missing
  useEffect(() => {
    if (!isHydrated) return;
    const now = new Date();
    setToday(now);

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const hasTomorrowWorkout = scheduledWorkouts.some(w => w.date === tomorrowStr);
    if (!hasTomorrowWorkout) {
      const weak = getWeakBodyParts();
      // Prioritize goal body parts
      const goalParts = goals.activeGoals
        .map(g => bodyPartsData.find(p => p.id === g.bodyPartId))
        .filter(Boolean) as typeof bodyPartsData;
      const nonGoalWeak = weak.filter(w => !goalParts.some(g => g.id === w.id));
      // Goal parts get 3 exercises, others get 2
      const seedParts = goalParts.length > 0
        ? goalParts
        : (weak.length > 0 ? weak.slice(0, 2) : bodyPartsData.slice(0, 2));
      const seedExercises = seedParts.flatMap(p => {
        const isGoalPart = goalParts.some(g => g.id === p.id);
        return p.exercises.slice(0, isGoalPart ? 3 : 2).map(e => e.name);
      });
      const seedTitle = seedParts.map(p => p.name).join(" + ");

      const seedWorkouts: ScheduledWorkout[] = [
        {
          id: `seed-${tomorrowStr}-1`,
          date: tomorrowStr,
          title: seedTitle,
          type: "strength",
          duration: 60,
          completed: false,
          exercises: seedExercises,
          aiGenerated: true,
        },
      ];

      // Add a second light workout if there are enough weak parts
      if (weak.length > 2) {
        const extraParts = weak.slice(2, 4);
        seedWorkouts.push({
          id: `seed-${tomorrowStr}-2`,
          date: tomorrowStr,
          title: extraParts.map(p => p.name).join(" + ") + " (Doplňkový)",
          type: "strength",
          duration: 30,
          completed: false,
          exercises: extraParts.flatMap(p => p.exercises.slice(0, 1).map(e => e.name)),
          aiGenerated: true,
        });
      }

      setScheduledWorkouts((prev) => [...prev, ...seedWorkouts]);
    }
  }, [isHydrated]);

  const handlePartClick = (part: BodyPart) => {
    setSelectedBodyPart(part);
    setIsModalOpen(true);
  };

  const handleStartWorkout = (workout: ScheduledWorkout) => {
    if (!workout.exercises || workout.exercises.length === 0) {
      router.push("/workout/new");
      return;
    }
    // Resolve exercise names to IDs via bodyPartsData
    const exerciseIds: string[] = [];
    for (const exName of workout.exercises) {
      for (const part of bodyPartsData) {
        const found = part.exercises.find(
          (e) => e.name.toLowerCase() === exName.toLowerCase()
        );
        if (found) {
          exerciseIds.push(found.id);
          break;
        }
        // Fallback: if exName matches a body part name, take first 2 exercises
        if (part.name.toLowerCase() === exName.toLowerCase()) {
          part.exercises.slice(0, 2).forEach((e) => exerciseIds.push(e.id));
          break;
        }
      }
    }
    if (exerciseIds.length > 0) {
      router.push(`/workout/new?exercises=${exerciseIds.join(",")}`);
    } else {
      router.push("/workout/new");
    }
  };

  const handleCreateWorkout = (workout: ScheduledWorkout) => {
    setScheduledWorkouts((prev) => [...prev, workout]);
  };

  const handleDeleteWorkout = (id: string) => {
    setScheduledWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  const handleEditWorkout = (updated: ScheduledWorkout) => {
    setScheduledWorkouts((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Activity, active: true },
    { label: "Historie", href: "/dashboard/history", icon: Clock },
    { label: "Akademie", href: "/dashboard/akademie", icon: BookOpen },
    { label: "Jídelníčky", href: "/dashboard/jidelnicky", icon: Utensils },
    { label: "Plány", href: "/dashboard/treninkove-plany", icon: Calendar },
  ];

  const recentWorkouts = history
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .map(s => ({
      title: s.title,
      date: new Date(s.date).toLocaleDateString("cs-CZ"),
      duration: `${s.duration} min`,
      color: "#ff6b35"
    }));

  const quickLinks = [
    { label: "Nový trénink", href: "/workout/new", icon: Plus, color: "#ff6b35" },
    { label: "Akademie", href: "/dashboard/akademie", icon: BookOpen, color: "#8b5cf6" },
    { label: "Knihovna cviků", href: "/exercises", icon: Dumbbell, color: "#3b82f6" },
    { label: "Kalendář", href: "/dashboard/calendar", icon: Calendar, color: "#8b5cf6" },
    { label: "Můj progres", href: "/dashboard/progress", icon: TrendingUp, color: "#10b981" },
    { label: "Hydratace", href: "/dashboard/supplements", icon: Droplets, color: "#3b82f6" },
    { label: "Výzvy", href: "/dashboard/challenges", icon: Trophy, color: "#f59e0b" },
    { label: "Jídelníček", href: "/dashboard/jidelnicky", icon: Utensils, color: "#10b981" },
  ];

  const exerciseBenefits = [
    {
      icon: Heart,
      title: "Zdravé srdce",
      description: "Pravidelný trénink snižuje riziko srdečních chorob až o 35%",
      color: "#ef4444",
    },
    {
      icon: Brain,
      title: "Lepší mysl",
      description: "Cvičení zvyšuje produkci endorfinů a zlepšuje paměť",
      color: "#8b5cf6",
    },
    {
      icon: Zap,
      title: "Více energie",
      description: "Aktivní lidé mají o 20% více energie během dne",
      color: "#f59e0b",
    },
    {
      icon: Moon,
      title: "Kvalitní spánek",
      description: "Trénink zlepšuje kvalitu spánku a regeneraci těla",
      color: "#3b82f6",
    },
    {
      icon: Shield,
      title: "Silná imunita",
      description: "Pravidelný pohyb posiluje imunitní systém",
      color: "#10b981",
    },
    {
      icon: Smile,
      title: "Lepší nálada",
      description: "Cvičení snižuje stres a příznaky deprese",
      color: "#ec4899",
    },
  ];

  const weakParts = getWeakBodyParts();

  // Get upcoming workouts for mini calendar - memoized to prevent hydration issues
  const upcomingWorkouts = useMemo(() => {
    if (!today) return [];
    return scheduledWorkouts
      .filter(w => !w.completed && new Date(w.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, showAllUpcoming ? 10 : 3);
  }, [scheduledWorkouts, today, showAllUpcoming]);

  const todaysWorkouts = useMemo(() => {
    if (!today) return [];
    return scheduledWorkouts.filter(w => w.date === today.toISOString().split("T")[0]);
  }, [scheduledWorkouts, today]);

  // Get workouts for next 7 days grouped by day
  const weekDays = useMemo(() => {
    if (!today) return [];
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      return {
        date,
        dateStr: date.toISOString().split("T")[0],
        dayName: date.toLocaleDateString("cs-CZ", { weekday: "short" }),
        dayNum: date.getDate(),
        isToday: i === 0,
      };
    });
  }, [today]);

  // Next upcoming workout
  const nextWorkout = useMemo(() => {
    if (!today) return null;
    return scheduledWorkouts
      .filter(w => !w.completed && new Date(w.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;
  }, [scheduledWorkouts, today]);

  // Calculate overall progress
  const overallProgress = Math.round(
    bodyPartsData.reduce((acc, part) => acc + part.progress, 0) / bodyPartsData.length
  );

  // Goal-aware logic
  const goalConfig = {
    lose_weight: {
      title: "Cesta za lehčím já",
      color: "#ef4444",
      icon: Flame,
      stats: [
        { label: "Spáleno", value: "3.2k", unit: "kcal", icon: Flame, color: "#ef4444" },
        { label: "Váha", value: "-2.4", unit: "kg", icon: Scale, color: "#3b82f6" },
        { label: "Kardio", value: "120", unit: "min", icon: Activity, color: "#10b981" },
        { label: "Voda", value: "2.5", unit: "l", icon: Droplets, color: "#06b6d4" },
      ],
      focusTask: "Dnes se zaměř na 20 min svižné chůze navíc. Každý krok se počítá!",
      insight: "Tvoje kalorické okno je dnes na 80 %. Skvělá práce s disciplínou!"
    },
    gain_muscle: {
      title: "Budování síly a objemu",
      color: "#ff6b35",
      icon: Dumbbell,
      stats: [
        { label: "Objem", value: "12.5", unit: "t", icon: Dumbbell, color: "#ff6b35" },
        { label: "Proteiny", value: "165", unit: "g", icon: Utensils, color: "#8b5cf6" },
        { label: "Série", value: "48", unit: "tento týden", icon: Layers, color: "#10b981" },
        { label: "Váha", value: "+1.2", unit: "kg", icon: TrendingUp, color: "#3b82f6" },
      ],
      focusTask: "Dnes zkus přidat 2.5 kg na svůj hlavní cvik. Progresivní přetížení je klíč!",
      insight: "Tvé tělo regeneruje skvěle. Dnes je ideální čas na těžký Push Day."
    },
    strength: {
      title: "Cesta k maximální síle",
      color: "#8b5cf6",
      icon: Zap,
      stats: [
        { label: "Power Score", value: "750", unit: "pts", icon: Zap, color: "#8b5cf6" },
        { label: "1RM Bench", value: "110", unit: "kg", icon: Trophy, color: "#f59e0b" },
        { label: "Objem", value: "8.2", unit: "t", icon: Dumbbell, color: "#ff6b35" },
        { label: "Regenerace", value: "92", unit: "%", icon: Heart, color: "#ef4444" },
      ],
      focusTask: "Soustřeď se na techniku u dřepů. Kvalita nad kvantitou.",
      insight: "Tvá nervová soustava je připravena na nový osobní rekord!"
    },
    default: {
      title: "Tvoje fitness cesta",
      color: "#ff6b35",
      icon: Target,
      stats: [
        { label: "Tento týden", value: "3", unit: "tréninky", icon: Activity, color: "#3b82f6" },
        { label: "Progres", value: "+2.5", unit: "%", icon: TrendingUp, color: "#10b981" },
        { label: "Kalorie", value: "12.4k", unit: "kcal", icon: Flame, color: "#ff6b35" },
        { label: "Streak", value: "7", unit: "dní", icon: Target, color: "#8b5cf6" },
      ],
      focusTask: "Dodržuj svůj plán a výsledky se dostaví. Kontinuita je základ.",
      insight: "Vedeš si skvěle! Udržuj toto tempo a do měsíce uvidíš velkou změnu."
    }
  };

  const currentGoal = user?.primaryGoal && goalConfig[user.primaryGoal as keyof typeof goalConfig] 
    ? goalConfig[user.primaryGoal as keyof typeof goalConfig] 
    : goalConfig.default;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold hidden sm:block">LazorikGym</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      item.active
                        ? "bg-[#ff6b35]/10 text-[#ff6b35]"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <LevelBadge size="sm" showName={false} />
              </div>
              <DebtCounter compact />
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || "Host"}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <Link href="/dashboard/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || "H"}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-24 lg:pb-12">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>

          {/* 1. Mise (Quest Board) */}
          <QuestBoard
            activeQuests={questSystem.activeQuests}
            availableTemplates={questSystem.availableTemplates}
            onStartQuest={questSystem.startQuest}
            onAbandonQuest={questSystem.abandonQuest}
            onCompleteQuest={questSystem.completeQuest}
          />

          {/* 2. Dnešní tréninky */}
          <div className="mb-10">
            <TodayWorkouts
              scheduledWorkouts={scheduledWorkouts}
              onStartWorkout={handleStartWorkout}
              onOpenPlanner={() => setShowPlanner(true)}
              onDeleteWorkout={handleDeleteWorkout}
              onEditWorkout={handleEditWorkout}
            />
          </div>

          {/* 3. Cíle */}
          <div className="mb-10">
            <GoalsSection
              goals={goals.activeGoals}
              canAddGoal={goals.canAddGoal}
              onAddGoal={() => setShowGoalModal(true)}
              onRemoveGoal={goals.removeGoal}
              onStartGoalWorkout={handleStartWorkout}
              onRateGoal={goals.rateGoal}
            />
          </div>

          {/* 4. Tréninková nálada (Motivace / Lenost) */}
          <div className="mb-10">
            <WorkoutMoodTracker />
          </div>

          {/* 5. Denní / Měsíční / Roční přehled */}
          <div className="mb-10">
            <PeriodOverview />
          </div>

          {/* 6. Daily Tracker (jídlo, voda, spánek, nálada) */}
          <div className="mb-10">
            <DailyTrackerSection
              todayFood={tracker.todayFood}
              todayCalories={tracker.todayCalories}
              todayNutrients={tracker.todayNutrients}
              nutrientGoals={tracker.nutrientGoals}
              todayWater={tracker.todayWater}
              waterPercentage={tracker.waterPercentage}
              dailyWaterGoal={tracker.dailyWaterGoal}
              todaySleep={tracker.todaySleep}
              todayMoodEntry={tracker.todayMoodEntry}
              onOpenFoodModal={() => setShowFoodModal(true)}
              onOpenGoalsModal={() => setShowNutrientGoalsModal(true)}
              onRemoveFoodEntry={tracker.removeFoodEntry}
              onAddWater={tracker.addWater}
              onSetSleep={tracker.setSleep}
              onSetMood={tracker.setMood}
            />
          </div>

          {/* Quick Planner Button */}
          <div className="mb-10">
            <QuickPlannerButton onClick={() => setShowPlanner(true)} />
          </div>

          {/* Today Overview Stats */}
          <div className="mb-10">
            <TodayOverview
              calories={tracker.todayCalories}
              waterPercentage={tracker.waterPercentage}
              sleepHours={tracker.todaySleep?.hours ?? null}
              mood={tracker.todayMoodEntry?.mood ?? null}
              todayWorkoutsCount={todaysWorkouts.length}
              isHydrated={tracker.isHydrated}
            />
          </div>

          {/* Welcome & Focus Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl font-black mb-3 tracking-tight">
                  Ahoj, {user?.name?.split(' ')[0] || 'sportovče'} 👋
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentGoal.color }} />
                  <p className="text-gray-400 text-xl font-medium">{currentGoal.title}</p>
                </div>
              </div>

              {/* Focus Task Widget */}
              <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl max-w-sm relative overflow-hidden group hover:border-[#ff6b35]/30 transition-all">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b35]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest mb-1">Dnešní Focus</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{currentGoal.focusTask}</p>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#ff6b35]/5 rounded-full blur-2xl group-hover:bg-[#ff6b35]/10 transition-all" />
              </div>
            </div>

            {/* Smart Insight Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5 rounded-2xl flex items-center gap-4 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm font-medium text-blue-200">
                <span className="text-blue-400 font-bold mr-2">AI Insight:</span>
                {currentGoal.insight}
              </p>
            </motion.div>
          </div>

          {/* Dynamic Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 stagger-children">
            {currentGoal.stats.map((stat, i) => (
              <div
                key={i}
                className="premium-stat-card p-6 group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 icon-gradient transition-transform duration-300 group-hover:scale-110"
                  >
                    <stat.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold value-shimmer">{stat.value}</span>
                  <span className="text-gray-500 text-sm">{stat.unit}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{stat.label}</p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-16">

              {/* Wizard Promo Banner */}
              <section className="relative group">
                <Link href="/wizard">
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#ff6b35] via-[#e53935] to-[#8b5cf6] overflow-hidden relative shadow-2xl shadow-[#ff6b35]/20">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-4">
                          <Sparkles className="w-3 h-3" />
                          Novinka
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          Body Diagnostics 2.0
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-md">
                          Nech si sestavit tréninkový plán na míru podle tvých slabin a cílů.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <Brain className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white">Chytrá analýza</span>
                          </div>
                          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <Target className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium text-white">Slabé partie</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-40 h-40 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 group-hover:scale-105 transition-transform duration-500">
                          <TrendingUp className="w-20 h-20 md:w-28 md:h-28 text-white animate-pulse" />
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl" />
                  </div>
                </Link>
              </section>

              {/* Body Part Grid */}
              <section>
                <BodyPartGrid />
              </section>

              {/* Přehled všech partií */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Přehled všech partií</h2>
                      <p className="text-sm text-gray-500">Celkový progres: {overallProgress}%</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {bodyPartsData.map((part) => {
                    const isWeak = part.progress < 45;
                    const isStrong = part.progress >= 60;

                    return (
                      <button
                        key={part.id}
                        onClick={() => handlePartClick(part)}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b35]/30 transition-all text-left group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${part.color}20` }}
                          >
                            <Dumbbell className="w-6 h-6" style={{ color: part.color }} />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg group-hover:text-[#ff6b35] transition-colors">
                                {part.name}
                              </h3>
                              {isWeak && (
                                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-[10px] font-bold text-white">
                                  Priorita
                                </span>
                              )}
                              {isStrong && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                                  Silná
                                </span>
                              )}
                            </div>

                            {/* Progress bar */}
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isWeak
                                      ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                                      : "bg-gradient-to-r from-emerald-500 to-green-500"
                                  }`}
                                  style={{ width: `${part.progress}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold min-w-[3rem] text-right ${
                                isWeak ? "text-[#ff6b35]" : "text-emerald-400"
                              }`}>
                                {part.progress}%
                              </span>
                            </div>

                            {/* Exercises count */}
                            <p className="text-xs text-gray-500 mt-2">
                              {part.exercises.length} cviků • {part.exercises.slice(0, 2).map(e => e.name).join(", ")}
                              {part.exercises.length > 2 && "..."}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#ff6b35] transition-colors flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Next Workout */}
              <section>
                <div className={`p-10 rounded-3xl relative overflow-hidden ${
                  nextWorkout?.planId
                    ? "bg-gradient-to-br from-[#8b5cf6] to-[#6366f1]"
                    : "bg-gradient-to-br from-[#ff6b35] to-[#e53935]"
                }`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-white/60" />
                      <span className="text-white/60">Další trénink</span>
                      {nextWorkout?.planId && (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Z plánu
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                      {nextWorkout?.title || "Žádný naplánovaný trénink"}
                    </h2>
                    <p className="text-white/70 text-lg mb-8">
                      {nextWorkout ? (
                        <>
                          {nextWorkout.exercises?.join(", ") || workoutTypeIcons[nextWorkout.type]?.color ? `${nextWorkout.type === "strength" ? "Posilování" : nextWorkout.type === "cardio" ? "Kardio" : nextWorkout.type}` : "Trénink"}
                          {" • ~"}{nextWorkout.duration} min
                          {nextWorkout.date && ` • ${new Date(nextWorkout.date).toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "short" })}`}
                        </>
                      ) : (
                        "Naplánuj si svůj další trénink v kalendáři"
                      )}
                    </p>
                    <Link href={nextWorkout ? "/workout/new" : "/dashboard/calendar"}>
                      <button className={`px-8 py-4 rounded-2xl bg-white font-bold text-lg flex items-center gap-3 hover:bg-white/90 transition-colors shadow-xl ${
                        nextWorkout?.planId ? "text-[#8b5cf6]" : "text-[#ff6b35]"
                      }`}>
                        <Play className="w-6 h-6" />
                        {nextWorkout ? "Zahájit trénink" : "Naplánovat trénink"}
                      </button>
                    </Link>
                  </div>
                  <Dumbbell className="absolute -right-12 -bottom-12 w-56 h-56 text-white/10 rotate-12" />
                </div>
              </section>

              {/* Benefity cvičení */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Proč cvičit?</h2>
                    <p className="text-sm text-gray-500">Benefity pravidelného tréninku</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exerciseBenefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${benefit.color}15` }}
                      >
                        <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Zaměřit se na - slabé partie */}
              {weakParts.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Zaměřit se na</h2>
                      <p className="text-sm text-gray-500">{weakParts.length} partie potřebují pozornost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {weakParts.slice(0, 6).map((part) => (
                      <button
                        key={part.id}
                        onClick={() => handlePartClick(part)}
                        className="text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b35]/30 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold group-hover:text-[#ff6b35] transition-colors">
                            {part.name}
                          </span>
                          <span className="text-[#ff6b35] font-bold">{part.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                            style={{ width: `${part.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          {part.exercises.length} doporučených cviků
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-10">

              {/* XP & Penalty Widget */}
              <PenaltyDashboardWidget />

              {/* AI Assistant */}
              <AIAssistantCard weakBodyParts={weakParts} />

              {/* Active Plan Widget */}
              {activeWorkoutPlan && (
                <section className="p-5 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#6366f1]/5 border border-[#8b5cf6]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-[#8b5cf6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold truncate">{activeWorkoutPlan.name}</h3>
                      <p className="text-xs text-gray-500">{activeWorkoutPlan.splitType}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">Týden {currentWeekNumber}</span>
                    <span className="text-xs font-bold text-[#8b5cf6]">
                      {scheduledWorkouts.filter(w => w.planId === activeWorkoutPlanId && w.completed).length}/
                      {activeWorkoutPlan.weeklySchedule?.filter(d => !d.isRest).length || 0} dnů
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-full transition-all"
                      style={{
                        width: `${
                          activeWorkoutPlan.weeklySchedule?.filter(d => !d.isRest).length
                            ? Math.round(
                                (scheduledWorkouts.filter(w => w.planId === activeWorkoutPlanId && w.completed).length /
                                  activeWorkoutPlan.weeklySchedule.filter(d => !d.isRest).length) *
                                  100
                              )
                            : 0
                        }%`
                      }}
                    />
                  </div>
                  <Link href="/dashboard/treninkove-plany">
                    <button className="w-full py-2 text-xs text-[#8b5cf6] font-bold hover:underline flex items-center justify-center gap-1">
                      Zobrazit plán
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </Link>
                </section>
              )}

              {/* Quick Links */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                  Rychlé akce
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${link.color}15` }}
                      >
                        <link.icon className="w-6 h-6" style={{ color: link.color }} />
                      </div>
                      <span className="text-sm font-medium group-hover:text-white transition-colors text-gray-400">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Mini Calendar / Upcoming Workouts */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Kalendář
                  </h2>
                  <Link href="/dashboard/calendar" className="text-xs text-[#ff6b35] font-medium hover:underline flex items-center gap-1">
                    Celý kalendář
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Weekly overview */}
                <div className="mb-6">
                  {!today ? (
                    // Loading skeleton
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-white/[0.02] animate-pulse">
                          <div className="w-6 h-3 bg-white/10 rounded mb-1" />
                          <div className="w-5 h-5 bg-white/10 rounded-full" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {weekDays.map((day, i) => {
                        const dayWorkouts = scheduledWorkouts.filter(w => w.date === day.dateStr);
                        const hasWorkout = dayWorkouts.length > 0;
                        const allCompleted = hasWorkout && dayWorkouts.every(w => w.completed);

                        return (
                          <Link
                            key={i}
                            href="/dashboard/calendar"
                            className={`
                              flex flex-col items-center p-2 rounded-xl transition-all cursor-pointer
                              ${day.isToday 
                                ? "bg-[#ff6b35]/20 border border-[#ff6b35]/50" 
                                : "bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10"
                              }
                            `}
                          >
                            <span className={`text-[10px] uppercase font-medium mb-1 ${day.isToday ? "text-[#ff6b35]" : "text-gray-500"}`}>
                              {day.dayName}
                            </span>
                            <span className={`text-sm font-bold mb-1 ${day.isToday ? "text-white" : "text-gray-300"}`}>
                              {day.dayNum}
                            </span>
                            {hasWorkout && (
                              <div className="flex gap-0.5">
                                {dayWorkouts.slice(0, 2).map((w, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-1 h-1 rounded-full ${w.completed ? "bg-[#10b981]" : "bg-[#ff6b35]"}`}
                                  />
                                ))}
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Today's summary */}
                  {todaysWorkouts.length > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#ff6b35]/10 to-transparent border border-[#ff6b35]/20 mb-4">
                      <p className="text-xs text-gray-400 mb-2">Dnešní tréninky</p>
                      <div className="space-y-2">
                        {todaysWorkouts.map((workout) => {
                          const typeInfo = workoutTypeIcons[workout.type];
                          const TypeIcon = typeInfo?.icon || Dumbbell;
                          return (
                            <div key={workout.id} className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${typeInfo?.color}20` }}
                              >
                                <TypeIcon className="w-3 h-3" style={{ color: typeInfo?.color }} />
                              </div>
                              <span className="text-sm font-medium truncate flex-1">{workout.title}</span>
                              {workout.completed && <Check className="w-4 h-4 text-[#10b981]" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Upcoming workouts list */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Nadcházející</p>
                  <AnimatePresence mode="popLayout">
                    {upcomingWorkouts.length > 0 ? (
                      upcomingWorkouts.map((workout, i) => {
                        const typeInfo = workoutTypeIcons[workout.type];
                        const TypeIcon = typeInfo?.icon || Dumbbell;
                        const workoutDate = new Date(workout.date);
                        const isToday = today ? workoutDate.toDateString() === today.toDateString() : false;
                        const isTomorrow = today ? new Date(today.getTime() + 86400000).toDateString() === workoutDate.toDateString() : false;
                        const isHovered = hoveredWorkoutId === workout.id;

                        return (
                          <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: i * 0.05 }}
                            className="relative"
                            onMouseEnter={() => setHoveredWorkoutId(workout.id)}
                            onMouseLeave={() => setHoveredWorkoutId(null)}
                          >
                            <Link href="/dashboard/calendar">
                              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                isHovered
                                  ? "bg-white/[0.06] border-white/15"
                                  : "bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-white/10"
                              }`}>
                                {/* Date badge */}
                                <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-white/5 flex-shrink-0">
                                  <span className="text-[10px] text-gray-500 uppercase">
                                    {isToday ? "DNES" : isTomorrow ? "ZÍTRA" : workoutDate.toLocaleDateString("cs-CZ", { weekday: "narrow" })}
                                  </span>
                                  <span className="text-sm font-bold">{workoutDate.getDate()}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-sm truncate">{workout.title}</p>
                                    {workout.aiGenerated && (
                                      <Sparkles className="w-3 h-3 text-[#8b5cf6] flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {workout.duration} min
                                  </p>
                                </div>

                                {/* Type icon */}
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${typeInfo?.color}15` }}
                                >
                                  <TypeIcon className="w-4 h-4" style={{ color: typeInfo?.color }} />
                                </div>
                              </div>
                            </Link>

                            {/* Hover Preview */}
                            <AnimatePresence>
                              {isHovered && (
                                <WorkoutHoverPreview workout={workout} />
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                          <Calendar className="w-6 h-6 text-gray-600" />
                        </div>
                        <p className="text-sm text-gray-500">Žádné naplánované tréninky</p>
                        <Link href="/dashboard/calendar">
                          <button className="mt-3 text-xs text-[#ff6b35] hover:underline flex items-center gap-1 mx-auto">
                            Naplánovat trénink
                            <Plus className="w-3 h-3" />
                          </button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {today && upcomingWorkouts.length > 0 && upcomingWorkouts.length < scheduledWorkouts.filter(w => !w.completed && new Date(w.date) >= today).length && (
                    <button
                      onClick={() => setShowAllUpcoming(!showAllUpcoming)}
                      className="w-full py-2 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      {showAllUpcoming ? "Zobrazit méně" : "Zobrazit vše"}
                    </button>
                  )}
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Poslední aktivita
                  </h2>
                  <Link href="/dashboard/history" className="text-xs text-[#ff6b35] font-medium hover:underline">Vše</Link>
                </div>
                <div className="space-y-4">
                  {recentWorkouts.map((workout, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${workout.color}15` }}
                        >
                          <Dumbbell className="w-5 h-5" style={{ color: workout.color }} />
                        </div>
                        <div>
                          <h4 className="font-medium">{workout.title}</h4>
                          <p className="text-xs text-gray-500">{workout.date}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{workout.duration}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tip dne */}
              <section className="p-6 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#6366f1]/10 border border-[#8b5cf6]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-sm font-semibold text-[#8b5cf6]">Tip dne</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Nezapomínej na zahřátí před tréninkem! 5-10 minut lehkého kardio a dynamického strečinku
                  sníží riziko zranění a zlepší tvůj výkon.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <MobileNav />

      {/* Modals */}
      <BodyMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodyPart={selectedBodyPart}
      />
      <WorkoutPlannerModal
        isOpen={showPlanner}
        onClose={() => setShowPlanner(false)}
        onCreateWorkout={handleCreateWorkout}
        userEquipment={userEquipment}
        onOpenEquipment={() => setShowEquipment(true)}
      />
      <FoodLogModal
        isOpen={showFoodModal}
        onClose={() => setShowFoodModal(false)}
        onAdd={tracker.addFoodEntry}
      />
      <EquipmentModal
        isOpen={showEquipment}
        onClose={() => setShowEquipment(false)}
        selectedEquipment={userEquipment}
        onSave={setUserEquipment}
      />
      <AddGoalModal
        isOpen={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onCreateGoal={goals.addGoal}
        existingGoalPartIds={goals.existingGoalPartIds}
      />
      <NutrientGoalsModal
        isOpen={showNutrientGoalsModal}
        onClose={() => setShowNutrientGoalsModal(false)}
        currentGoals={tracker.nutrientGoals}
        onSave={tracker.updateNutrientGoals}
      />
    </div>
  );
}
