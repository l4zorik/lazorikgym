"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface RPESelectorProps {
  value?: number;
  onChange: (rpe: number) => void;
  compact?: boolean;
}

const RPE_CONFIG = [
  { value: 1, emoji: "\ud83d\ude34", label: "Odpočinek", color: "#10b981" },
  { value: 2, emoji: "\ud83d\ude0c", label: "Velmi lehké", color: "#10b981" },
  { value: 3, emoji: "\ud83d\ude42", label: "Lehké", color: "#22c55e" },
  { value: 4, emoji: "\ud83d\ude10", label: "Mírné", color: "#84cc16" },
  { value: 5, emoji: "\ud83d\ude15", label: "Střední", color: "#eab308" },
  { value: 6, emoji: "\ud83d\ude23", label: "Náročné", color: "#f59e0b" },
  { value: 7, emoji: "\ud83d\ude25", label: "Těžké", color: "#f97316" },
  { value: 8, emoji: "\ud83e\udd75", label: "Velmi těžké", color: "#ef4444" },
  { value: 9, emoji: "\ud83d\ude35", label: "Extrém", color: "#dc2626" },
  { value: 10, emoji: "\ud83d\udc80", label: "Maximum", color: "#991b1b" },
];

export default function RPESelector({ value, onChange, compact = true }: RPESelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = RPE_CONFIG.find(r => r.value === value);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
          style={value ? { borderColor: `${selected?.color}40`, borderWidth: 1 } : undefined}
        >
          {value ? (
            <>
              <span>{selected?.emoji}</span>
              <span className="font-bold" style={{ color: selected?.color }}>
                {value}
              </span>
            </>
          ) : (
            <span className="text-gray-500">RPE</span>
          )}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-full mt-1 z-50 p-2 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl"
            >
              <div className="grid grid-cols-5 gap-1 w-[200px]">
                {RPE_CONFIG.map(rpe => (
                  <button
                    key={rpe.value}
                    onClick={() => {
                      onChange(rpe.value);
                      setIsOpen(false);
                    }}
                    className={`flex flex-col items-center p-1.5 rounded-lg transition-colors ${
                      value === rpe.value ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">{rpe.emoji}</span>
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: rpe.color }}
                    >
                      {rpe.value}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    );
  }

  // Full-size version
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 font-semibold uppercase">RPE (Rate of Perceived Exertion)</p>
      <div className="flex gap-1">
        {RPE_CONFIG.map(rpe => (
          <button
            key={rpe.value}
            onClick={() => onChange(rpe.value)}
            className={`flex-1 flex flex-col items-center p-2 rounded-lg transition-all ${
              value === rpe.value
                ? "bg-white/10 scale-110"
                : "bg-white/[0.02] hover:bg-white/5"
            }`}
            title={rpe.label}
          >
            <span className="text-lg">{rpe.emoji}</span>
            <span
              className="text-[10px] font-bold mt-0.5"
              style={{ color: rpe.color }}
            >
              {rpe.value}
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <p className="text-xs text-center" style={{ color: selected.color }}>
          {selected.label}
        </p>
      )}
    </div>
  );
}
