"use client";

import { BodyPart } from "@/types";
import Modal from "@/components/ui/Modal";
import { Dumbbell, Target, Calendar, Play, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BodyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyPart: BodyPart | null;
}

export default function BodyMapModal({ isOpen, onClose, bodyPart }: BodyMapModalProps) {
  if (!bodyPart) return null;

  const isWeak = bodyPart.progress < 45;

  const weeklyPlan = [
    { day: "Pondělí", focus: `${bodyPart.name} - Základ`, exercises: 4 },
    { day: "Středa", focus: `${bodyPart.name} - Síla`, exercises: 5 },
    { day: "Pátek", focus: `${bodyPart.name} - Objem`, exercises: 6 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={bodyPart.name} size="lg">
      <div className="space-y-6">
        {/* Status Banner */}
        <div
          className={`p-4 rounded-xl flex items-center gap-4 ${
            isWeak
              ? "bg-gradient-to-r from-[#ff6b35]/10 to-[#e53935]/10 border border-[#ff6b35]/30"
              : "bg-[#141414] border border-[#2a2a2a]"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              isWeak ? "bg-gradient-to-br from-[#ff6b35] to-[#e53935]" : "bg-[#1a1a1a]"
            }`}
          >
            <Target className={`w-8 h-8 ${isWeak ? "text-white" : "text-[#666666]"}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-white">{bodyPart.progress}%</span>
              {isWeak && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white text-xs font-bold">
                  Priorita
                </span>
              )}
            </div>
            <p className="text-[#a0a0a0] text-sm">
              {isWeak
                ? "Tato partie potřebuje více pozornosti. Připravili jsme pro tebe speciální plán."
                : "Tato partie je v dobré kondici. Pokračuj v udržovacím režimu."}
            </p>
          </div>
        </div>

        {/* Weekly Plan */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5 text-[#ff6b35]" />
            Týdenní plán pro {bodyPart.name}
          </h3>
          <div className="grid gap-3">
            {weeklyPlan.map((day, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-between hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#ff6b35] font-bold text-sm">
                    {day.day.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{day.focus}</p>
                    <p className="text-sm text-[#666666]">{day.exercises} cviků</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#666666] group-hover:text-[#ff6b35] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Exercises */}
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <Dumbbell className="w-5 h-5 text-[#ff6b35]" />
            Doporučené cviky
          </h3>
          <div className="grid gap-3">
            {bodyPart.exercises.slice(0, 4).map((exercise) => (
              <div
                key={exercise.id}
                className="p-4 rounded-xl bg-[#141414] border border-[#2a2a2a] hover:border-[#ff6b35]/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-white">{exercise.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] text-xs text-[#666666]">
                        {exercise.difficulty}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] text-xs text-[#666666]">
                        {exercise.equipment}
                      </span>
                    </div>
                    {exercise.description && (
                      <p className="text-sm text-[#a0a0a0] mt-2">
                        {exercise.description}
                      </p>
                    )}
                  </div>
                  <button className="p-2 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-4 border-t border-[#2a2a2a]">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl bg-[#1a1a1a] text-white font-semibold border border-[#2a2a2a] hover:bg-[#222222] transition-colors"
          >
            Zavřít
          </button>
          <Link href="/workout/new" className="flex-1">
            <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Zahájit trénink
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
