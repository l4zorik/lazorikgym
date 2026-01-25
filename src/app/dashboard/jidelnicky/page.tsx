"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Utensils,
  Flame,
  Dumbbell,
  Leaf,
  ChevronRight,
  Clock,
  Check,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mealPlansData } from "@/lib/data";

export default function Jidelnicky() {
  const [activePlan, setActivePlan] = useState<string | null>("bulking");

  const selectedPlan = mealPlansData.find((p) => p.id === activePlan);

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
            <h1 className="text-xl font-bold">Jidelnicky</h1>
            <p className="text-sm text-text-muted">
              Vyber si plan podle sveho cile
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Plan Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {mealPlansData.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActivePlan(plan.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all ${
                activePlan === plan.id
                  ? "gradient-bg text-white shadow-lg"
                  : "bg-bg-card text-text-secondary border border-border hover:border-accent"
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <>
            {/* Plan Overview */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                      selectedPlan.type === "bulking"
                        ? "bg-green-500/20 text-green-400"
                        : selectedPlan.type === "cutting"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {selectedPlan.type === "bulking"
                      ? "Nabirani"
                      : selectedPlan.type === "cutting"
                      ? "Redukce"
                      : "Udrzeni"}
                  </span>
                  <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                  <p className="text-text-secondary mt-1">
                    {selectedPlan.description}
                  </p>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-bg-secondary text-center">
                  <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.totalCalories}</div>
                  <div className="text-xs text-text-muted">kcal / den</div>
                </div>
                <div className="p-4 rounded-xl bg-bg-secondary text-center">
                  <Dumbbell className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.totalProtein}g</div>
                  <div className="text-xs text-text-muted">protein</div>
                </div>
                <div className="p-4 rounded-xl bg-bg-secondary text-center">
                  <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">Vyvazene</div>
                  <div className="text-xs text-text-muted">makra</div>
                </div>
              </div>
            </Card>

            {/* Meals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Denni jidla</h3>

              {/* Breakfast */}
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-2xl">🌅</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Snidane</p>
                      <h4 className="font-bold">{selectedPlan.meals.breakfast.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {selectedPlan.meals.breakfast.calories} kcal •{" "}
                        {selectedPlan.meals.breakfast.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              </Card>

              {/* Lunch */}
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <span className="text-2xl">☀️</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Obed</p>
                      <h4 className="font-bold">{selectedPlan.meals.lunch.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {selectedPlan.meals.lunch.calories} kcal •{" "}
                        {selectedPlan.meals.lunch.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              </Card>

              {/* Dinner */}
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Vecere</p>
                      <h4 className="font-bold">{selectedPlan.meals.dinner.name}</h4>
                      <p className="text-sm text-text-secondary">
                        {selectedPlan.meals.dinner.calories} kcal •{" "}
                        {selectedPlan.meals.dinner.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              </Card>

              {/* Snacks */}
              {selectedPlan.meals.snacks.length > 0 && (
                <Card hover className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <span className="text-2xl">🥗</span>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Svaciny</p>
                        <h4 className="font-bold">
                          {selectedPlan.meals.snacks.map((s) => s.name).join(", ")}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {selectedPlan.meals.snacks.reduce((acc, s) => acc + s.calories, 0)} kcal •{" "}
                          {selectedPlan.meals.snacks.reduce((acc, s) => acc + s.protein, 0)}g protein
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </div>
                </Card>
              )}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button fullWidth size="lg">
                <Check className="w-5 h-5" />
                Aktivovat tento plan
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
