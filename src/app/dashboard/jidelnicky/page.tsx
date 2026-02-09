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
import { MobileNav } from "@/components/MobileNav";
import { usePlan } from "@/hooks/usePlan";

export default function JidelnickyPage() {
  const { activeMealPlanId, activateMealPlan } = usePlan();
  const [activePlan, setActivePlan] = useState<string | null>(activeMealPlanId || "bulking");

  const selectedPlan = mealPlansData.find((p) => p.id === activePlan);
  const isActive = activeMealPlanId === activePlan;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Jídelníčky</h1>
            <p className="text-sm text-gray-600">
              Vyber si plán podle svého cíle
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
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white shadow-lg"
                  : "bg-[var(--bg-card)] text-gray-400 border border-[var(--border-color)] hover:border-[#ff6b35]"
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
                  <p className="text-gray-400 mt-1">
                    {selectedPlan.description}
                  </p>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)] text-center">
                  <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.totalCalories}</div>
                  <div className="text-xs text-gray-600">kcal / den</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)] text-center">
                  <Dumbbell className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{selectedPlan.totalProtein}g</div>
                  <div className="text-xs text-gray-600">protein</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-secondary)] text-center">
                  <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">Vyvážené</div>
                  <div className="text-xs text-gray-600">makra</div>
                </div>
              </div>
            </Card>

            {/* Meals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Denní jídla</h3>

              {/* Breakfast */}
              <Card hover className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-2xl">🌅</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Snídaně</p>
                      <h4 className="font-bold">{selectedPlan.meals.breakfast.name}</h4>
                      <p className="text-sm text-gray-400">
                        {selectedPlan.meals.breakfast.calories} kcal •{" "}
                        {selectedPlan.meals.breakfast.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
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
                      <p className="text-sm text-gray-600">Oběd</p>
                      <h4 className="font-bold">{selectedPlan.meals.lunch.name}</h4>
                      <p className="text-sm text-gray-400">
                        {selectedPlan.meals.lunch.calories} kcal •{" "}
                        {selectedPlan.meals.lunch.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
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
                      <p className="text-sm text-gray-600">Večeře</p>
                      <h4 className="font-bold">{selectedPlan.meals.dinner.name}</h4>
                      <p className="text-sm text-gray-400">
                        {selectedPlan.meals.dinner.calories} kcal •{" "}
                        {selectedPlan.meals.dinner.protein}g protein
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
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
                        <p className="text-sm text-gray-600">Svačiny</p>
                        <h4 className="font-bold">
                          {selectedPlan.meals.snacks.map((s) => s.name).join(", ")}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {selectedPlan.meals.snacks.reduce((acc, s) => acc + s.calories, 0)} kcal •{" "}
                          {selectedPlan.meals.snacks.reduce((acc, s) => acc + s.protein, 0)}g protein
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </Card>
              )}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                fullWidth 
                size="lg" 
                onClick={() => activateMealPlan(selectedPlan.id)}
                disabled={isActive}
                className={isActive ? "bg-[#10b981] opacity-100" : ""}
              >
                <Check className="w-5 h-5" />
                {isActive ? "Plán je aktivní" : "Aktivovat tento plán"}
              </Button>
            </div>
          </>
        )}
      </main>
      <MobileNav />
    </div>
  );
}
