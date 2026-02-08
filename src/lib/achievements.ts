import { Achievement, AchievementCondition } from "@/types";

// Achievement definitions
export const achievementsData: Achievement[] = [
  // First Steps
  {
    id: "first-workout",
    name: "První krok",
    description: "Dokončete svůj první trénink",
    icon: "🎯",
    rarity: "common",
    condition: { type: "workouts", target: 1 },
  },
  {
    id: "five-workouts",
    name: "Začínáme",
    description: "Dokončte 5 tréninků",
    icon: "💪",
    rarity: "common",
    condition: { type: "workouts", target: 5 },
  },
  {
    id: "ten-workouts",
    name: "Pravidelnost",
    description: "Dokončte 10 tréninků",
    icon: "🔥",
    rarity: "common",
    condition: { type: "workouts", target: 10 },
  },
  {
    id: "twenty-five-workouts",
    name: "Odhodlání",
    description: "Dokončte 25 tréninků",
    icon: "⭐",
    rarity: "rare",
    condition: { type: "workouts", target: 25 },
  },
  {
    id: "fifty-workouts",
    name: "Elitní sportovec",
    description: "Dokončte 50 tréninků",
    icon: "🏆",
    rarity: "rare",
    condition: { type: "workouts", target: 50 },
  },
  {
    id: "hundred-workouts",
    name: "Legenda",
    description: "Dokončte 100 tréninků",
    icon: "👑",
    rarity: "legendary",
    condition: { type: "workouts", target: 100 },
  },

  // Time based
  {
    id: "one-hour",
    name: "První hodina",
    description: "Trénujte celkem 60 minut",
    icon: "⏱️",
    rarity: "common",
    condition: { type: "minutes", target: 60 },
  },
  {
    id: "ten-hours",
    name: "Maratonec",
    description: "Trénujte celkem 600 minut",
    icon: "🏃",
    rarity: "rare",
    condition: { type: "minutes", target: 600 },
  },
  {
    id: "fifty-hours",
    name: "Časový mistr",
    description: "Trénujte celkem 3000 minut",
    icon: "🕐",
    rarity: "epic",
    condition: { type: "minutes", target: 3000 },
  },

  // Calories
  {
    id: "burn-1000",
    name: "Spalovač",
    description: "Spolťte 1000 kalorií",
    icon: "🔥",
    rarity: "common",
    condition: { type: "calories", target: 1000 },
  },
  {
    id: "burn-10000",
    name: "Tukový horolezec",
    description: "Spolťte 10000 kalorií",
    icon: "🌋",
    rarity: "rare",
    condition: { type: "calories", target: 10000 },
  },
  {
    id: "burn-50000",
    name: "Fénix",
    description: "Spolťte 50000 kalorií",
    icon: "🦅",
    rarity: "epic",
    condition: { type: "calories", target: 50000 },
  },

  // Streaks
  {
    id: "streak-3",
    name: "Třídenní série",
    description: "Trénujte 3 dny za sebou",
    icon: "📅",
    rarity: "common",
    condition: { type: "streak", target: 3 },
  },
  {
    id: "streak-7",
    name: "Týdenní mistr",
    description: "Trénujte 7 dní za sebou",
    icon: "📆",
    rarity: "rare",
    condition: { type: "streak", target: 7 },
  },
  {
    id: "streak-30",
    name: "Měsíční vytrvalec",
    description: "Trénujte 30 dní za sebou",
    icon: "🗓️",
    rarity: "epic",
    condition: { type: "streak", target: 30 },
  },
  {
    id: "streak-100",
    name: "Sto dní",
    description: "Trénujte 100 dní za sebou",
    icon: "💯",
    rarity: "legendary",
    condition: { type: "streak", target: 100 },
  },

  // Body part progress
  {
    id: "progress-50-neck",
    name: "Žirafí krk",
    description: "Dosáhněte 50% progrese na krční páteři",
    icon: "🦒",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "neck" },
  },
  {
    id: "progress-50-shoulders",
    name: "Široká ramena",
    description: "Dosáhněte 50% progrese na ramenou",
    icon: "💪",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "shoulders" },
  },
  {
    id: "progress-50-chest",
    name: "Pevný hrudník",
    description: "Dosáhněte 50% progrese na prsou",
    icon: "🛡️",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "chest" },
  },
  {
    id: "progress-50-arms",
    name: "Svalnaté ruce",
    description: "Dosáhněte 50% progrese na rukou",
    icon: "💪",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "arms" },
  },
  {
    id: "progress-50-abs",
    name: "Přímý břišní sval",
    description: "Dosáhněte 50% progrese na břiše",
    icon: "🎯",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "abs" },
  },
  {
    id: "progress-50-core",
    name: "Ocelové jádro",
    description: "Dosáhněte 50% progrese na coru",
    icon: "⚡",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "core" },
  },
  {
    id: "progress-50-back",
    name: "Široká záda",
    description: "Dosáhněte 50% progrese na zádech",
    icon: "🦅",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "back" },
  },
  {
    id: "progress-50-legs",
    name: "Silné nohy",
    description: "Dosáhněte 50% progrese na nohou",
    icon: "🦵",
    rarity: "rare",
    condition: { type: "body_part_progress", target: 50, bodyPartId: "legs" },
  },

  // Consistency
  {
    id: "active-7-days",
    name: "Týden v akci",
    description: "Buďte aktivní 7 dní",
    icon: "📆",
    rarity: "common",
    condition: { type: "days_active", target: 7 },
  },
  {
    id: "active-30-days",
    name: "Měsíc v akci",
    description: "Buďte aktivní 30 dní",
    icon: "🗓️",
    rarity: "rare",
    condition: { type: "days_active", target: 30 },
  },
  {
    id: "active-100-days",
    name: "Sto dní",
    description: "Buďte aktivní 100 dní",
    icon: "💪",
    rarity: "epic",
    condition: { type: "days_active", target: 100 },
  },
  {
    id: "active-365-days",
    name: "Celo-roční",
    description: "Buďte aktivní 365 dní",
    icon: "🌟",
    rarity: "legendary",
    condition: { type: "days_active", target: 365 },
  },
];

// Helper functions for achievement management
export function getAchievementById(id: string): Achievement | undefined {
  return achievementsData.find((a) => a.id === id);
}

export function getAllAchievements(): Achievement[] {
  return achievementsData;
}

export function getAchievementsByRarity(
  rarity: "common" | "rare" | "epic" | "legendary"
): Achievement[] {
  return achievementsData.filter((a) => a.rarity === rarity);
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "common":
      return "#9ca3af";
    case "rare":
      return "#3b82f6";
    case "epic":
      return "#8b5cf6";
    case "legendary":
      return "#f59e0b";
    default:
      return "#9ca3af";
  }
}

export function getRarityLabel(rarity: string): string {
  switch (rarity) {
    case "common":
      return "Běžný";
    case "rare":
      return "Vzácný";
    case "epic":
      return "Epický";
    case "legendary":
      return "Legendární";
    default:
      return rarity;
  }
}

// Calculate achievement progress
export function calculateProgress(
  achievement: Achievement,
  userStats: {
    totalWorkouts: number;
    totalMinutes: number;
    totalCalories: number;
    streak: number;
    daysActive: number;
    bodyPartProgress?: Record<string, number>;
  }
): number {
  const { condition } = achievement;

  switch (condition.type) {
    case "workouts":
      return Math.min(100, (userStats.totalWorkouts / condition.target) * 100);
    case "minutes":
      return Math.min(100, (userStats.totalMinutes / condition.target) * 100);
    case "calories":
      return Math.min(100, (userStats.totalCalories / condition.target) * 100);
    case "streak":
      return Math.min(100, (userStats.streak / condition.target) * 100);
    case "days_active":
      return Math.min(100, (userStats.daysActive / condition.target) * 100);
    case "body_part_progress":
      const progress =
        userStats.bodyPartProgress?.[condition.bodyPartId!] || 0;
      return Math.min(100, (progress / condition.target) * 100);
    default:
      return 0;
  }
}

// Check if achievement is unlocked
export function isAchievementUnlocked(
  achievement: Achievement,
  userStats: {
    totalWorkouts: number;
    totalMinutes: number;
    totalCalories: number;
    streak: number;
    daysActive: number;
    bodyPartProgress?: Record<string, number>;
  }
): boolean {
  const { condition } = achievement;

  switch (condition.type) {
    case "workouts":
      return userStats.totalWorkouts >= condition.target;
    case "minutes":
      return userStats.totalMinutes >= condition.target;
    case "calories":
      return userStats.totalCalories >= condition.target;
    case "streak":
      return userStats.streak >= condition.target;
    case "days_active":
      return userStats.daysActive >= condition.target;
    case "body_part_progress":
      const progress =
        userStats.bodyPartProgress?.[condition.bodyPartId!] || 0;
      return progress >= condition.target;
    default:
      return false;
  }
}

// Get achievement statistics
export function getAchievementStats(
  unlockedAchievements: Achievement[]
): {
  total: number;
  unlocked: number;
  byRarity: Record<string, number>;
  percentage: number;
} {
  const total = achievementsData.length;
  const unlocked = unlockedAchievements.length;
  const byRarity: Record<string, number> = {
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  unlockedAchievements.forEach((a) => {
    byRarity[a.rarity]++;
  });

  return {
    total,
    unlocked,
    byRarity,
    percentage: Math.round((unlocked / total) * 100),
  };
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
