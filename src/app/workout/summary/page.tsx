"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import WorkoutSummary from "@/components/workout/WorkoutSummary";

interface WorkoutSession {
  id: string;
  date: Date;
  duration: number;
  title: string;
  items: {
    id: string;
    exerciseId: string;
    exerciseName: string;
    bodyPart: string;
    sets: {
      reps: string | number;
      weight: string | number;
      completed: boolean;
      rpe?: number;
    }[];
    notes?: string;
  }[];
}

export default function WorkoutSummaryPage() {
  const [completedWorkout, setCompletedWorkout] = useLocalStorage<WorkoutSession | null>("completed_workout_session", null);
  const [history] = useLocalStorage<WorkoutSession[]>("workout_history", []);

  // Read extra data from localStorage
  const [averageRPE, setAverageRPE] = useState<number | undefined>();
  const [exerciseNotes, setExerciseNotes] = useState<{ exercise: string; notes: string }[]>([]);

  useEffect(() => {
    if (!completedWorkout) {
      window.location.href = "/dashboard";
      return;
    }

    try {
      const rpe = localStorage.getItem("workout_average_rpe");
      if (rpe) setAverageRPE(JSON.parse(rpe));

      const notes = localStorage.getItem("workout_notes");
      if (notes) setExerciseNotes(JSON.parse(notes));
    } catch {
      // ignore parse errors
    }
  }, [completedWorkout]);

  if (!completedWorkout) {
    return null;
  }

  return (
    <WorkoutSummary
      workoutTitle={completedWorkout.title}
      duration={completedWorkout.duration}
      exercises={completedWorkout.items.map(item => item.exerciseName)}
      calories={Math.round(completedWorkout.duration * 8)}
      intensity="medium"
      averageRPE={averageRPE}
      exerciseNotes={exerciseNotes}
    />
  );
}
