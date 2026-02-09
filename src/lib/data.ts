import { BodyPart, WorkoutPlan, MealPlan, TrainerTip, HallOfFameEntry, Meal, Achievement } from "@/types";

// Video IDs for YouTube exercise tutorials (easily replaceable with actual URLs)
const exerciseVideos: Record<string, string> = {
  "bench-press": "VXyB0Cs7k3s",
  "kliky": "IODxDxX7oi4",
  "rozpazovani-s-jednoruckami": "FLqKAd8C8fU",
  "tlaky-s-jednoruckami": "B-aVuyhvLHU",
  "upazovani-lateral-raises": "3b0H0g8Fv4s",
  "shyby-pull-ups": "eGo4IYlbE5g",
  "pritahy-osy": "dVZs1MRqF74",
  "stahovani-horni-kladky": "GvRvn9YFjW4",
  "drep-squats": "YaXPRqUwItQ",
  "mrtvy-tah": "1V0T5hRkv0U",
  "leg-press": "IZxyC_1Owxw",
  "vypady": "QOVaHwm-Q6U",
  "bicepsovy-zdvih": "ykJmrZ5v0Oo",
  "tricepsove-stlacovani": "6jVaGf0WbE8",
  "kladivove-zdvihy": "vXtdbtZ0E0k",
  "francouzsky-tlak": "4B6hLr2mc8Y",
  "zkracovacky-crunches": "1fbU_MkV7NE",
  "zvedani-nohou-ve-visu": "hX前半部1k0",
  "russian-twists": "wkD8rjkodUI",
  "bicycle-crunches": "1f8qoFFt0rM",
  "plank-vzpor": "pSHjTRCQxIw",
  "dead-bug": "4B0T3x0YJJA",
  "bird-dog": "wiFNA3sqjCA",
  "pallof-press": "VbsvNr1Qe3I",
  "izometricke-tlaky-hlavou": "V2gG_7g0qZM",
  "pritahy-brady-chin-tucks": "w4rT4S1DbCw",
  "krouzeni-rameny": "M6A9cXW2vT8",
  "face-pulls": "uYHr_4F5Gq8",
  "arnoldovy-tlaky": "G3t0dXh2Q9k",
};

// Helper function to get YouTube embed URL
function getVideoUrl(exerciseName: string): string | undefined {
  const key = exerciseName.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  
  const videoId = exerciseVideos[key];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
}

// Body Parts Data
export const bodyPartsData: BodyPart[] = [
  {
    id: "neck",
    name: "Krční páteř",
    progress: 30,
    color: "#ff6b35",
    exercises: [
      { 
        id: "neck-1", 
        name: "Izometrické tlaky hlavou", 
        category: "Krční páteř", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha", 
        description: "Tlačte hlavou proti ruce v různých směrech a držte 10 sekund.",
        videoUrl: getVideoUrl("Izometrické tlaky hlavou")
      },
      { 
        id: "neck-2", 
        name: "Přítahy brady (Chin Tucks)", 
        category: "Krční páteř", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha", 
        description: "Zatáhněte bradu dozadu, jako byste si dělali dvojitou bradu.",
        videoUrl: getVideoUrl("Přítahy brady (Chin Tucks)")
      },
      { 
        id: "neck-3", 
        name: "Kroužení rameny", 
        category: "Krční páteř", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha", 
        description: "Pomalé kroužení rameny vpřed a vzad.",
        videoUrl: getVideoUrl("Kroužení rameny")
      },
    ],
  },
  {
    id: "shoulders",
    name: "Ramena",
    progress: 60,
    color: "#e53935",
    exercises: [
      { 
        id: "shoulders-1", 
        name: "Tlaky s jednoručkami", 
        category: "Ramena", 
        difficulty: "Střední", 
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Tlaky s jednoručkami")
      },
      { 
        id: "shoulders-2", 
        name: "Upažování (Lateral Raises)", 
        category: "Ramena", 
        difficulty: "Střední", 
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Upažování (Lateral Raises)")
      },
      { 
        id: "shoulders-3", 
        name: "Face Pulls", 
        category: "Ramena", 
        difficulty: "Začátečník", 
        equipment: "Kladka",
        videoUrl: getVideoUrl("Face Pulls")
      },
      {
        id: "shoulders-4",
        name: "Arnoldovy tlaky",
        category: "Ramena",
        difficulty: "Pokročilý",
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Arnoldovy tlaky")
      },
      {
        id: "shoulders-5",
        name: "Kliky na ramena (Pike Push-ups)",
        category: "Ramena",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Kliky v pozici obráceného V. Více zapojují deltové svaly díky odlišné dráze pohybu."
      },
      {
        id: "shoulders-6",
        name: "Y-T-W Raises vleže",
        category: "Ramena",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Vleže na břiše zvedejte ruce do tvaru Y, T a W. Posiluje zadní deltoidy a rotátorovou manžetu."
      },
      {
        id: "shoulders-7",
        name: "Stojka u zdi (Wall Handstand Hold)",
        category: "Ramena",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Stojka na rukou s oporou nohou o zeď. Extrémní zátěž pro ramena a stabilizátory."
      },
      {
        id: "shoulders-8",
        name: "Upažování s expandérem",
        category: "Ramena",
        difficulty: "Začátečník",
        equipment: "Expandéry",
        description: "Lateral raises s odporovou gumou. Plynulý odpor ideální pro domácí trénink ramen."
      },
    ],
  },
  {
    id: "chest",
    name: "Prsa",
    progress: 50,
    color: "#ff8a5b",
    exercises: [
      { 
        id: "chest-1", 
        name: "Bench Press", 
        category: "Prsa", 
        difficulty: "Pokročilý", 
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Bench Press")
      },
      { 
        id: "chest-2", 
        name: "Kliky (Push-ups)", 
        category: "Prsa", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Kliky")
      },
      { 
        id: "chest-3", 
        name: "Rozpažování s jednoručkami", 
        category: "Prsa", 
        difficulty: "Střední", 
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Rozpažování s jednoručkami")
      },
      {
        id: "chest-4",
        name: "Tlaky na šikmé lavici",
        category: "Prsa",
        difficulty: "Střední",
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Tlaky na šikmé lavici")
      },
      {
        id: "chest-5",
        name: "Kliky na široko",
        category: "Prsa",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Pánské kliky se širším postavením rukou pro větší zapojení prsních svalů."
      },
      {
        id: "chest-6",
        name: "Úzké kliky (Diamond Push-ups)",
        category: "Prsa",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Kliky s úzkým postavením rukou. Více zapojují triceps a vnitřní část prsou."
      },
      {
        id: "chest-7",
        name: "Dipy na bradlech",
        category: "Prsa",
        difficulty: "Pokročilý",
        equipment: "Hrazda",
        description: "Dipy s předklonem trupu pro maximální zapojení spodní části prsou."
      },
      {
        id: "chest-8",
        name: "Kliky se zvýšenýma nohama",
        category: "Prsa",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Kliky s nohama na židli nebo lavičce. Více zapojují horní část prsou a přední deltoidy."
      },
      {
        id: "chest-9",
        name: "Archer Push-ups",
        category: "Prsa",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Kliky s jednou rukou do strany. Jednostranná zátěž simuluje bench press s vlastní váhou."
      },
      {
        id: "chest-10",
        name: "Plyometrické kliky",
        category: "Prsa",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Explozivní kliky s odrazem rukou od země. Budují výbušnou sílu hrudníku a tricepsů."
      },
      {
        id: "chest-11",
        name: "Kliky s expandérem",
        category: "Prsa",
        difficulty: "Střední",
        equipment: "Expandéry",
        description: "Kliky s expandérem přes záda. Přidávají progresivní odpor v horní fázi pohybu."
      },
    ],
  },
  {
    id: "arms",
    name: "Ruce",
    progress: 45,
    color: "#ff6b35",
    exercises: [
      { 
        id: "arms-1", 
        name: "Bicepsový zdvih s velkou činkou", 
        category: "Ruce", 
        difficulty: "Střední", 
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Bicepsový zdvih")
      },
      { 
        id: "arms-2", 
        name: "Tricepsové stlačování kladky", 
        category: "Ruce", 
        difficulty: "Začátečník", 
        equipment: "Kladka",
        videoUrl: getVideoUrl("Tricepsové stlačování")
      },
      { 
        id: "arms-3", 
        name: "Kladivové zdvihy", 
        category: "Ruce", 
        difficulty: "Začátečník", 
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Kladivové zdvihy")
      },
      {
        id: "arms-4",
        name: "Francouzský tlak",
        category: "Ruce",
        difficulty: "Střední",
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Francouzský tlak")
      },
      {
        id: "arms-5",
        name: "Reverzní kliky na triceps",
        category: "Ruce",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Kliky s oporou rukou o lavičku/židli za zády. Izolují triceps."
      },
      {
        id: "arms-6",
        name: "Bicepsové zdvihy s expandérem",
        category: "Ruce",
        difficulty: "Začátečník",
        equipment: "Expandéry",
        description: "Bicepsový zdvih s odporovou gumou. Ideální pro domácí trénink."
      },
      {
        id: "arms-7",
        name: "Commando Pull-ups / Izometrické drží",
        category: "Ruce",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Izometrický bicepsový zdvih s vlastní váhou — držte se za hranu stolu v pozici zdvihu."
      },
      {
        id: "arms-8",
        name: "Tricepsové kliky na židli",
        category: "Ruce",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Hlubší verze reverzních kliků na židli s nohama na druhé židli pro maximální rozsah pohybu."
      },
      {
        id: "arms-9",
        name: "Tricepsové stlačování s expandérem",
        category: "Ruce",
        difficulty: "Začátečník",
        equipment: "Expandéry",
        description: "Tricepsový pushdown s gumou uchycenou nahoře na dveřích. Domácí alternativa kladky."
      },
      {
        id: "arms-10",
        name: "Kladivové zdvihy s expandérem",
        category: "Ruce",
        difficulty: "Začátečník",
        equipment: "Expandéry",
        description: "Kladivový zdvih s odporovou gumou. Zapojuje brachialis i biceps."
      },
    ],
  },
  {
    id: "abs",
    name: "Břicho",
    progress: 20,
    color: "#e53935",
    exercises: [
      { 
        id: "abs-1", 
        name: "Zkracovačky (Crunches)", 
        category: "Břicho", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Zkracovačky")
      },
      { 
        id: "abs-2", 
        name: "Zvedání nohou ve visu", 
        category: "Břicho", 
        difficulty: "Pokročilý", 
        equipment: "Hrazda",
        videoUrl: getVideoUrl("Zvedání nohou ve visu")
      },
      { 
        id: "abs-3", 
        name: "Russian Twists", 
        category: "Břicho", 
        difficulty: "Střední", 
        equipment: "Medicinbal",
        videoUrl: getVideoUrl("Russian Twists")
      },
      {
        id: "abs-4",
        name: "Bicycle Crunches",
        category: "Břicho",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Bicycle Crunches")
      },
      {
        id: "abs-5",
        name: "Leg Raises (Zvedání nohou vleže)",
        category: "Břicho",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Zvedání natažených nohou vleže na zádech. Cílí na spodní část břicha."
      },
      {
        id: "abs-6",
        name: "V-Sit",
        category: "Břicho",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Současné zvedání trupu i nohou do tvaru V. Komplexní cvik na celé břicho."
      },
      {
        id: "abs-7",
        name: "Mountain Climbers",
        category: "Břicho",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Dynamické přitahování kolen k hrudníku ve vzporu. Kombinuje kardio a core práci."
      },
      {
        id: "abs-8",
        name: "Flutter Kicks",
        category: "Břicho",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Střídavé kopy nohama vleže na zádech. Izolují spodní část břicha a hip flexory."
      },
      {
        id: "abs-9",
        name: "Russian Twists s vlastní váhou",
        category: "Břicho",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Rotace trupu v sedě bez závaží. Lehčí verze pro domácí trénink šikmých svalů."
      },
    ],
  },
  {
    id: "core",
    name: "Core",
    progress: 40,
    color: "#ff8a5b",
    exercises: [
      { 
        id: "core-1", 
        name: "Plank (Vzpor)", 
        category: "Core", 
        difficulty: "Střední", 
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Plank")
      },
      { 
        id: "core-2", 
        name: "Dead Bug", 
        category: "Core", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Dead Bug")
      },
      { 
        id: "core-3", 
        name: "Bird Dog", 
        category: "Core", 
        difficulty: "Začátečník", 
        equipment: "Vlastní váha",
        videoUrl: getVideoUrl("Bird Dog")
      },
      {
        id: "core-4",
        name: "Pallof Press",
        category: "Core",
        difficulty: "Střední",
        equipment: "Kladka",
        videoUrl: getVideoUrl("Pallof Press")
      },
      {
        id: "core-5",
        name: "Boční plank",
        category: "Core",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Plank na boku. Posiluje šikmé břišní svaly a stabilizátory trupu."
      },
      {
        id: "core-6",
        name: "Rotační plank",
        category: "Core",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Plank s rotací trupu. Zapojí břicho, záda i ramena díky kruhovému pohybu."
      },
      {
        id: "core-7",
        name: "Hollow Body Hold",
        category: "Core",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Gymnastická pozice vleže na zádech s nataženýma rukama a nohama. Extrémně efektivní na hluboké core svaly."
      },
      {
        id: "core-8",
        name: "Bear Crawl",
        category: "Core",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Plazení na čtyřech s koleny nad zemí. Funkční cvik na celé tělo s důrazem na stabilizaci trupu."
      },
      {
        id: "core-9",
        name: "Pallof Press s expandérem",
        category: "Core",
        difficulty: "Střední",
        equipment: "Expandéry",
        description: "Domácí verze Pallof Pressu s gumou uchycenou na dveřní kliku. Anti-rotační core cvičení."
      },
    ],
  },
  {
    id: "back",
    name: "Záda",
    progress: 55,
    color: "#e53935",
    exercises: [
      { 
        id: "back-1", 
        name: "Shyby (Pull-ups)", 
        category: "Záda", 
        difficulty: "Pokročilý", 
        equipment: "Hrazda",
        videoUrl: getVideoUrl("Shyby")
      },
      { 
        id: "back-2", 
        name: "Přítahy osy v předklonu", 
        category: "Záda", 
        difficulty: "Pokročilý", 
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Přítahy osy")
      },
      {
        id: "back-3",
        name: "Stahování horní kladky",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Kladka",
        videoUrl: getVideoUrl("Stahování horní kladky")
      },
      {
        id: "back-4",
        name: "Superman",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Vleže na břiše zvedejte současně ruce a nohy. Posiluje vzpřimovače páteře."
      },
      {
        id: "back-5",
        name: "Reverse Snow Angel",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Obrácený sněhový andělíček vleže na břiše. Posiluje vzpřimovače páteře a deltové svaly."
      },
      {
        id: "back-6",
        name: "Přítahy pod stolem (Inverted Rows)",
        category: "Záda",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Přítahy těla pod hranou stolu nebo tyčí nízko nad zemí. Domácí alternativa přítahů."
      },
      {
        id: "back-7",
        name: "Prone Y Raises",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Vleže na břiše zvedejte ruce do tvaru Y. Posiluje spodní trapézy a mezilopatkové svaly."
      },
      {
        id: "back-8",
        name: "Přítahy s expandérem",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Expandéry",
        description: "Přítahový pohyb s gumou uchycenou na dveřích nebo sloupku. Nahrazuje stahování kladky."
      },
      {
        id: "back-9",
        name: "Good Mornings s vlastní váhou",
        category: "Záda",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Předklon s rukama za hlavou a rovnými zády. Posiluje vzpřimovače páteře a hamstringy."
      },
    ],
  },
  {
    id: "legs",
    name: "Nohy",
    progress: 65,
    color: "#ff6b35",
    exercises: [
      { 
        id: "legs-1", 
        name: "Dřepy (Squats)", 
        category: "Nohy", 
        difficulty: "Střední", 
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Dřepy")
      },
      { 
        id: "legs-2", 
        name: "Mrtvý tah", 
        category: "Nohy", 
        difficulty: "Pokročilý", 
        equipment: "Velká činka",
        videoUrl: getVideoUrl("Mrtvý tah")
      },
      { 
        id: "legs-3", 
        name: "Leg Press", 
        category: "Nohy", 
        difficulty: "Střední", 
        equipment: "Stroj",
        videoUrl: getVideoUrl("Leg Press")
      },
      {
        id: "legs-4",
        name: "Výpady",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Jednoručky",
        videoUrl: getVideoUrl("Výpady")
      },
      {
        id: "legs-5",
        name: "Dřepy s vlastní váhou",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Základní dřep bez zátěže. Procvičí stehna, hýždě a core. Lze ztížit výdrží ve spodní pozici."
      },
      {
        id: "legs-6",
        name: "Bulharské dřepy",
        category: "Nohy",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Jednorázový dřep se zadní nohou na lavičce. Efektivnější než klasický dřep díky izolaci každé nohy."
      },
      {
        id: "legs-7",
        name: "Hip Thrusty",
        category: "Nohy",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Zdvih pánve s oporou zad o lavičku. Nejúčinnější cvik na hýžďové svaly."
      },
      {
        id: "legs-8",
        name: "Výstupy na vyvýšenou podložku",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Step-upy na lavičku nebo bednu. Posiluje stehna a hýždě unilaterálně."
      },
      {
        id: "legs-9",
        name: "Pistol Squats (Jednonožní dřep)",
        category: "Nohy",
        difficulty: "Pokročilý",
        equipment: "Vlastní váha",
        description: "Dřep na jedné noze. Extrémní nároky na sílu, rovnováhu a mobilitu. Královský cvik na nohy doma."
      },
      {
        id: "legs-10",
        name: "Glute Bridge",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Zdvih pánve vleže na zádech. Aktivuje hýžďové svaly a stabilizátory pánve."
      },
      {
        id: "legs-11",
        name: "Jump Squats",
        category: "Nohy",
        difficulty: "Střední",
        equipment: "Vlastní váha",
        description: "Explozivní dřepy s výskokem. Budují výbušnost a kardio kondici současně."
      },
      {
        id: "legs-12",
        name: "Wall Sit (Dřep u zdi)",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Izometrický dřep s oporou zad o zeď. Posiluje stehna výdrží v pozici."
      },
      {
        id: "legs-13",
        name: "Výpady s vlastní váhou",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Klasické výpady vpřed bez závaží. Unilaterální cvik na stehna, hýždě a stabilitu."
      },
      {
        id: "legs-14",
        name: "Sumo Squats",
        category: "Nohy",
        difficulty: "Začátečník",
        equipment: "Vlastní váha",
        description: "Dřepy s širokým postavením nohou. Více zapojují vnitřní stehna a hýždě."
      },
    ],
  },
];

// Workout Plans
export const workoutPlansData: WorkoutPlan[] = [
  {
    id: "push-pull-legs",
    name: "Push/Pull/Legs Master",
    description: "Kompletní 6-denní split navržený pro maximální objem a symetrii.",
    duration: "6 dní/týden",
    difficulty: "Pokročilý",
    targetParts: ["Hrudník", "Záda", "Nohy", "Ramena", "Ruce"],
    tags: ["Objem", "Hypertrofie", "Pro"],
    estimatedTime: "75 min",
    estimatedCalories: 650,
    splitType: "Push/Pull/Legs",
    exercises: [],
    weeklySchedule: [
      { day: "Pondělí", workout: "Push (Hrudník, Ramena, Triceps)", muscles: ["Prsa", "Ramena", "Triceps"] },
      { day: "Úterý", workout: "Pull (Záda, Biceps)", muscles: ["Záda", "Biceps"] },
      { day: "Středa", workout: "Legs (Nohy, Core)", muscles: ["Kvadraticepsy", "Hamstringy", "Lýtka"] },
      { day: "Čtvrtek", workout: "Push B", muscles: ["Prsa", "Ramena", "Triceps"] },
      { day: "Pátek", workout: "Pull B", muscles: ["Záda", "Biceps"] },
      { day: "Sobota", workout: "Legs B", muscles: ["Nohy", "Břicho"] },
      { day: "Neděle", workout: "Odpočinek", muscles: [], isRest: true },
    ]
  },
  {
    id: "full-body-expert",
    name: "Full Body Foundation",
    description: "Základní kámen silového tréninku. Efektivní a časově nenáročný.",
    duration: "3 dny/týden",
    difficulty: "Začátečník",
    targetParts: ["Celé tělo"],
    tags: ["Síla", "Základy", "Efektivita"],
    estimatedTime: "50 min",
    estimatedCalories: 450,
    splitType: "Full Body",
    exercises: [],
    weeklySchedule: [
      { day: "Pondělí", workout: "Full Body A", muscles: ["Nohy", "Záda", "Prsa"] },
      { day: "Úterý", workout: "Odpočinek", muscles: [], isRest: true },
      { day: "Středa", workout: "Full Body B", muscles: ["Nohy", "Ramena", "Ruce"] },
      { day: "Čtvrtek", workout: "Odpočinek", muscles: [], isRest: true },
      { day: "Pátek", workout: "Full Body C", muscles: ["Celé tělo"] },
      { day: "Sobota", workout: "Aktivní regenerace", muscles: ["Kardio"], isRest: true },
      { day: "Neděle", workout: "Odpočinek", muscles: [], isRest: true },
    ]
  },
  {
    id: "upper-lower-elite",
    name: "Elite Upper/Lower",
    description: "Moderní přístup ke zvyšování síly a svalové hmoty s optimální frekvencí.",
    duration: "4 dny/týden",
    difficulty: "Střední",
    targetParts: ["Horní tělo", "Dolní tělo"],
    tags: ["Síla", "Kondice", "Atletika"],
    estimatedTime: "65 min",
    estimatedCalories: 550,
    splitType: "Upper/Lower",
    exercises: [],
    weeklySchedule: [
      { day: "Pondělí", workout: "Upper Power", muscles: ["Záda", "Prsa", "Ramena"] },
      { day: "Úterý", workout: "Lower Power", muscles: ["Nohy", "Core"] },
      { day: "Středa", workout: "Odpočinek", muscles: [], isRest: true },
      { day: "Čtvrtek", workout: "Upper Hypertrophy", muscles: ["Prsa", "Záda", "Ruce"] },
      { day: "Pátek", workout: "Lower Hypertrophy", muscles: ["Hamstringy", "Lýtka"] },
      { day: "Sobota", workout: "Odpočinek", muscles: [], isRest: true },
      { day: "Neděle", workout: "Odpočinek", muscles: [], isRest: true },
    ]
  },
  {
    id: "home-bodyweight",
    name: "Domácí Bodyweight Program",
    description: "Kompletní tréninkový plán bez vybavení. Stačí ti jen vlastní tělo a kousek prostoru.",
    duration: "4 dny/týden",
    difficulty: "Začátečník",
    targetParts: ["Celé tělo"],
    tags: ["Doma", "Vlastní váha", "Bez vybavení", "Začátečník"],
    estimatedTime: "35 min",
    estimatedCalories: 350,
    splitType: "Full Body",
    exercises: [],
    weeklySchedule: [
      { day: "Pondělí", workout: "Horní tělo (Doma)", muscles: ["Prsa", "Ramena", "Triceps"], },
      { day: "Úterý", workout: "Dolní tělo (Doma)", muscles: ["Stehna", "Hýždě", "Lýtka"], },
      { day: "Středa", workout: "Odpočinek / Mobilita", muscles: [], isRest: true },
      { day: "Čtvrtek", workout: "Core & Břicho (Doma)", muscles: ["Břicho", "Core", "Záda"], },
      { day: "Pátek", workout: "Full Body HIIT (Doma)", muscles: ["Celé tělo"], },
      { day: "Sobota", workout: "Odpočinek", muscles: [], isRest: true },
      { day: "Neděle", workout: "Odpočinek / Strečink", muscles: [], isRest: true },
    ]
  },
  {
    id: "home-advanced",
    name: "Domácí Pokročilý Calisthenics",
    description: "Náročný domácí program s vlastní váhou pro pokročilé. Pistol squats, archer push-ups, stojky.",
    duration: "5 dní/týden",
    difficulty: "Pokročilý",
    targetParts: ["Celé tělo"],
    tags: ["Doma", "Calisthenics", "Pokročilý", "Síla"],
    estimatedTime: "50 min",
    estimatedCalories: 500,
    splitType: "Push/Pull/Legs",
    exercises: [],
    weeklySchedule: [
      { day: "Pondělí", workout: "Push (Doma)", muscles: ["Prsa", "Ramena", "Triceps"], },
      { day: "Úterý", workout: "Pull & Záda (Doma)", muscles: ["Záda", "Biceps"], },
      { day: "Středa", workout: "Nohy & Core (Doma)", muscles: ["Nohy", "Core", "Břicho"], },
      { day: "Čtvrtek", workout: "Odpočinek / Mobilita", muscles: [], isRest: true },
      { day: "Pátek", workout: "Upper Body Skills", muscles: ["Ramena", "Prsa", "Záda"], },
      { day: "Sobota", workout: "Lower Body & HIIT", muscles: ["Nohy", "Kardio"], },
      { day: "Neděle", workout: "Odpočinek", muscles: [], isRest: true },
    ]
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
