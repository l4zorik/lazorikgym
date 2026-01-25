"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Calendar,
  Dumbbell,
  Plus,
  TrendingUp,
  Target,
  Utensils,
  Users,
  Trophy,
  ChevronRight,
  LogOut,
  Lightbulb,
  Play,
  Clock,
  Flame,
  Heart,
  Brain,
  Zap,
  Moon,
  Shield,
  Smile,
  Info,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import BodyMapModal from "@/components/BodyMapModal";
import BodyPartGrid from "@/components/BodyPartGrid";
import AIAssistantCard from "@/components/AIAssistantCard";
import { BodyPart } from "@/types";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePartClick = (part: BodyPart) => {
    setSelectedBodyPart(part);
    setIsModalOpen(true);
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Activity, active: true },
    { label: "Jídelníčky", href: "/dashboard/jidelnicky", icon: Utensils },
    { label: "Plány", href: "/dashboard/treninkove-plany", icon: Calendar },
    { label: "Tipy", href: "/dashboard/tipy", icon: Lightbulb },
    { label: "Síň slávy", href: "/dashboard/sin-slavy", icon: Trophy },
  ];

  const recentWorkouts = [
    { title: "Leg Day", date: "Včera", duration: "75 min", color: "#10b981" },
    { title: "Pull Day", date: "Před 3 dny", duration: "60 min", color: "#3b82f6" },
    { title: "Push Day", date: "Před 5 dní", duration: "55 min", color: "#8b5cf6" },
  ];

  const quickLinks = [
    { label: "Nový trénink", href: "/workout/new", icon: Plus, color: "#ff6b35" },
    { label: "Knihovna cviků", href: "/exercises", icon: Dumbbell, color: "#3b82f6" },
    { label: "Jídelníček", href: "/dashboard/jidelnicky", icon: Utensils, color: "#10b981" },
    { label: "Komunita", href: "/dashboard/sin-slavy", icon: Users, color: "#8b5cf6" },
  ];

  const exerciseBenefits = [
    {
      icon: Heart,
      title: "Zdravé srdce",
      description: "Pravidelný trénink snižuje riziko srdečních chorob až o 35%",
      color: "#ef4444",
    },
    {
      icon: Brain,
      title: "Lepší mysl",
      description: "Cvičení zvyšuje produkci endorfinů a zlepšuje paměť",
      color: "#8b5cf6",
    },
    {
      icon: Zap,
      title: "Více energie",
      description: "Aktivní lidé mají o 20% více energie během dne",
      color: "#f59e0b",
    },
    {
      icon: Moon,
      title: "Kvalitní spánek",
      description: "Trénink zlepšuje kvalitu spánku a regeneraci těla",
      color: "#3b82f6",
    },
    {
      icon: Shield,
      title: "Silná imunita",
      description: "Pravidelný pohyb posiluje imunitní systém",
      color: "#10b981",
    },
    {
      icon: Smile,
      title: "Lepší nálada",
      description: "Cvičení snižuje stres a příznaky deprese",
      color: "#ec4899",
    },
  ];

  const weakParts = getWeakBodyParts();

  // Calculate overall progress
  const overallProgress = Math.round(
    bodyPartsData.reduce((acc, part) => acc + part.progress, 0) / bodyPartsData.length
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold hidden sm:block">LazorikGym</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      item.active
                        ? "bg-[#ff6b35]/10 text-[#ff6b35]"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || "Host"}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "H"}
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-24 lg:pb-12">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>

          {/* Welcome Section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-3">
              Ahoj, {user?.name?.split(' ')[0] || 'sportovče'} 👋
            </h1>
            <p className="text-gray-400 text-lg">Připraven na další trénink? Tvoje tělo ti poděkuje.</p>
          </div>

          {/* Stats Row - Full Width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Tento týden", value: "3", unit: "tréninky", icon: Activity, color: "#3b82f6" },
              { label: "Progres", value: "+2.5", unit: "%", icon: TrendingUp, color: "#10b981" },
              { label: "Kalorie", value: "12.4k", unit: "kcal", icon: Flame, color: "#ff6b35" },
              { label: "Streak", value: "7", unit: "dní", icon: Target, color: "#8b5cf6" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{stat.value}</span>
                  <span className="text-gray-500">{stat.unit}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-16">

              {/* Body Part Grid */}
              <section>
                <BodyPartGrid />
              </section>

              {/* Přehled všech partií */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Přehled všech partií</h2>
                      <p className="text-sm text-gray-500">Celkový progres: {overallProgress}%</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {bodyPartsData.map((part) => {
                    const isWeak = part.progress < 45;
                    const isStrong = part.progress >= 60;

                    return (
                      <button
                        key={part.id}
                        onClick={() => handlePartClick(part)}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b35]/30 transition-all text-left group"
                      >
                        <div className="flex items-center gap-6">
                          {/* Icon */}
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${part.color}20` }}
                          >
                            <Dumbbell className="w-6 h-6" style={{ color: part.color }} />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg group-hover:text-[#ff6b35] transition-colors">
                                {part.name}
                              </h3>
                              {isWeak && (
                                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-[10px] font-bold text-white">
                                  Priorita
                                </span>
                              )}
                              {isStrong && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                                  Silná
                                </span>
                              )}
                            </div>

                            {/* Progress bar */}
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isWeak
                                      ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                                      : "bg-gradient-to-r from-emerald-500 to-green-500"
                                  }`}
                                  style={{ width: `${part.progress}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold min-w-[3rem] text-right ${
                                isWeak ? "text-[#ff6b35]" : "text-emerald-400"
                              }`}>
                                {part.progress}%
                              </span>
                            </div>

                            {/* Exercises count */}
                            <p className="text-xs text-gray-500 mt-2">
                              {part.exercises.length} cviků • {part.exercises.slice(0, 2).map(e => e.name).join(", ")}
                              {part.exercises.length > 2 && "..."}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#ff6b35] transition-colors flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Next Workout */}
              <section>
                <div className="p-10 rounded-3xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-white/60" />
                      <span className="text-white/60">Další trénink</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                      Push Day
                    </h2>
                    <p className="text-white/70 text-lg mb-8">Hrudník, Ramena, Triceps • 6 cviků • ~60 min</p>
                    <Link href="/workout/new">
                      <button className="px-8 py-4 rounded-2xl bg-white text-[#ff6b35] font-bold text-lg flex items-center gap-3 hover:bg-white/90 transition-colors shadow-xl">
                        <Play className="w-6 h-6" />
                        Zahájit trénink
                      </button>
                    </Link>
                  </div>
                  <Dumbbell className="absolute -right-12 -bottom-12 w-56 h-56 text-white/10 rotate-12" />
                </div>
              </section>

              {/* Benefity cvičení */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Proč cvičit?</h2>
                    <p className="text-sm text-gray-500">Benefity pravidelného tréninku</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exerciseBenefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${benefit.color}15` }}
                      >
                        <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Zaměřit se na - slabé partie */}
              {weakParts.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#ff6b35]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Zaměřit se na</h2>
                      <p className="text-sm text-gray-500">{weakParts.length} partie potřebují pozornost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {weakParts.slice(0, 6).map((part) => (
                      <button
                        key={part.id}
                        onClick={() => handlePartClick(part)}
                        className="text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b35]/30 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold group-hover:text-[#ff6b35] transition-colors">
                            {part.name}
                          </span>
                          <span className="text-[#ff6b35] font-bold">{part.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                            style={{ width: `${part.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          {part.exercises.length} doporučených cviků
                        </p>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-10">

              {/* AI Assistant */}
              <AIAssistantCard weakBodyParts={weakParts} />

              {/* Quick Links */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                  Rychlé akce
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${link.color}15` }}
                      >
                        <link.icon className="w-6 h-6" style={{ color: link.color }} />
                      </div>
                      <span className="text-sm font-medium group-hover:text-white transition-colors text-gray-400">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Poslední aktivita
                  </h2>
                  <button className="text-xs text-[#ff6b35] font-medium hover:underline">Vše</button>
                </div>
                <div className="space-y-4">
                  {recentWorkouts.map((workout, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${workout.color}15` }}
                        >
                          <Dumbbell className="w-5 h-5" style={{ color: workout.color }} />
                        </div>
                        <div>
                          <h4 className="font-medium">{workout.title}</h4>
                          <p className="text-xs text-gray-500">{workout.date}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{workout.duration}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tip dne */}
              <section className="p-6 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/10 to-[#6366f1]/10 border border-[#8b5cf6]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-sm font-semibold text-[#8b5cf6]">Tip dne</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Nezapomínej na zahřátí před tréninkem! 5-10 minut lehkého kardio a dynamického strečinku
                  sníží riziko zranění a zlepší tvůj výkon.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-around items-center h-16 px-4">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#ff6b35]">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-medium">Domů</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center gap-1 text-gray-600 hover:text-white">
            <Dumbbell className="w-5 h-5" />
            <span className="text-[10px] font-medium">Cviky</span>
          </Link>
          <Link
            href="/workout/new"
            className="w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-6 h-6 text-white" />
          </Link>
          <Link href="/dashboard/treninkove-plany" className="flex flex-col items-center gap-1 text-gray-600 hover:text-white">
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-medium">Plány</span>
          </Link>
          <Link href="/dashboard/sin-slavy" className="flex flex-col items-center gap-1 text-gray-600 hover:text-white">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-medium">Síň</span>
          </Link>
        </div>
      </nav>

      {/* Modal */}
      <BodyMapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bodyPart={selectedBodyPart}
      />
    </div>
  );
}
