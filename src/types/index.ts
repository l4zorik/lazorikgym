// User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  experience: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  primaryGoal: 'lose_weight' | 'gain_muscle' | 'improve_endurance' | 'health_wellness' | 'strength';
  goals: string[];
  createdAt: Date;
  achievements?: Achievement[];
  stats?: UserStats;
}

// User Statistics
export interface UserStats {
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
  streak: number;
  lastWorkoutDate?: Date;
  weakestPart?: string;
  strongestPart?: string;
  totalXP?: number;
  currentLevel?: number;
  missedWorkoutDebt?: number;
}

// Achievements System
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: AchievementCondition;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface AchievementCondition {
  type: 'workouts' | 'minutes' | 'calories' | 'streak' | 'specific_exercise' | 'body_part_progress' | 'days_active';
  target: number;
  exerciseId?: string;
  bodyPartId?: string;
}

// Body Parts & Training
export interface BodyPart {
  id: string;
  name: string;
  progress: number;
  color: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  equipment: string;
  description?: string;
  videoUrl?: string;
  sets?: number;
  reps?: string;
  tips?: string[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  exercises: Exercise[];
  targetParts: string[];
  image?: string;
  tags?: string[];
  estimatedTime?: string; // e.g., "45-60 min"
  estimatedCalories?: number;
  splitType?: 'Full Body' | 'Push/Pull/Legs' | 'Upper/Lower' | 'Bro Split';
  weeklySchedule?: {
    day: string;
    workout: string;
    muscles: string[];
    isRest?: boolean;
  }[];
}

// Nutrition
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  image?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  type: 'bulking' | 'cutting' | 'maintenance';
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
  totalCalories: number;
  totalProtein: number;
}

// Trainer Tips
export interface TrainerTip {
  id: string;
  trainerName: string;
  trainerImage?: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

// Hall of Fame
export interface HallOfFameEntry {
  id: string;
  userName: string;
  userImage?: string;
  achievement: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  stats?: {
    weightLost?: number;
    muscleGained?: number;
    daysActive?: number;
  };
  date: string;
}

// Goal Plans - Pre-made plans for specific body parts
export interface BodyPartPlan {
  id: string;
  bodyPartId: string;
  name: string;
  description: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  durationWeeks: number;
  frequencyPerWeek: number;
  exercises: string[];
  rating: number;
  ratingCount: number;
  tags: string[];
  estimatedMinutes: number;
  weeklyProgression: string[];
}

// Active user goal
export interface BodyPartGoal {
  id: string;
  bodyPartId: string;
  planId: string;
  startProgress: number;
  targetProgress: number;
  createdAt: string;
  status: 'active' | 'completed' | 'abandoned';
  completedWorkouts: number;
  totalWorkoutsNeeded: number;
  userRating?: number;
  userNote?: string;
  weekNumber: number;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// AI Chat
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Workout Sessions
export interface WorkoutSet {
  reps: number | string;
  weight: number | string;
  completed: boolean;
  rpe?: number;
  restTimerSeconds?: number;
}

export interface WorkoutSessionItem {
  id: string;
  exerciseId: string;
  exerciseName: string;
  bodyPart: string;
  sets: WorkoutSet[];
  notes?: string;
  supersetGroupId?: string;
  orderIndex: number;
}

export interface WorkoutSession {
  id: string;
  date: Date;
  duration: number; // in minutes
  title: string;
  items: WorkoutSessionItem[];
}

// Rest Timer
export interface RestTimerConfig {
  defaultSeconds: number;
  autoStart: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

// Superset Groups
export interface SupersetGroup {
  id: string;
  name: string;
  color: string;
  exerciseIds: string[];
}

// Daily Tracking
export interface FoodLogEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;   // gramy
  sugar?: number;   // gramy
  sodium?: number;  // miligramy
  time: string;
}

export interface NutrientGoals {
  calories: number;  // kcal
  protein: number;   // g
  carbs: number;     // g
  fat: number;       // g
  fiber: number;     // g
  sugar: number;     // g
  sodium: number;    // mg
}
export type NutrientKey = keyof NutrientGoals;

export interface SleepLogEntry {
  id: string;
  date: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface DailyMoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5
  energy: number; // 1-5
}

export interface WaterEntry {
  id: string;
  date: string;
  amount: number;
  time: string;
}

// Scheduled Workouts (Calendar)
export interface ScheduledWorkout {
  id: string;
  date: string;
  title: string;
  type: "strength" | "cardio" | "flexibility" | "rest" | "hiit";
  duration: number;
  completed: boolean;
  notes?: string;
  intensity?: "low" | "medium" | "high";
  exercises?: string[];
  aiGenerated?: boolean;
  planId?: string;
  planDayIndex?: number;
}

// Plan Milestones
export interface PlanMilestone {
  id: string;
  name: string;
  description: string;
  targetWeek: number;
  targetWorkouts: number;
  type: 'completion' | 'streak' | 'exercise_mastery' | 'custom';
  targetExerciseIds?: string[];
  targetStreakDays?: number;
  completed: boolean;
  completedAt?: string;
  reward?: {
    type: 'badge' | 'unlock' | 'message';
    value: string;
  };
}

// Plan Phases
export interface PlanPhase {
  id: string;
  name: string;
  description: string;
  weekStart: number;
  weekEnd: number;
  focus: string[];
  intensityMultiplier: number;
  exerciseModifications?: {
    exerciseId: string;
    setsMod?: number;
    repsMod?: string;
    restMod?: number;
  }[];
}

// Plan Progress Tracking
export interface PlanProgress {
  planId: string;
  startDate: string;
  currentWeek: number;
  totalWeeks: number;
  completedWorkouts: number;
  totalScheduledWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: {
    week: number;
    scheduled: number;
    completed: number;
    completionRate: number;
  }[];
  milestones: PlanMilestone[];
  currentPhase: string;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  lastActivityDate?: string;
  completionRate: number;
}

// Extended WorkoutPlan with progression
export interface WorkoutPlanExtended {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  exercises: Exercise[];
  targetParts: string[];
  image?: string;
  tags?: string[];
  estimatedTime?: string;
  estimatedCalories?: number;
  splitType?: 'Full Body' | 'Push/Pull/Legs' | 'Upper/Lower' | 'Bro Split';
  weeklySchedule?: {
    day: string;
    workout: string;
    muscles: string[];
    isRest?: boolean;
  }[];
  phases?: PlanPhase[];
  milestones?: Omit<PlanMilestone, 'id' | 'completed' | 'completedAt'>[];
  progressionRules?: {
    type: 'linear' | 'wave' | 'undulating';
    increaseFactor: number;
    deloadWeeks: number[];
  };
}

// Custom User Plan
export interface CustomPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  durationWeeks: number;
  splitType: 'Full Body' | 'Push/Pull/Legs' | 'Upper/Lower' | 'Bro Split' | 'Custom';
  weeklySchedule: {
    day: string;
    workoutName: string;
    targetMuscles: string[];
    exercises: {
      exerciseId: string;
      sets: number;
      reps: string;
      rest: number;
    }[];
    isRest: boolean;
  }[];
  phases?: PlanPhase[];
  milestones?: Omit<PlanMilestone, 'id' | 'completed' | 'completedAt'>[];
  createdAt: string;
  isActive: boolean;
}

// In-App Notifications
export interface PlanNotification {
  id: string;
  type: 'milestone' | 'reminder' | 'warning' | 'achievement' | 'progress' | 'completion' | 'penalty';
  title: string;
  message: string;
  planId?: string;
  workoutId?: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

// User Metrics for Plan Analytics
export interface UserPlanMetrics {
  userId: string;
  planId: string;
  averageWorkoutDuration: number;
  mostFrequentWorkoutTime: string;
  preferredWorkoutDays: string[];
  completionRateByDay: Record<string, number>;
  exercisePerformance: Record<string, {
    totalSets: number;
    averageReps: number;
    improvement: number;
  }>;
  weakestDayOfWeek: string;
  strongestDayOfWeek: string;
  consistencyScore: number;
}

// XP & Penalty System
export interface XPEvent {
  id: string;
  type: 'workout_complete' | 'streak_bonus' | 'weekly_plan_complete' | 'missed_workout' | 'streak_broken_short' | 'streak_broken_long' | 'debt_resolved';
  xp: number;
  description: string;
  createdAt: string;
  workoutId?: string;
}

export interface UserXPProfile {
  totalXP: number;
  currentLevel: number;
  levelName: string;
  events: XPEvent[];
  penaltyStreak: number;
  lastCheckedDate: string;
}

export interface PenaltyRecord {
  id: string;
  type: 'missed_workout' | 'streak_broken';
  xpLost: number;
  description: string;
  workoutDate?: string;
  resolved: boolean;
  resolvedAt?: string;
  createdAt: string;
}

// Quest System
export interface Quest {
  id: string;
  bodyPartId: string;
  title: string;
  description: string;
  difficulty: 'Začátečník' | 'Střední' | 'Pokročilý';
  status: 'active' | 'completed' | 'abandoned';
  createdAt: string;
  completedAt?: string;
  xpReward: number;
  objectives: QuestObjective[];
  durationDays: number;
  deadlineDate?: string;
}

export interface QuestObjective {
  id: string;
  type: 'workout' | 'nutrition' | 'streak' | 'hydration' | 'recovery';
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
  xpReward: number;
  linkedWorkoutIds?: string[];
  linkedExerciseIds?: string[];
}
