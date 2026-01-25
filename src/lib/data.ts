import { BodyPart, WorkoutPlan, MealPlan, TrainerTip, HallOfFameEntry, Meal } from "@/types";

// Body Parts Data
export const bodyPartsData: BodyPart[] = [
  {
    id: "neck",
    name: "Krční páteř",
    progress: 30,
    color: "#ff6b35",
    exercises: [
      { id: "neck-1", name: "Izometrické tlaky hlavou", category: "Krční páteř", difficulty: "Začátečník", equipment: "Vlastní váha", description: "Tlačte hlavou proti ruce v různých směrech a držte 10 sekund." },
      { id: "neck-2", name: "Přítahy brady (Chin Tucks)", category: "Krční páteř", difficulty: "Začátečník", equipment: "Vlastní váha", description: "Zatáhněte bradu dozadu, jako byste si dělali dvojitou bradu." },
      { id: "neck-3", name: "Kroužení rameny", category: "Krční páteř", difficulty: "Začátečník", equipment: "Vlastní váha", description: "Pomalé kroužení rameny vpřed a vzad." },
    ],
  },
  {
    id: "shoulders",
    name: "Ramena",
    progress: 60,
    color: "#e53935",
    exercises: [
      { id: "shoulders-1", name: "Tlaky s jednoručkami", category: "Ramena", difficulty: "Střední", equipment: "Jednoručky" },
      { id: "shoulders-2", name: "Upažování (Lateral Raises)", category: "Ramena", difficulty: "Střední", equipment: "Jednoručky" },
      { id: "shoulders-3", name: "Face Pulls", category: "Ramena", difficulty: "Začátečník", equipment: "Kladka" },
      { id: "shoulders-4", name: "Arnoldovy tlaky", category: "Ramena", difficulty: "Pokročilý", equipment: "Jednoručky" },
    ],
  },
  {
    id: "chest",
    name: "Prsa",
    progress: 50,
    color: "#ff8a5b",
    exercises: [
      { id: "chest-1", name: "Bench Press", category: "Prsa", difficulty: "Pokročilý", equipment: "Velká činka" },
      { id: "chest-2", name: "Kliky (Push-ups)", category: "Prsa", difficulty: "Začátečník", equipment: "Vlastní váha" },
      { id: "chest-3", name: "Rozpažování s jednoručkami", category: "Prsa", difficulty: "Střední", equipment: "Jednoručky" },
      { id: "chest-4", name: "Tlaky na šikmé lavici", category: "Prsa", difficulty: "Střední", equipment: "Velká činka" },
    ],
  },
  {
    id: "arms",
    name: "Ruce",
    progress: 45,
    color: "#ff6b35",
    exercises: [
      { id: "arms-1", name: "Bicepsový zdvih s velkou činkou", category: "Ruce", difficulty: "Střední", equipment: "Velká činka" },
      { id: "arms-2", name: "Tricepsové stlačování kladky", category: "Ruce", difficulty: "Začátečník", equipment: "Kladka" },
      { id: "arms-3", name: "Kladivové zdvihy", category: "Ruce", difficulty: "Začátečník", equipment: "Jednoručky" },
      { id: "arms-4", name: "Francouzský tlak", category: "Ruce", difficulty: "Střední", equipment: "Jednoručky" },
    ],
  },
  {
    id: "abs",
    name: "Břicho",
    progress: 20,
    color: "#e53935",
    exercises: [
      { id: "abs-1", name: "Zkracovačky (Crunches)", category: "Břicho", difficulty: "Začátečník", equipment: "Vlastní váha" },
      { id: "abs-2", name: "Zvedání nohou ve visu", category: "Břicho", difficulty: "Pokročilý", equipment: "Hrazda" },
      { id: "abs-3", name: "Russian Twists", category: "Břicho", difficulty: "Střední", equipment: "Medicinbal" },
      { id: "abs-4", name: "Bicycle Crunches", category: "Břicho", difficulty: "Střední", equipment: "Vlastní váha" },
    ],
  },
  {
    id: "core",
    name: "Core",
    progress: 40,
    color: "#ff8a5b",
    exercises: [
      { id: "core-1", name: "Plank (Vzpor)", category: "Core", difficulty: "Střední", equipment: "Vlastní váha" },
      { id: "core-2", name: "Dead Bug", category: "Core", difficulty: "Začátečník", equipment: "Vlastní váha" },
      { id: "core-3", name: "Bird Dog", category: "Core", difficulty: "Začátečník", equipment: "Vlastní váha" },
      { id: "core-4", name: "Pallof Press", category: "Core", difficulty: "Střední", equipment: "Kladka" },
    ],
  },
  {
    id: "back",
    name: "Záda",
    progress: 55,
    color: "#e53935",
    exercises: [
      { id: "back-1", name: "Shyby (Pull-ups)", category: "Záda", difficulty: "Pokročilý", equipment: "Hrazda" },
      { id: "back-2", name: "Přítahy osy v předklonu", category: "Záda", difficulty: "Pokročilý", equipment: "Velká činka" },
      { id: "back-3", name: "Stahování horní kladky", category: "Záda", difficulty: "Začátečník", equipment: "Kladka" },
    ],
  },
  {
    id: "legs",
    name: "Nohy",
    progress: 65,
    color: "#ff6b35",
    exercises: [
      { id: "legs-1", name: "Dřepy (Squats)", category: "Nohy", difficulty: "Střední", equipment: "Velká činka" },
      { id: "legs-2", name: "Mrtvý tah", category: "Nohy", difficulty: "Pokročilý", equipment: "Velká činka" },
      { id: "legs-3", name: "Leg Press", category: "Nohy", difficulty: "Střední", equipment: "Stroj" },
      { id: "legs-4", name: "Výpady", category: "Nohy", difficulty: "Začátečník", equipment: "Jednoručky" },
    ],
  },
];

// Workout Plans
export const workoutPlansData: WorkoutPlan[] = [
  {
    id: "push-pull-legs",
    name: "Push/Pull/Legs",
    description: "Klasický 6-denní split pro maximální hypertrofii. Ideální pro pokročilé sportovce.",
    duration: "6 dní/týden",
    difficulty: "Pokročilý",
    targetParts: ["Prsa", "Záda", "Nohy", "Ramena", "Ruce"],
    exercises: [],
  },
  {
    id: "full-body",
    name: "Full Body",
    description: "3x týdně celé tělo. Perfektní pro začátečníky nebo při časové tísni.",
    duration: "3 dní/týden",
    difficulty: "Začátečník",
    targetParts: ["Celé tělo"],
    exercises: [],
  },
  {
    id: "upper-lower",
    name: "Upper/Lower Split",
    description: "Střídání horní a dolní části těla. Vyvážený přístup pro středně pokročilé.",
    duration: "4 dní/týden",
    difficulty: "Střední",
    targetParts: ["Horní tělo", "Dolní tělo"],
    exercises: [],
  },
  {
    id: "weak-points",
    name: "Slabé Partie Focus",
    description: "Personalizovaný plán zaměřený na vaše nejslabší partie podle analýzy.",
    duration: "5 dní/týden",
    difficulty: "Střední",
    targetParts: ["Krční páteř", "Břicho", "Core"],
    exercises: [],
  },
];

// Sample Meals
const sampleMeals: Record<string, Meal> = {
  omeleta: {
    id: "meal-1",
    name: "Proteinová omeleta",
    calories: 450,
    protein: 35,
    carbs: 15,
    fat: 28,
    ingredients: ["4 vejce", "Šunka", "Sýr", "Zelenina"],
  },
  kureci: {
    id: "meal-2",
    name: "Kuřecí prsa s rýží",
    calories: 550,
    protein: 45,
    carbs: 55,
    fat: 12,
    ingredients: ["200g kuřecí prsa", "150g rýže", "Brokolice", "Olivový olej"],
  },
  losos: {
    id: "meal-3",
    name: "Losos s batáty",
    calories: 620,
    protein: 40,
    carbs: 45,
    fat: 30,
    ingredients: ["180g lososa", "200g sladkých brambor", "Chřest", "Citron"],
  },
  jogurt: {
    id: "meal-4",
    name: "Řecký jogurt s ovocem",
    calories: 280,
    protein: 20,
    carbs: 35,
    fat: 8,
    ingredients: ["200g řeckého jogurtu", "Borůvky", "Med", "Ořechy"],
  },
  shake: {
    id: "meal-5",
    name: "Proteinový shake",
    calories: 320,
    protein: 30,
    carbs: 40,
    fat: 5,
    ingredients: ["Syrovátkový protein", "Banán", "Ovesné vločky", "Mléko"],
  },
};

// Meal Plans
export const mealPlansData: MealPlan[] = [
  {
    id: "bulking",
    name: "Nabírací jídelníček",
    description: "Vysokoproteinový jídelníček pro nabírání svalové hmoty. 3000+ kcal denně.",
    type: "bulking",
    meals: {
      breakfast: sampleMeals.omeleta,
      lunch: sampleMeals.kureci,
      dinner: sampleMeals.losos,
      snacks: [sampleMeals.shake, sampleMeals.jogurt],
    },
    totalCalories: 3200,
    totalProtein: 180,
  },
  {
    id: "cutting",
    name: "Redukční jídelníček",
    description: "Nízkosacharidový plán pro spalování tuků při zachování svalů.",
    type: "cutting",
    meals: {
      breakfast: sampleMeals.omeleta,
      lunch: sampleMeals.kureci,
      dinner: sampleMeals.losos,
      snacks: [sampleMeals.jogurt],
    },
    totalCalories: 1800,
    totalProtein: 150,
  },
  {
    id: "maintenance",
    name: "Udržovací jídelníček",
    description: "Vyvážený plán pro udržení současné váhy a kondice.",
    type: "maintenance",
    meals: {
      breakfast: sampleMeals.omeleta,
      lunch: sampleMeals.kureci,
      dinner: sampleMeals.losos,
      snacks: [sampleMeals.shake],
    },
    totalCalories: 2400,
    totalProtein: 160,
  },
];

// Trainer Tips
export const trainerTipsData: TrainerTip[] = [
  {
    id: "tip-1",
    trainerName: "Martin Svoboda",
    title: "Důležitost progresivního přetížení",
    content: "Každý týden se snaž přidat alespoň 2.5 kg na čince nebo 1 opakování navíc. Tvé tělo se přizpůsobí pouze tehdy, když ho neustále vystavuješ většímu stresu.",
    category: "Trénink",
    date: "2026-01-20",
  },
  {
    id: "tip-2",
    trainerName: "Petra Nováková",
    title: "Spánek je základ regenerace",
    content: "7-9 hodin kvalitního spánku je pro růst svalů stejně důležité jako samotný trénink. Během spánku se uvolňuje růstový hormon a tělo regeneruje.",
    category: "Regenerace",
    date: "2026-01-18",
  },
  {
    id: "tip-3",
    trainerName: "Jakub Král",
    title: "Nezapomínej na mobilitu",
    content: "Věnuj 10 minut denně protahování a mobilizaci. Zlepšíš rozsah pohybu, předejdeš zraněním a tvé cviky budou efektivnější.",
    category: "Prevence",
    date: "2026-01-15",
  },
  {
    id: "tip-4",
    trainerName: "Eva Dvořáková",
    title: "Hydratace ovlivňuje výkon",
    content: "Pij minimálně 3 litry vody denně. Dehydratace o pouhá 2% může snížit tvůj výkon až o 20%. Vodu pij průběžně, ne najednou.",
    category: "Výživa",
    date: "2026-01-12",
  },
];

// Hall of Fame
export const hallOfFameData: HallOfFameEntry[] = [
  {
    id: "hof-1",
    userName: "Tomáš Procházka",
    achievement: "Transformace roku 2025",
    description: "Za 12 měsíců zhubl 25 kg a nabral 8 kg svalů. Neuvěřitelná disciplína a odhodlání!",
    stats: {
      weightLost: 25,
      muscleGained: 8,
      daysActive: 365,
    },
    date: "2025-12-15",
  },
  {
    id: "hof-2",
    userName: "Lucie Malá",
    achievement: "Nejaktivnější členka",
    description: "500 dokončených tréninků za rok! Inspirace pro celou komunitu LazorikGym.",
    stats: {
      daysActive: 320,
    },
    date: "2025-12-01",
  },
  {
    id: "hof-3",
    userName: "David Horák",
    achievement: "Silák měsíce",
    description: "Nový osobní rekord: 200 kg mrtvý tah. Systematický trénink přináší výsledky!",
    stats: {
      muscleGained: 5,
    },
    date: "2026-01-10",
  },
  {
    id: "hof-4",
    userName: "Markéta Veselá",
    achievement: "Comeback roku",
    description: "Po zranění kolene se vrátila silnější než kdy předtím. Nikdy se nevzdávej!",
    stats: {
      daysActive: 180,
    },
    date: "2025-11-20",
  },
];

// Helper function to get weak body parts
export function getWeakBodyParts(): BodyPart[] {
  return bodyPartsData.filter((part) => part.progress < 45);
}

// Helper function to get body part by ID
export function getBodyPartById(id: string): BodyPart | undefined {
  return bodyPartsData.find((part) => part.id === id);
}
