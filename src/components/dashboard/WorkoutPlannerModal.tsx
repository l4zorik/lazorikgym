"use client";

import { useState, useMemo } from "react";
import { X, ChevronRight, Check, Calendar, Clock, Dumbbell, Target, Settings, TreePine, Building2, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { bodyPartsData } from "@/lib/data";
import { ScheduledWorkout, Exercise } from "@/types";
import { OUTDOOR_EQUIPMENT, GYM_EQUIPMENT } from "./EquipmentModal";

type WorkoutEnvironment = "workout" | "gym" | "doma";

const envTabs: { id: WorkoutEnvironment; label: string; icon: typeof TreePine; color: string }[] = [
  { id: "workout", label: "Workout", icon: TreePine, color: "#10b981" },
  { id: "gym", label: "Gym", icon: Building2, color: "#3b82f6" },
  { id: "doma", label: "Doma", icon: Home, color: "#8b5cf6" },
];

interface WorkoutPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkout: (workout: ScheduledWorkout) => void;
  userEquipment: string[];
  onOpenEquipment: () => void;
}

export default function WorkoutPlannerModal({
  isOpen,
  onClose,
  onCreateWorkout,
  userEquipment,
  onOpenEquipment,
}: WorkoutPlannerModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedParts, setSelectedParts] = useState<string[]>(() =>
    bodyPartsData.filter((p) => p.progress < 45).map((p) => p.id)
  );
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [duration, setDuration] = useState(60);
  const [activeEnv, setActiveEnv] = useState<WorkoutEnvironment>("gym");

  // All exercises from selected parts
  const allExercises = useMemo(() => {
    const exercises: { exercise: Exercise; partName: string; partColor: string }[] = [];
    bodyPartsData
      .filter((p) => selectedParts.includes(p.id))
      .forEach((part) => {
        part.exercises.forEach((ex) => {
          exercises.push({ exercise: ex, partName: part.name, partColor: part.color });
        });
      });
    return exercises;
  }, [selectedParts]);

  // Filter exercises by environment
  const filteredExercises = useMemo(() => {
    return allExercises.filter(({ exercise }) => {
      const eq = exercise.equipment;
      switch (activeEnv) {
        case "workout":
          return OUTDOOR_EQUIPMENT.includes(eq);
        case "gym":
          return true; // gym has everything
        case "doma":
          return userEquipment.includes(eq);
        default:
          return true;
      }
    });
  }, [allExercises, activeEnv, userEquipment]);

  // Count per environment
  const envCounts = useMemo(() => {
    const counts: Record<WorkoutEnvironment, number> = { workout: 0, gym: 0, doma: 0 };
    allExercises.forEach(({ exercise }) => {
      const eq = exercise.equipment;
      if (OUTDOOR_EQUIPMENT.includes(eq)) counts.workout++;
      counts.gym++; // gym always has everything
      if (userEquipment.includes(eq)) counts.doma++;
    });
    return counts;
  }, [allExercises, userEquipment]);

  const handleGoToStep2 = () => {
    if (selectedParts.length === 0) return;
    // Pre-select first 2 exercises per part (from gym = all available)
    const autoSelected: string[] = [];
    bodyPartsData
      .filter((p) => selectedParts.includes(p.id))
      .forEach((part) => {
        part.exercises.slice(0, 2).forEach((ex) => {
          autoSelected.push(ex.id);
        });
      });
    setSelectedExercises(autoSelected);
    setStep(2);
  };

  const togglePart = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  const toggleExercise = (exId: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exId) ? prev.filter((id) => id !== exId) : [...prev, exId]
    );
  };

  const handleCreate = () => {
    // Only include exercises visible in current env filter that are selected
    const exerciseNames = filteredExercises
      .filter((e) => selectedExercises.includes(e.exercise.id))
      .map((e) => e.exercise.name);

    // Fallback: if user selected exercises in another tab, include those too
    const allSelectedNames = allExercises
      .filter((e) => selectedExercises.includes(e.exercise.id))
      .map((e) => e.exercise.name);

    const finalNames = exerciseNames.length > 0 ? exerciseNames : allSelectedNames;

    const partNames = bodyPartsData
      .filter((p) => selectedParts.includes(p.id))
      .map((p) => p.name);

    const envLabel = activeEnv === "workout" ? " (Outdoor)" : activeEnv === "doma" ? " (Doma)" : "";

    const workout: ScheduledWorkout = {
      id: Math.random().toString(36).substr(2, 9),
      date,
      title: (partNames.length <= 2 ? partNames.join(" + ") : `${partNames[0]} + ${partNames.length - 1} další`) + envLabel,
      type: "strength",
      duration,
      completed: false,
      exercises: finalNames,
    };

    onCreateWorkout(workout);
    setStep(1);
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const durationOptions = [30, 45, 60, 75, 90];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-xl font-bold">
                  {step === 1 ? "Vyber partie" : "Přehled cviků"}
                </h2>
                <p className="text-sm text-gray-500">
                  Krok {step} z 2
                </p>
              </div>
              <div className="flex items-center gap-2">
                {step === 2 && (
                  <button
                    onClick={onOpenEquipment}
                    className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                    title="Moje výbava"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 ? (
                <div className="grid grid-cols-2 gap-3">
                  {bodyPartsData.map((part) => {
                    const isWeak = part.progress < 45;
                    const isSelected = selectedParts.includes(part.id);

                    return (
                      <button
                        key={part.id}
                        onClick={() => togglePart(part.id)}
                        className={`p-4 rounded-2xl border transition-all text-left relative ${
                          isSelected
                            ? "border-[#ff6b35]/50 bg-[#ff6b35]/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#ff6b35] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${part.color}20` }}
                        >
                          <Dumbbell className="w-5 h-5" style={{ color: part.color }} />
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{part.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isWeak
                                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                                  : "bg-gradient-to-r from-emerald-500 to-green-500"
                              }`}
                              style={{ width: `${part.progress}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-bold ${
                              isWeak ? "text-[#ff6b35]" : "text-emerald-400"
                            }`}
                          >
                            {part.progress}%
                          </span>
                        </div>
                        {isWeak && (
                          <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-[#ff6b35]/20 text-[10px] font-bold text-[#ff6b35]">
                            Priorita
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Environment Tabs */}
                  <div className="flex gap-2">
                    {envTabs.map((tab) => {
                      const isActive = activeEnv === tab.id;
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveEnv(tab.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "text-white"
                              : "bg-white/[0.03] text-gray-500 hover:bg-white/[0.06]"
                          }`}
                          style={isActive ? { backgroundColor: `${tab.color}20`, color: tab.color } : undefined}
                        >
                          <TabIcon className="w-4 h-4" />
                          {tab.label}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? "bg-white/20" : "bg-white/5"
                          }`}>
                            {envCounts[tab.id]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Equipment hint for "Doma" */}
                  {activeEnv === "doma" && (
                    <button
                      onClick={onOpenEquipment}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:border-purple-500/20 transition-all text-left"
                    >
                      <Settings className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-purple-300">Moje výbava</p>
                        <p className="text-[10px] text-gray-500">
                          {userEquipment.length} položek vybráno - klikni pro úpravu
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    </button>
                  )}

                  {/* Exercises */}
                  <div className="space-y-2">
                    {filteredExercises.length > 0 ? (
                      filteredExercises.map(({ exercise, partName, partColor }) => {
                        const isSelected = selectedExercises.includes(exercise.id);
                        return (
                          <button
                            key={exercise.id}
                            onClick={() => toggleExercise(exercise.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                              isSelected
                                ? "border-[#ff6b35]/30 bg-[#ff6b35]/5"
                                : "border-white/5 bg-white/[0.02] hover:border-white/10"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "border-[#ff6b35] bg-[#ff6b35]"
                                  : "border-white/20"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{exercise.name}</p>
                              <p className="text-xs text-gray-500">{partName} • {exercise.equipment}</p>
                            </div>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: `${partColor}20`,
                                color: partColor,
                              }}
                            >
                              {exercise.difficulty}
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-gray-500 mb-2">Žádné cviky pro toto prostředí</p>
                        {activeEnv === "doma" && (
                          <button
                            onClick={onOpenEquipment}
                            className="text-xs text-purple-400 font-medium hover:underline"
                          >
                            Přidej vybavení ve Výbavě
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Date picker */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Datum
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Délka tréninku
                    </label>
                    <div className="flex gap-2">
                      {durationOptions.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDuration(d)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            duration === d
                              ? "bg-[#ff6b35] text-white"
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {d}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5">
              {step === 1 ? (
                <button
                  onClick={handleGoToStep2}
                  disabled={selectedParts.length === 0}
                  className="w-full py-3.5 rounded-xl bg-[#ff6b35] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#e55a2b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Další
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors"
                  >
                    Zpět
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={selectedExercises.filter(id => filteredExercises.some(e => e.exercise.id === id)).length === 0}
                    className="flex-1 py-3.5 rounded-xl bg-[#ff6b35] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#e55a2b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Target className="w-5 h-5" />
                    Vytvořit trénink
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
