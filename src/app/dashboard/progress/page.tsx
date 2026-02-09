"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  TrendingUp,
  Calendar,
  Plus,
  Trash2,
  Scale,
  Ruler,
  Upload,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MobileNav } from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ProgressPhoto {
  id: string;
  url: string;
  date: string;
  type: "front" | "side" | "back" | "other";
  notes?: string;
}

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
}

interface Measurement {
  id: string;
  name: string;
  unit: string;
  entries: {
    date: string;
    value: number;
  }[];
}

const measurementOptions = [
  { id: "chest", name: "Hrudník", unit: "cm" },
  { id: "waist", name: "Pás", unit: "cm" },
  { id: "hips", name: "Boky", unit: "cm" },
  { id: "biceps", name: "Biceps", unit: "cm" },
  { id: "thighs", name: "Stehna", unit: "cm" },
  { id: "shoulders", name: "Ramena", unit: "cm" },
  { id: "calves", name: "Lýtka", unit: "cm" },
  { id: "neck", name: "Krk", unit: "cm" },
];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<"photos" | "weight" | "measurements">("photos");
  const [photos, setPhotos] = useLocalStorage<ProgressPhoto[]>("progress_photos", []);
  const [weightHistory, setWeightHistory] = useLocalStorage<WeightEntry[]>("weight_history", []);
  const [measurements, setMeasurements] = useLocalStorage<Measurement[]>("measurements", []);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string>("chest");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState<"front" | "side" | "back" | "other">("front");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate stats
  const currentWeight = weightHistory.length > 0 
    ? weightHistory[weightHistory.length - 1].weight 
    : null;
  const startingWeight = weightHistory.length > 0 
    ? weightHistory[0].weight 
    : null;
  const weightChange = currentWeight && startingWeight 
    ? currentWeight - startingWeight 
    : null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: ProgressPhoto = {
          id: Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          date: new Date().toISOString().split("T")[0],
          type: selectedPhotoType,
        };
        setPhotos([newPhoto, ...photos]);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddWeight = (weight: number, bodyFat?: number) => {
    const newEntry: WeightEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split("T")[0],
      weight,
      bodyFat,
    };
    setWeightHistory([...weightHistory, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowWeightModal(false);
  };

  const handleAddMeasurement = (measurementId: string, value: number) => {
    const existingMeasurement = measurements.find(m => m.id === measurementId);
    const newEntry = { date: new Date().toISOString().split("T")[0], value };
    
    if (existingMeasurement) {
      setMeasurements(measurements.map(m => 
        m.id === measurementId 
          ? { ...m, entries: [...m.entries, newEntry] }
          : m
      ));
    } else {
      const option = measurementOptions.find(o => o.id === measurementId)!;
      setMeasurements([...measurements, {
        id: measurementId,
        name: option.name,
        unit: option.unit,
        entries: [newEntry],
      }]);
    }
    setShowMeasurementModal(false);
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const getPhotoTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      front: "Zepředu",
      side: "Z boku",
      back: "Zezadu",
      other: "Jiné",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Můj progres</h1>
              <p className="text-sm text-gray-500">Sleduj svou transformaci</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <span className="text-sm text-gray-400">Fotek</span>
            </div>
            <p className="text-2xl font-bold">{photos.length}</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="text-sm text-gray-400">Aktuální váha</span>
            </div>
            <p className="text-2xl font-bold">{currentWeight ? `${currentWeight} kg` : "—"}</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-sm text-gray-400">Změna</span>
            </div>
            <p className={`text-2xl font-bold ${weightChange && weightChange < 0 ? "text-[#10b981]" : weightChange && weightChange > 0 ? "text-[#ef4444]" : ""}`}>
              {weightChange ? `${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)} kg` : "—"}
            </p>
          </Card>

          <Card variant="gradient" className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
                <Ruler className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <span className="text-sm text-gray-400">Měření</span>
            </div>
            <p className="text-2xl font-bold">{measurements.length}</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "photos" as const, label: "Fotografie", icon: Camera },
            { id: "weight" as const, label: "Váha", icon: Scale },
            { id: "measurements" as const, label: "Měření", icon: Ruler },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Progress fotky</h2>
              <Button onClick={() => setShowUploadModal(true)}>
                <Plus className="w-4 h-4" />
                Přidat fotku
              </Button>
            </div>

            {photos.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Zatím žádné fotky</h3>
                <p className="text-gray-500 mb-6">Přidej svou první progress fotku a sleduj změny</p>
                <Button onClick={() => setShowUploadModal(true)}>
                  <Upload className="w-4 h-4" />
                  Nahrát fotku
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden group" hover>
                    <div className="relative aspect-[3/4]">
                      <img
                        src={photo.url}
                        alt={`Progress ${photo.date}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-sm font-medium">{getPhotoTypeLabel(photo.type)}</p>
                        <p className="text-xs text-gray-400">{photo.date}</p>
                      </div>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Weight Tab */}
        {activeTab === "weight" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Trend váhy</h2>
              <Button onClick={() => setShowWeightModal(true)}>
                <Plus className="w-4 h-4" />
                Zapsat váhu
              </Button>
            </div>

            {weightHistory.length >= 2 && (
              <Card className="p-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightHistory}>
                    <defs>
                      <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666" 
                      fontSize={12}
                      tickFormatter={(date) => new Date(date).toLocaleDateString("cs-CZ", { day: 'numeric', month: 'short' })}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      domain={['dataMin - 2', 'dataMax + 2']}
                      tickFormatter={(val) => `${val}kg`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #ffffff10", borderRadius: "12px" }}
                      labelStyle={{ color: "#666", marginBottom: "4px" }}
                      itemStyle={{ color: "#10b981", fontWeight: "bold" }}
                      labelFormatter={(date) => new Date(date).toLocaleDateString("cs-CZ")}
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#weightGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            )}

            {weightHistory.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Žádné záznamy</h3>
                <p className="text-gray-500 mb-6">Začni zapisovat svou váhu a sleduj pokrok</p>
                <Button onClick={() => setShowWeightModal(true)}>
                  <Plus className="w-4 h-4" />
                  Přidat záznam
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {[...weightHistory].reverse().map((entry) => (
                  <Card key={entry.id} className="p-4" hover>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#10b981]" />
                        </div>
                        <div>
                          <p className="font-semibold">{entry.weight} kg</p>
                          <p className="text-sm text-gray-500">{entry.date}</p>
                        </div>
                      </div>
                      {entry.bodyFat && (
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Tělesný tuk</p>
                          <p className="font-semibold">{entry.bodyFat}%</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Measurements Tab */}
        {activeTab === "measurements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sledování mír</h2>
              <Button onClick={() => setShowMeasurementModal(true)}>
                <Plus className="w-4 h-4" />
                Přidat měření
              </Button>
            </div>

            {measurements.find(m => m.id === selectedMeasurementId)?.entries.length ? (
              <Card className="p-6 h-[250px]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-400">
                    Trend: {measurementOptions.find(o => o.id === selectedMeasurementId)?.name}
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={measurements.find(m => m.id === selectedMeasurementId)?.entries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666" 
                      fontSize={12}
                      tickFormatter={(date) => new Date(date).toLocaleDateString("cs-CZ", { day: 'numeric', month: 'short' })}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      domain={['auto', 'auto']}
                      tickFormatter={(val) => `${val}cm`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #ffffff10", borderRadius: "12px" }}
                      labelStyle={{ color: "#666", marginBottom: "4px" }}
                      itemStyle={{ color: "#8b5cf6", fontWeight: "bold" }}
                      labelFormatter={(date) => new Date(date).toLocaleDateString("cs-CZ")}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            ) : null}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {measurementOptions.map((option) => {
                const measurement = measurements.find(m => m.id === option.id);
                const latestValue = measurement?.entries[measurement.entries.length - 1]?.value;
                const previousValue = measurement?.entries[measurement.entries.length - 2]?.value;
                const change = latestValue && previousValue ? latestValue - previousValue : null;
                const isSelected = selectedMeasurementId === option.id;

                return (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-[#8b5cf6] bg-[#8b5cf6]/5" : ""
                    }`}
                    hover
                    onClick={() => setSelectedMeasurementId(option.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isSelected ? "text-[#8b5cf6] font-medium" : "text-gray-400"}`}>
                        {option.name}
                      </span>
                      <Ruler className={`w-4 h-4 ${isSelected ? "text-[#8b5cf6]" : "text-gray-500"}`} />
                    </div>
                    <p className="text-2xl font-bold">{latestValue ? `${latestValue} ${option.unit}` : "—"}</p>
                    {change !== null && (
                      <p className={`text-sm ${change > 0 ? "text-[#10b981]" : change < 0 ? "text-[#ef4444]" : "text-gray-500"}`}>
                        {change > 0 ? "+" : ""}{change} {option.unit}
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
            
            <Button variant="outline" fullWidth onClick={() => setShowMeasurementModal(true)}>
                Zapsat nové měření
            </Button>
          </motion.div>
        )}
      </main>

      <MobileNav />

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-secondary)] border border-white/10 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Nahrát fotku</h3>
                <button onClick={() => setShowUploadModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { id: "front" as const, label: "Zepředu", icon: "📷" },
                  { id: "side" as const, label: "Z boku", icon: "📸" },
                  { id: "back" as const, label: "Zezadu", icon: "📹" },
                  { id: "other" as const, label: "Jiné", icon: "🖼️" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPhotoType(type.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedPhotoType === type.id
                        ? "border-[#ff6b35] bg-[#ff6b35]/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <Button
                fullWidth
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Vybrat fotku
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weight Modal */}
      <AnimatePresence>
        {showWeightModal && (
          <WeightModal
            onClose={() => setShowWeightModal(false)}
            onSave={handleAddWeight}
          />
        )}
      </AnimatePresence>

      {/* Measurement Modal */}
      <AnimatePresence>
        {showMeasurementModal && (
          <MeasurementModal
            onClose={() => setShowMeasurementModal(false)}
            onSave={handleAddMeasurement}
            options={measurementOptions}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function WeightModal({ onClose, onSave }: { onClose: () => void; onSave: (weight: number, bodyFat?: number) => void }) {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");

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
        className="bg-[var(--bg-secondary)] border border-white/10 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Zapsat váhu</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Váha (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder=" např. 75.5"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tělesný tuk (%)</label>
            <input
              type="number"
              step="0.1"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder=" volitelné"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={onClose}>
            Zrušit
          </Button>
          <Button
            fullWidth
            onClick={() => onSave(parseFloat(weight), bodyFat ? parseFloat(bodyFat) : undefined)}
            disabled={!weight}
          >
            Uložit
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MeasurementModal({
  onClose,
  onSave,
  options,
}: {
  onClose: () => void;
  onSave: (id: string, value: number) => void;
  options: { id: string; name: string; unit: string }[];
}) {
  const [selectedMeasurement, setSelectedMeasurement] = useState(options[0].id);
  const [value, setValue] = useState("");

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
        className="bg-[var(--bg-secondary)] border border-white/10 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Přidat měření</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Partie</label>
            <div className="relative">
              <select
                value={selectedMeasurement}
                onChange={(e) => setSelectedMeasurement(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#ff6b35]"
              >
                {options.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[var(--bg-secondary)]">
                    {opt.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Hodnota ({options.find(o => o.id === selectedMeasurement)?.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff6b35]"
              placeholder=" např. 85"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" fullWidth onClick={onClose}>
            Zrušit
          </Button>
          <Button
            fullWidth
            onClick={() => onSave(selectedMeasurement, parseFloat(value))}
            disabled={!value}
          >
            Uložit
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
