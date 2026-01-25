"use client";

import { useState, useEffect } from "react";
import { BodyPart } from "@/types";
import { bodyPartsData } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import BodyPartSlot from "./BodyPartSlot";
import BodyPartSlotSelector from "./BodyPartSlotSelector";
import BodyMapModal from "./BodyMapModal";
import { Settings, Sparkles } from "lucide-react";

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
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ff6b35]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Tvoje partie</h2>
              <p className="text-xs text-gray-500">Vybráno {selectedParts.length} z 8 partií</p>
            </div>
          </div>
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Upravit
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {selectedParts.map((part) => (
            <BodyPartSlot
              key={part.id}
              bodyPart={part}
              onViewPlan={() => handlePartClick(part)}
            />
          ))}

          {/* Empty slots */}
          {selectedParts.length < 5 && (
            <button
              onClick={() => setIsSelectorOpen(true)}
              className="p-4 rounded-2xl border-2 border-dashed border-white/10 text-gray-500 hover:border-[#ff6b35]/30 hover:text-[#ff6b35] transition-colors flex flex-col items-center justify-center gap-2 min-h-[180px]"
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs font-medium">Přidat partii</span>
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
