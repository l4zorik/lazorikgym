"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Dumbbell,
  Target,
  Check,
  X,
  Sparkles,
  TrendingUp,
  Flame,
  CalendarDays,
  Brain,
  ArrowRight,
  Trash2,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MobileNav } from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ScheduledWorkout } from "@/types";
import { usePlan } from "@/hooks/usePlan";

const workoutTypes = [
  { id: "strength", label: "Posilování", icon: Dumbbell, color: "#ff6b35", bgColor: "bg-[#ff6b35]" },
  { id: "cardio", label: "Kardio", icon: Target, color: "#3b82f6", bgColor: "bg-[#3b82f6]" },
  { id: "flexibility", label: "Flexibilita", icon: Clock, color: "#8b5cf6", bgColor: "bg-[#8b5cf6]" },
  { id: "rest", label: "Odpočinek", icon: Clock, color: "#10b981", bgColor: "bg-[#10b981]" },
  { id: "hiit", label: "HIIT", icon: Flame, color: "#f59e0b", bgColor: "bg-[#f59e0b]" },
];

const intensityLabels = {
  low: { label: "Lehká", color: "#10b981" },
  medium: { label: "Střední", color: "#f59e0b" },
  high: { label: "Vysoká", color: "#ef4444" },
};

const sampleExercises: Record<string, string[]> = {
  strength: ["Bench press", "Squats", "Deadlifts", "Pull-ups", "Shoulder press", "Bicep curls"],
  cardio: ["Běh", "Cyklistika", "Plavání", "Eliptický trenažér", "Rower"],
  hiit: ["Burpees", "Mountain climbers", "Jump squats", "High knees", "Box jumps"],
  flexibility: ["Jóga", "Stretching", "Foam rolling", "Statické protahování"],
  rest: ["Aktivní odpočinek", "Meditace", "Procházka"],
};

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [scheduledWorkouts, setScheduledWorkouts] = useLocalStorage<ScheduledWorkout[]>("scheduled_workouts", []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<ScheduledWorkout | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [weekOffset, setWeekOffset] = useState(0);

  const { activeWorkoutPlan, activeWorkoutPlanId, currentWeekNumber } = usePlan();

  useEffect(() => {
    setCurrentDate(new Date());
    setMounted(true);
  }, []);

  const calendarData = useMemo(() => {
    if (!currentDate) return null;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    return { year, month, daysInMonth, startingDay };
  }, [currentDate]);

  // Week view data
  const weekDays = useMemo(() => {
    if (!currentDate) return [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      return {
        date,
        dateStr,
        dayName: date.toLocaleDateString("cs-CZ", { weekday: "long" }),
        dayShort: date.toLocaleDateString("cs-CZ", { weekday: "short" }),
        dayNum: date.getDate(),
        monthShort: date.toLocaleDateString("cs-CZ", { month: "short" }),
        isToday: dateStr === today.toISOString().split("T")[0],
      };
    });
  }, [currentDate, weekOffset]);

  // Check if current week has plan workouts
  const weekHasPlanWorkouts = useMemo(() => {
    if (!activeWorkoutPlan || weekDays.length === 0) return false;
    return scheduledWorkouts.some(
      w => w.planId === activeWorkoutPlanId && weekDays.some(d => d.dateStr === w.date)
    );
  }, [activeWorkoutPlan, activeWorkoutPlanId, scheduledWorkouts, weekDays]);

  const monthNames = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
    "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
  ];

  const dayNames = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

  const prevMonth = () => {
    if (!currentDate) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    if (!currentDate) return;
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setWeekOffset(0);
  };

  const getWorkoutsForDate = (dateStr: string) => {
    return scheduledWorkouts.filter(w => w.date === dateStr);
  };

  const toggleWorkoutComplete = (id: string) => {
    setScheduledWorkouts(scheduledWorkouts.map(w =>
      w.id === id ? { ...w, completed: !w.completed } : w
    ));
  };

  const addWorkout = (date: string, workout: Omit<ScheduledWorkout, "id" | "date">) => {
    const newWorkout: ScheduledWorkout = {
      ...workout,
      id: Math.random().toString(36).substr(2, 9),
      date,
    };
    setScheduledWorkouts([...scheduledWorkouts, newWorkout]);
  };

  const deleteWorkout = (id: string) => {
    setScheduledWorkouts(scheduledWorkouts.filter(w => w.id !== id));
    if (selectedWorkout?.id === id) {
      setShowDetailModal(false);
      setSelectedWorkout(null);
    }
  };

  // Populate week from active plan
  const populateWeekFromPlan = () => {
    if (!activeWorkoutPlan?.weeklySchedule || weekDays.length === 0) return;

    const newWorkouts: ScheduledWorkout[] = [];
    const planDayNames = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];

    activeWorkoutPlan.weeklySchedule.forEach((planDay, index) => {
      if (planDay.isRest) return;
      const weekDay = weekDays[index];
      if (!weekDay) return;

      // Skip if already has a plan workout for this day
      const existing = scheduledWorkouts.some(
        w => w.date === weekDay.dateStr && w.planId === activeWorkoutPlanId
      );
      if (existing) return;

      newWorkouts.push({
        id: Math.random().toString(36).substr(2, 9),
        date: weekDay.dateStr,
        title: planDay.workout,
        type: "strength",
        duration: parseInt(activeWorkoutPlan.estimatedTime || "60") || 60,
        completed: false,
        intensity: "medium",
        exercises: planDay.muscles,
        planId: activeWorkoutPlanId!,
        planDayIndex: index,
      });
    });

    if (newWorkouts.length > 0) {
      setScheduledWorkouts([...scheduledWorkouts, ...newWorkouts]);
    }
  };

  const { streak, completedThisMonth, totalScheduledThisMonth, completionRate, aiGeneratedCount } = useMemo(() => {
    if (!currentDate) {
      return { streak: 0, completedThisMonth: 0, totalScheduledThisMonth: 0, completionRate: 0, aiGeneratedCount: 0 };
    }

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(today);

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const hasWorkout = scheduledWorkouts.some(w => w.date === dateStr && w.completed);

      if (hasWorkout) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === today.toISOString().split("T")[0]) {
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const completedThisMonth = scheduledWorkouts.filter(w => {
      const wDate = new Date(w.date);
      return w.completed && wDate.getMonth() === month && wDate.getFullYear() === year;
    }).length;

    const totalScheduledThisMonth = scheduledWorkouts.filter(w => {
      const wDate = new Date(w.date);
      return wDate.getMonth() === month && wDate.getFullYear() === year;
    }).length;

    const completionRate = totalScheduledThisMonth > 0
      ? Math.round((completedThisMonth / totalScheduledThisMonth) * 100)
      : 0;

    const aiGeneratedCount = scheduledWorkouts.filter(w => w.aiGenerated).length;

    return {
      streak: currentStreak,
      completedThisMonth,
      totalScheduledThisMonth,
      completionRate,
      aiGeneratedCount
    };
  }, [scheduledWorkouts, currentDate]);

  const handleDayClick = (day: number) => {
    if (!calendarData) return;
    const { year, month } = calendarData;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const workouts = getWorkoutsForDate(dateStr);

    if (workouts.length === 1) {
      setSelectedWorkout(workouts[0]);
      setShowDetailModal(true);
    } else {
      setSelectedDate(dateStr);
      setShowAddModal(true);
    }
  };

  if (!mounted || !currentDate || !calendarData) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-white/10 mb-4"></div>
          <div className="text-gray-500">Načítání kalendáře...</div>
        </div>
      </div>
    );
  }

  const { year, month, daysInMonth, startingDay } = calendarData;

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Kalendář tréninků</h1>
                <p className="text-sm text-gray-500">Plánuj a sleduj své tréninky</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={goToToday}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-medium"
              >
                <CalendarDays className="w-4 h-4" />
                Dnes
              </button>
              <Button
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  setSelectedDate(today);
                  setShowAddModal(true);
                }}
                className="bg-gradient-to-r from-[#ff6b35] to-[#e53935] hover:opacity-90"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Naplánovat trénink</span>
                <span className="sm:hidden">Přidat</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Plan Banner */}
        {activeWorkoutPlan && !weekHasPlanWorkouts && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/15 to-[#6366f1]/10 border border-[#8b5cf6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#8b5cf6]">
                  Plán „{activeWorkoutPlan.name}" je aktivní (Týden {currentWeekNumber})
                </p>
                <p className="text-xs text-gray-400">
                  Tento týden nemáš naplněné tréninky z plánu
                </p>
              </div>
            </div>
            <Button
              onClick={populateWeekFromPlan}
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-sm shrink-0"
            >
              <Layers className="w-4 h-4" />
              Naplnit z plánu
            </Button>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/10 border border-[#ff6b35]/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-xs text-gray-400 uppercase font-semibold">Streak</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{streak}</p>
              <p className="text-xs text-gray-500 mt-1">dní v řadě</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 border border-[#10b981]/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-[#10b981]" />
                <span className="text-xs text-gray-400 uppercase font-semibold">Hotovo</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{completedThisMonth}</p>
              <p className="text-xs text-gray-500 mt-1">tento měsíc</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-xs text-gray-400 uppercase font-semibold">Úspěšnost</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{completionRate}%</p>
              <p className="text-xs text-gray-500 mt-1">dokončeno</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/20 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-xs text-gray-400 uppercase font-semibold">AI Plány</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold">{aiGeneratedCount}</p>
              <p className="text-xs text-gray-500 mt-1">vygenerováno</p>
            </div>
          </motion.div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {viewMode === "month" ? (
              <>
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold min-w-[180px] text-center">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setWeekOffset(w => w - 1)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold min-w-[220px] text-center">
                  {weekDays.length > 0 && (
                    <>
                      {weekDays[0].dayNum}. {weekDays[0].monthShort} – {weekDays[6].dayNum}. {weekDays[6].monthShort}
                    </>
                  )}
                </h2>
                <button
                  onClick={() => setWeekOffset(w => w + 1)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <div className="flex bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "month" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Měsíc
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "week" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Týden
            </button>
          </div>
        </div>

        {viewMode === "month" ? (
          /* Month View */
          <Card className="overflow-hidden border border-white/10">
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.02]">
              {dayNames.map((day) => (
                <div key={day} className="text-center py-3 text-sm font-medium text-gray-400 border-r border-white/5 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr" style={{ minHeight: "600px" }}>
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="border-r border-b border-white/5 last:border-r-0 bg-white/[0.01]" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayWorkouts = getWorkoutsForDate(dateStr);
                const isToday = dateStr === new Date().toISOString().split("T")[0];

                return (
                  <motion.div
                    key={day}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    onClick={() => handleDayClick(day)}
                    className={`
                      min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-white/5 last:border-r-0
                      cursor-pointer transition-colors relative group
                      ${isToday ? "bg-[#ff6b35]/5" : "bg-transparent hover:bg-white/[0.02]"}
                    `}
                  >
                    {/* Today glow */}
                    {isToday && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-[#ff6b35]/40 to-transparent rounded-full" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className={`
                        text-sm font-semibold w-8 h-8 flex items-center justify-center rounded-full relative
                        ${isToday ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/40" : "text-gray-400 group-hover:text-gray-300"}
                      `}>
                        {day}
                        {isToday && (
                          <span className="absolute -bottom-0.5 w-1.5 h-1.5 bg-[#ff6b35] rounded-full animate-pulse" />
                        )}
                      </span>
                      {dayWorkouts.length > 0 && (
                        <span className="text-xs text-gray-500">{dayWorkouts.length}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayWorkouts.slice(0, 3).map((workout, idx) => {
                        const type = workoutTypes.find(t => t.id === workout.type);
                        const isPlanWorkout = !!workout.planId;
                        return (
                          <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWorkout(workout);
                              setShowDetailModal(true);
                            }}
                            className={`
                              text-xs px-2 py-1.5 rounded-md truncate cursor-pointer
                              transition-all hover:scale-[1.02] hover:shadow-lg border-l-2
                              ${workout.completed
                                ? "bg-[#10b981]/20 text-[#10b981] line-through opacity-70"
                                : isPlanWorkout
                                  ? "bg-[#8b5cf6]/15 text-white"
                                  : "bg-white/5 text-white"
                              }
                            `}
                            style={{
                              borderLeftColor: workout.completed
                                ? "#10b981"
                                : isPlanWorkout
                                  ? "#8b5cf6"
                                  : type?.color || "#ff6b35"
                            }}
                          >
                            <div className="flex items-center gap-1">
                              {type && <type.icon className="w-3 h-3 flex-shrink-0" style={{ color: isPlanWorkout ? "#8b5cf6" : type.color }} />}
                              <span className="truncate">{workout.title}</span>
                              {isPlanWorkout && !workout.completed && (
                                <Layers className="w-2.5 h-2.5 text-[#8b5cf6] flex-shrink-0 ml-auto" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                      {dayWorkouts.length > 3 && (
                        <div className="text-xs text-gray-500 px-2 py-1">
                          +{dayWorkouts.length - 3} další
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ff6b35] transition-colors">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        ) : (
          /* Week View */
          <Card className="overflow-hidden border border-white/10">
            <div className="grid grid-cols-7">
              {weekDays.map((day) => {
                const dayWorkouts = getWorkoutsForDate(day.dateStr);
                return (
                  <div
                    key={day.dateStr}
                    className={`border-r border-white/5 last:border-r-0 min-h-[500px] flex flex-col ${
                      day.isToday ? "bg-[#ff6b35]/[0.03]" : ""
                    }`}
                  >
                    {/* Day header */}
                    <div className={`p-3 border-b border-white/5 text-center sticky top-0 ${
                      day.isToday ? "bg-[#ff6b35]/10" : "bg-white/[0.02]"
                    }`}>
                      <div className="text-xs text-gray-500 uppercase font-medium mb-1">
                        {day.dayShort}
                      </div>
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-lg
                        ${day.isToday
                          ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/40"
                          : "text-gray-300"
                        }
                      `}>
                        {day.dayNum}
                        {day.isToday && (
                          <span className="absolute mt-10 w-1.5 h-1.5 bg-[#ff6b35] rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Workouts */}
                    <div className="flex-1 p-2 space-y-2">
                      {dayWorkouts.map((workout) => {
                        const type = workoutTypes.find(t => t.id === workout.type);
                        const isPlanWorkout = !!workout.planId;
                        return (
                          <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => {
                              setSelectedWorkout(workout);
                              setShowDetailModal(true);
                            }}
                            className={`
                              p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02]
                              border-l-3
                              ${workout.completed
                                ? "bg-[#10b981]/15 border-l-[#10b981] opacity-70"
                                : isPlanWorkout
                                  ? "bg-[#8b5cf6]/10 border-l-[#8b5cf6] hover:bg-[#8b5cf6]/20"
                                  : "bg-white/[0.03] hover:bg-white/[0.06]"
                              }
                            `}
                            style={{
                              borderLeftWidth: "3px",
                              borderLeftColor: workout.completed
                                ? "#10b981"
                                : isPlanWorkout
                                  ? "#8b5cf6"
                                  : type?.color || "#ff6b35"
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              {type && (
                                <type.icon
                                  className="w-3.5 h-3.5 flex-shrink-0"
                                  style={{ color: isPlanWorkout ? "#8b5cf6" : type.color }}
                                />
                              )}
                              <span className={`text-xs font-semibold truncate ${workout.completed ? "line-through text-gray-500" : ""}`}>
                                {workout.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-500">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                {workout.duration}m
                              </span>
                              {isPlanWorkout && (
                                <span className="px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold">
                                  Z plánu
                                </span>
                              )}
                            </div>
                            {workout.completed && (
                              <div className="flex items-center gap-1 mt-1 text-[10px] text-[#10b981]">
                                <Check className="w-3 h-3" />
                                Hotovo
                              </div>
                            )}
                          </motion.div>
                        );
                      })}

                      {dayWorkouts.length === 0 && (
                        <button
                          onClick={() => {
                            setSelectedDate(day.dateStr);
                            setShowAddModal(true);
                          }}
                          className="w-full h-20 rounded-xl border border-dashed border-white/10 hover:border-[#ff6b35]/30 hover:bg-[#ff6b35]/5 transition-all flex items-center justify-center text-gray-600 hover:text-[#ff6b35]"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {workoutTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2 text-sm text-gray-400">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: type.color }}
              />
              {type.label}
            </div>
          ))}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-3 h-3 rounded bg-[#8b5cf6]" />
            Z plánu
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-3 h-3 rounded bg-[#10b981]" />
            Dokončeno
          </div>
        </div>

        {/* Upcoming Workouts List */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ff6b35]" />
              Nadcházející tréninky
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {scheduledWorkouts
                .filter(w => !w.completed && new Date(w.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 6)
                .map((workout, index) => {
                  const type = workoutTypes.find(t => t.id === workout.type);
                  const intensity = workout.intensity ? intensityLabels[workout.intensity] : null;
                  const workoutDate = new Date(workout.date);
                  const isPlanWorkout = !!workout.planId;

                  return (
                    <motion.div
                      key={workout.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedWorkout(workout);
                        setShowDetailModal(true);
                      }}
                      className="cursor-pointer group"
                    >
                      <Card
                        className={`p-4 transition-all ${
                          isPlanWorkout
                            ? "border-[#8b5cf6]/30 hover:border-[#8b5cf6]/50"
                            : "hover:border-[#ff6b35]/30"
                        }`}
                        hover
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white/5 flex-shrink-0">
                            <span className="text-[10px] text-gray-500 uppercase">
                              {workoutDate.toLocaleDateString("cs-CZ", { weekday: "short" })}
                            </span>
                            <span className="text-xl font-bold">{workoutDate.getDate()}</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold truncate">{workout.title}</p>
                              {isPlanWorkout && (
                                <span className="px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] text-[10px] font-bold flex-shrink-0">
                                  Z plánu
                                </span>
                              )}
                              {workout.aiGenerated && (
                                <Sparkles className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {workout.duration} min
                              </span>
                              {intensity && (
                                <span style={{ color: intensity.color }}>{intensity.label}</span>
                              )}
                            </div>
                          </div>

                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${isPlanWorkout ? "#8b5cf6" : type?.color}15` }}
                          >
                            {type && <type.icon className="w-5 h-5" style={{ color: isPlanWorkout ? "#8b5cf6" : type.color }} />}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
            </AnimatePresence>

            {scheduledWorkouts.filter(w => !w.completed && new Date(w.date) >= new Date()).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full"
              >
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#ff6b35]/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-[#ff6b35]" />
                  </div>
                  <p className="text-gray-400 mb-2">Žádné naplánované tréninky</p>
                  <p className="text-sm text-gray-600 mb-4">Začni plánovat své tréninky nebo nech AI, aby ti vytvořil plán</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const today = new Date().toISOString().split("T")[0];
                        setSelectedDate(today);
                        setShowAddModal(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Přidat trénink
                    </Button>
                    {activeWorkoutPlan && (
                      <Button
                        onClick={populateWeekFromPlan}
                        className="bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]"
                      >
                        <Layers className="w-4 h-4" />
                        Z plánu
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <MobileNav />

      {/* Add Workout Modal */}
      <AnimatePresence>
        {showAddModal && selectedDate && (
          <AddWorkoutModal
            date={selectedDate}
            existingWorkouts={getWorkoutsForDate(selectedDate)}
            onClose={() => {
              setShowAddModal(false);
              setSelectedDate(null);
            }}
            onAdd={(workout) => {
              addWorkout(selectedDate, workout);
              setShowAddModal(false);
              setSelectedDate(null);
            }}
            onViewWorkout={(workout) => {
              setShowAddModal(false);
              setSelectedWorkout(workout);
              setShowDetailModal(true);
            }}
            activeWorkoutPlan={activeWorkoutPlan}
            activeWorkoutPlanId={activeWorkoutPlanId}
          />
        )}
      </AnimatePresence>

      {/* Workout Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedWorkout && (
          <WorkoutDetailModal
            workout={selectedWorkout}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedWorkout(null);
            }}
            onComplete={() => toggleWorkoutComplete(selectedWorkout.id)}
            onDelete={() => deleteWorkout(selectedWorkout.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced Add Workout Modal with "Z plánu" tab
function AddWorkoutModal({
  date,
  existingWorkouts,
  onClose,
  onAdd,
  onViewWorkout,
  activeWorkoutPlan,
  activeWorkoutPlanId,
}: {
  date: string;
  existingWorkouts: ScheduledWorkout[];
  onClose: () => void;
  onAdd: (workout: Omit<ScheduledWorkout, "id" | "date">) => void;
  onViewWorkout: (workout: ScheduledWorkout) => void;
  activeWorkoutPlan: ReturnType<typeof usePlan>["activeWorkoutPlan"];
  activeWorkoutPlanId: string | null;
}) {
  const [step, setStep] = useState<"list" | "add" | "ai" | "plan">(existingWorkouts.length > 0 ? "list" : "add");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ScheduledWorkout["type"]>("strength");
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState<NonNullable<ScheduledWorkout["intensity"]>>("medium");
  const [notes, setNotes] = useState("");

  const handleQuickAdd = (workoutType: typeof workoutTypes[0]) => {
    const exercises = sampleExercises[workoutType.id];
    onAdd({
      title: workoutType.label,
      type: workoutType.id as ScheduledWorkout["type"],
      duration: workoutType.id === "rest" ? 30 : 60,
      completed: false,
      intensity: workoutType.id === "rest" ? "low" : "medium",
      exercises: workoutType.id === "rest" ? undefined : exercises?.slice(0, 4),
    });
  };

  const handleAIGenerate = () => {
    const types: ("strength" | "cardio" | "hiit")[] = ["strength", "cardio", "hiit"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const exercises = sampleExercises[randomType] || [];
    const titles: Record<string, string[]> = {
      strength: ["Full Body Power", "Push Day", "Pull Day", "Leg Day"],
      cardio: ["Endurance Run", "Fat Burn Cardio", "HIIT Cardio"],
      hiit: ["Tabata Training", "HIIT Blast", "Metabolic Conditioning"],
    };
    const intensities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

    onAdd({
      title: titles[randomType]?.[Math.floor(Math.random() * (titles[randomType]?.length || 1))] || "Trénink",
      type: randomType,
      duration: [30, 45, 60][Math.floor(Math.random() * 3)],
      completed: false,
      intensity: intensities[Math.floor(Math.random() * intensities.length)],
      exercises: exercises.slice(0, 4 + Math.floor(Math.random() * 3)),
      aiGenerated: true,
      notes: "AI vygenerovaný trénink přizpůsobený tvým cílům",
    });
  };

  const handleAddFromPlan = (planDay: NonNullable<typeof activeWorkoutPlan>["weeklySchedule"] extends (infer T)[] | undefined ? T : never, index: number) => {
    if (!activeWorkoutPlan || !activeWorkoutPlanId) return;
    onAdd({
      title: planDay.workout,
      type: "strength",
      duration: parseInt(activeWorkoutPlan.estimatedTime || "60") || 60,
      completed: false,
      intensity: "medium",
      exercises: planDay.muscles,
      planId: activeWorkoutPlanId,
      planDayIndex: index,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                {step === "list" ? "Tréninky" : step === "ai" ? "AI Plánovač" : step === "plan" ? "Z plánu" : "Nový trénink"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(date).toLocaleDateString("cs-CZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {existingWorkouts.length > 0 && (
              <button
                onClick={() => setStep("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  step === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Seznam
              </button>
            )}
            <button
              onClick={() => setStep("add")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === "add" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Ručně
            </button>
            <button
              onClick={() => setStep("ai")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                step === "ai" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "text-gray-500 hover:text-[#8b5cf6]"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              AI
            </button>
            {activeWorkoutPlan && (
              <button
                onClick={() => setStep("plan")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  step === "plan" ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "text-gray-500 hover:text-[#8b5cf6]"
                }`}
              >
                <Layers className="w-3 h-3" />
                Z plánu
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === "list" && existingWorkouts.length > 0 && (
            <div className="space-y-3">
              {existingWorkouts.map((workout) => {
                const type = workoutTypes.find(t => t.id === workout.type);
                return (
                  <div
                    key={workout.id}
                    onClick={() => onViewWorkout(workout)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${type?.color}20` }}
                    >
                      {type && <type.icon className="w-5 h-5" style={{ color: type.color }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{workout.title}</p>
                        {workout.planId && (
                          <span className="px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] text-[10px] font-bold">
                            Z plánu
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{workout.duration} min • {type?.label}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#ff6b35] transition-colors" />
                  </div>
                );
              })}

              <button
                onClick={() => setStep("add")}
                className="w-full p-4 rounded-2xl border border-dashed border-white/10 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/5 transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-[#ff6b35]"
              >
                <Plus className="w-5 h-5" />
                Přidat další trénink
              </button>
            </div>
          )}

          {step === "add" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-3">Rychlé šablony</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {workoutTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleQuickAdd(t)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <t.icon className="w-5 h-5 mb-2 mx-auto" style={{ color: t.color }} />
                      <span className="text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-3">Typ tréninku</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {workoutTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id as ScheduledWorkout["type"])}
                      className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                        type === t.id
                          ? "border-white/30"
                          : "border-white/10 hover:border-white/20 bg-white/5"
                      }`}
                      style={type === t.id ? { backgroundColor: `${t.color}15`, borderColor: t.color } : {}}
                    >
                      <t.icon className="w-4 h-4" style={{ color: type === t.id ? t.color : undefined }} />
                      <span className="text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-2">Název tréninku</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                  placeholder="např. Intenzivní Push Day"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase font-semibold mb-2">Délka (min)</label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase font-semibold mb-2">Intenzita</label>
                  <select
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value as NonNullable<ScheduledWorkout["intensity"]>)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="low">Lehká</option>
                    <option value="medium">Střední</option>
                    <option value="high">Vysoká</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase font-semibold mb-2">Poznámky</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                  rows={3}
                  placeholder="Poznámky k tréninku..."
                />
              </div>
            </div>
          )}

          {step === "ai" && (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">AI Plánovač tréninků</h4>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Nech AI vytvořit optimální trénink na základě tvých cílů, historie a slabých partií
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-gray-300">Personalizované cviky</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-gray-300">Optimalizovaná intenzita</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-gray-300">Zaměření na slabé partie</span>
                </div>
              </div>

              <Button
                onClick={handleAIGenerate}
                fullWidth
                className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:opacity-90"
              >
                <Sparkles className="w-4 h-4" />
                Vygenerovat AI trénink
              </Button>
            </div>
          )}

          {step === "plan" && activeWorkoutPlan && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
                <Layers className="w-5 h-5 text-[#8b5cf6]" />
                <div>
                  <p className="text-sm font-semibold">{activeWorkoutPlan.name}</p>
                  <p className="text-xs text-gray-400">{activeWorkoutPlan.splitType} • {activeWorkoutPlan.estimatedTime}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 uppercase font-semibold">Týdenní rozvrh – klikni pro přidání</p>

              <div className="space-y-2">
                {activeWorkoutPlan.weeklySchedule?.map((planDay, index) => (
                  <button
                    key={index}
                    onClick={() => !planDay.isRest && handleAddFromPlan(planDay, index)}
                    disabled={planDay.isRest}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      planDay.isRest
                        ? "border-white/5 opacity-40 cursor-not-allowed"
                        : "border-white/10 hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/5 cursor-pointer"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                      planDay.isRest ? "bg-white/5 text-gray-600" : "bg-[#8b5cf6]/20 text-[#8b5cf6]"
                    }`}>
                      {planDay.day.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{planDay.day}</p>
                      <p className="font-semibold text-sm">{planDay.workout}</p>
                      <div className="flex gap-1.5 mt-1">
                        {planDay.muscles.map(m => (
                          <span key={m} className="text-[10px] text-gray-500">{m}</span>
                        ))}
                      </div>
                    </div>
                    {!planDay.isRest && (
                      <Plus className="w-5 h-5 text-[#8b5cf6]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "add" && (
          <div className="p-6 border-t border-white/5 flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setStep(existingWorkouts.length > 0 ? "list" : "add")}>
              Zpět
            </Button>
            <Button
              fullWidth
              onClick={() =>
                onAdd({
                  title: title || "Trénink",
                  type,
                  duration,
                  completed: false,
                  intensity,
                  notes,
                })
              }
              disabled={!title}
            >
              Přidat trénink
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Workout Detail Modal
function WorkoutDetailModal({
  workout,
  onClose,
  onComplete,
  onDelete,
}: {
  workout: ScheduledWorkout;
  onClose: () => void;
  onComplete: () => void;
  onDelete: () => void;
}) {
  const type = workoutTypes.find(t => t.id === workout.type);
  const intensity = workout.intensity ? intensityLabels[workout.intensity] : null;
  const isPlanWorkout = !!workout.planId;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className="relative p-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${isPlanWorkout ? "#8b5cf620" : `${type?.color}20`} 0%, transparent 100%)`
          }}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${isPlanWorkout ? "#8b5cf6" : type?.color}30` }}
            >
              {type && <type.icon className="w-8 h-8" style={{ color: isPlanWorkout ? "#8b5cf6" : type.color }} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold">{workout.title}</h3>
                {isPlanWorkout && (
                  <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-medium flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Z plánu
                  </span>
                )}
                {workout.aiGenerated && (
                  <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(workout.date).toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {workout.completed ? (
              <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                Dokončeno
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Naplánováno
              </span>
            )}
            {intensity && (
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${intensity.color}20`, color: intensity.color }}
              >
                {intensity.label} intenzita
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase font-semibold">Délka</span>
              </div>
              <p className="text-lg font-bold">{workout.duration} min</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase font-semibold">Typ</span>
              </div>
              <p className="text-lg font-bold">{type?.label}</p>
            </div>
          </div>

          {workout.exercises && workout.exercises.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                {isPlanWorkout ? "Cílové svaly" : "Cviky"}
              </h4>
              <div className="space-y-2">
                {workout.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">
                      {idx + 1}
                    </div>
                    <span className="text-sm">{exercise}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {workout.notes && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">Poznámky</h4>
              <p className="text-sm text-gray-300 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                {workout.notes}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 space-y-3">
          {!workout.completed ? (
            <Button
              onClick={onComplete}
              fullWidth
              className="bg-gradient-to-r from-[#10b981] to-[#059669]"
            >
              <Check className="w-5 h-5" />
              Označit jako dokončeno
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onComplete}
              fullWidth
            >
              <X className="w-5 h-5" />
              Zrušit dokončení
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onDelete}
            fullWidth
            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
            Smazat trénink
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
