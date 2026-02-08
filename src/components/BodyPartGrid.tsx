"use client";

import { useState } from "react";
import { BodyPart } from "@/types";
import { bodyPartsData } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import BodyPartSlot from "./BodyPartSlot";
import BodyPartSlotSelector from "./BodyPartSlotSelector";
import BodyMapModal from "./BodyMapModal";
import { Settings, Sparkles, Plus } from "lucide-react";

const DEFAULT_SELECTED_PARTS = ["chest", "back", "shoulders", "legs", "core"];

export default function BodyPartGrid() {
  const [selectedPartIds, setSelectedPartIds] = useLocalStorage<string[]>(
    "lazorik_selected_parts",
    DEFAULT_SELECTED_PARTS
  );
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);

  // Get selected body parts from data
  const selectedParts = selectedPartIds
    .map((id) => bodyPartsData.find((p) => p.id === id))
    .filter((p): p is BodyPart => p !== undefined);

  const handlePartClick = (part: BodyPart) => {
    setSelectedBodyPart(part);
    setIsModalOpen(true);
  };

  const handleSelectionChange = (newIds: string[]) => {
    setSelectedPartIds(newIds);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center relative overflow-hidden group">
              <Sparkles className="w-6 h-6 text-[#ff6b35] relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/0 to-[#ff6b35]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Tvoje partie</h2>
              <p className="text-sm text-gray-500">Vybráno {selectedParts.length} z 8 partií</p>
            </div>
          </div>
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#ff6b35]/30 transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
            Upravit
          </button>
        </div>

        {/* Grid with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children">
          {selectedParts.map((part, index) => (
            <div
              key={part.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BodyPartSlot
                bodyPart={part}
                onViewPlan={() => handlePartClick(part)}
              />
            </div>
          ))}

          {/* Empty slot with animated border */}
          {selectedParts.length < 5 && (
            <button
              onClick={() => setIsSelectorOpen(true)}
              className="relative p-4 rounded-2xl border-2 border-dashed border-white/10 text-gray-500 hover:text-[#ff6b35] transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[200px] group overflow-hidden"
              style={{ animationDelay: `${selectedParts.length * 100}ms` }}
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl border-2 border-[#ff6b35]/30 animate-border-glow" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#ff6b35]/10 group-hover:scale-110 transition-all duration-300">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Přidat partii</span>
              </div>

              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/0 to-[#ff6b35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Selector Modal */}
      <BodyPartSlotSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        selectedPartIds={selectedPartIds}
        onSelectionChange={handleSelectionChange}
      />

      {/* Body Part Detail Modal */}
      <BodyMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodyPart={selectedBodyPart}
      />
    </>
  );
}
