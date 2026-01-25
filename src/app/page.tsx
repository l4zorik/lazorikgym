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
  Quote,
  TrendingUp,
  Play,
  Star,
  Check,
  Flame,
  Crown,
  Activity,
  Zap,
  BarChart3,
  Brain,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import BodyMap from "@/components/BodyMap";
import BodyMapModal from "@/components/BodyMapModal";
import { BodyPart } from "@/types";
import {
  workoutPlansData,
  mealPlansData,
  trainerTipsData,
  hallOfFameData,
} from "@/lib/data";

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
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }} className="py-4">
          <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">LazorikGym</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Funkce</a>
              <a href="#body-map" className="text-sm text-gray-400 hover:text-white transition-colors">Analýza</a>
              <a href="#plans" className="text-sm text-gray-400 hover:text-white transition-colors">Plány</a>
              <a href="#community" className="text-sm text-gray-400 hover:text-white transition-colors">Komunita</a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2">
                Přihlásit
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Začít zdarma
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-[#ff6b35]/30 to-[#ff3366]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />

        <div className="relative" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff6b35]/20 to-[#ff3366]/10 border border-[#ff6b35]/30 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse" />
                <span className="text-sm font-medium text-white/90">AI-powered fitness platforma</span>
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]">
                Trénuj chytřeji,
                <br />
                <span className="bg-gradient-to-r from-[#ff6b35] via-[#ff3366] to-[#8b5cf6] bg-clip-text text-transparent">
                  ne tvrději
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
                AI analyzuje tvé slabé partie a vytváří personalizované plány.
                Sleduj pokrok, získej tipy od trenérů a staň se součástí komunity.
              </p>

              {/* CTA Buttons - Upgraded */}
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <Link
                  href="/register"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#ff3366] text-white font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">Začít zdarma</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border-2 border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  Zjistit více
                </a>
              </div>

              {/* Stats row - Upgraded */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Členů</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#f97316] flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Hodnocení</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Cviků</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Visual - Upgraded */}
            <div className="relative hidden lg:block">
              {/* Glow behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#ff6b35]/20 to-[#ff3366]/20 rounded-full blur-[100px]" />

              <div className="relative">
                {/* Floating card - Top Right */}
                <div className="absolute -top-6 -right-4 z-20 px-5 py-3.5 rounded-2xl bg-[#0d1117]/90 backdrop-blur-xl border border-[#10b981]/30 shadow-2xl shadow-[#10b981]/10 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#10b981]">+12%</div>
                      <div className="text-xs text-gray-500">tento měsíc</div>
                    </div>
                  </div>
                </div>

                {/* Main AI Card - Upgraded */}
                <div className="relative z-10 p-8 rounded-3xl bg-[#0d1117]/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                          <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10b981] border-2 border-[#0d1117] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">AI Analýza</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                          <p className="text-sm text-gray-400">Skenování dokončeno</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20">
                      <span className="text-xs font-semibold text-[#ff6b35]">LIVE</span>
                    </div>
                  </div>

                  {/* Progress bars - Upgraded */}
                  <div className="space-y-5">
                    {[
                      { name: "Hrudník", value: 75, color: "#10b981", icon: "💪" },
                      { name: "Záda", value: 60, color: "#3b82f6", icon: "🔥" },
                      { name: "Ramena", value: 45, color: "#ff6b35", icon: "⚡" },
                      { name: "Core", value: 30, color: "#ff3366", icon: "🎯" },
                    ].map((item) => (
                      <div key={item.name} className="group">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-sm font-medium text-gray-300">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
                          </div>
                        </div>
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${item.value}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom stats */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Celkový progres</span>
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-[#ff6b35] to-[#ff3366] bg-clip-text text-transparent">52.5%</div>
                  </div>
                </div>

                {/* Floating card - Bottom Left */}
                <div className="absolute -bottom-6 -left-4 z-20 px-5 py-3.5 rounded-2xl bg-[#0d1117]/90 backdrop-blur-xl border border-[#ff6b35]/30 shadow-2xl shadow-[#ff6b35]/10 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#ff6b35]">2,450</div>
                      <div className="text-xs text-gray-500">kcal spáleno</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-40 relative">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-sm text-gray-400">Proč LazorikGym</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Vše v jedné
              <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff3366] bg-clip-text text-transparent"> aplikaci</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Large card - AI Analysis */}
            <div className="lg:col-span-2 group relative p-10 rounded-[2rem] bg-gradient-to-br from-[#ff6b35]/10 via-transparent to-[#ff3366]/10 border border-white/10 hover:border-[#ff6b35]/30 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff6b35]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center mb-8" style={{ width: '4.5rem', height: '4.5rem' }}>
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Analýza slabých partií</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                  Umělá inteligence analyzuje tvou postavu, identifikuje slabé partie a vytváří personalizovaný tréninkový plán pro maximální výsledky.
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] font-medium hover:bg-[#ff6b35]/20 transition-colors cursor-pointer">
                  <span>Zjistit více</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Tracking card */}
            <div className="group relative p-10 rounded-[2rem] bg-gradient-to-br from-[#3b82f6]/10 to-transparent border border-white/10 hover:border-[#3b82f6]/30 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3b82f6]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center mb-8">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Sledování pokroku</h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  Vizualizuj svůj progres s interaktivními grafy a statistikami.
                </p>
              </div>
            </div>

            {/* Nutrition card */}
            <div className="group relative p-10 rounded-[2rem] bg-gradient-to-br from-[#10b981]/10 to-transparent border border-white/10 hover:border-[#10b981]/30 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#10b981]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-8">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Výživa na míru</h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  Jídelníčky s makry, recepty a nákupními seznamy.
                </p>
              </div>
            </div>

            {/* Plans card */}
            <div className="group relative p-10 rounded-[2rem] bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-white/10 hover:border-[#8b5cf6]/30 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] flex items-center justify-center mb-8">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Tréninkové plány</h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  50+ plánů od začátečníků po pokročilé.
                </p>
              </div>
            </div>

            {/* Community card */}
            <div className="group relative p-10 rounded-[2rem] bg-gradient-to-br from-[#f59e0b]/10 to-transparent border border-white/10 hover:border-[#f59e0b]/30 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f59e0b]/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center mb-8">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Komunita</h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  Sdílej úspěchy a motivuj se s ostatními.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Map Section */}
      <section id="body-map" className="py-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-[#030303]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ff6b35]/10 to-[#ff3366]/10 rounded-full blur-[200px]" />

        <div className="relative" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Target className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm text-gray-400">Interaktivní analýza</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Zaměř se na
                <span className="bg-gradient-to-r from-[#ff6b35] to-[#ff3366] bg-clip-text text-transparent"> slabé partie</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Klikni na svalovou skupinu a získej personalizovaný plán cviků.
                AI ti doporučí nejefektivnější cviky pro rychlý pokrok.
              </p>

              <div className="space-y-4">
                {[
                  "Personalizované cviky pro každou partii",
                  "Video návody s technikou",
                  "Sledování pokroku v čase",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ff6b35]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#ff6b35]" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                <BodyMap onPartClick={handlePartClick} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section id="meals" className="py-32 relative">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 mb-6">
              <Utensils className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm text-[#10b981]">Výživa</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Jídelníčky na míru
            </h2>
            <p className="text-xl text-gray-400" style={{ maxWidth: '42rem', margin: '0 auto' }}>
              Vyber si plán podle svého cíle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" style={{ maxWidth: '64rem', margin: '0 auto' }}>
            {mealPlansData.map((plan, index) => {
              const configs = {
                bulking: { gradient: "from-[#10b981] to-[#059669]", color: "#10b981" },
                cutting: { gradient: "from-[#ef4444] to-[#dc2626]", color: "#ef4444" },
                maintenance: { gradient: "from-[#3b82f6] to-[#2563eb]", color: "#3b82f6" },
              };
              const config = configs[plan.type as keyof typeof configs];

              return (
                <div
                  key={plan.id}
                  className="group relative rounded-3xl overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold">
                      Nejpopulárnější
                    </div>
                  )}

                  <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all h-full">
                    <div
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
                      style={{ backgroundColor: `${config.color}20`, color: config.color }}
                    >
                      {plan.type === "bulking" ? "Nabírání" : plan.type === "cutting" ? "Redukce" : "Udržení"}
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">{plan.description}</p>

                    <div className="flex items-center gap-8 mb-8 py-6 border-y border-white/5">
                      <div>
                        <div className="text-3xl font-bold">{plan.totalCalories}</div>
                        <div className="text-xs text-gray-500">kcal/den</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{plan.totalProtein}g</div>
                        <div className="text-xs text-gray-500">protein</div>
                      </div>
                    </div>

                    <Link href="/dashboard/jidelnicky">
                      <button
                        className={`w-full py-4 rounded-2xl font-semibold transition-all bg-gradient-to-r ${config.gradient} hover:opacity-90`}
                      >
                        Zobrazit plán
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workout Plans */}
      <section id="plans" className="py-32 relative">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="relative" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6">
              <Calendar className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-sm text-[#8b5cf6]">Trénink</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tréninkové plány
            </h2>
            <p className="text-xl text-gray-400">
              Od začátečníků po pokročilé
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: '56rem', margin: '0 auto' }}>
            {workoutPlansData.map((plan, index) => {
              const colors = ["#ff6b35", "#3b82f6", "#8b5cf6", "#10b981"];
              const color = colors[index % colors.length];

              return (
                <div
                  key={plan.id}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex gap-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Dumbbell className="w-7 h-7" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: plan.difficulty === "Začátečník" ? "#10b98120" : plan.difficulty === "Pokročilý" ? "#ef444420" : "#f59e0b20",
                            color: plan.difficulty === "Začátečník" ? "#10b981" : plan.difficulty === "Pokročilý" ? "#ef4444" : "#f59e0b"
                          }}
                        >
                          {plan.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{plan.duration}</span>
                        <Link href="/dashboard/treninkove-plany">
                          <button className="px-5 py-2 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                            Zobrazit
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials / Tips */}
      <section className="py-32 relative">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Quote className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Tipy od profesionálů</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Rady od trenérů
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8" style={{ maxWidth: '64rem', margin: '0 auto' }}>
            {trainerTipsData.slice(0, 4).map((tip, index) => (
              <div
                key={tip.id}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
                <p className="text-lg text-gray-300 mb-8 leading-relaxed relative">
                  "{tip.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center font-bold">
                    {tip.trainerName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{tip.trainerName}</div>
                    <div className="text-sm text-gray-500">{tip.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section id="community" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#030303]" />
        <div className="relative" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-6">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-500">Komunita</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Síň slávy
            </h2>
            <p className="text-xl text-gray-400">
              Inspiruj se úspěchy našich členů
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hallOfFameData.map((entry, index) => (
              <div
                key={entry.id}
                className="relative text-center p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                {index < 3 && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black" :
                    index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-black" :
                    "bg-gradient-to-br from-amber-600 to-amber-800 text-white"
                  }`}>
                    {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
                  </div>
                )}

                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center text-2xl font-bold mb-4">
                  {entry.userName.split(" ").map(n => n[0]).join("")}
                </div>

                <h3 className="font-bold text-lg mb-1">{entry.userName}</h3>
                <p className="text-[#ff6b35] text-sm font-medium mb-3">{entry.achievement}</p>
                <p className="text-gray-500 text-xs mb-4">{entry.description}</p>

                {entry.stats && (
                  <div className="flex justify-center gap-4 pt-4 border-t border-white/5">
                    {entry.stats.weightLost && (
                      <div className="text-[#10b981] font-bold">-{entry.stats.weightLost}kg</div>
                    )}
                    {entry.stats.muscleGained && (
                      <div className="text-[#ff6b35] font-bold">+{entry.stats.muscleGained}kg</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] via-[#ff3366] to-[#8b5cf6]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="relative text-center" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Připraven začít?
          </h2>
          <p className="text-xl text-white/80 mb-10" style={{ maxWidth: '32rem', margin: '0 auto' }}>
            Připoj se k tisícům spokojených uživatelů a začni svou transformaci ještě dnes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-10 py-5 rounded-2xl bg-white text-[#ff6b35] font-bold text-lg hover:bg-white/90 transition-colors flex items-center gap-3"
            >
              Vytvořit účet zdarma
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-10 py-5 rounded-2xl border-2 border-white/30 font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Mám už účet
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            {["Zdarma navždy", "Bez kreditky", "Okamžitý přístup"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-white/70">
                <Check className="w-5 h-5" />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">LazorikGym</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 LazorikGym. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <BodyMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodyPart={selectedBodyPart}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
