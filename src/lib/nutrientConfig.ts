import { Flame, Drumstick, Wheat, Droplets, Leaf, Cookie, FlaskConical } from "lucide-react";
import { NutrientGoals, NutrientKey } from "@/types";

export interface NutrientInfo {
  key: NutrientKey;
  label: string;
  color: string;
  icon: typeof Flame;
  unit: string;
}

export const NUTRIENT_CONFIG: NutrientInfo[] = [
  { key: "calories", label: "Kalorie", color: "#ff6b35", icon: Flame, unit: "kcal" },
  { key: "protein", label: "Protein", color: "#ef4444", icon: Drumstick, unit: "g" },
  { key: "carbs", label: "Sacharidy", color: "#f59e0b", icon: Wheat, unit: "g" },
  { key: "fat", label: "Tuky", color: "#8b5cf6", icon: Droplets, unit: "g" },
  { key: "fiber", label: "Vl\u00E1knina", color: "#10b981", icon: Leaf, unit: "g" },
  { key: "sugar", label: "Cukr", color: "#ec4899", icon: Cookie, unit: "g" },
  { key: "sodium", label: "Sod\u00EDk", color: "#06b6d4", icon: FlaskConical, unit: "mg" },
];

export const DEFAULT_NUTRIENT_GOALS: NutrientGoals = {
  calories: 2000,
  protein: 160,
  carbs: 250,
  fat: 70,
  fiber: 25,
  sugar: 50,
  sodium: 2300,
};
