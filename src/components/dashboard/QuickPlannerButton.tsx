"use client";

import { Calendar, Target } from "lucide-react";
import { getWeakBodyParts } from "@/lib/data";

interface QuickPlannerButtonProps {
  onClick: () => void;
}

export default function QuickPlannerButton({ onClick }: QuickPlannerButtonProps) {
  const weakCount = getWeakBodyParts().length;

  return (
    <button
      onClick={onClick}
      className="w-full p-6 rounded-3xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-left group hover:shadow-xl hover:shadow-[#ff6b35]/20 transition-all relative overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">Naplánuj trénink</h3>
          <p className="text-white/70 text-sm">Vyber partie a sestav si trénink</p>
        </div>
        {weakCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
            <Target className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">{weakCount} slabých</span>
          </div>
        )}
      </div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </button>
  );
}
