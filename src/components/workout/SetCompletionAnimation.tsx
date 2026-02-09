"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface SetCompletionAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

export default function SetCompletionAnimation({ show, onComplete }: SetCompletionAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 400);
          }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: [0.5, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center shadow-lg shadow-[#10b981]/40"
          >
            <Check className="w-7 h-7 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
