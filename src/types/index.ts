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
}

export interface WorkoutSessionItem {
  id: string;
  exerciseId: string;
  exerciseName: string;
  bodyPart: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  date: Date;
  duration: number; // in minutes
  title: string;
  items: WorkoutSessionItem[];
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
  time: string;
}

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
