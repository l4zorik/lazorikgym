"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Exercise, CustomPlan, PlanMilestone } from "@/types";
import { exerciseDatabase } from "@/lib/aiResponses";

interface CustomPlanBuilderProps {
  onSave: (plan: Omit<CustomPlan, "id" | "createdAt" | "isActive">) => void;
  onCancel: () => void;
  existingPlan?: CustomPlan;
}

type Step = 'basics' | 'split' | 'schedule' | 'exercises' | 'milestones' | 'review';

const SPLIT_TYPES = [
  { id: 'Full Body', label: 'Full Body', description: '3-4x týdně, celé tělo' },
  { id: 'Push/Pull/Legs', label: 'Push/Pull/Legs', description: '6x týdně, push/pull/legs' },
  { id: 'Upper/Lower', label: 'Upper/Lower', description: '4x týdně, upper/lower' },
  { id: 'Bro Split', label: 'Bro Split', description: '5-6x týdně, jedna partie' },
  { id: 'Custom', label: 'Vlastní', description: 'Libovolný rozvrh' },
] as const;

const DIFFICULTIES = [
  { id: 'Začátečník', label: 'Začátečník', color: '#22c55e' },
  { id: 'Střední', label: 'Střední', color: '#f59e0b' },
  { id: 'Pokročilý', label: 'Pokročilý', color: '#ef4444' },
] as const;

const DEFAULT_MILESTONES = [
  { name: 'První týden', description: 'Dokončit všechny tréninky první týden', targetWeek: 1, targetWorkouts: 0, type: 'completion' as const },
  { name: 'Půlka cesty', description: 'Dokončit 50% plánu', targetWeek: 4, targetWorkouts: 0, type: 'completion' as const },
  { name: 'Týdenní streak', description: '3 týdny v řadě bez přeskakování', targetWeek: 3, targetWorkouts: 0, type: 'streak' as const, targetStreakDays: 21 },
];

export default function CustomPlanBuilder({ onSave, onCancel, existingPlan }: CustomPlanBuilderProps) {
  const [step, setStep] = useState<Step>('basics');
  const [formData, setFormData] = useState({
    name: existingPlan?.name || '',
    description: existingPlan?.description || '',
    difficulty: existingPlan?.difficulty || 'Začátečník',
    durationWeeks: existingPlan?.durationWeeks || 8,
    splitType: existingPlan?.splitType || 'Full Body',
    schedule: existingPlan?.weeklySchedule || [
      { day: 'Pondělí', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Úterý', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Středa', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Čtvrtek', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Pátek', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Sobota', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
      { day: 'Neděle', workoutName: '', targetMuscles: [], exercises: [], isRest: false },
    ],
    milestones: existingPlan?.milestones || DEFAULT_MILESTONES,
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'basics', label: 'Základ' },
    { id: 'split', label: 'Typ splitu' },
    { id: 'schedule', label: 'Rozvrh' },
    { id: 'exercises', label: 'Cviky' },
    { id: 'milestones', label: 'Milníky' },
    { id: 'review', label: 'Shrnutí' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].id);
    }
  };

  const updateScheduleDay = (dayIndex: number, updates: Partial<typeof formData.schedule[0]>) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((day, i) => 
        i === dayIndex ? { ...day, ...updates } : day
      ),
    }));
  };

  const addExerciseToDay = (dayIndex: number, exercise: Exercise) => {
    updateScheduleDay(dayIndex, {
      exercises: [
        ...formData.schedule[dayIndex].exercises,
        {
          exerciseId: exercise.id,
          sets: 3,
          reps: '10-12',
          rest: 60,
        },
      ],
    });
  };

  const removeExerciseFromDay = (dayIndex: number, exerciseIndex: number) => {
    updateScheduleDay(dayIndex, {
      exercises: formData.schedule[dayIndex].exercises.filter((_, i) => i !== exerciseIndex),
    });
  };

  const handleSave = () => {
    onSave({
      name: formData.name,
      description: formData.description,
      difficulty: formData.difficulty,
      durationWeeks: formData.durationWeeks,
      splitType: formData.splitType,
      weeklySchedule: formData.schedule.filter(d => !d.isRest),
      milestones: formData.milestones,
    });
  };

  const getNonRestDays = () => formData.schedule.filter(d => !d.isRest).length;

  const renderStepContent = () => {
    switch (step) {
      case 'basics':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Název plánu</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Např. Můj 8týdenní plán"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Popis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Krátký popis tvého plánu..."
                rows={3}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Obtížnost</label>
                <div className="space-y-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setFormData(prev => ({ ...prev, difficulty: d.id }))}
                      className={`w-full p-3 rounded-xl border transition-all flex items-center gap-2 ${
                        formData.difficulty === d.id
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Délka (týdny)</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={formData.durationWeeks}
                  onChange={(e) => setFormData(prev => ({ ...prev, durationWeeks: parseInt(e.target.value) || 1 }))}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-2">Doporučeno: 4-12 týdnů</p>
              </div>
            </div>
          </div>
        );

      case 'split':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Vyber typ tréninkového splitu:</p>
            <div className="grid gap-3">
              {SPLIT_TYPES.map((split) => (
                <button
                  key={split.id}
                  onClick={() => setFormData(prev => ({ ...prev, splitType: split.id }))}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    formData.splitType === split.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="font-medium">{split.label}</p>
                  <p className="text-sm text-gray-500">{split.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Nastav tréninkové dny:</p>
              <button
                onClick={() => {
                  const newSchedule = formData.schedule.map(day => ({
                    ...day,
                    isRest: !day.isRest,
                  }));
                  setFormData(prev => ({ ...prev, schedule: newSchedule }));
                }}
                className="text-xs text-orange-400 hover:text-orange-300"
              >
                Přepnout všechny
              </button>
            </div>
            {formData.schedule.map((day, i) => (
              <div
                key={day.day}
                className={`p-4 rounded-xl border transition-all ${
                  day.isRest
                    ? 'bg-white/5 border-white/10 opacity-60'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!day.isRest}
                      onChange={(e) => updateScheduleDay(i, { isRest: !e.target.checked })}
                      className="w-5 h-5 rounded-lg accent-orange-500"
                    />
                    <span className="font-medium">{day.day}</span>
                  </div>
                  {day.isRest && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">
                      Rest day
                    </span>
                  )}
                </div>
                {!day.isRest && (
                  <div className="space-y-3 pl-8">
                    <input
                      type="text"
                      value={day.workoutName}
                      onChange={(e) => updateScheduleDay(i, { workoutName: e.target.value })}
                      placeholder="Název tréninku (např. Horní partie)"
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={day.targetMuscles.join(', ')}
                      onChange={(e) => updateScheduleDay(i, { 
                        targetMuscles: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                      })}
                      placeholder="Cílové partie (např. Prsa, Ramena)"
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-orange-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500">
                      {day.exercises.length} cviků | {day.targetMuscles.length} partií
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'exercises':
        const exercisesByCategory: Record<string, string[]> = {};
        Object.entries(exerciseDatabase).forEach(([category, exercises]) => {
          exercisesByCategory[category] = exercises;
        });

        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Přidej cviky do tréninkových dnů:</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {Object.entries(exercisesByCategory).map(([category, exercises]) => (
                  <details key={category} className="group">
                    <summary className="p-2 rounded-lg bg-white/5 cursor-pointer text-sm font-medium">
                      {category}
                    </summary>
                    <div className="mt-1 space-y-1 pl-4">
                      {exercises.slice(0, 5).map((exName, idx) => (
                        <button
                          key={`${category}-${idx}`}
                          onClick={() => {
                            const dayIndex = formData.schedule.findIndex(d => !d.isRest);
                            if (dayIndex >= 0) {
                              updateScheduleDay(dayIndex, {
                                exercises: [
                                  ...formData.schedule[dayIndex].exercises,
                                  {
                                    exerciseId: `${category.toLowerCase().slice(0, 3)}-${idx + 1}`,
                                    sets: 3,
                                    reps: '10-12',
                                    rest: 60,
                                  },
                                ],
                              });
                            }
                          }}
                          className="w-full p-2 rounded-lg bg-white/5 text-left text-xs hover:bg-orange-500/20 transition-colors"
                        >
                          {exName}
                        </button>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {formData.schedule.filter(d => !d.isRest).map((day, dayIndex) => (
                  <div key={day.day} className="p-3 rounded-xl bg-white/5">
                    <p className="text-sm font-medium mb-2">{day.day}: {day.workoutName || 'Trénink'}</p>
                    {day.exercises.length === 0 ? (
                      <p className="text-xs text-gray-500">Žádné cviky</p>
                    ) : (
                      <div className="space-y-1">
                        {day.exercises.map((ex, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-white/5 p-2 rounded">
                            <span>{ex.exerciseId}</span>
                            <button
                              onClick={() => removeExerciseFromDay(dayIndex, i)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'milestones':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Nastav milníky pro svůj plán:</p>
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  milestones: [...prev.milestones, {
                    name: 'Nový milník',
                    description: 'Popis milníku',
                    targetWeek: prev.durationWeeks,
                    targetWorkouts: 0,
                    type: 'completion',
                  }],
                }))}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
              >
                <Plus className="w-3 h-3" /> Přidat
              </button>
            </div>
            <div className="space-y-3">
              {formData.milestones.map((milestone, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <GripVertical className="w-4 h-4 text-gray-600 cursor-move" />
                    <input
                      type="text"
                      value={milestone.name}
                      onChange={(e) => {
                        const updated = [...formData.milestones];
                        updated[i] = { ...updated[i], name: e.target.value };
                        setFormData(prev => ({ ...prev, milestones: updated }));
                      }}
                      className="flex-1 bg-transparent font-medium focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const updated = formData.milestones.filter((_, idx) => idx !== i);
                        setFormData(prev => ({ ...prev, milestones: updated }));
                      }}
                      className="text-gray-600 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={milestone.description}
                    onChange={(e) => {
                      const updated = [...formData.milestones];
                      updated[i] = { ...updated[i], description: e.target.value };
                      setFormData(prev => ({ ...prev, milestones: updated }));
                    }}
                    placeholder="Popis milníku"
                    rows={2}
                    className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-sm resize-none focus:border-orange-500 focus:outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <select
                      value={milestone.type}
                      onChange={(e) => {
                        const updated = [...formData.milestones];
                        updated[i] = { ...updated[i], type: e.target.value as PlanMilestone['type'] };
                        setFormData(prev => ({ ...prev, milestones: updated }));
                      }}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
                    >
                      <option value="completion">Dokončení</option>
                      <option value="streak">Streak</option>
                      <option value="exercise_mastery">Ovládnutí cviku</option>
                    </select>
                    <input
                      type="number"
                      min="1"
                      max={formData.durationWeeks}
                      value={milestone.targetWeek}
                      onChange={(e) => {
                        const updated = [...formData.milestones];
                        updated[i] = { ...updated[i], targetWeek: parseInt(e.target.value) || 1 };
                        setFormData(prev => ({ ...prev, milestones: updated }));
                      }}
                      className="w-20 p-2 rounded-lg bg-white/5 border border-white/10 text-xs"
                      placeholder="Týden"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'review':
        const totalExercises = formData.schedule.reduce((acc, day) => acc + day.exercises.length, 0);
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <h3 className="text-xl font-bold mb-4">{formData.name || 'Nový plán'}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Obtížnost</p>
                  <p className="font-medium">{formData.difficulty}</p>
                </div>
                <div>
                  <p className="text-gray-500">Délka</p>
                  <p className="font-medium">{formData.durationWeeks} týdnů</p>
                </div>
                <div>
                  <p className="text-gray-500">Typ splitu</p>
                  <p className="font-medium">{formData.splitType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Tréninkové dny</p>
                  <p className="font-medium">{getNonRestDays()} / 7</p>
                </div>
                <div>
                  <p className="text-gray-500">Celkem cviků</p>
                  <p className="font-medium">{totalExercises}</p>
                </div>
                <div>
                  <p className="text-gray-500">Milníků</p>
                  <p className="font-medium">{formData.milestones.length}</p>
                </div>
              </div>
              {formData.description && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400">Popis</p>
                  <p className="text-sm mt-1">{formData.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Rozvrh týdne:</p>
              {formData.schedule.filter(d => !d.isRest).map((day) => (
                <div key={day.day} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="w-20 text-sm font-medium">{day.day}</span>
                  <span className="flex-1 text-sm text-gray-400">{day.workoutName || 'Trénink'}</span>
                  <span className="text-xs text-gray-500">{day.exercises.length} cviků</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={step === 'basics' ? onCancel : handleBack}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          {step === 'basics' ? (
            <Trash2 className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Krok {currentStepIndex + 1} z {steps.length}</span>
            <span className="text-sm font-medium">{steps[currentStepIndex].label}</span>
          </div>
          <Progress value={((currentStepIndex + 1) / steps.length) * 100} size="sm" />
        </div>
      </div>

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      <div className="flex justify-between pt-4 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={step === 'basics' ? onCancel : handleBack}
        >
          {step === 'basics' ? 'Zrušit' : 'Zpět'}
        </Button>
        {step === 'review' ? (
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Check className="w-4 h-4" /> Uložit plán
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex items-center gap-2">
            Další <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
