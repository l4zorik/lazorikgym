"use client";

import { useState } from "react";
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
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { workoutPlansData, bodyPartsData } from "@/lib/data";

export default function TreninkePlany() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plan = workoutPlansData.find((p) => p.id === selectedPlan);

  // Generate sample weekly schedule
  const weeklySchedule = [
    { day: "Pondělí", workout: "Push Day", muscles: ["Prsa", "Ramena", "Triceps"] },
    { day: "Úterý", workout: "Pull Day", muscles: ["Záda", "Biceps"] },
    { day: "Středa", workout: "Odpočinek", muscles: [] },
    { day: "Čtvrtek", workout: "Leg Day", muscles: ["Nohy", "Core"] },
    { day: "Pátek", workout: "Push Day", muscles: ["Prsa", "Ramena", "Triceps"] },
    { day: "Sobota", workout: "Pull Day", muscles: ["Záda", "Biceps"] },
    { day: "Neděle", workout: "Odpočinek", muscles: [] },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="p-6 border-b border-border bg-bg-secondary sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-bg-card transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Treninkove plany</h1>
            <p className="text-sm text-text-muted">
              Vyber si svuj treninkovy split
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {workoutPlansData.map((plan) => (
            <Card
              key={plan.id}
              hover
              glow={selectedPlan === plan.id}
              className={`p-5 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-accent ring-2 ring-accent/20"
                  : ""
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Dumbbell className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{plan.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        plan.difficulty === "Začátečník"
                          ? "bg-green-500/20 text-green-400"
                          : plan.difficulty === "Střední"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {plan.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {plan.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {plan.targetParts.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
                {selectedPlan === plan.id && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Plan Details */}
        {plan && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Tydenni rozvrh - {plan.name}</h2>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-3">
              {weeklySchedule.map((day, i) => {
                const isRest = day.workout === "Odpočinek";
                return (
                  <Card
                    key={i}
                    className={`p-4 ${isRest ? "opacity-60" : ""}`}
                    hover={!isRest}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isRest
                              ? "bg-bg-secondary"
                              : "gradient-bg-subtle"
                          }`}
                        >
                          {isRest ? (
                            <span className="text-2xl">😴</span>
                          ) : (
                            <Dumbbell className="w-6 h-6 text-accent" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-text-muted">{day.day}</p>
                          <h4 className="font-bold">{day.workout}</h4>
                          {day.muscles.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {day.muscles.map((muscle) => (
                                <span
                                  key={muscle}
                                  className="px-2 py-0.5 rounded bg-bg-secondary text-xs text-text-muted"
                                >
                                  {muscle}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {!isRest && (
                        <button className="p-3 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                          <Play className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button fullWidth size="lg">
                <Calendar className="w-5 h-5" />
                Aktivovat tento plan
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
