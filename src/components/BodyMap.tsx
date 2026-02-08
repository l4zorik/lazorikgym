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
        filter: isHovered
          ? "drop-shadow(0 0 15px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.4))"
          : "drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))",
        cursor: "pointer",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transformOrigin: "center",
      };
    }
    return {
      fill: isHovered ? "#666666" : "#333333",
      filter: isHovered ? "drop-shadow(0 0 10px rgba(102, 102, 102, 0.5))" : "none",
      cursor: "pointer",
      transform: isHovered ? "scale(1.03)" : "scale(1)",
      transformOrigin: "center",
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
      {/* SVG Body Figure with 3D perspective */}
      <div className="relative flex justify-center items-center" style={{ perspective: '1000px' }}>
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#ff6b35]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#e53935]/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <svg
          viewBox="0 0 200 400"
          className="w-full max-w-[300px] h-auto relative z-10 transition-transform duration-500 hover:scale-105"
          style={{
            margin: '0 auto',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
          }}
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

        {/* Premium hover tooltip */}
        {hoveredPartData && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-[#1a1a1a]/95 border border-[#ff6b35]/30 shadow-2xl shadow-[#ff6b35]/10 z-20 backdrop-blur-sm animate-fade-in"
            role="tooltip"
            aria-live="polite"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6b35]/5 to-transparent" />
            <p className="relative text-base font-bold text-white text-center">
              {hoveredPartData.name}
            </p>
            <p className="relative text-xs text-gray-400 text-center mt-1">
              {hoveredPartData.progress}% • Klikni pro detaily
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a1a] border-r border-b border-[#ff6b35]/30 rotate-45" />
          </div>
        )}
      </div>

      {/* Muscle Grid with premium cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-6 text-center md:text-left flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
            <span className="text-lg">💪</span>
          </div>
          Přehled partií
        </h3>
        <div className="grid gap-3 stagger-children" role="list" aria-label="Seznam svalových skupin">
          {bodyPartsData.map((part, index) => {
            const isWeak = part.progress < 45;
            const isHovered = hoveredPart === part.id;
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
                  premium-body-card w-full p-4 text-left group
                  ${isHovered ? "scale-[1.02]" : ""}
                  ${isWeak ? "glow-weak-pulse" : ""}
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  borderColor: isWeak ? 'rgba(255, 107, 53, 0.4)' : isHovered ? 'rgba(255, 107, 53, 0.3)' : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white group-hover:text-[#ff6b35] transition-colors duration-300">
                    {part.name}
                  </span>
                  <span
                    className={`text-sm font-bold transition-all duration-300 ${
                      isWeak ? "text-[#ff6b35]" : "text-gray-500 group-hover:text-emerald-400"
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
                    className={`h-full rounded-full transition-all duration-700 progress-animated ${
                      isWeak
                        ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                        : "bg-gradient-to-r from-gray-600 to-gray-500 group-hover:from-emerald-500 group-hover:to-green-500"
                    }`}
                    style={{ width: `${part.progress}%` }}
                  />
                </div>
                {isWeak && (
                  <p className="text-xs text-[#ff6b35] mt-2.5 flex items-center gap-2" aria-hidden="true">
                    <span className="relative">
                      <span className="w-2 h-2 rounded-full bg-[#ff6b35] inline-block" />
                      <span className="absolute inset-0 w-2 h-2 rounded-full bg-[#ff6b35] animate-ping" />
                    </span>
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
