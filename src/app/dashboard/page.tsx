"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Calendar,
  Dumbbell,
  History,
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
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { bodyPartsData } from "@/lib/data";
import BodyMapModal from "@/components/BodyMapModal";
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

  const weakParts = bodyPartsData.filter(p => p.progress < 45);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Welcome */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">
              Ahoj, {user?.name?.split(' ')[0] || 'sportovče'}
            </h1>
            <p className="text-gray-500">Připraven na další trénink?</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Tento týden", value: "3", unit: "tréninky", icon: Activity, color: "#3b82f6" },
                  { label: "Progres", value: "+2.5", unit: "%", icon: TrendingUp, color: "#10b981" },
                  { label: "Kalorie", value: "12.4k", unit: "kcal", icon: Flame, color: "#ff6b35" },
                  { label: "Streak", value: "7", unit: "dní", icon: Target, color: "#8b5cf6" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-3">
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-gray-500 text-sm">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Workout */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm">Další trénink</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Push Day
                  </h2>
                  <p className="text-white/70 mb-6">Hrudník, Ramena, Triceps • 6 cviků</p>
                  <Link href="/workout/new">
                    <button className="px-6 py-3 rounded-xl bg-white text-[#ff6b35] font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors">
                      <Play className="w-5 h-5" />
                      Zahájit trénink
                    </button>
                  </Link>
                </div>
                <Dumbbell className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10 rotate-12" />
              </div>

              {/* Weak Points */}
              {weakParts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5 text-[#ff6b35]" />
                    <h2 className="text-lg font-semibold">Zaměřit se na</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {weakParts.slice(0, 6).map((part) => (
                      <button
                        key={part.id}
                        onClick={() => handlePartClick(part)}
                        className="text-left p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b35]/30 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium group-hover:text-[#ff6b35] transition-colors">
                            {part.name}
                          </span>
                          <span className="text-[#ff6b35] text-sm font-semibold">{part.progress}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-[#e53935]"
                            style={{ width: `${part.progress}%` }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Links */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Rychlé akce
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${link.color}15` }}
                      >
                        <link.icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      <span className="text-sm font-medium group-hover:text-white transition-colors text-gray-400">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Poslední aktivita
                  </h2>
                  <button className="text-xs text-[#ff6b35] font-medium hover:underline">Vše</button>
                </div>
                <div className="space-y-3">
                  {recentWorkouts.map((workout, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${workout.color}15` }}
                        >
                          <Dumbbell className="w-5 h-5" style={{ color: workout.color }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{workout.title}</h4>
                          <p className="text-xs text-gray-600">{workout.date}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{workout.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
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
