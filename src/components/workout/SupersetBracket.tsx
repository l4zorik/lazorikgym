"use client";

import { X, Link2 } from "lucide-react";
import { SupersetGroup } from "@/types";

interface SupersetBracketProps {
  group: SupersetGroup;
  position: "first" | "middle" | "last" | "only";
  onDisband?: () => void;
}

export default function SupersetBracket({ group, position, onDisband }: SupersetBracketProps) {
  const showTop = position === "first" || position === "only";
  const showBottom = position === "last" || position === "only";

  return (
    <div
      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full"
      style={{ backgroundColor: group.color }}
    >
      {showTop && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
          <div
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1"
            style={{ backgroundColor: `${group.color}20`, color: group.color }}
          >
            <Link2 className="w-2.5 h-2.5" />
            {group.name}
            {onDisband && (
              <button
                onClick={(e) => { e.stopPropagation(); onDisband(); }}
                className="ml-1 hover:opacity-70"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
