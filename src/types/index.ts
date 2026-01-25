// User & Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  createdAt: Date;
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
