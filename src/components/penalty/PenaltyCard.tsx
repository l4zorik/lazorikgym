"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { PenaltyRecord } from "@/types";
import { useXPSystem } from "@/hooks/useXPSystem";
import Button from "@/components/ui/Button";

interface PenaltyCardProps {
  penalty: PenaltyRecord;
}

export default function PenaltyCard({ penalty }: PenaltyCardProps) {
  const { resolveDebt } = useXPSystem();

  if (penalty.resolved) {
    return (
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-green-400 line-through">{penalty.description}</p>
            <p className="text-xs text-gray-500">Vyrovnáno</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-900/5 border border-red-500/20"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-400">{penalty.description}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500">
              {new Date(penalty.createdAt).toLocaleDateString("cs-CZ")}
            </span>
            <span className="text-xs font-bold text-red-400">-{penalty.xpLost} XP</span>
          </div>
        </div>
      </div>
      <Button
        size="sm"
        className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
        onClick={() => resolveDebt(penalty.id)}
      >
        <ArrowRight className="w-4 h-4" />
        Vyrovnat dluh (+{Math.round(penalty.xpLost * 0.5)} XP zpět)
      </Button>
    </motion.div>
  );
}
