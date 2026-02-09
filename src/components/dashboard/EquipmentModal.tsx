"use client";

import { X, Check, Dumbbell, Home, Building2, TreePine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  category: "zakladni" | "cinky" | "stroje" | "prislusenstvi";
  /** Which environments typically have this equipment */
  defaultEnvironments: ("workout" | "gym" | "doma")[];
}

export const ALL_EQUIPMENT: EquipmentItem[] = [
  // Základní
  {
    id: "Vlastní váha",
    name: "Vlastní váha",
    description: "Cviky bez vybavení",
    category: "zakladni",
    defaultEnvironments: ["workout", "gym", "doma"],
  },
  {
    id: "Hrazda",
    name: "Hrazda",
    description: "Pull-up bar / hrazda",
    category: "zakladni",
    defaultEnvironments: ["workout", "gym"],
  },
  {
    id: "Bradla",
    name: "Bradla / Dip stanice",
    description: "Parallelní bradla na dipy",
    category: "zakladni",
    defaultEnvironments: ["workout", "gym"],
  },
  {
    id: "Lavička",
    name: "Lavička",
    description: "Rovná nebo nastavitelná lavička",
    category: "zakladni",
    defaultEnvironments: ["gym"],
  },
  // Činky
  {
    id: "Jednoručky",
    name: "Jednoručky",
    description: "Jednoruční činky (dumbbell)",
    category: "cinky",
    defaultEnvironments: ["gym"],
  },
  {
    id: "Velká činka",
    name: "Velká činka",
    description: "Olympijská tyč + kotouče",
    category: "cinky",
    defaultEnvironments: ["gym"],
  },
  {
    id: "Kettlebell",
    name: "Kettlebell",
    description: "Kettlebell / Girja",
    category: "cinky",
    defaultEnvironments: ["gym"],
  },
  {
    id: "Medicinbal",
    name: "Medicinbal",
    description: "Medicinbal / Slam ball",
    category: "cinky",
    defaultEnvironments: ["gym"],
  },
  // Stroje
  {
    id: "Kladka",
    name: "Kladka",
    description: "Kabelový stroj / Cable machine",
    category: "stroje",
    defaultEnvironments: ["gym"],
  },
  {
    id: "Stroj",
    name: "Stroj",
    description: "Leg press, Smith machine apod.",
    category: "stroje",
    defaultEnvironments: ["gym"],
  },
  // Příslušenství
  {
    id: "Expandéry",
    name: "Expandéry / Gumy",
    description: "Odporové gumy a expandéry",
    category: "prislusenstvi",
    defaultEnvironments: ["doma", "workout"],
  },
  {
    id: "TRX",
    name: "TRX / Závěs",
    description: "Závěsný tréninkový systém",
    category: "prislusenstvi",
    defaultEnvironments: ["gym"],
  },
  {
    id: "Švihadlo",
    name: "Švihadlo",
    description: "Speed rope / švihadlo",
    category: "prislusenstvi",
    defaultEnvironments: ["doma", "workout"],
  },
  {
    id: "Foam Roller",
    name: "Foam Roller",
    description: "Válec na foam rolling",
    category: "prislusenstvi",
    defaultEnvironments: ["doma", "gym"],
  },
];

const categoryLabels: Record<string, string> = {
  zakladni: "Základní",
  cinky: "Činky & závaží",
  stroje: "Stroje",
  prislusenstvi: "Příslušenství",
};

/** Equipment always available at outdoor workout parks */
export const OUTDOOR_EQUIPMENT = ["Vlastní váha", "Hrazda", "Bradla"];

/** Gym has everything */
export const GYM_EQUIPMENT = ALL_EQUIPMENT.map((e) => e.id);

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEquipment: string[];
  onSave: (equipment: string[]) => void;
}

export default function EquipmentModal({
  isOpen,
  onClose,
  selectedEquipment,
  onSave,
}: EquipmentModalProps) {
  const toggle = (id: string) => {
    // "Vlastní váha" is always selected
    if (id === "Vlastní váha") return;
    const next = selectedEquipment.includes(id)
      ? selectedEquipment.filter((e) => e !== id)
      : [...selectedEquipment, id];
    onSave(next);
  };

  const categories = ["zakladni", "cinky", "stroje", "prislusenstvi"] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-white/10 rounded-3xl shadow-2xl max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-xl font-bold">Moje výbava</h2>
                <p className="text-sm text-gray-500">
                  Označ vybavení, ke kterému máš přístup
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Environment hints */}
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <TreePine className="w-3 h-3" /> Workout
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400">
                  <Building2 className="w-3 h-3" /> Gym
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400">
                  <Home className="w-3 h-3" /> Doma
                </span>
              </div>

              {categories.map((cat) => {
                const items = ALL_EQUIPMENT.filter((e) => e.category === cat);
                return (
                  <div key={cat}>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
                      {categoryLabels[cat]}
                    </p>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const isSelected = selectedEquipment.includes(item.id);
                        const isLocked = item.id === "Vlastní váha";
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                              isSelected
                                ? "border-[#ff6b35]/30 bg-[#ff6b35]/5"
                                : "border-white/5 bg-white/[0.02] hover:border-white/10"
                            } ${isLocked ? "opacity-60 cursor-default" : ""}`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "border-[#ff6b35] bg-[#ff6b35]"
                                  : "border-white/20"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">{item.description}</p>
                            </div>
                            {/* Environment dots */}
                            <div className="flex gap-1">
                              {item.defaultEnvironments.includes("workout") && (
                                <div className="w-2 h-2 rounded-full bg-emerald-500" title="Workout" />
                              )}
                              {item.defaultEnvironments.includes("gym") && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" title="Gym" />
                              )}
                              {item.defaultEnvironments.includes("doma") && (
                                <div className="w-2 h-2 rounded-full bg-purple-500" title="Doma" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-white">{selectedEquipment.length}</span> položek vybráno
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#ff6b35] text-white font-bold hover:bg-[#e55a2b] transition-colors"
                >
                  Hotovo
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
