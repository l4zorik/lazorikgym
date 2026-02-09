"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Calendar,
  Dumbbell,
  Plus,
  Clock,
  BookOpen,
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Domů", href: "/dashboard", icon: Activity },
    { label: "Cviky", href: "/exercises", icon: Dumbbell },
    { label: "Historie", href: "/dashboard/history", icon: Clock },
    { label: "Plány", href: "/dashboard/treninkove-plany", icon: Calendar },
    { label: "Akademie", href: "/dashboard/akademie", icon: BookOpen },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Glass background with gradient border */}
      <div className="relative">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent" />

        <div className="bg-[var(--bg-secondary)]/95 backdrop-blur-xl border-t border-white/5">
          <div className="flex justify-around items-center h-16 px-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-[#ff6b35]"
                      : "text-gray-600 hover:text-white"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active background glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#ff6b35]/10 rounded-xl" />
                  )}

                  <item.icon className={`relative w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                  <span className="relative text-[10px] font-medium">{item.label}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 w-1 h-1 bg-[#ff6b35] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Premium FAB Button */}
            <Link
              href="/workout/new"
              className="group relative w-14 h-14 -mt-10 flex items-center justify-center"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] opacity-30 animate-ping" />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Main button */}
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center shadow-2xl shadow-[#ff6b35]/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#ff6b35]/60 group-active:scale-95">
                <Plus className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-90" />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[#1a1a1a] text-xs text-white font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Nový trénink
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rotate-45" />
              </div>
            </Link>
          </div>
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-safe-area-inset-bottom bg-[var(--bg-secondary)]/95" />
      </div>
    </nav>
  );
}
