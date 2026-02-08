"use client";

import Link from "next/link";
import { ArrowLeft, Lightbulb, Quote, Heart, Share2, Bookmark } from "lucide-react";
import Card from "@/components/ui/Card";
import { trainerTipsData } from "@/lib/data";

export default function Tipy() {
  const categories = ["Vse", "Trenink", "Vyziva", "Regenerace", "Prevence"];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-[#141414] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Tipy od treneru</h1>
            <p className="text-sm text-gray-600">
              Rady a tipy od profesionalu
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? "bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white"
                  : "bg-[#141414] text-gray-400 border border-[#2a2a2a] hover:border-[#ff6b35]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Tip */}
        <Card className="p-6 bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/10 border-[#ff6b35]/30">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#ff6b35]" />
            <span className="text-sm font-medium text-[#ff6b35]">
              Tip dne
            </span>
          </div>
          <h2 className="text-xl font-bold mb-3">{trainerTipsData[0].title}</h2>
          <p className="text-gray-400 mb-4">
            {trainerTipsData[0].content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center text-white font-bold">
                {trainerTipsData[0].trainerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium text-sm">{trainerTipsData[0].trainerName}</p>
                <p className="text-xs text-gray-600">Profesionalni trener</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[#141414] transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-[#141414] transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </Card>

        {/* Tips List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vsechny tipy</h3>
          {trainerTipsData.map((tip) => (
            <Card key={tip.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-[#ff6b35] flex-shrink-0 opacity-50" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{tip.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-[#0a0a0a] text-xs text-gray-600">
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {tip.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center text-white text-xs font-bold">
                        {tip.trainerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium">{tip.trainerName}</span>
                    </div>
                    <span className="text-xs text-gray-600">{tip.date}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
