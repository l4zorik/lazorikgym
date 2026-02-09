"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Dumbbell,
  Save,
  RefreshCw,
  Trash2,
  Target,
  Check,
  Settings,
  Link2,
  X,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRestTimer } from "@/hooks/useRestTimer";
import { useSupersets } from "@/hooks/useSupersets";
import { WorkoutSession, WorkoutSet } from "@/types";
import RestTimer from "@/components/workout/RestTimer";
import RPESelector from "@/components/workout/RPESelector";
import ExerciseNotes from "@/components/workout/ExerciseNotes";
import SetCompletionAnimation from "@/components/workout/SetCompletionAnimation";
import SupersetBracket from "@/components/workout/SupersetBracket";
import DraggableExerciseList from "@/components/workout/DraggableExerciseList";
import RestTimerConfigModal from "@/components/workout/RestTimerConfigModal";

type WorkoutItem = {
  id: string;
  exerciseId: string;
  exercise: string;
  part: string;
  sets: WorkoutSetData[];
  notes: string;
  orderIndex: number;
};

type WorkoutSetData = {
  reps: string;
  weight: string;
  completed: boolean;
  rpe?: number;
};

function NewWorkoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const focusPartId = searchParams.get("focus");
  const exerciseIds = searchParams.get("exercises");

  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutItem[]>([]);
  const [history, setHistory] = useLocalStorage<WorkoutSession[]>("workout_history", []);
  const [startTime] = useState<number>(Date.now());
  const [showTimerConfig, setShowTimerConfig] = useState(false);
  const [supersetMode, setSupersetMode] = useState(false);
  const [selectedForSuperset, setSelectedForSuperset] = useState<string[]>([]);
  const [completedSetId, setCompletedSetId] = useState<string | null>(null);
  const [showRestPresets, setShowRestPresets] = useState(false);

  const restTimer = useRestTimer();
  const supersets = useSupersets();

  const focusPart = focusPartId ? bodyPartsData.find(p => p.id === focusPartId) : null;
  const weakParts = focusPart ? [focusPart] : getWeakBodyParts();

  const generateAIPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan: WorkoutItem[] = [];
      weakParts.forEach((area, areaIdx) => {
        const selected = area.exercises.slice(0, 2);
        selected.forEach((ex, exIdx) => {
          const orderIndex = areaIdx * 2 + exIdx;
          newPlan.push({
            id: Math.random().toString(36).substr(2, 9),
            exerciseId: ex.id,
            exercise: ex.name,
            part: area.name,
            sets: Array.from({ length: 3 }, () => ({
              reps: "10-12",
              weight: "",
              completed: false,
            })),
            notes: "",
            orderIndex,
          });
        });
      });
      setWorkoutPlan(newPlan);
      setIsGenerating(false);
    }, 1500);
  };

  const removeExercise = (id: string) => {
    setWorkoutPlan(prev => prev.filter(item => item.id !== id));
    // Remove from any superset group
    supersets.groups.forEach(group => {
      if (group.exerciseIds.includes(id)) {
        supersets.removeFromGroup(group.id, id);
      }
    });
  };

  const addSet = (itemId: string) => {
    setWorkoutPlan(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, sets: [...item.sets, { reps: "10-12", weight: "", completed: false }] }
        : item
    ));
  };

  const removeSet = (itemId: string, setIndex: number) => {
    setWorkoutPlan(prev => prev.map(item =>
      item.id === itemId && item.sets.length > 1
        ? { ...item, sets: item.sets.filter((_, i) => i !== setIndex) }
        : item
    ));
  };

  const updateSet = (itemId: string, setIndex: number, field: keyof WorkoutSetData, value: any) => {
    setWorkoutPlan(prev => prev.map(item =>
      item.id === itemId
        ? {
            ...item,
            sets: item.sets.map((s, i) =>
              i === setIndex ? { ...s, [field]: value } : s
            ),
          }
        : item
    ));
  };

  const toggleSetComplete = (itemId: string, setIndex: number) => {
    setWorkoutPlan(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const newSets = item.sets.map((s, i) =>
        i === setIndex ? { ...s, completed: !s.completed } : s
      );
      return { ...item, sets: newSets };
    }));

    // Check if we just completed a set
    const item = workoutPlan.find(i => i.id === itemId);
    if (item && !item.sets[setIndex].completed) {
      setCompletedSetId(`${itemId}-${setIndex}`);
      // Auto-start rest timer if configured
      if (restTimer.config.autoStart && !restTimer.isRunning) {
        restTimer.startTimer();
      }
      setShowRestPresets(true);
    }
  };

  const updateNotes = (itemId: string, notes: string) => {
    setWorkoutPlan(prev => prev.map(item =>
      item.id === itemId ? { ...item, notes } : item
    ));
  };

  // Superset mode handlers
  const toggleSupersetSelect = (itemId: string) => {
    setSelectedForSuperset(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const createSupersetFromSelection = () => {
    if (selectedForSuperset.length >= 2) {
      supersets.createGroup(selectedForSuperset);
    }
    setSelectedForSuperset([]);
    setSupersetMode(false);
  };

  const handleFinishWorkout = () => {
    if (workoutPlan.length === 0) return;

    const duration = Math.round((Date.now() - startTime) / 60000);

    const newSession: WorkoutSession = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      duration: duration > 0 ? duration : 45,
      title: workoutPlan.length > 0 ? `${workoutPlan[0].part} & více` : "Trénink",
      items: workoutPlan.map((item, idx) => ({
        id: item.id,
        exerciseId: item.exerciseId,
        exerciseName: item.exercise,
        bodyPart: item.part,
        sets: item.sets.map(s => ({
          reps: s.reps,
          weight: s.weight || 0,
          completed: s.completed,
          rpe: s.rpe,
        })),
        notes: item.notes || undefined,
        supersetGroupId: supersets.getGroupForExercise(item.id)?.id,
        orderIndex: idx,
      })),
    };

    // Calculate average RPE
    const allRPEs = workoutPlan
      .flatMap(item => item.sets)
      .filter(s => s.rpe)
      .map(s => s.rpe!);
    const averageRPE = allRPEs.length > 0
      ? Math.round((allRPEs.reduce((a, b) => a + b, 0) / allRPEs.length) * 10) / 10
      : undefined;

    setHistory([...history, newSession]);
    localStorage.setItem("completed_workout_session", JSON.stringify(newSession));
    localStorage.setItem("workout_average_rpe", JSON.stringify(averageRPE));
    localStorage.setItem("workout_notes", JSON.stringify(
      workoutPlan.filter(i => i.notes).map(i => ({ exercise: i.exercise, notes: i.notes }))
    ));
    router.push("/workout/summary");
  };

  // Load exercises from query param
  useEffect(() => {
    if (exerciseIds && workoutPlan.length === 0) {
      const ids = exerciseIds.split(",");
      const newPlan: WorkoutItem[] = [];
      for (const id of ids) {
        for (const part of bodyPartsData) {
          const ex = part.exercises.find((e) => e.id === id);
          if (ex) {
            newPlan.push({
              id: Math.random().toString(36).substr(2, 9),
              exerciseId: ex.id,
              exercise: ex.name,
              part: part.name,
              sets: Array.from({ length: 3 }, () => ({
                reps: "10-12",
                weight: "",
                completed: false,
              })),
              notes: "",
              orderIndex: newPlan.length,
            });
            break;
          }
        }
      }
      if (newPlan.length > 0) {
        setWorkoutPlan(newPlan);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIds]);

  // Auto-generate if focus part provided
  useEffect(() => {
    if (focusPart && workoutPlan.length === 0 && !isGenerating) {
      generateAIPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusPartId]);

  const getSetPosition = (itemId: string) => {
    const group = supersets.getGroupForExercise(itemId);
    if (!group) return null;
    const idx = group.exerciseIds.indexOf(itemId);
    if (group.exerciseIds.length === 1) return { group, position: "only" as const };
    if (idx === 0) return { group, position: "first" as const };
    if (idx === group.exerciseIds.length - 1) return { group, position: "last" as const };
    return { group, position: "middle" as const };
  };

  const totalCompletedSets = workoutPlan.reduce(
    (acc, item) => acc + item.sets.filter(s => s.completed).length, 0
  );
  const totalSets = workoutPlan.reduce((acc, item) => acc + item.sets.length, 0);

  const renderExerciseCard = (item: WorkoutItem, index: number) => {
    const supersetInfo = getSetPosition(item.id);
    const isSelectedForSuperset = selectedForSuperset.includes(item.id);

    return (
      <Card
        className={`p-4 relative overflow-visible ${
          supersetMode && isSelectedForSuperset ? "ring-2 ring-[#8b5cf6]" : ""
        }`}
        style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
      >
        {/* Superset bracket */}
        {supersetInfo && (
          <SupersetBracket
            group={supersetInfo.group}
            position={supersetInfo.position}
            onDisband={supersetInfo.position === "first" ? () => supersets.disbandGroup(supersetInfo.group.id) : undefined}
          />
        )}

        <div className={supersetInfo ? "pl-4" : ""}>
          {/* Exercise Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              {supersetMode ? (
                <button
                  onClick={() => toggleSupersetSelect(item.id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                    isSelectedForSuperset ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "bg-white/5 text-gray-400"
                  }`}
                >
                  <Link2 className="w-3 h-3" />
                  {isSelectedForSuperset ? "Vybráno" : "Přidat do supersetu"}
                </button>
              ) : null}
              <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-wider px-2 py-1 rounded-md bg-[#ff6b35]/10">
                {item.part}
              </span>
              <h3 className="font-bold text-lg mt-1">{item.exercise}</h3>
            </div>
            <button
              onClick={() => removeExercise(item.id)}
              className="p-2 text-gray-600 hover:text-[#ef4444] transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Per-set tracking */}
          <div className="space-y-2 mb-3">
            {/* Set header */}
            <div className="grid grid-cols-[2rem_1fr_1fr_2.5rem_2.5rem] gap-2 text-xs text-gray-500 uppercase font-semibold px-1">
              <span>Set</span>
              <span>Opak.</span>
              <span>Váha</span>
              <span>RPE</span>
              <span></span>
            </div>

            {item.sets.map((set, setIdx) => (
              <div
                key={setIdx}
                className={`grid grid-cols-[2rem_1fr_1fr_2.5rem_2.5rem] gap-2 items-center relative ${
                  set.completed ? "opacity-60" : ""
                }`}
              >
                {/* Set completion animation */}
                {completedSetId === `${item.id}-${setIdx}` && (
                  <SetCompletionAnimation
                    show={true}
                    onComplete={() => setCompletedSetId(null)}
                  />
                )}

                {/* Set number */}
                <span className="text-sm font-bold text-gray-500 text-center">
                  {setIdx + 1}
                </span>

                {/* Reps */}
                <input
                  type="text"
                  value={set.reps}
                  onChange={(e) => updateSet(item.id, setIdx, "reps", e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 text-sm font-medium text-center focus:outline-none focus:border-[#ff6b35]"
                />

                {/* Weight */}
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSet(item.id, setIdx, "weight", e.target.value)}
                  placeholder="-"
                  className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 text-sm font-medium text-center focus:outline-none focus:border-[#ff6b35]"
                />

                {/* RPE */}
                <RPESelector
                  value={set.rpe}
                  onChange={(rpe) => updateSet(item.id, setIdx, "rpe", rpe)}
                  compact
                />

                {/* Complete toggle */}
                <button
                  onClick={() => toggleSetComplete(item.id, setIdx)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    set.completed
                      ? "bg-[#10b981] text-white"
                      : "bg-white/5 text-gray-500 hover:bg-white/10"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Add/Remove set buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => addSet(item.id)}
                className="flex-1 py-1.5 text-xs text-gray-500 hover:text-[#ff6b35] bg-white/[0.02] hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> Set
              </button>
              {item.sets.length > 1 && (
                <button
                  onClick={() => removeSet(item.id, item.sets.length - 1)}
                  className="flex-1 py-1.5 text-xs text-gray-500 hover:text-red-400 bg-white/[0.02] hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Set
                </button>
              )}
            </div>
          </div>

          {/* Exercise Notes */}
          <ExerciseNotes
            notes={item.notes}
            onChange={(notes) => updateNotes(item.id, notes)}
          />
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-10">
        <Link
          href="/dashboard"
          className="p-2 -ml-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Nový trénink</h1>
          {workoutPlan.length > 0 && (
            <p className="text-xs text-gray-500">
              {totalCompletedSets}/{totalSets} setů dokončeno
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {workoutPlan.length > 0 && (
            <>
              <button
                onClick={() => {
                  if (supersetMode) {
                    createSupersetFromSelection();
                  } else {
                    setSupersetMode(true);
                  }
                }}
                className={`p-2 rounded-lg transition-colors ${
                  supersetMode ? "bg-[#8b5cf6]/20 text-[#8b5cf6]" : "text-gray-500 hover:bg-[var(--bg-card)]"
                }`}
                title="Superset"
              >
                <Link2 className="w-5 h-5" />
              </button>
              {supersetMode && (
                <button
                  onClick={() => { setSupersetMode(false); setSelectedForSuperset([]); }}
                  className="p-2 rounded-lg text-gray-500 hover:bg-[var(--bg-card)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </>
          )}
          <button
            onClick={() => setShowTimerConfig(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-[var(--bg-card)] transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Superset mode banner */}
      {supersetMode && (
        <div className="px-4 py-2 bg-[#8b5cf6]/10 border-b border-[#8b5cf6]/20 text-center">
          <p className="text-xs text-[#8b5cf6] font-medium">
            Vyber 2+ cviky pro superset ({selectedForSuperset.length} vybráno)
            {selectedForSuperset.length >= 2 && (
              <button
                onClick={createSupersetFromSelection}
                className="ml-2 px-3 py-0.5 rounded-full bg-[#8b5cf6] text-white font-bold"
              >
                Vytvořit superset
              </button>
            )}
          </p>
        </div>
      )}

      <main className="flex-1 p-4 pb-40 lg:pb-24 max-w-2xl w-full space-y-6" style={{ margin: '0 auto' }}>
        {/* AI Generator Section */}
        {workoutPlan.length === 0 && (
          <Card className="p-6 bg-gradient-to-br from-[#ff6b35] to-[#e53935] border-none text-white text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Coach</h2>
              <p className="text-white/80 text-sm mt-1">
                Analyzuji tvé slabé stránky a sestavím ti optimální plán.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {weakParts.map((part) => (
                <span
                  key={part.id}
                  className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium flex items-center gap-1"
                >
                  <Target className="w-3 h-3" />
                  {part.name}
                </span>
              ))}
            </div>

            <Button
              onClick={generateAIPlan}
              disabled={isGenerating}
              className="w-full bg-white text-[#ff6b35] hover:bg-white/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Analyzuji statistiky...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Vygenerovat Smart Plán
                </>
              )}
            </Button>
          </Card>
        )}

        {/* Workout List - Draggable */}
        {workoutPlan.length > 0 && (
          <DraggableExerciseList
            items={workoutPlan}
            onReorder={(newItems) => setWorkoutPlan(newItems.map((item, idx) => ({ ...item, orderIndex: idx })))}
            renderItem={renderExerciseCard}
          />
        )}

        {/* Add Exercise Button */}
        {workoutPlan.length > 0 && (
          <Link href="/exercises">
            <button className="w-full py-4 border-2 border-dashed border-[var(--border-light)] rounded-xl text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-[var(--bg-card)] hover:border-[#ff6b35] transition-colors">
              <Plus className="w-5 h-5" />
              Přidat další cvik
            </button>
          </Link>
        )}
      </main>

      {/* Footer Actions */}
      {workoutPlan.length > 0 && (
        <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] sticky bottom-0 z-20">
          <Button
            fullWidth
            size="lg"
            className="bg-[#10b981] hover:opacity-90"
            onClick={handleFinishWorkout}
          >
            <Save className="w-5 h-5" />
            Dokončit trénink ({totalCompletedSets}/{totalSets} setů)
          </Button>
        </div>
      )}

      {/* Floating Rest Timer */}
      {showRestPresets && workoutPlan.length > 0 && (
        <RestTimer
          timeLeft={restTimer.timeLeft}
          totalTime={restTimer.totalTime}
          isRunning={restTimer.isRunning}
          isPaused={restTimer.isPaused}
          percentage={restTimer.percentage}
          onPause={restTimer.pauseTimer}
          onResume={restTimer.resumeTimer}
          onReset={() => { restTimer.resetTimer(); setShowRestPresets(false); }}
          onStartPreset={(s) => restTimer.startTimer(s)}
        />
      )}

      {/* Timer Config Modal */}
      <RestTimerConfigModal
        isOpen={showTimerConfig}
        onClose={() => setShowTimerConfig(false)}
        config={restTimer.config}
        onUpdate={restTimer.updateConfig}
      />
    </div>
  );
}

export default function NewWorkoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <NewWorkoutContent />
    </Suspense>
  );
}
