"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

interface ExerciseNotesProps {
  notes: string;
  onChange: (notes: string) => void;
}

export default function ExerciseNotes({ notes, onChange }: ExerciseNotesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-xs transition-colors ${
          notes ? "text-[#8b5cf6]" : "text-gray-500 hover:text-gray-400"
        }`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {notes ? "Poznámky" : "Přidat poznámku"}
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <textarea
              value={notes}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Poznámky ke cviku..."
              className="w-full mt-2 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-[#8b5cf6] min-h-[60px]"
              rows={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
