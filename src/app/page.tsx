"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Target,
  Utensils,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
  TrendingUp,
  Play,
  Star,
  Check,
  Flame,
  Crown,
  BarChart3,
  Brain,
  Sparkles,
  ChevronRight,
  Clock,
} from "lucide-react";
import BodyMap from "@/components/BodyMap";
import BodyMapModal from "@/components/BodyMapModal";
import { BodyPart } from "@/types";
import {
  workoutPlansData,
  mealPlansData,
  hallOfFameData,
} from "@/lib/data";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePartClick = (part: BodyPart) => {
    setSelectedBodyPart(part);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">LazorikGym</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Funkce</a>
              <a href="#calendar" className="text-sm text-gray-400 hover:text-white transition-colors">Kalendář</a>
              <a href="#body-map" className="text-sm text-gray-400 hover:text-white transition-colors">Analýza</a>
              <a href="#plans" className="text-sm text-gray-400 hover:text-white transition-colors">Plány</a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
                Přihlásit
              </Link>
              <Link href="/register">
                <Button size="sm">Začít zdarma</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 via-transparent to-[#3b82f6]/5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span className="text-sm font-medium text-[#ff6b35]">AI-powered fitness platforma</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trénuj chytřeji,
                <br />
                <span className="text-[#ff6b35]">ne tvrději</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                AI analyzuje tvé slabé partie a vytváří personalizované plány.
                Sleduj pokrok, získej tipy od trenérů a staň se součástí komunity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    Začít zdarma
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Play className="w-4 h-4" />
                    Zjistit více
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-6">
                {[
                  { icon: Users, val: "10k+", label: "Členů", color: "#3b82f6" },
                  { icon: Star, val: "4.9", label: "Hodnocení", color: "#f59e0b" },
                  { icon: Dumbbell, val: "500+", label: "Cviků", color: "#10b981" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-lg font-bold">{stat.val}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Calendar Showcase */}
            <div className="relative">
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Únor 2026</h3>
                      <p className="text-[10px] text-gray-500">Plánování tréninků</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Flame className="w-3 h-3 text-[#ff6b35]" />
                    <span>7 dní streak</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.02]">
                  {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => (
                    <div key={day} className="text-center py-2 text-[10px] text-gray-500 border-r border-white/5 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7" style={{ minHeight: "280px" }}>
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    const hasWorkout = [2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28].includes(day);
                    const isToday = day === 8;
                    
                    return (
                      <div key={day} className={`min-h-[40px] p-1 border-r border-b border-white/5 last:border-r-0 ${isToday ? "bg-[#ff6b35]/10" : ""}`}>
                        <span className={`text-[10px] ${isToday ? "text-[#ff6b35] font-bold" : "text-gray-600"}`}>{day}</span>
                        {hasWorkout && (
                          <div className={`w-1 h-1 rounded-full mx-auto mt-1 ${day < 8 ? "bg-emerald-500" : "bg-[#ff6b35]"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 p-3 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">12</p>
                    <p className="text-[10px] text-gray-500">Hotovo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean grid, less rounded */}
      <section id="features" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Vše v jedné <span className="text-[#ff6b35]">aplikaci</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Kompletní nástroje pro tvůj fitness pokrok - od plánování po analýzu
            </p>
          </div>

          {/* Feature Grid - Clean cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Analysis */}
            <div className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#ff6b35]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">AI Analýza</h3>
              <p className="text-gray-400 text-sm">
                Umělá inteligence analyzuje slabé partie a vytváří personalizované tréninkové plány.
              </p>
            </div>

            {/* Calendar */}
            <div id="calendar" className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#3b82f6]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Kalendář tréninků</h3>
              <p className="text-gray-400 text-sm">
                Plánuj své tréninky, sleduj streak a nech si od AI vytvořit optimální rozvrh.
              </p>
            </div>

            {/* Tracking */}
            <div className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#10b981]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sledování pokroku</h3>
              <p className="text-gray-400 text-sm">
                Vizualizuj svůj progres s interaktivními grafy a detailními statistikami.
              </p>
            </div>

            {/* Nutrition */}
            <div className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#8b5cf6]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Výživa na míru</h3>
              <p className="text-gray-400 text-sm">
                Jídelníčky s makroživinami, recepty a nákupní seznamy.
              </p>
            </div>

            {/* Plans */}
            <div className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#f59e0b]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Tréninkové plány</h3>
              <p className="text-gray-400 text-sm">
                50+ plánů od začátečníků po pokročilé pro každý cíl.
              </p>
            </div>

            {/* Community */}
            <div className="group p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-[#ec4899]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ec4899] to-[#db2777] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Komunita</h3>
              <p className="text-gray-400 text-sm">
                Sdílej úspěchy, motivuj se s ostatními a soutěž ve výzvách.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Calendar Showcase Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Large Calendar Preview */}
            <div className="order-2 lg:order-1">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/5 rounded">
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <h3 className="text-lg font-semibold">Únor 2026</h3>
                    <button className="p-1 hover:bg-white/5 rounded">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 text-sm bg-white/5 rounded hover:bg-white/10">
                      Dnes
                    </button>
                    <button className="p-2 bg-[#ff6b35] rounded-lg hover:bg-[#ff6b35]/90">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Days header */}
                <div className="grid grid-cols-7 bg-white/[0.02]">
                  {["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"].map((day) => (
                    <div key={day} className="text-center py-2 text-xs text-gray-500 border-r border-white/5 last:border-r-0">
                      {day.slice(0, 2)}
                    </div>
                  ))}
                </div>

                {/* Calendar cells - larger */}
                <div className="grid grid-cols-7 auto-rows-fr" style={{ minHeight: "400px" }}>
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    const hasEvents = [3, 5, 10, 12, 15, 17, 19, 24, 26].includes(day);
                    const isToday = day === 12;
                    
                    return (
                      <div
                        key={day}
                        className={`
                          min-h-[80px] p-2 border-r border-b border-white/5 last:border-r-0
                          ${isToday ? "bg-[#ff6b35]/5" : "hover:bg-white/[0.02]"}
                        `}
                      >
                        <div className={`
                          w-7 h-7 flex items-center justify-center text-sm mb-1
                          ${isToday ? "bg-[#ff6b35] rounded-full text-white" : "text-gray-500"}
                        `}>
                          {day}
                        </div>
                        {day === 12 && (
                          <div className="text-xs px-2 py-1 rounded bg-[#ff6b35] text-white mb-1">
                            <div className="font-medium">Push Day</div>
                            <div className="text-[10px] opacity-80">60 min</div>
                          </div>
                        )}
                        {day === 14 && (
                          <div className="text-xs px-2 py-1 rounded bg-[#3b82f6] text-white mb-1">
                            <div className="font-medium">Kardio</div>
                            <div className="text-[10px] opacity-80">45 min</div>
                          </div>
                        )}
                        {day === 17 && (
                          <div className="text-xs px-2 py-1 rounded bg-[#8b5cf6] text-white">
                            <div className="font-medium">Pull Day</div>
                            <div className="text-[10px] opacity-80">60 min</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                <Calendar className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-[#ff6b35]">Inteligentní plánování</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Plánuj své tréninky jako profík
              </h2>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Vizualizuj svůj tréninkový plán v přehledném kalendáři. Sleduj streak, 
                plánuj dopředu a nech si od AI vytvořit optimální rozvrh na míru.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-8">
                {[
                  { text: "Týdenní a měsíční pohled", icon: Calendar },
                  { text: "AI generování tréninkových plánů", icon: Brain },
                  { text: "Sledování streak a statistik", icon: Flame },
                  { text: "Detailní zobrazení každého tréninku", icon: BarChart3 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-[#ff6b35]" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ff6b35] text-white font-semibold hover:bg-[#ff6b35]/90 transition-colors"
              >
                Vyzkoušet zdarma
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body Map Section */}
      <section id="body-map" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ff6b35]/10 border border-[#ff6b35]/20 mb-6">
                <Target className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm font-medium text-[#ff6b35]">Interaktivní analýza</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Zaměř se na <span className="text-[#ff6b35]">slabé partie</span>
              </h2>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Klikni na svalovou skupinu a získej personalizovaný plán cviků.
                AI ti doporučí nejefektivnější cviky pro rychlý pokrok.
              </p>

              <div className="space-y-4">
                {[
                  "Personalizované cviky pro každou partii",
                  "Video návody s technikou",
                  "Sledování pokroku v čase",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-[#10b981]" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Body Map */}
            <div className="relative">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                <BodyMap onPartClick={handlePartClick} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Jídelníčky na míru
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Vyber si plán podle svého cíle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mealPlansData.map((plan) => {
              const configs = {
                bulking: { color: "#10b981", label: "Nabírání" },
                cutting: { color: "#ef4444", label: "Redukce" },
                maintenance: { color: "#3b82f6", label: "Udržení" },
              };
              const config = configs[plan.type as keyof typeof configs];

              return (
                <div
                  key={plan.id}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-lg hover:border-white/20 transition-all"
                >
                  <div
                    className="inline-block px-3 py-1 rounded text-xs font-medium mb-4"
                    style={{ backgroundColor: `${config.color}15`, color: config.color }}
                  >
                    {config.label}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                  <div className="flex items-center gap-8 mb-6 py-4 border-y border-white/5">
                    <div>
                      <div className="text-2xl font-bold">{plan.totalCalories}</div>
                      <div className="text-xs text-gray-500">kcal/den</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{plan.totalProtein}g</div>
                      <div className="text-xs text-gray-500">protein</div>
                    </div>
                  </div>

                  <Link href="/dashboard/jidelnicky">
                    <button
                      className="w-full py-3 rounded-lg font-medium transition-colors text-white"
                      style={{ backgroundColor: config.color }}
                    >
                      Zobrazit plán
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workout Plans */}
      <section id="plans" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tréninkové plány
            </h2>
            <p className="text-gray-400">
              Od začátečníků po pokročilé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {workoutPlansData.map((plan, index) => {
              const colors = ["#ff6b35", "#3b82f6", "#8b5cf6", "#10b981"];
              const color = colors[index % colors.length];

              return (
                <div
                  key={plan.id}
                  className="flex gap-4 p-5 bg-white/[0.02] border border-white/10 rounded-lg hover:border-white/20 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Dumbbell className="w-6 h-6" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{plan.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: plan.difficulty === "Začátečník" ? "#10b98115" : plan.difficulty === "Pokročilý" ? "#ef444415" : "#f59e0b15",
                          color: plan.difficulty === "Začátečník" ? "#10b981" : plan.difficulty === "Pokročilý" ? "#ef4444" : "#f59e0b"
                        }}
                      >
                        {plan.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{plan.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{plan.duration}</span>
                      <Link href="/dashboard/treninkove-plany">
                        <button className="px-4 py-1.5 rounded-md bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors">
                          Zobrazit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section id="community" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Síň slávy
            </h2>
            <p className="text-gray-400">
              Inspiruj se úspěchy našich členů
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hallOfFameData.map((entry, index) => (
              <div
                key={entry.id}
                className="text-center p-5 bg-white/[0.02] border border-white/10 rounded-lg"
              >
                {index < 3 && (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-3 ${
                    index === 0 ? "bg-[#fbbf24] text-black" :
                    index === 1 ? "bg-gray-400 text-black" :
                    "bg-[#b45309] text-white"
                  }`}>
                    {index === 0 ? <Crown className="w-3.5 h-3.5" /> : index + 1}
                  </div>
                )}

                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center text-lg font-bold mb-3">
                  {entry.userName.split(" ").map(n => n[0]).join("")}
                </div>

                <h3 className="font-bold mb-1">{entry.userName}</h3>
                <p className="text-[#ff6b35] text-sm font-medium mb-2">{entry.achievement}</p>
                <p className="text-gray-500 text-xs mb-3">{entry.description}</p>

                {entry.stats && (
                  <div className="flex justify-center gap-4 pt-3 border-t border-white/5 text-sm">
                    {entry.stats.weightLost && (
                      <span className="text-[#10b981] font-bold">-{entry.stats.weightLost}kg</span>
                    )}
                    {entry.stats.muscleGained && (
                      <span className="text-[#ff6b35] font-bold">+{entry.stats.muscleGained}kg</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Připraven začít?
          </h2>
          <p className="text-gray-400 mb-8">
            Připoj se k tisícům spokojených uživatelů a začni svou transformaci ještě dnes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 rounded-lg bg-[#ff6b35] text-white font-semibold hover:bg-[#ff6b35]/90 transition-colors"
            >
              Vytvořit účet zdarma
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 rounded-lg border border-white/10 font-semibold hover:bg-white/5 transition-colors"
            >
              Mám už účet
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            {["Zdarma navždy", "Bez kreditky", "Okamžitý přístup"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#10b981]" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">LazorikGym</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Ochrana údajů</a>
              <a href="#" className="hover:text-white transition-colors">Podmínky</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>
            <p className="text-sm text-gray-600">© 2026 LazorikGym. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <BodyMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodyPart={selectedBodyPart}
      />
    </main>
  );
}
