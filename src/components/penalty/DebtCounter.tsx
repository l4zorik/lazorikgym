"use client";

import { AlertTriangle } from "lucide-react";
import { useXPSystem } from "@/hooks/useXPSystem";

interface DebtCounterProps {
  compact?: boolean;
}

export default function DebtCounter({ compact = false }: DebtCounterProps) {
  const { unresolvedDebts, totalDebt } = useXPSystem();

  if (unresolvedDebts.length === 0) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
        <AlertTriangle className="w-3 h-3" />
        {unresolvedDebts.length}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-red-400">
          {unresolvedDebts.length} {unresolvedDebts.length === 1 ? "dluh" : unresolvedDebts.length < 5 ? "dluhy" : "dluhů"}
        </p>
        <p className="text-xs text-gray-500">-{totalDebt} XP ztraceno</p>
      </div>
    </div>
  );
}
