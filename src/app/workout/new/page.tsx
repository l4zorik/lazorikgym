"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

type WorkoutItem = {
  id: string;
  exercise: string;
  part: string;
  sets: number;
  reps: string;
  weight: string;
};

function NewWorkoutContent() {
  const searchParams = useSearchParams();
  const focusPartId = searchParams.get("focus");

  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutItem[]>([]);

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

  // Auto-generate plan if focus part is provided via URL
  useEffect(() => {
    if (focusPart && workoutPlan.length === 0 && !isGenerating) {
      generateAIPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusPartId]);

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
        <h1 className="text-xl font-bold">Nový trénink</h1>
      </header>

      <main className="flex-1 p-4 pb-24 lg:pb-4 max-w-2xl w-full space-y-6" style={{ margin: '0 auto' }}>
        {/* AI Generator Section */}
        {workoutPlan.length === 0 && (
          <Card className="p-6 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] border-none text-white text-center space-y-4 shadow-xl">
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
              className="w-full bg-white text-[var(--accent-primary)] hover:bg-white/90"
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
                  <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--accent-primary)]/10">
                    {item.part}
                  </span>
                  <h3 className="font-bold text-lg mt-1">{item.exercise}</h3>
                </div>
                <button
                  onClick={() => removeExercise(item.id)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-[var(--text-muted)] uppercase font-semibold">
                    Série
                  </label>
                  <input
                    type="number"
                    defaultValue={item.sets}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[var(--text-muted)] uppercase font-semibold">
                    Opakování
                  </label>
                  <input
                    type="text"
                    defaultValue={item.reps}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[var(--text-muted)] uppercase font-semibold">
                    Váha (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="-"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 font-medium text-center focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>
            </Card>
          ))}

          {/* Add Manual Exercise Button */}
          {workoutPlan.length > 0 && (
            <Link href="/exercises">
              <button className="w-full py-4 border-2 border-dashed border-[var(--border-light)] rounded-xl text-[var(--text-muted)] font-medium flex items-center justify-center gap-2 hover:bg-[var(--bg-card)] hover:border-[var(--accent-primary)] transition-colors">
                <Plus className="w-5 h-5" />
                Přidat další cvik
              </button>
            </Link>
          )}
        </div>
      </main>

      {/* Footer Actions */}
      {workoutPlan.length > 0 && (
        <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] sticky bottom-0">
          <Button fullWidth size="lg" className="bg-[var(--success)] hover:opacity-90">
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
