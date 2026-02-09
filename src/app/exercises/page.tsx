"use client";

import { useState } from "react";
import { ArrowLeft, Search, Dumbbell, Play, Settings, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import { bodyPartsData } from "@/lib/data";
import { MobileNav } from "@/components/MobileNav";

// Flatten exercises from all body parts
const allExercises = bodyPartsData.flatMap((part) =>
  part.exercises.map((ex) => ({
    ...ex,
    bodyPart: part.name,
  }))
);

const categories = ["Vše", ...bodyPartsData.map((p) => p.name)];
const difficulties = ["Vše", "Začátečník", "Střední", "Pokročilý"];
const equipmentList = ["Vše", "Vlastní váha", "Jednoručky", "Velká činka", "Kladka", "Hrazda", "Stroj"];

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Vše");
  const [activeDifficulty, setActiveDifficulty] = useState("Vše");
  const [activeEquipment, setActiveEquipment] = useState("Vše");
  const [showFilters, setShowFilters] = useState(false);

  const filteredExercises = allExercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Vše" || ex.bodyPart === activeCategory;
    const matchesDifficulty = 
      activeDifficulty === "Vše" || ex.difficulty === activeDifficulty;
    const matchesEquipment = 
      activeEquipment === "Vše" || ex.equipment === activeEquipment;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Header */}
      <header className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 -ml-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">Knihovna cviků</h1>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border transition-all ${
                showFilters || activeDifficulty !== "Vše" || activeEquipment !== "Vše"
                  ? "border-[#ff6b35] text-[#ff6b35] bg-[#ff6b35]/10" 
                  : "border-white/10 text-gray-400"
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Hledat cvik (např. Bench Press)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
            />
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 mt-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Obtížnost</label>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map(diff => (
                        <button
                          key={diff}
                          onClick={() => setActiveDifficulty(diff)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            activeDifficulty === diff 
                              ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]" 
                              : "border-white/5 bg-white/[0.02] text-gray-500"
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Vybavení</label>
                    <div className="flex flex-wrap gap-2">
                      {equipmentList.map(eq => (
                        <button
                          key={eq}
                          onClick={() => setActiveEquipment(eq)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            activeEquipment === eq 
                              ? "border-[#ff6b35] bg-[#ff6b35]/10 text-[#ff6b35]" 
                              : "border-white/5 bg-white/[0.02] text-gray-500"
                          }`}
                        >
                          {eq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white shadow-lg"
                    : "bg-[var(--bg-card)] text-gray-400 border border-[var(--border-color)] hover:border-[#ff6b35]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Exercise Grid */}
      <main className="flex-1 p-4 pb-24 lg:pb-4 max-w-4xl w-full" style={{ margin: '0 auto' }}>
        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4">
          Nalezeno {filteredExercises.length} cviků
        </div>

        <div className="grid gap-3">
          {filteredExercises.map((ex) => (
            <Card key={ex.id} hover className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center text-[#ff6b35]">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{ex.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-gray-600">
                        {ex.bodyPart}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          ex.difficulty === "Začátečník"
                            ? "bg-green-500/20 text-green-400"
                            : ex.difficulty === "Střední"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {ex.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:block text-xs text-gray-600">
                    {ex.equipment}
                  </span>
                  <button className="p-2 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[var(--bg-card)] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold">Žádné cviky nenalezeny</h3>
              <p className="text-gray-600 text-sm">
                Zkus změnit filtry nebo hledaný výraz.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("Vše");
                  setActiveDifficulty("Vše");
                  setActiveEquipment("Vše");
                }}
                className="mt-4 text-[#ff6b35] font-bold text-sm"
              >
                Vymazat filtry
              </button>
            </div>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
