"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Dumbbell,
  ChevronRight,
  TrendingUp,
  Search,
  CalendarDays,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WorkoutSession } from "@/types";
import { MobileNav } from "@/components/MobileNav";
import WorkoutDetailModal from "@/components/WorkoutDetailModal";

export default function HistoryPage() {
  const [history] = useLocalStorage<WorkoutSession[]>("workout_history", []);
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSessionClick = (session: WorkoutSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const filteredHistory = [...history]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase()) ||
      session.items.some(item => item.exerciseName.toLowerCase().includes(search.toLowerCase()))
    );

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Historie tréninků</h1>
              <p className="text-sm text-gray-600">
                Přehled tvé minulé aktivity
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Hledat v historii..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:border-[#ff6b35] transition-all"
            />
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((session) => (
            <Card 
              key={session.id} 
              hover 
              className="p-5 cursor-pointer"
              onClick={() => handleSessionClick(session)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 flex items-center justify-center text-[#ff6b35] flex-shrink-0">
                    <CalendarDays className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(session.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        {session.items.length} cviků
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.items.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-[var(--bg-secondary)] text-xs text-gray-400 border border-[var(--border-color)]"
                        >
                          {item.exerciseName}
                        </span>
                      ))}
                      {session.items.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-[var(--bg-secondary)] text-xs text-gray-600">
                          +{session.items.length - 3} další
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600">
              <Dumbbell className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold mb-2">Žádné tréninky</h2>
            <p className="text-gray-600 mb-8">
              Zatím jsi nedokončil žádný trénink. Čas začít!
            </p>
            <Link href="/workout/new">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white font-bold hover:opacity-90 transition-opacity">
                Zahájit první trénink
              </button>
            </Link>
          </div>
        )}

        {/* Stats Summary */}
        {filteredHistory.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <Card className="p-4 text-center">
              <div className="text-gray-600 text-xs uppercase font-bold mb-1">Celkem</div>
              <div className="text-2xl font-bold">{history.length}</div>
              <div className="text-gray-600 text-xs">tréninků</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-gray-600 text-xs uppercase font-bold mb-1">Čas</div>
              <div className="text-2xl font-bold">
                {history.reduce((acc, s) => acc + s.duration, 0)}
              </div>
              <div className="text-gray-600 text-xs">minut celkem</div>
            </Card>
            <Card className="p-4 text-center sm:col-span-1 col-span-2">
              <div className="text-gray-600 text-xs uppercase font-bold mb-1">Cviky</div>
              <div className="text-2xl font-bold">
                {history.reduce((acc, s) => acc + s.items.length, 0)}
              </div>
              <div className="text-gray-600 text-xs">provedených cviků</div>
            </Card>
          </div>
        )}
      </main>
      <MobileNav />

      <WorkoutDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={selectedSession}
      />
    </div>
  );
}
