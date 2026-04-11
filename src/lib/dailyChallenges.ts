import { bodyPartsData } from "./data";

// Daily Challenge Types
export type ChallengeType = 'reps' | 'sets' | 'time' | 'streak' | 'combo' | 'emom' | 'amrap' | 'technique' | 'mind-muscle';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface ChallengeExercise {
  exerciseId: string;
  exerciseName: string;
  target: number;
  unit: 'reps' | 'seconds' | 'sets';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  targetParts: string[];
  exercises: ChallengeExercise[];
  xpReward: number;
  bonusXp: number;
  duration: number;
  durationUnit: 'minutes' | 'seconds' | 'reps' | 'sets';
  expiresAt: string;
  status: 'pending' | 'active' | 'completed' | 'failed' | 'expired';
  progress: number;
  currentReps?: number;
  completedAt?: string;
  startedAt?: string;
  streakCount?: number;
  bestStreak?: number;
}

export interface ChallengeTemplate {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  xpReward: number;
  bonusXp: number;
  duration: number;
  durationUnit: DailyChallenge['durationUnit'];
  generateForParts: (parts: string[]) => {
    exercises: ChallengeExercise[];
    customTitle?: string;
    customDescription?: string;
  };
}

// Challenge Templates
export const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'template-pushups',
    type: 'reps',
    title: 'PUSH Challenge',
    description: '100+ opakování = legendární status!',
    difficulty: 'medium',
    xpReward: 150,
    bonusXp: 100,
    duration: 1,
    durationUnit: 'reps',
    generateForParts: (parts) => ({
      exercises: [{
        exerciseId: parts[0] + '-1',
        exerciseName: 'Cviky na selected partii',
        target: Math.floor(50 + Math.random() * 50),
        unit: 'reps'
      }]
    })
  },
  {
    id: 'template-plank',
    type: 'time',
    title: 'PLANK Master',
    description: 'Udrž plank co nejdéle!',
    difficulty: 'medium',
    xpReward: 125,
    bonusXp: 75,
    duration: 1,
    durationUnit: 'seconds',
    generateForParts: (parts) => ({
      exercises: [{
        exerciseId: 'abs-5',
        exerciseName: 'Plank',
        target: Math.floor(60 + Math.random() * 120),
        unit: 'seconds'
      }]
    })
  },
  {
    id: 'template-emom',
    type: 'emom',
    title: 'EMOM Blast',
    description: 'Každou minutu nový cvik!',
    difficulty: 'hard',
    xpReward: 225,
    bonusXp: 175,
    duration: 10,
    durationUnit: 'minutes',
    generateForParts: (parts) => ({
      exercises: parts.slice(0, 5).map((p, i) => ({
        exerciseId: `${p}-${i + 1}`,
        exerciseName: `Cvik ${i + 1}`,
        target: 10,
        unit: 'reps'
      })),
      customDescription: '10 opakování každou minutu'
    })
  },
  {
    id: 'template-amrap',
    type: 'amrap',
    title: 'AMRAP Challenge',
    description: 'Kolik toho zvládneš za 5 minut?',
    difficulty: 'hard',
    xpReward: 275,
    bonusXp: 200,
    duration: 5,
    durationUnit: 'minutes',
    generateForParts: (parts) => ({
      exercises: parts.slice(0, 3).map((p, i) => ({
        exerciseId: `${p}-${i + 1}`,
        exerciseName: `Cvik ${i + 1}`,
        target: 999,
        unit: 'reps'
      })),
      customDescription: 'Kombinuj cviky, countuj opakování!'
    })
  },
  {
    id: 'template-squats',
    type: 'reps',
    title: 'SQUAT Challenge',
    description: 'Nohy hoří, ale pokračuj!',
    difficulty: 'medium',
    xpReward: 175,
    bonusXp: 125,
    duration: 1,
    durationUnit: 'reps',
    generateForParts: (parts) => ({
      exercises: [{
        exerciseId: 'legs-1',
        exerciseName: 'Dřepy',
        target: Math.floor(80 + Math.random() * 70),
        unit: 'reps'
      }]
    })
  },
  {
    id: 'template-circuit',
    type: 'combo',
    title: 'Full Body Circuit',
    description: '6 kol celého těla!',
    difficulty: 'extreme',
    xpReward: 400,
    bonusXp: 300,
    duration: 6,
    durationUnit: 'sets',
    generateForParts: (parts) => ({
      exercises: parts.slice(0, 4).map((p, i) => ({
        exerciseId: `${p}-${i + 1}`,
        exerciseName: `Cvik ${i + 1}`,
        target: 6,
        unit: 'sets'
      })),
      customDescription: '6 kol různých cviků'
    })
  },
  {
    id: 'template-core-burner',
    type: 'time',
    title: 'Core Burner',
    description: '3 minuty intenzivního coru!',
    difficulty: 'hard',
    xpReward: 200,
    bonusXp: 150,
    duration: 3,
    durationUnit: 'minutes',
    generateForParts: (parts) => ({
      exercises: [
        { exerciseId: 'abs-1', exerciseName: 'Kliksy', target: 45, unit: 'seconds' },
        { exerciseId: 'abs-2', exerciseName: 'Plank', target: 45, unit: 'seconds' },
        { exerciseId: 'abs-3', exerciseName: 'Mountain Climbers', target: 45, unit: 'seconds' }
      ],
      customDescription: 'Rotuj mezi cviky po 45 sekundách'
    })
  },
  {
    id: 'template-streak',
    type: 'streak',
    title: 'Non-Stop Streak',
    description: '20 cviků v kuse bez pauzy!',
    difficulty: 'extreme',
    xpReward: 400,
    bonusXp: 300,
    duration: 1,
    durationUnit: 'reps',
    generateForParts: (parts) => ({
      exercises: parts.slice(0, 4).map((p, i) => ({
        exerciseId: `${p}-${i + 1}`,
        exerciseName: `Cvik ${i + 1}`,
        target: 20,
        unit: 'reps'
      })),
      customDescription: 'Žádný odpočinek mezi cviky!'
    })
  }
];

export function getDifficultyMultiplier(difficulty: ChallengeDifficulty): number {
  switch (difficulty) {
    case 'easy': return 0.8;
    case 'medium': return 1.0;
    case 'hard': return 1.3;
    case 'extreme': return 1.6;
    default: return 1.0;
  }
}

export function getDifficultyColor(difficulty: ChallengeDifficulty): string {
  switch (difficulty) {
    case 'easy': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    case 'extreme': return '#8b5cf6';
    default: return '#6b7280';
  }
}

export function getTypeIcon(type: ChallengeType): string {
  const icons: Record<ChallengeType, string> = {
    'reps': '🔥',
    'sets': '💪',
    'time': '⏱️',
    'streak': '⚡',
    'combo': '🔄',
    'emom': '⏰',
    'amrap': '🚀',
    'technique': '🎯',
    'mind-muscle': '🧠'
  };
  return icons[type] || '⭐';
}

export function generateRandomChallenge(bodyPartIds: string[]): DailyChallenge {
  const template = challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)];
  const generated = template.generateForParts(bodyPartIds);
  
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  
  const difficultyMult = getDifficultyMultiplier(template.difficulty);
  
  return {
    id: `challenge-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title: generated.customTitle || template.title,
    description: generated.customDescription || template.description,
    type: template.type,
    difficulty: template.difficulty,
    targetParts: bodyPartIds,
    exercises: generated.exercises,
    xpReward: Math.floor(template.xpReward * difficultyMult),
    bonusXp: Math.floor(template.bonusXp * difficultyMult),
    duration: template.duration,
    durationUnit: template.durationUnit,
    expiresAt: midnight.toISOString(),
    status: 'pending',
    progress: 0,
    currentReps: 0,
    streakCount: 0,
    bestStreak: 0
  };
}

export function generateChallengeSet(bodyPartIds: string[]): DailyChallenge[] {
  const count = 3;
  const challenges: DailyChallenge[] = [];
  const usedTypes = new Set<ChallengeType>();
  
  for (let i = 0; i < count; i++) {
    const available = challengeTemplates.filter(t => !usedTypes.has(t.type));
    if (available.length === 0) break;
    
    const template = available[Math.floor(Math.random() * available.length)];
    usedTypes.add(template.type);
    
    const generated = template.generateForParts(bodyPartIds);
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const difficultyMult = getDifficultyMultiplier(template.difficulty);
    
    challenges.push({
      id: `challenge-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
      title: generated.customTitle || template.title,
      description: generated.customDescription || template.description,
      type: template.type,
      difficulty: template.difficulty,
      targetParts: bodyPartIds,
      exercises: generated.exercises,
      xpReward: Math.floor(template.xpReward * difficultyMult),
      bonusXp: Math.floor(template.bonusXp * difficultyMult),
      duration: template.duration,
      durationUnit: template.durationUnit,
      expiresAt: midnight.toISOString(),
      status: 'pending',
      progress: 0,
      currentReps: 0,
      streakCount: 0,
      bestStreak: 0
    });
  }
  
  return challenges;
}

export function getTimeRemaining(challenge: DailyChallenge): string {
  const now = new Date();
  const expires = new Date(challenge.expiresAt);
  const diff = expires.getTime() - now.getTime();
  
  if (diff <= 0) return 'Vypršelo';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
