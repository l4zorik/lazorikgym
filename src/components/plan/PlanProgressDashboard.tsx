"use client";

import { Trophy, Flame, Calendar, Target, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { PlanProgress, PlanMilestone } from "@/types";
import { useMemo } from "react";

interface PlanProgressDashboardProps {
  progress: PlanProgress;
  planName: string;
  onViewDetails?: () => void;
  onViewMilestones?: () => void;
}

export default function PlanProgressDashboard({
  progress,
  planName,
  onViewDetails,
  onViewMilestones,
}: PlanProgressDashboardProps) {
  const weekLabels = useMemo(() => {
    return Array.from({ length: progress.totalWeeks }, (_, i) => `T${i + 1}`);
  }, [progress.totalWeeks]);

  const completedMilestones = progress.milestones.filter(m => m.completed);
  const pendingMilestones = progress.milestones.filter(m => !m.completed);

  const getStatusColor = (rate: number) => {
    if (rate >= 75) return "success";
    if (rate >= 50) return "warning";
    if (rate >= 25) return "info";
    return "default";
  };

  const formatDaysAgo = (date?: string) => {
    if (!date) return "Nikdy";
    const diff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return "Dnes";
    if (diff === 1) return "Včera";
    return `Před ${diff} dny`;
  };

  if (!progress) {
    return (
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
        <p className="text-gray-500 text-center">Žádný aktivní plán</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{planName}</h2>
          <p className="text-sm text-gray-500">
            {progress.status === 'active' ? 'Aktivní plán' : 
             progress.status === 'completed' ? 'Dokončeno' : 
             progress.status === 'paused' ? 'Pozastaveno' : 'Opuštěn'}
          </p>
        </div>
        <button
          onClick={onViewDetails}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Target className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-xs text-gray-500">Dokončeno</span>
          </div>
          <p className="text-2xl font-bold">{progress.completedWorkouts}</p>
          <p className="text-xs text-gray-500">z {progress.totalScheduledWorkouts} tréninků</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-xs text-gray-500">Streak</span>
          </div>
          <p className="text-2xl font-bold">{progress.currentStreak}</p>
          <p className="text-xs text-gray-500">dní (max: {progress.longestStreak})</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xs text-gray-500">Týden</span>
          </div>
          <p className="text-2xl font-bold">{progress.currentWeek}</p>
          <p className="text-xs text-gray-500">z {progress.totalWeeks} týdnů</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs text-gray-500">Milníky</span>
          </div>
          <p className="text-2xl font-bold">{completedMilestones.length}</p>
          <p className="text-xs text-gray-500">z {progress.milestones.length} dokončeno</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Celkový pokrok</h3>
          <span className="text-lg font-bold text-orange-400">{Math.round(progress.completionRate)}%</span>
        </div>
        <Progress
          value={progress.completionRate}
          variant={getStatusColor(progress.completionRate)}
          size="lg"
          animated
        />
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>Začátek: {new Date(progress.startDate).toLocaleDateString('cs-CZ')}</span>
          <span>{progress.completedWorkouts} / {progress.totalScheduledWorkouts} tréninků</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="font-semibold mb-4">Týdenní přehled</h3>
        <div className="flex gap-2">
          {progress.weeklyProgress.map((week, i) => (
            <div key={i} className="flex-1">
              <div
                className="h-20 rounded-xl flex items-end justify-center pb-2 transition-all"
                style={{
                  backgroundColor: week.completionRate >= 100 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : week.completionRate >= 75 
                    ? 'rgba(34, 197, 94, 0.15)' 
                    : week.completionRate >= 50 
                    ? 'rgba(251, 191, 36, 0.15)' 
                    : 'rgba(239, 68, 68, 0.1)',
                }}
              >
                <div
                  className="w-full mx-1 rounded-t"
                  style={{
                    height: `${week.completionRate}%`,
                    backgroundColor: week.completionRate >= 100 
                      ? '#10b981' 
                      : week.completionRate >= 75 
                      ? '#22c55e' 
                      : week.completionRate >= 50 
                      ? '#eab308' 
                      : '#ef4444',
                  }}
                />
              </div>
              <p className="text-center text-xs text-gray-500 mt-1">T{week.week}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Milníky</h3>
          <button
            onClick={onViewMilestones}
            className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            Zobrazit vše →
          </button>
        </div>
        
        <div className="space-y-3">
          {pendingMilestones.slice(0, 3).map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
              <Circle className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">{milestone.name}</p>
                <p className="text-xs text-gray-500">Týden {milestone.targetWeek}</p>
              </div>
            </div>
          ))}
          
          {completedMilestones.slice(0, 2).map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-emerald-400">{milestone.name}</p>
                <p className="text-xs text-gray-500">
                  Dokončeno {formatDaysAgo(milestone.completedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {progress.milestones.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            Žádné milníky v tomto plánu
          </p>
        )}
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
        <div>
          <p className="text-sm font-medium">Aktuální fáze</p>
          <p className="text-lg font-bold text-orange-400">{progress.currentPhase}</p>
        </div>
        <button
          onClick={onViewDetails}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition-colors"
        >
          Zobrazit detaily
        </button>
      </div>
    </div>
  );
}
