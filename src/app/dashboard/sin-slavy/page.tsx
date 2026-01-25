"use client";

import Link from "next/link";
import { ArrowLeft, Trophy, Medal, TrendingUp, Calendar, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import { hallOfFameData } from "@/lib/data";

export default function SinSlavy() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="p-6 border-b border-border bg-bg-secondary sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-bg-card transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Sin slavy</h1>
            <p className="text-sm text-text-muted">
              Inspiruj se uspechy nasich clenu
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Featured Champion */}
        <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Trophy className="w-20 h-20 text-yellow-500/20" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Medal className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">
                Sampion mesice
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold ring-4 ring-yellow-500/30">
                {hallOfFameData[0].userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{hallOfFameData[0].userName}</h2>
                <p className="text-accent font-medium">
                  {hallOfFameData[0].achievement}
                </p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">
              {hallOfFameData[0].description}
            </p>
            {hallOfFameData[0].stats && (
              <div className="flex gap-6">
                {hallOfFameData[0].stats.weightLost && (
                  <div>
                    <div className="text-2xl font-bold text-success">
                      -{hallOfFameData[0].stats.weightLost}kg
                    </div>
                    <div className="text-xs text-text-muted">zhubnuto</div>
                  </div>
                )}
                {hallOfFameData[0].stats.muscleGained && (
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      +{hallOfFameData[0].stats.muscleGained}kg
                    </div>
                    <div className="text-xs text-text-muted">svaly</div>
                  </div>
                )}
                {hallOfFameData[0].stats.daysActive && (
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {hallOfFameData[0].stats.daysActive}
                    </div>
                    <div className="text-xs text-text-muted">aktivnich dni</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Hall of Fame Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Vsichni sampioni
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {hallOfFameData.map((entry, index) => (
              <Card key={entry.id} hover glow className="p-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-white text-lg font-bold">
                      {entry.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {index < 3 && (
                      <div
                        className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                            ? "bg-gray-300 text-black"
                            : "bg-amber-700 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{entry.userName}</h4>
                    <p className="text-sm text-accent font-medium mb-1">
                      {entry.achievement}
                    </p>
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                      {entry.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      {entry.stats?.weightLost && (
                        <span className="flex items-center gap-1 text-success">
                          <TrendingUp className="w-3 h-3" />
                          -{entry.stats.weightLost}kg
                        </span>
                      )}
                      {entry.stats?.muscleGained && (
                        <span className="text-accent">
                          +{entry.stats.muscleGained}kg svaly
                        </span>
                      )}
                      {entry.stats?.daysActive && (
                        <span className="flex items-center gap-1 text-text-muted">
                          <Calendar className="w-3 h-3" />
                          {entry.stats.daysActive} dni
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <Card className="p-6 text-center gradient-bg-subtle border-accent/20">
          <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Chces se dostat do Sine slavy?</h3>
          <p className="text-text-secondary mb-4 max-w-md mx-auto">
            Zacni trenovat s LazorikGym a ukaz svetu svou transformaci. Kazdy mesic
            vybirame nejlepsi cleny!
          </p>
          <Link
            href="/workout/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Zacit trenovat
          </Link>
        </Card>
      </main>
    </div>
  );
}
