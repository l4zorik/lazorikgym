"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Smartphone, Clock } from "lucide-react";
import { RestTimerConfig } from "@/types";
import Button from "@/components/ui/Button";

interface RestTimerConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestTimerConfig;
  onUpdate: (updates: Partial<RestTimerConfig>) => void;
}

const TIME_PRESETS = [30, 45, 60, 90, 120, 180];

export default function RestTimerConfigModal({
  isOpen,
  onClose,
  config,
  onUpdate,
}: RestTimerConfigModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl bg-[var(--bg-secondary)] border-t border-white/10 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Nastavení odpočinku</h2>
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Default Time */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm font-semibold">Výchozí čas odpočinku</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TIME_PRESETS.map(time => (
                  <button
                    key={time}
                    onClick={() => onUpdate({ defaultSeconds: time })}
                    className={`p-3 rounded-xl font-bold text-sm transition-all ${
                      config.defaultSeconds === time
                        ? "bg-[#ff6b35] text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {time >= 60 ? `${time / 60}m` : `${time}s`}
                    {time >= 60 && time % 60 !== 0 && ` ${time % 60}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-4 mb-6">
              {/* Auto Start */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-sm font-medium">Auto-start po setu</span>
                <button
                  onClick={() => onUpdate({ autoStart: !config.autoStart })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    config.autoStart ? "bg-[#ff6b35]" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    config.autoStart ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2">
                  {config.soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#10b981]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm font-medium">Zvukový signál</span>
                </div>
                <button
                  onClick={() => onUpdate({ soundEnabled: !config.soundEnabled })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    config.soundEnabled ? "bg-[#10b981]" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    config.soundEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>

              {/* Vibration */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#8b5cf6]" />
                  <span className="text-sm font-medium">Vibrace</span>
                </div>
                <button
                  onClick={() => onUpdate({ vibrationEnabled: !config.vibrationEnabled })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    config.vibrationEnabled ? "bg-[#8b5cf6]" : "bg-white/10"
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    config.vibrationEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
            </div>

            <Button fullWidth onClick={onClose} className="bg-[#ff6b35]">
              Hotovo
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
