"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Pill,
  Plus,
  Minus,
  GlassWater,
  Coffee,
  X,
  ChevronDown,
  Check,
  History,
  Trophy,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MobileNav } from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface WaterEntry {
  id: string;
  date: string;
  amount: number;
  time: string;
}

interface Supplement {
  id: string;
  name: string;
  dosage: string;
  frequency: "daily" | "workout" | "custom";
  timeOfDay: string[];
  color: string;
  taken: { date: string; time: string }[];
}

const waterGoals = [2000, 2500, 3000, 3500, 4000];
const quickAddAmounts = [250, 330, 500, 750];

const supplementColors = [
  "#ff6b35",
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
];

export default function SupplementsPage() {
  const [activeTab, setActiveTab] = useState<"water" | "supplements">("water");
  const [waterEntries, setWaterEntries] = useLocalStorage<WaterEntry[]>("water_entries", []);
  const [supplements, setSupplements] = useLocalStorage<Supplement[]>("supplements", []);
  const [dailyWaterGoal, setDailyWaterGoal] = useLocalStorage("daily_water_goal", 2500);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showSupplementModal, setShowSupplementModal] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const todayWater = waterEntries
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);
  const waterPercentage = Math.min((todayWater / dailyWaterGoal) * 100, 100);

  // Calculate streak
  const sortedDates = [...new Set(waterEntries.map(e => e.date))].sort().reverse();
  let waterStreak = 0;
  const checkDate = new Date();
  
  for (const dateStr of sortedDates) {
    const dayTotal = waterEntries
      .filter(e => e.date === dateStr)
      .reduce((sum, e) => sum + e.amount, 0);
    
    const checkDateStr = checkDate.toISOString().split("T")[0];
    if (dateStr === checkDateStr || (waterStreak === 0 && dayTotal >= dailyWaterGoal)) {
      if (dayTotal >= dailyWaterGoal) {
        waterStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr !== today) {
        break;
      }
    }
  }

  const addWater = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: today,
      amount,
      time: new Date().toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }),
    };
    setWaterEntries([...waterEntries, newEntry]);
    setShowWaterModal(false);
  };

  const addSupplement = (supplement: Omit<Supplement, "id" | "taken">) => {
    const newSupplement: Supplement = {
      ...supplement,
      id: Math.random().toString(36).substr(2, 9),
      taken: [],
    };
    setSupplements([...supplements, newSupplement]);
    setShowSupplementModal(false);
  };

  const toggleSupplement = (id: string) => {
    setSupplements(supplements.map(s => {
      if (s.id === id) {
        const todayEntry = { date: today, time: new Date().toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }) };
        const hasTakenToday = s.taken.some(t => t.date === today);
        
        if (hasTakenToday) {
          return { ...s, taken: s.taken.filter(t => t.date !== today) };
        } else {
          return { ...s, taken: [...s.taken, todayEntry] };
        }
      }
      return s;
    }));
  };

  const deleteSupplement = (id: string) => {
    setSupplements(supplements.filter(s => s.id !== id));
  };

  const deleteWaterEntry = (id: string) => {
    setWaterEntries(waterEntries.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Hydratace & Suplementy</h1>
                <p className="text-sm text-gray-500">Sleduj svůj pitný režim a doplňky</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-sm text-gray-400">Dnes vypito</span>
            </div>
            <p className="text-2xl font-bold">{todayWater} ml</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="text-sm text-gray-400">Streak</span>
            </div>
            <p className="text-2xl font-bold">{waterStreak} dní</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
                <Pill className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <span className="text-sm text-gray-400">Suplementy</span>
            </div>
            <p className="text-2xl font-bold">{supplements.length}</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <span className="text-sm text-gray-400">Splněno dnes</span>
            </div>
            <p className="text-2xl font-bold">
              {supplements.filter(s => s.taken.some(t => t.date === today)).length}/{supplements.length}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "water", label: "Hydratace", icon: Droplets },
            { id: "supplements", label: "Suplementy", icon: Pill },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white shadow-lg shadow-[#ff6b35]/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Water Tab */}
        {activeTab === "water" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Water Progress */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Denní cíl</h2>
                  <p className="text-sm text-gray-500">{dailyWaterGoal} ml</p>
                </div>
                <div className="relative">
                  <select
                    value={dailyWaterGoal}
                    onChange={(e) => setDailyWaterGoal(Number(e.target.value))}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-[#ff6b35]"
                  >
                    {waterGoals.map(goal => (
                      <option key={goal} value={goal} className="bg-[#0a0a0a]">{goal} ml</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45 * (waterPercentage / 100)} ${2 * Math.PI * 45}`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Droplets className="w-8 h-8 text-[#3b82f6] mb-2" />
                    <span className="text-3xl font-bold">{Math.round(waterPercentage)}%</span>
                    <span className="text-sm text-gray-500">{todayWater} ml</span>
                  </div>
                </div>
              </div>

              {/* Quick Add */}
              <div className="grid grid-cols-4 gap-3">
                {quickAddAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => addWater(amount)}
                    className="p-4 rounded-xl bg-white/5 hover:bg-[#3b82f6]/20 border border-white/10 hover:border-[#3b82f6]/50 transition-all"
                  >
                    <span className="text-lg font-bold text-[#3b82f6]">{amount}</span>
                    <span className="text-xs text-gray-500 block">ml</span>
                  </button>
                ))}
              </div>

              <Button
                fullWidth
                className="mt-4"
                onClick={() => setShowWaterModal(true)}
              >
                <Plus className="w-4 h-4" />
                Vlastní množství
              </Button>
            </Card>

            {/* Today's Entries */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Dnešní příjem</h2>
              <div className="space-y-3">
                {waterEntries
                  .filter(e => e.date === today)
                  .sort((a, b) => b.time.localeCompare(a.time))
                  .map((entry) => (
                    <Card key={entry.id} className="p-4" hover>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                            <GlassWater className="w-5 h-5 text-[#3b82f6]" />
                          </div>
                          <div>
                            <p className="font-semibold">{entry.amount} ml</p>
                            <p className="text-sm text-gray-500">{entry.time}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteWaterEntry(entry.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                
                {waterEntries.filter(e => e.date === today).length === 0 && (
                  <Card className="p-8 text-center">
                    <p className="text-gray-500">Zatím žádný záznam dnes</p>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Supplements Tab */}
        {activeTab === "supplements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Moje suplementy</h2>
              <Button onClick={() => setShowSupplementModal(true)}>
                <Plus className="w-4 h-4" />
                Přidat
              </Button>
            </div>

            {supplements.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Pill className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Žádné suplementy</h3>
                <p className="text-gray-500 mb-6">Přidej své doplňky stravy pro sledování</p>
                <Button onClick={() => setShowSupplementModal(true)}>
                  <Plus className="w-4 h-4" />
                  Přidat suplement
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supplements.map((supplement) => {
                  const takenToday = supplement.taken.some(t => t.date === today);
                  
                  return (
                    <Card
                      key={supplement.id}
                      className={`p-4 transition-all ${takenToday ? "opacity-60" : ""}`}
                      hover
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${supplement.color}20` }}
                          >
                            <Pill className="w-6 h-6" style={{ color: supplement.color }} />
                          </div>
                          <div>
                            <p className="font-semibold">{supplement.name}</p>
                            <p className="text-sm text-gray-500">{supplement.dosage}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {supplement.timeOfDay.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleSupplement(supplement.id)}
                            className={`p-2 rounded-xl transition-colors ${
                              takenToday
                                ? "bg-[#10b981]/20 text-[#10b981]"
                                : "bg-white/5 text-gray-500 hover:bg-[#ff6b35]/20 hover:text-[#ff6b35]"
                            }`}
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteSupplement(supplement.id)}
                            className="p-2 rounded-xl bg-white/5 text-gray-500 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* History */}
            {supplements.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Historie příjmu</h2>
                <div className="space-y-3">
                  {supplements
                    .flatMap(s => s.taken.map(t => ({ ...t, name: s.name, color: s.color })))
                    .sort((a, b) => new Date(b.date + "T" + b.time).getTime() - new Date(a.date + "T" + a.time).getTime())
                    .slice(0, 10)
                    .map((entry, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${entry.color}20` }}
                          >
                            <Pill className="w-4 h-4" style={{ color: entry.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{entry.name}</p>
                            <p className="text-sm text-gray-500">{entry.date} • {entry.time}</p>
                          </div>
                          <Check className="w-5 h-5 text-[#10b981]" />
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <MobileNav />

      {/* Water Modal */}
      <AnimatePresence>
        {showWaterModal && (
          <WaterModal
            onClose={() => setShowWaterModal(false)}
            onAdd={addWater}
          />
        )}
      </AnimatePresence>

      {/* Supplement Modal */}
      <AnimatePresence>
        {showSupplementModal && (
          <SupplementModal
            onClose={() => setShowSupplementModal(false)}
            onAdd={addSupplement}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WaterModal({ onClose, onAdd }: { onClose: () => void; onAdd: (amount: number) => void }) {
  const [amount, setAmount] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Přidat vodu</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Množství (ml)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder="např. 300"
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={onClose}>
            Zrušit
          </Button>
          <Button
            fullWidth
            onClick={() => onAdd(parseInt(amount) || 0)}
            disabled={!amount}
          >
            Přidat
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SupplementModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: Omit<Supplement, "id" | "taken">) => void }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "workout" | "custom">("daily");
  const [timeOfDay, setTimeOfDay] = useState<string[]>(["ráno"]);
  const [selectedColor, setSelectedColor] = useState(supplementColors[0]);

  const timeOptions = ["ráno", "snídaně", "oběd", "večeře", "před tréninkem", "po tréninku", "večer", "před spaním"];

  const toggleTime = (time: string) => {
    if (timeOfDay.includes(time)) {
      setTimeOfDay(timeOfDay.filter(t => t !== time));
    } else {
      setTimeOfDay([...timeOfDay, time]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Přidat suplement</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Název</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder="např. Protein, Kreatin..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Dávkování</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder="např. 30g, 5g, 1 tabletka..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Frekvence</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "daily", label: "Denně" },
                { id: "workout", label: "Trénink" },
                { id: "custom", label: "Vlastní" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrequency(f.id as any)}
                  className={`p-3 rounded-xl border text-sm transition-all ${
                    frequency === f.id
                      ? "border-[#ff6b35] bg-[#ff6b35]/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Čas příjmu</label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  className={`px-3 py-2 rounded-xl text-sm transition-all ${
                    timeOfDay.includes(time)
                      ? "bg-[#ff6b35] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Barva</label>
            <div className="flex gap-3">
              {supplementColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-xl transition-all ${
                    selectedColor === color ? "ring-2 ring-white scale-110" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={onClose}>
            Zrušit
          </Button>
          <Button
            fullWidth
            onClick={() =>
              onAdd({
                name,
                dosage,
                frequency,
                timeOfDay,
                color: selectedColor,
              })
            }
            disabled={!name || !dosage || timeOfDay.length === 0}
          >
            Přidat
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
