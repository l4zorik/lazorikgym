"use client";

import { WorkoutSession } from "@/types";
import Modal from "./ui/Modal";
import { Calendar, Clock, Dumbbell, Target } from "lucide-react";

interface WorkoutDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: WorkoutSession | null;
}

export default function WorkoutDetailModal({
  isOpen,
  onClose,
  session,
}: WorkoutDetailModalProps) {
  if (!session) return null;

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={session.title}
      size="lg"
    >
      <div className="space-y-6">
        {/* Summary Header */}
        <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">{formatDate(session.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">{session.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">{session.items.length} cviků</span>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {session.items.map((item, index) => (
            <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="font-bold">{item.exerciseName}</h3>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-[var(--text-muted)]">
                  {item.bodyPart}
                </span>
              </div>

              {/* Sets Table */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Série</div>
                <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Váha</div>
                <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Opakování</div>
                <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Stav</div>
                
                {item.sets.map((set, setIdx) => (
                  <React.Fragment key={setIdx}>
                    <div className="text-sm font-medium py-1">{setIdx + 1}</div>
                    <div className="text-sm font-bold py-1">{set.weight || 0} kg</div>
                    <div className="text-sm font-bold py-1">{set.reps}</div>
                    <div className="text-xs text-[var(--success)] font-bold py-1">Hotovo</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

import React from "react";
