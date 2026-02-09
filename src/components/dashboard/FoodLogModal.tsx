"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FoodLogEntry } from "@/types";

const mealTypes: { id: FoodLogEntry["mealType"]; label: string }[] = [
  { id: "breakfast", label: "Snídaně" },
  { id: "lunch", label: "Oběd" },
  { id: "dinner", label: "Večeře" },
  { id: "snack", label: "Svačina" },
];

interface FoodLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<FoodLogEntry, "id" | "date" | "time">) => void;
}

export default function FoodLogModal({ isOpen, onClose, onAdd }: FoodLogModalProps) {
  const [mealType, setMealType] = useState<FoodLogEntry["mealType"]>("lunch");
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [sodium, setSodium] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !calories) return;

    onAdd({
      mealType,
      name: name.trim(),
      calories: parseInt(calories),
      protein: protein ? parseInt(protein) : undefined,
      carbs: carbs ? parseInt(carbs) : undefined,
      fat: fat ? parseInt(fat) : undefined,
      fiber: fiber ? parseInt(fiber) : undefined,
      sugar: sugar ? parseInt(sugar) : undefined,
      sodium: sodium ? parseInt(sodium) : undefined,
    });

    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setFiber("");
    setSugar("");
    setSodium("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Přidat jídlo</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Meal type pills */}
              <div className="flex gap-2">
                {mealTypes.map((mt) => (
                  <button
                    key={mt.id}
                    type="button"
                    onClick={() => setMealType(mt.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      mealType === mt.id
                        ? "bg-[#ff6b35] text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {mt.label}
                  </button>
                ))}
              </div>

              {/* Name */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold mb-1.5 block">
                  Název jídla
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="např. Kuřecí prsa s rýží"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
                  required
                />
              </div>

              {/* Calories */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold mb-1.5 block">
                  Kalorie (kcal)
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="např. 450"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
                  required
                  min="0"
                />
              </div>

              {/* Macros - optional 3-col grid */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold mb-1.5 block">
                  Makra (volitelné)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                      placeholder="Protein"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">g protein</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={carbs}
                      onChange={(e) => setCarbs(e.target.value)}
                      placeholder="Sacharidy"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">g sacharidy</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={fat}
                      onChange={(e) => setFat(e.target.value)}
                      placeholder="Tuky"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">g tuky</p>
                  </div>
                </div>
              </div>

              {/* Extra nutrients - optional 3-col grid */}
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold mb-1.5 block">
                  Dal&#x161;&#xED; nutrienty (voliteln&#xE9;)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      value={fiber}
                      onChange={(e) => setFiber(e.target.value)}
                      placeholder="Vl&#xE1;knina"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">g vl&#xE1;knina</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={sugar}
                      onChange={(e) => setSugar(e.target.value)}
                      placeholder="Cukr"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">g cukr</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={sodium}
                      onChange={(e) => setSodium(e.target.value)}
                      placeholder="Sod&#xED;k"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:border-[#ff6b35] transition-colors"
                      min="0"
                    />
                    <p className="text-[10px] text-gray-600 text-center mt-1">mg sod&#xED;k</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff6b35] text-white font-bold hover:bg-[#e55a2b] transition-colors"
              >
                Přidat jídlo
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
