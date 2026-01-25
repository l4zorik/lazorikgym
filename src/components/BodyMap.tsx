"use client";

import { useState, useMemo, useCallback } from "react";
import { bodyPartsData } from "@/lib/data";
import { BodyPart } from "@/types";

interface BodyMapProps {
  onPartClick: (part: BodyPart) => void;
}

export default function BodyMap({ onPartClick }: BodyMapProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Memoize body parts lookup map for O(1) access
  const partsMap = useMemo(() => {
    const map = new Map<string, BodyPart>();
    bodyPartsData.forEach(part => map.set(part.id, part));
    return map;
  }, []);

  // Get part by ID with memoized map
  const getPart = useCallback((id: string) => partsMap.get(id), [partsMap]);

  const getPartStyle = useCallback((partId: string, progress: number) => {
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
  }, [hoveredPart]);

  // Keyboard handler for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent, part: BodyPart | undefined) => {
    if (part && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onPartClick(part);
    }
  }, [onPartClick]);

  // Render body part group with accessibility
  const renderBodyPart = useCallback((
    partId: string,
    children: React.ReactNode
  ) => {
    const part = getPart(partId);
    const progress = part?.progress || 0;
    const isWeak = progress < 45;
    const label = `${part?.name || partId} - ${progress}%${isWeak ? " (slabá partie)" : ""}`;

    return (
      <g
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={hoveredPart === partId}
        style={getPartStyle(partId, progress)}
        className="transition-all duration-300 outline-none focus:opacity-80"
        onMouseEnter={() => setHoveredPart(partId)}
        onMouseLeave={() => setHoveredPart(null)}
        onFocus={() => setHoveredPart(partId)}
        onBlur={() => setHoveredPart(null)}
        onClick={() => part && onPartClick(part)}
        onKeyDown={(e) => handleKeyDown(e, part)}
      >
        {children}
      </g>
    );
  }, [getPart, getPartStyle, hoveredPart, onPartClick, handleKeyDown]);

  const hoveredPartData = hoveredPart ? getPart(hoveredPart) : null;

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl" style={{ margin: '0 auto' }}>
      {/* SVG Body Figure */}
      <div className="relative flex justify-center items-center">
        <svg
          viewBox="0 0 200 400"
          className="w-full max-w-[300px] h-auto"
          style={{ margin: '0 auto' }}
          role="img"
          aria-label="Interaktivní mapa těla - klikni na svalovou skupinu pro detaily"
        >
          <title>Mapa svalových skupin</title>
          <desc>Interaktivní diagram lidského těla s jednotlivými svalovými skupinami. Každá část je klikatelná.</desc>

          {/* Head/Neck */}
          {renderBodyPart("neck", (
            <>
              <ellipse cx="100" cy="40" rx="25" ry="30" />
              <rect x="90" y="65" width="20" height="20" rx="4" />
            </>
          ))}

          {/* Shoulders */}
          {renderBodyPart("shoulders", (
            <>
              <ellipse cx="55" cy="100" rx="20" ry="15" />
              <ellipse cx="145" cy="100" rx="20" ry="15" />
            </>
          ))}

          {/* Chest */}
          {renderBodyPart("chest", (
            <path d="M65 90 Q100 85 135 90 L135 140 Q100 150 65 140 Z" />
          ))}

          {/* Arms */}
          {renderBodyPart("arms", (
            <>
              <path d="M35 105 L25 180 L40 185 L55 115 Z" />
              <path d="M165 105 L175 180 L160 185 L145 115 Z" />
            </>
          ))}

          {/* Core/Abs */}
          {renderBodyPart("abs", (
            <rect x="75" y="145" width="50" height="60" rx="8" />
          ))}

          {/* Back */}
          {renderBodyPart("back", (
            <>
              <rect x="60" y="100" width="8" height="50" rx="4" />
              <rect x="132" y="100" width="8" height="50" rx="4" />
            </>
          ))}

          {/* Legs */}
          {renderBodyPart("legs", (
            <>
              <path d="M75 210 L65 340 L85 345 L95 215 Z" />
              <path d="M125 210 L135 340 L115 345 L105 215 Z" />
            </>
          ))}
        </svg>

        {/* Hover tooltip */}
        {hoveredPartData && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] shadow-lg z-10"
            role="tooltip"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-white text-center">
              {hoveredPartData.name}
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
        <div className="grid gap-3" role="list" aria-label="Seznam svalových skupin">
          {bodyPartsData.map((part) => {
            const isWeak = part.progress < 45;
            return (
              <button
                key={part.id}
                onClick={() => onPartClick(part)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
                onFocus={() => setHoveredPart(part.id)}
                onBlur={() => setHoveredPart(null)}
                aria-label={`${part.name} - ${part.progress}%${isWeak ? ", slabá partie, klikni pro tréninkový plán" : ""}`}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-300
                  ${hoveredPart === part.id ? "bg-[#222222] scale-[1.02]" : "bg-[#141414]"}
                  ${isWeak ? "border-2 border-[#ff6b35]/50" : "border border-[#2a2a2a]"}
                  hover:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-[#030303]
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
                    aria-hidden="true"
                  >
                    {part.progress}%
                  </span>
                </div>
                <div
                  className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={part.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progres ${part.name}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWeak ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]" : "bg-[#666666]"
                    }`}
                    style={{ width: `${part.progress}%` }}
                  />
                </div>
                {isWeak && (
                  <p className="text-xs text-[#ff6b35] mt-2 flex items-center gap-1" aria-hidden="true">
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
