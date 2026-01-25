"use client";

import { useState } from "react";
import { bodyPartsData } from "@/lib/data";
import { BodyPart } from "@/types";

interface BodyMapProps {
  onPartClick: (part: BodyPart) => void;
}

export default function BodyMap({ onPartClick }: BodyMapProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const getPartStyle = (partId: string, progress: number) => {
    const isHovered = hoveredPart === partId;
    const isWeak = progress < 45;

    if (isWeak) {
      return {
        fill: isHovered ? "#ff6b35" : "#e53935",
        filter: "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))",
        cursor: "pointer",
      };
    }
    return {
      fill: isHovered ? "#666666" : "#333333",
      filter: "none",
      cursor: "pointer",
    };
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
      {/* SVG Body Figure */}
      <div className="relative flex justify-center items-center">
        <svg
          viewBox="0 0 200 400"
          className="w-full max-w-[300px] h-auto mx-auto"
        >
          {/* Head/Neck */}
          <g
            style={getPartStyle("neck", bodyPartsData.find(p => p.id === "neck")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("neck")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "neck");
              if (part) onPartClick(part);
            }}
          >
            <ellipse cx="100" cy="40" rx="25" ry="30" />
            <rect x="90" y="65" width="20" height="20" rx="4" />
          </g>

          {/* Shoulders */}
          <g
            style={getPartStyle("shoulders", bodyPartsData.find(p => p.id === "shoulders")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("shoulders")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "shoulders");
              if (part) onPartClick(part);
            }}
          >
            <ellipse cx="55" cy="100" rx="20" ry="15" />
            <ellipse cx="145" cy="100" rx="20" ry="15" />
          </g>

          {/* Chest */}
          <g
            style={getPartStyle("chest", bodyPartsData.find(p => p.id === "chest")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("chest")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "chest");
              if (part) onPartClick(part);
            }}
          >
            <path d="M65 90 Q100 85 135 90 L135 140 Q100 150 65 140 Z" />
          </g>

          {/* Arms */}
          <g
            style={getPartStyle("arms", bodyPartsData.find(p => p.id === "arms")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("arms")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "arms");
              if (part) onPartClick(part);
            }}
          >
            {/* Left arm */}
            <path d="M35 105 L25 180 L40 185 L55 115 Z" rx="5" />
            {/* Right arm */}
            <path d="M165 105 L175 180 L160 185 L145 115 Z" rx="5" />
          </g>

          {/* Core/Abs */}
          <g
            style={getPartStyle("abs", bodyPartsData.find(p => p.id === "abs")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("abs")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "abs");
              if (part) onPartClick(part);
            }}
          >
            <rect x="75" y="145" width="50" height="60" rx="8" />
          </g>

          {/* Back (shown as side indicator) */}
          <g
            style={getPartStyle("back", bodyPartsData.find(p => p.id === "back")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("back")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "back");
              if (part) onPartClick(part);
            }}
          >
            <rect x="60" y="100" width="8" height="50" rx="4" />
            <rect x="132" y="100" width="8" height="50" rx="4" />
          </g>

          {/* Legs */}
          <g
            style={getPartStyle("legs", bodyPartsData.find(p => p.id === "legs")?.progress || 0)}
            className="transition-all duration-300"
            onMouseEnter={() => setHoveredPart("legs")}
            onMouseLeave={() => setHoveredPart(null)}
            onClick={() => {
              const part = bodyPartsData.find(p => p.id === "legs");
              if (part) onPartClick(part);
            }}
          >
            {/* Left leg */}
            <path d="M75 210 L65 340 L85 345 L95 215 Z" rx="5" />
            {/* Right leg */}
            <path d="M125 210 L135 340 L115 345 L105 215 Z" rx="5" />
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoveredPart && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg z-10">
            <p className="text-sm font-semibold text-white text-center">
              {bodyPartsData.find(p => p.id === hoveredPart)?.name}
            </p>
            <p className="text-xs text-[#666666] text-center">
              Klikni pro detaily
            </p>
          </div>
        )}
      </div>

      {/* Muscle Grid */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white mb-6 text-center md:text-left">
          Přehled partií
        </h3>
        <div className="grid gap-3">
          {bodyPartsData.map((part) => {
            const isWeak = part.progress < 45;
            return (
              <button
                key={part.id}
                onClick={() => onPartClick(part)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-300
                  ${hoveredPart === part.id ? "bg-[#222222] scale-[1.02]" : "bg-[#141414]"}
                  ${isWeak ? "border-2 border-[#ff6b35]/50" : "border border-[#2a2a2a]"}
                  hover:border-[#ff6b35]
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">
                    {part.name}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isWeak ? "text-[#ff6b35]" : "text-[#a0a0a0]"
                    }`}
                  >
                    {part.progress}%
                  </span>
                </div>
                <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWeak ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]" : "bg-[#666666]"
                    }`}
                    style={{ width: `${part.progress}%` }}
                  />
                </div>
                {isWeak && (
                  <p className="text-xs text-[#ff6b35] mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse" />
                    Slabá partie - klikni pro plán
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
