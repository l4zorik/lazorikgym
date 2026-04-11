"use client";

import { useState } from "react";
import { X, Star, Clock, Calendar, Dumbbell, ChevronLeft, ChevronDown, ChevronUp, Check, Target, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BodyPartPlan, GoalCategory, FitnessBook } from "@/types";
import { bodyPartsData } from "@/lib/data";
import { getPlansForBodyPart } from "@/lib/goalPlans";
import { martialArtsData } from "@/lib/martialArtsData";
import { booksData, bookCategoryLabels } from "@/lib/booksData";
import { facilitiesData } from "@/lib/facilitiesData";

const bodyPartEmoji: Record<string, string> = {
  neck: "🦴",
  shoulders: "🤸",
  chest: "🏋️",
  arms: "💪",
  abs: "🔥",
  core: "🎯",
  back: "🔙",
  legs: "🦵",
};

const difficultyColor: Record<string, string> = {
  "Začátečník": "#10b981",
  "Střední": "#f59e0b",
  "Pokročilý": "#ef4444",
};

const categoryCards: { id: GoalCategory; label: string; emoji: string; description: string; color: string }[] = [
  { id: "body_part", label: "Partie těla", emoji: "🏋️", description: "Tréninkové plány pro konkrétní svaly", color: "#ff6b35" },
  { id: "martial_art", label: "Bojová umění", emoji: "🥊", description: "Vyber si bojové umění a začni trénovat", color: "#ef4444" },
  { id: "book", label: "Knihy", emoji: "📚", description: "Sebevzdělávací knihy pro fitness i mysl", color: "#8b5cf6" },
  { id: "facility", label: "Místa & Specialisté", emoji: "🏥", description: "Posilovny, terapeuti a další specialisté", color: "#10b981" },
];

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (bodyPartId: string, planId: string, plan: BodyPartPlan) => void;
  onCreateMartialArtGoal: (martialArtId: string) => void;
  onCreateBookGoal: (bookId: string) => void;
  onCreateFacilityGoal: (facilityId: string) => void;
  existingGoalPartIds: string[];
}

export default function AddGoalModal({
  isOpen,
  onClose,
  onCreateGoal,
  onCreateMartialArtGoal,
  onCreateBookGoal,
  onCreateFacilityGoal,
  existingGoalPartIds,
}: AddGoalModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | null>(null);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<string | null>(null);

  const handleClose = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedPartId(null);
    setExpandedExercises(null);
    onClose();
  };

  const handleSelectCategory = (category: GoalCategory) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    setStep(3);
  };

  const handleSelectPlan = (plan: BodyPartPlan) => {
    if (!selectedPartId) return;
    onCreateGoal(selectedPartId, plan.id, plan);
    handleClose();
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      setSelectedPartId(null);
      setExpandedExercises(null);
    } else {
      setStep(1);
      setSelectedCategory(null);
      setSelectedPartId(null);
      setExpandedExercises(null);
    }
  };

  const plans = selectedPartId ? getPlansForBodyPart(selectedPartId) : [];
  const selectedBodyPart = selectedPartId
    ? bodyPartsData.find((p) => p.id === selectedPartId)
    : null;

  const getStepLabel = () => {
    if (step === 1) return "Krok 1 - Vyber kategorii";
    if (step === 2 && selectedCategory === "body_part") return "Krok 2/3 - Vyber partii";
    if (step === 3) return `Krok 3/3 - Plány pro ${selectedBodyPart?.name}`;
    return "Krok 2/2 - Vyber si";
  };

  const getTitle = () => {
    if (step === 1) return "Nový cíl";
    if (step === 2) {
      const cat = categoryCards.find(c => c.id === selectedCategory);
      return cat?.label ?? "Vyber si";
    }
    if (step === 3) return `Plány pro ${selectedBodyPart?.name}`;
    return "Nový cíl";
  };

  // Group books by category
  const booksByCategory = booksData.reduce<Record<string, FitnessBook[]>>((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-[var(--bg-secondary)] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-bold">{getTitle()}</h2>
                  <p className="text-xs text-gray-500">{getStepLabel()}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Category selection */}
                {step === 1 && (
                  <motion.div
                    key="step-category"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <p className="text-sm text-gray-400 mb-6 text-center">
                      Jaký typ cíle chceš přidat?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {categoryCards.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSelectCategory(cat.id)}
                          className="relative p-4 rounded-2xl border text-left transition-all bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        >
                          <div className="text-3xl mb-3">{cat.emoji}</div>
                          <h3 className="font-bold text-sm mb-1">{cat.label}</h3>
                          <p className="text-[11px] text-gray-500 leading-snug">{cat.description}</p>
                          <div
                            className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-10"
                            style={{ backgroundColor: cat.color }}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Body Part selection */}
                {step === 2 && selectedCategory === "body_part" && (
                  <motion.div
                    key="step-bodypart"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <p className="text-sm text-gray-400 mb-6 text-center">
                      Která partie tě nejvíc trápí?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {bodyPartsData.map((part) => {
                        const hasGoal = existingGoalPartIds.includes(part.id);
                        const isWeak = part.progress < 45;

                        return (
                          <button
                            key={part.id}
                            onClick={() => !hasGoal && handleSelectPart(part.id)}
                            disabled={hasGoal}
                            className={`relative p-4 rounded-2xl border text-left transition-all ${
                              hasGoal
                                ? "opacity-40 cursor-not-allowed bg-white/[0.01] border-white/5"
                                : isWeak
                                ? "bg-[#ff6b35]/5 border-[#ff6b35]/20 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10"
                                : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                            }`}
                          >
                            {isWeak && !hasGoal && (
                              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-[9px] font-bold text-white">
                                Doporučeno
                              </span>
                            )}
                            {hasGoal && (
                              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white/10 text-[9px] font-bold text-gray-400">
                                Už máš cíl
                              </span>
                            )}
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">{bodyPartEmoji[part.id] || "💪"}</span>
                              <span className="font-bold text-sm">{part.name}</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500">Progres</span>
                                <span
                                  className="text-xs font-bold"
                                  style={{ color: isWeak ? "#ff6b35" : "#10b981" }}
                                >
                                  {part.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    isWeak
                                      ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                                      : "bg-gradient-to-r from-emerald-500 to-green-500"
                                  }`}
                                  style={{ width: `${part.progress}%` }}
                                />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Plan selection (body part) */}
                {step === 3 && selectedCategory === "body_part" && selectedPartId && (
                  <motion.div
                    key="step-plan"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 space-y-4"
                  >
                    {plans.map((plan) => {
                      const bodyPart = bodyPartsData.find((p) => p.id === plan.bodyPartId);
                      const isExpanded = expandedExercises === plan.id;
                      const exercises = plan.exercises
                        .map((exId) => bodyPart?.exercises.find((e) => e.id === exId))
                        .filter(Boolean);

                      return (
                        <div
                          key={plan.id}
                          className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all"
                        >
                          <div className="p-5 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-base">{plan.name}</h3>
                                <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                              </div>
                              <span
                                className="px-2 py-1 rounded-lg text-[10px] font-bold shrink-0 ml-3"
                                style={{
                                  backgroundColor: `${difficultyColor[plan.difficulty]}20`,
                                  color: difficultyColor[plan.difficulty],
                                }}
                              >
                                {plan.difficulty}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${
                                      star <= Math.round(plan.rating)
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-700"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-bold text-gray-300">{plan.rating}</span>
                              <span className="text-[10px] text-gray-600">({plan.ratingCount} hodnocení)</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                                <Calendar className="w-3 h-3" />
                                {plan.durationWeeks} týdnů
                              </span>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                                <Dumbbell className="w-3 h-3" />
                                {plan.frequencyPerWeek}x týdně
                              </span>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                {plan.estimatedMinutes} min
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {plan.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-[#ff6b35]/10 text-[#ff6b35] text-[10px] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="space-y-2">
                              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">Progrese</p>
                              <div className="space-y-1.5">
                                {plan.weeklyProgression.map((s, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-[9px] font-bold text-gray-500">{idx + 1}</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{s}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => setExpandedExercises(isExpanded ? null : plan.id)}
                              className="w-full flex items-center justify-between py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                            >
                              <span>{exercises.length} cviků</span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-wrap gap-1.5 pb-2">
                                    {exercises.map((ex) => (
                                      <span
                                        key={ex!.id}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium"
                                        style={{
                                          backgroundColor: `${bodyPart?.color || "#666"}12`,
                                          color: bodyPart?.color || "#666",
                                        }}
                                      >
                                        {bodyPartEmoji[plan.bodyPartId] || "💪"} {ex!.name}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <button
                              onClick={() => handleSelectPlan(plan)}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Zvolit tento plán
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Step 2: Martial Arts selection */}
                {step === 2 && selectedCategory === "martial_art" && (
                  <motion.div
                    key="step-martial"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <p className="text-sm text-gray-400 mb-6 text-center">
                      Které bojové umění tě láká?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {martialArtsData.map((ma) => (
                        <button
                          key={ma.id}
                          onClick={() => {
                            onCreateMartialArtGoal(ma.id);
                            handleClose();
                          }}
                          className="relative p-4 rounded-2xl border text-left transition-all bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        >
                          <div className="text-2xl mb-2">{ma.emoji}</div>
                          <h3 className="font-bold text-sm mb-1">{ma.name}</h3>
                          <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">{ma.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                              style={{
                                backgroundColor: `${difficultyColor[ma.difficulty]}20`,
                                color: difficultyColor[ma.difficulty],
                              }}
                            >
                              {ma.difficulty}
                            </span>
                            <span className="text-[10px] text-gray-600">
                              {ma.durationWeeks} týd. • {ma.frequencyPerWeek}x/týd.
                            </span>
                          </div>
                          <div
                            className="absolute top-0 right-0 w-12 h-12 rounded-bl-3xl opacity-10"
                            style={{ backgroundColor: ma.color }}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Books selection */}
                {step === 2 && selectedCategory === "book" && (
                  <motion.div
                    key="step-book"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 space-y-6"
                  >
                    <p className="text-sm text-gray-400 text-center">
                      Vyber knihu, kterou chceš přečíst
                    </p>
                    {Object.entries(booksByCategory).map(([cat, books]) => (
                      <div key={cat}>
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <h3 className="text-sm font-bold text-gray-300">
                            {bookCategoryLabels[cat as FitnessBook["category"]] ?? cat}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {books.map((book) => (
                            <button
                              key={book.id}
                              onClick={() => {
                                onCreateBookGoal(book.id);
                                handleClose();
                              }}
                              className="w-full p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all text-left flex items-start gap-3"
                            >
                              <span className="text-xl mt-0.5">{book.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm truncate">{book.title}</h4>
                                <p className="text-[11px] text-gray-500">{book.author} • {book.pages} stran</p>
                                <div className="flex items-center gap-1 mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-2.5 h-2.5 ${
                                        star <= Math.round(book.rating)
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-700"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-[10px] text-gray-600 ml-1">{book.rating}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Step 2: Facilities selection */}
                {step === 2 && selectedCategory === "facility" && (
                  <motion.div
                    key="step-facility"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    <p className="text-sm text-gray-400 mb-6 text-center">
                      Kam chceš pravidelně docházet?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {facilitiesData.map((fac) => (
                        <button
                          key={fac.id}
                          onClick={() => {
                            onCreateFacilityGoal(fac.id);
                            handleClose();
                          }}
                          className="relative p-4 rounded-2xl border text-left transition-all bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        >
                          <div className="text-2xl mb-2">{fac.emoji}</div>
                          <h3 className="font-bold text-sm mb-1">{fac.name}</h3>
                          <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">{fac.description}</p>
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-600">
                              Cíl: {fac.recommendedVisits} {fac.visitUnit}
                            </span>
                          </div>
                          <div
                            className="absolute top-0 right-0 w-12 h-12 rounded-bl-3xl opacity-10"
                            style={{ backgroundColor: fac.color }}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
