"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Dumbbell,
  Clock,
  Target,
  ChevronRight,
  Play,
  Star,
  Flame,
  Zap,
  CheckCircle2,
  Info,
  Layers,
  LayoutGrid,
  Check,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { workoutPlansData } from "@/lib/data";
import { MobileNav } from "@/components/MobileNav";
import { usePlan } from "@/hooks/usePlan";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScheduledWorkout } from "@/types";

export default function TreninkovePlanyPage() {
  const { activeWorkoutPlanId, activateWorkoutPlan, deactivateWorkoutPlan, currentWeekNumber } = usePlan();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(activeWorkoutPlanId || workoutPlansData[0].id);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [scheduledWorkouts] = useLocalStorage<ScheduledWorkout[]>("scheduled_workouts", []);

  const selectedPlan = useMemo(() =>
    workoutPlansData.find((p) => p.id === selectedPlanId),
  [selectedPlanId]);

  const isActive = activeWorkoutPlanId === selectedPlanId;

  // Compute completion status for each day of active plan
  const dayCompletionStatus = useMemo(() => {
    if (!isActive || !selectedPlan?.weeklySchedule) return {};

    const status: Record<number, boolean> = {};
    selectedPlan.weeklySchedule.forEach((day, index) => {
      if (day.isRest) {
        status[index] = true;
        return;
      }
      // Check if any completed workout matches this plan day
      const completed = scheduledWorkouts.some(
        w => w.planId === activeWorkoutPlanId && w.planDayIndex === index && w.completed
      );
      status[index] = completed;
    });
    return status;
  }, [isActive, selectedPlan, scheduledWorkouts, activeWorkoutPlanId]);

  // Progress stats for active plan
  const progressStats = useMemo(() => {
    if (!isActive || !selectedPlan?.weeklySchedule) return null;

    const trainingDays = selectedPlan.weeklySchedule.filter(d => !d.isRest);
    const completedDays = trainingDays.filter((_, i) => {
      const originalIndex = selectedPlan.weeklySchedule!.indexOf(selectedPlan.weeklySchedule![
        selectedPlan.weeklySchedule!.findIndex((d, idx) => !d.isRest && selectedPlan.weeklySchedule!.slice(0, idx).filter(dd => !dd.isRest).length === i)
      ]);
      return dayCompletionStatus[originalIndex];
    }).length;

    // Simpler approach: count completed non-rest days
    let completed = 0;
    selectedPlan.weeklySchedule.forEach((day, index) => {
      if (!day.isRest && dayCompletionStatus[index]) {
        completed++;
      }
    });

    return {
      total: trainingDays.length,
      completed: completed,
      percentage: trainingDays.length > 0 ? Math.round((completed / trainingDays.length) * 100) : 0,
    };
  }, [isActive, selectedPlan, dayCompletionStatus]);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Pro Tréninkové Plány</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Science-Based Splits</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? "bg-[#ff6b35] text-white shadow-lg" : "text-gray-500"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'detail' ? "bg-[#ff6b35] text-white shadow-lg" : "text-gray-500"}`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-24">

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPlansData.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isPlanActive = activeWorkoutPlanId === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`h-full relative overflow-hidden flex flex-col transition-all duration-500 ${
                      isSelected ? "ring-2 ring-[#ff6b35] shadow-2xl shadow-[#ff6b35]/20" : "border-white/5"
                    }`}
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      setViewMode('detail');
                    }}
                  >
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {isPlanActive && (
                        <div className="bg-[#10b981] text-white text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 shadow-lg animate-pulse">
                          <CheckCircle2 className="w-3 h-3" />
                          AKTIVNÍ
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center shadow-lg">
                          <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#ff6b35] uppercase tracking-tighter">
                            {plan.splitType}
                          </span>
                          <h3 className="text-xl font-black leading-tight">{plan.name}</h3>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">
                        {plan.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Čas</p>
                            <p className="text-xs font-bold text-white">{plan.estimatedTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Obtížnost</p>
                            <p className="text-xs font-bold text-white">{plan.difficulty}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {plan.tags?.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-gray-400 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between group cursor-pointer">
                      <span className="text-xs font-bold text-[#ff6b35]">Zobrazit detaily</span>
                      <ChevronRight className="w-4 h-4 text-[#ff6b35] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Detail View */
          selectedPlan && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] rounded-full text-xs font-bold uppercase tracking-widest">
                        {selectedPlan.splitType}
                      </span>
                      {isActive && (
                        <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] rounded-full text-xs font-bold uppercase tracking-widest">
                          Aktivní
                        </span>
                      )}
                    </div>
                    <h2 className="text-5xl font-black tracking-tight">{selectedPlan.name}</h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                      {selectedPlan.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner">
                        <Clock className="w-7 h-7 text-[#ff6b35]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-black">Odhadovaný čas</p>
                        <p className="text-xl font-bold">{selectedPlan.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-inner">
                        <Flame className="w-7 h-7 text-[#ff6b35]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-black">Spálené kalorie</p>
                        <p className="text-xl font-bold">~{selectedPlan.estimatedCalories} kcal</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <Button
                      size="lg"
                      className={`h-16 px-10 text-lg rounded-2xl ${isActive ? "bg-[#10b981]" : "bg-[#ff6b35]"}`}
                      onClick={() => activateWorkoutPlan(selectedPlan.id)}
                      disabled={isActive}
                    >
                      {isActive ? (
                        <>
                          <CheckCircle2 className="w-6 h-6 mr-2" />
                          Plán je aktivován
                        </>
                      ) : (
                        <>
                          <Zap className="w-6 h-6 mr-2" />
                          Aktivovat tento plán
                        </>
                      )}
                    </Button>
                    {isActive && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-16 px-6 rounded-2xl border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={deactivateWorkoutPlan}
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Deaktivovat
                      </Button>
                    )}
                  </div>
                </div>

                <Card className="w-full md:w-80 p-6 space-y-6 bg-gradient-to-b from-white/[0.03] to-transparent">
                  <h3 className="font-bold text-sm uppercase text-gray-500 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Zapojené svaly
                  </h3>
                  <div className="space-y-4">
                    {selectedPlan.targetParts.map(part => (
                      <div key={part} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-gray-300">{part}</span>
                          <span className="text-gray-500">Primární</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="h-full bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Progress Banner (only for active plan) */}
              {isActive && progressStats && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/15 to-[#6366f1]/10 border border-[#8b5cf6]/30"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#8b5cf6]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Týden {currentWeekNumber}</h3>
                        <p className="text-sm text-gray-400">
                          {progressStats.completed} z {progressStats.total} dnů hotovo
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-[#8b5cf6]">{progressStats.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressStats.percentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Weekly Timeline */}
              <div className="space-y-6 pt-12">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-[#ff6b35]" />
                  Týdenní harmonogram
                </h3>

                <div className="grid gap-4">
                  {selectedPlan.weeklySchedule?.map((day, i) => {
                    const isCompleted = isActive && dayCompletionStatus[i];

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className={`p-6 border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                          day.isRest ? "opacity-40 grayscale" : "hover:bg-white/[0.03]"
                        } ${isCompleted && !day.isRest ? "border-[#10b981]/30" : ""}`}>
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
                                day.isRest
                                  ? "bg-white/5 text-gray-600"
                                  : isCompleted
                                    ? "bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-xl"
                                    : "bg-gradient-to-br from-[#ff6b35] to-[#e53935] text-white shadow-xl"
                              }`}>
                                {isCompleted && !day.isRest ? (
                                  <Check className="w-7 h-7" />
                                ) : (
                                  day.day.charAt(0)
                                )}
                              </div>
                              {isCompleted && !day.isRest && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 uppercase font-black mb-0.5">{day.day}</p>
                              <h4 className={`text-xl font-bold ${isCompleted && !day.isRest ? "text-[#10b981]" : ""}`}>
                                {day.workout}
                              </h4>
                              <div className="flex gap-2 mt-2">
                                {day.muscles.map(m => (
                                  <span key={m} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-bold uppercase border border-white/5">
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {!day.isRest ? (
                            <div className="flex items-center gap-4">
                              {isCompleted ? (
                                <div className="flex items-center gap-2 text-[#10b981]">
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="text-sm font-bold">Dokončeno</span>
                                </div>
                              ) : (
                                <>
                                  <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-black">Předpokládaný progres</span>
                                    <span className="text-sm font-bold text-[#10b981]">+2.5% Power</span>
                                  </div>
                                  <Link href="/dashboard/calendar">
                                    <button className="h-12 w-12 rounded-2xl bg-[#ff6b35]/10 text-[#ff6b35] flex items-center justify-center hover:bg-[#ff6b35] hover:text-white transition-all shadow-lg">
                                      <Play className="w-5 h-5 fill-current" />
                                    </button>
                                  </Link>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 text-gray-500">
                              <Info className="w-5 h-5" />
                              <span className="text-xs font-bold uppercase italic">Regenerační fáze</span>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Expert Tips Section */}
              <div className="bg-gradient-to-r from-[#ff6b35]/10 to-transparent p-8 rounded-[2.5rem] border border-[#ff6b35]/20 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-[#ff6b35] flex items-center justify-center shrink-0 shadow-2xl shadow-[#ff6b35]/40">
                  <Star className="w-10 h-10 text-white fill-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">Tip od LazorikGym Expertů</h4>
                  <p className="text-gray-400">
                    Tento plán byl sestaven s ohledem na maximální zotavení CNS. Nezapomínej na doplňování elektrolytů po každém tréninku „{selectedPlan.splitType}".
                  </p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </main>

      <MobileNav />
    </div>
  );
}
