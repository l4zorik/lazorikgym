"use client";

import { useState, useEffect, Suspense } from "react";
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
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WorkoutSession, WorkoutSessionItem } from "@/types";

type WorkoutItem = {
  id: string;
  exerciseId: string;
  exercise: string;
  part: string;
  sets: number;
  reps: string;
  weight: string;
};

function NewWorkoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const focusPartId = searchParams.get("focus");

  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutItem[]>([]);
  const [history, setHistory] = useLocalStorage<WorkoutSession[]>("workout_history", []);
  const [startTime] = useState<number>(Date.now());

  // Get focused body part or all weak parts
  const focusPart = focusPartId ? bodyPartsData.find(p => p.id === focusPartId) : null;
  const weakParts = focusPart ? [focusPart] : getWeakBodyParts();

  const generateAIPlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newPlan: WorkoutItem[] = [];

      weakParts.forEach((area) => {
        const selected = area.exercises.slice(0, 2);

        selected.forEach((ex) => {
          newPlan.push({
            id: Math.random().toString(36).substr(2, 9),
            exerciseId: ex.id,
            exercise: ex.name,
            part: area.name,
            sets: 3,
            reps: "10-12",
            weight: "",
          });
        });
      });

      setWorkoutPlan(newPlan);
      setIsGenerating(false);
    }, 1500);
  };

  const removeExercise = (id: string) => {
    setWorkoutPlan(workoutPlan.filter((item) => item.id !== id));
  };

  const updateExercise = (id: string, field: keyof WorkoutItem, value: any) => {
    setWorkoutPlan(workoutPlan.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleFinishWorkout = () => {
    if (workoutPlan.length === 0) return;

    const duration = Math.round((Date.now() - startTime) / 60000);
    
    const newSession: WorkoutSession = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      duration: duration > 0 ? duration : 45, // Default to 45 if too short
      title: workoutPlan.length > 0 ? `${workoutPlan[0].part} & více` : "Trénink",
      items: workoutPlan.map(item => ({
        id: item.id,
        exerciseId: item.exerciseId,
        exerciseName: item.exercise,
        bodyPart: item.part,
        sets: Array.from({ length: item.sets }).map(() => ({
          reps: item.reps,
          weight: item.weight || 0,
          completed: true
        }))
      }))
    };

    setHistory([...history, newSession]);
    router.push("/dashboard?completed=true");
  };

  // Auto-generate plan if focus part is provided via URL
  useEffect(() => {
    if (focusPart && workoutPlan.length === 0 && !isGenerating) {
      generateAIPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusPartId]);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 bg-[#0a0a0a] border-b border-[#2a2a2a] sticky top-0 z-10">
        <Link
          href="/dashboard"
          className="p-2 -ml-2 rounded-lg hover:bg-[#141414] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Nový trénink</h1>
      </header>

      <main className="flex-1 p-4 pb-24 lg:pb-4 max-w-2xl w-full space-y-6" style={{ margin: '0 auto' }}>
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

            {/* Weak parts preview */}
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

        {/* Workout List */}
        <div className="space-y-4">
          {workoutPlan.map((item, index) => (
            <Card
              key={item.id}
              className="p-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
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

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 uppercase font-semibold">
                    Série
                  </label>
                  <input
                    type="number"
                    value={item.sets}
                    onChange={(e) => updateExercise(item.id, "sets", parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 uppercase font-semibold">
                    Opakování
                  </label>
                  <input
                    type="text"
                    value={item.reps}
                    onChange={(e) => updateExercise(item.id, "reps", e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 uppercase font-semibold">
                    Váha (kg)
                  </label>
                  <input
                    type="number"
                    value={item.weight}
                    onChange={(e) => updateExercise(item.id, "weight", e.target.value)}
                    placeholder="-"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>
              </div>
            </Card>
          ))}

          {/* Add Manual Exercise Button */}
          {workoutPlan.length > 0 && (
            <Link href="/exercises">
              <button className="w-full py-4 border-2 border-dashed border-[#3a3a3a] rounded-xl text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-[#141414] hover:border-[#ff6b35] transition-colors">
                <Plus className="w-5 h-5" />
                Přidat další cvik
              </button>
            </Link>
          )}
        </div>
      </main>

      {/* Footer Actions */}
      {workoutPlan.length > 0 && (
        <div className="p-4 bg-[#0a0a0a] border-t border-[#2a2a2a] sticky bottom-0">
          <Button 
            fullWidth 
            size="lg" 
            className="bg-[#10b981] hover:opacity-90"
            onClick={handleFinishWorkout}
          >
            <Save className="w-5 h-5" />
            Dokončit trénink
          </Button>
        </div>
      )}
    </div>
  );
}

// Wrap with Suspense for useSearchParams
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
