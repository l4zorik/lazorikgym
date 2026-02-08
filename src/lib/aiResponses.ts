import { BodyPart, WorkoutSession } from "@/types";

// Template responses for the AI coach
const greetings = [
  "Ahoj! Jsem tvůj AI trenér. Jak ti dnes mohu pomoct?",
  "Zdravím tě! Připraven na trénink? Ptej se na cokoliv.",
  "Čau! Co tě zajímá ohledně tréninku nebo výživu?",
];

const historyResponses = [
  "Tvoje historie ukazuje, že jsi odtrénoval už {count} tréninků. Jen tak dál!",
  "Poslední trénink jsi měl {date}. Jsi připraven na další?",
  "Zatím jsi odcvičil celkem {minutes} minut. Skvělá konzistence!",
];

const weakPartResponses = [
  "Na základě tvých dat vidím, že by ses měl zaměřit na {parts}. Tyto partie mají nejnižší progress.",
  "Tvoje nejslabší partie jsou {parts}. Doporučuji je trénovat 2-3x týdně pro rychlejší zlepšení.",
  "Zaměř se na {parts} - tam máš největší prostor pro zlepšení!",
];

const exerciseResponses = [
  "Pro {part} doporučuji tyto cviky: {exercises}. Začni s 3 sériemi po 10-12 opakováních.",
  "Nejlepší cviky na {part} jsou {exercises}. Trénuj je s čistou technikou.",
  "{exercises} jsou skvělé pro rozvoj {part}. Nezapomeň na zahřátí!",
];

const motivationResponses = [
  "Každý trénink tě posouvá blíž k cíli. Nevzdávej to!",
  "Konzistence je klíč. I malý pokrok je pokrok!",
  "Pamatuj - i ti nejlepší začínali od nuly. Drž se!",
  "Tvoje tělo se přizpůsobuje. Důvěřuj procesu!",
];

const nutritionResponses = [
  "Pro svalový růst potřebuješ dostatek bílkovin - asi 1.6-2g na kg tělesné váhy.",
  "Nezapomínej na sacharidy před tréninkem - dodají ti energii.",
  "Hydratace je klíčová. Pij alespoň 2-3 litry vody denně.",
  "Po tréninku doplň bílkoviny do 30-60 minut pro lepší regeneraci.",
];

const restResponses = [
  "Odpočinek je stejně důležitý jako trénink. Svaly rostou při regeneraci.",
  "Spi alespoň 7-8 hodin. Tělo se regeneruje hlavně ve spánku.",
  "Mezi tréninky stejné partie nechej alespoň 48 hodin pauzu.",
];

// Advanced workout planning responses
const workoutPlanResponses = [
  "Na základě tvých slabých partií ({weakParts}) ti doporučuji tento tréninkový plán na tento týden:\n\n{plan}",
  "Vytvořil jsem ti personalizovaný plán zaměřený na {focus}:\n\n{plan}",
  "Zde je optimální rozvrh pro tento týden, který ti pomůže vyvážit trénink:\n\n{plan}",
];

const scheduleResponses = [
  "Přidal jsem ti trénink '{workout}' do kalendáře na {date}. Nezapomeň ho označit jako dokončený po cvičení!",
  "Trénink '{workout}' je naplánován na {date}. Máš to v kalendáři.",
  "Hotovo! '{workout}' byl přidán do tvého kalendáře na {date}. Hodně štěstí!",
];

// Keywords to match user queries
const keywordMap: Record<string, string[]> = {
  weak: ["slabé", "slabý", "nejslabší", "zlepšit", "zaměřit"],
  exercise: ["cvik", "cvičení", "cviky", "trénink", "jak trénovat"],
  motivation: ["motivace", "nevzdávám", "těžké", "vzdát", "motivuj"],
  nutrition: ["jídlo", "strava", "bílkoviny", "protein", "jíst", "výživa", "kalorie"],
  rest: ["odpočinek", "regenerace", "spánek", "únava", "přetrénování"],
  greeting: ["ahoj", "čau", "zdravím", "dobrý den", "hey", "hi"],
  history: ["historie", "minulý", "naposledy", "kolik jsem", "odcvičeno", "aktivita"],
  schedule: ["naplánuj", "přidej do kalendáře", "naplánovat", "kdy trénovat", "rozvrh", "kalendář"],
  plan: ["plán", "týdenní plán", "tréninkový plán", "program", "jak často"],
};

// Sample workout templates for AI generation
const workoutTemplates: Record<string, string[]> = {
  strength: [
    "**Pondělí - Push (Hrudník, Ramena, Triceps)**\n• Bench Press: 4x8-10\n• Shoulder Press: 3x10-12\n• Incline Dumbbell Press: 3x10-12\n• Lateral Raises: 3x12-15\n• Tricep Pushdowns: 3x12-15\n• Dips: 3x do selhání",
    
    "**Středa - Pull (Záda, Biceps)**\n• Deadlift: 4x6-8\n• Pull-ups: 4x do selhání\n• Barbell Rows: 3x10-12\n• Face Pulls: 3x15-20\n• Barbell Curls: 3x10-12\n• Hammer Curls: 3x12-15",
    
    "**Pátek - Legs (Nohy)**\n• Squats: 4x8-10\n• Romanian Deadlift: 3x10-12\n• Leg Press: 3x12-15\n• Walking Lunges: 3x12 kroků\n• Leg Curls: 3x12-15\n• Calf Raises: 4x15-20",
  ],
  cardio: [
    "**Úterý - Kardio + Core**\n• 20 min intervalový běh\n• 3 kola:\n  - 40 sekund plank\n  - 20 sekund Russian twists\n  - 15 leg raises\n  - 30 sekund bicycle crunches",
    
    "**Čtvrtek - HIIT**\n• Zahřátí: 5 min rotoped\n• 5 kol:\n  - 30 sekund burpees\n  - 30 sekund odpočinek\n  - 30 sekund mountain climbers\n  - 30 sekund odpočinek\n  - 30 sekund jump squats\n  - 30 sekund odpočinek",
  ],
  fullbody: [
    "**Sobota - Full Body**\n• Goblet Squats: 3x12\n• Push-ups: 3x do selhání\n• Dumbbell Rows: 3x12 každá ruka\n• Lunges: 3x10 každá noha\n• Plank: 3x45 sekund",
  ],
};

const exerciseDatabase: Record<string, string[]> = {
  hrudník: ["Bench Press", "Incline Dumbbell Press", "Chest Flyes", "Push-ups", "Cable Crossovers"],
  záda: ["Pull-ups", "Deadlift", "Barbell Rows", "Lat Pulldown", "Face Pulls"],
  ramena: ["Shoulder Press", "Lateral Raises", "Front Raises", "Face Pulls", "Shrugs"],
  biceps: ["Barbell Curls", "Hammer Curls", "Preacher Curls", "Cable Curls", "Concentration Curls"],
  triceps: ["Tricep Pushdowns", "Overhead Extensions", "Dips", "Close Grip Bench", "Skullcrushers"],
  nohy: ["Squats", "Leg Press", "Romanian Deadlift", "Leg Curls", "Lunges", "Calf Raises"],
  core: ["Plank", "Russian Twists", "Leg Raises", "Crunches", "Dead Bug"],
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function matchKeywords(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  for (const [category, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return category;
    }
  }

  return null;
}

// Generate personalized workout plan based on weak parts and preferences
function generatePersonalizedPlan(
  weakParts: BodyPart[],
  days: number = 4
): string {
  const weakPartNames = weakParts.slice(0, 2).map(p => p.name.toLowerCase());
  
  let plan = "";
  
  if (days >= 4) {
    // Push/Pull/Legs split
    plan += workoutTemplates.strength[0] + "\n\n";
    plan += workoutTemplates.strength[1] + "\n\n";
    plan += workoutTemplates.cardio[0] + "\n\n";
    plan += workoutTemplates.strength[2] + "\n\n";
    if (days >= 5) {
      plan += workoutTemplates.cardio[1];
    }
  } else if (days === 3) {
    // Full body 3x
    plan += "**Pondělí, Středa, Pátek - Full Body**\n";
    weakPartNames.forEach((part, i) => {
      const exercises = exerciseDatabase[part]?.slice(0, 3) || ["Squats", "Push-ups", "Rows"];
      plan += `\nZaměření na ${part}:\n`;
      exercises.forEach((ex, j) => {
        plan += `• ${ex}: 3x10-12\n`;
      });
    });
  } else {
    // Minimal plan
    plan += "**2x týdně - Full Body**\n";
    plan += "• Squats: 3x10\n• Push-ups: 3x10\n• Rows: 3x10\n• Lunges: 3x10\n• Plank: 3x30s";
  }

  // Add specific recommendations for weak parts
  if (weakParts.length > 0) {
    plan += "\n\n**🎯 Zaměření na slabé partie:**\n";
    weakParts.slice(0, 2).forEach(part => {
      const exercises = part.exercises.slice(0, 3).map(e => e.name).join(", ");
      plan += `• ${part.name}: Přidej ${exercises} - 3 série\n`;
    });
  }

  return plan;
}

// Parse schedule request from message
function parseScheduleRequest(message: string): { workout: string; date: string } | null {
  const lowerMsg = message.toLowerCase();
  
  // Look for date patterns
  const datePatterns = [
    { pattern: /z[ií]tra|zitra/, days: 1 },
    { pattern: /pozítří|pozitri/, days: 2 },
    { pattern: /dnes/, days: 0 },
  ];
  
  let targetDays = 1; // default tomorrow
  for (const { pattern, days } of datePatterns) {
    if (pattern.test(lowerMsg)) {
      targetDays = days;
      break;
    }
  }
  
  // Generate date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + targetDays);
  const dateStr = targetDate.toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long" });
  
  // Detect workout type
  let workoutType = "Trénink";
  if (/push/i.test(lowerMsg)) workoutType = "Push Day";
  else if (/pull/i.test(lowerMsg)) workoutType = "Pull Day";
  else if (/nohy|leg/i.test(lowerMsg)) workoutType = "Leg Day";
  else if (/kardio|cardio/i.test(lowerMsg)) workoutType = "Kardio";
  else if (/full.*body|celé.*tělo/i.test(lowerMsg)) workoutType = "Full Body";
  
  return { workout: workoutType, date: dateStr };
}

export function generateAIResponse(
  userMessage: string,
  weakParts: BodyPart[],
  history: WorkoutSession[] = []
): string {
  const category = matchKeywords(userMessage);
  const weakPartNames = weakParts.map((p) => p.name).join(", ");

  switch (category) {
    case "greeting":
      return getRandomItem(greetings);

    case "history":
      if (history.length === 0) {
        return "Zatím v historii nemáš žádné tréninky. Jakmile dokončíš svůj první trénink, uvidím tvůj progres!";
      }
      const lastSession = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      const totalMinutes = history.reduce((acc, s) => acc + s.duration, 0);
      
      const response = getRandomItem(historyResponses)
        .replace("{count}", history.length.toString())
        .replace("{minutes}", totalMinutes.toString())
        .replace("{date}", new Date(lastSession.date).toLocaleDateString("cs-CZ"));
      
      return response;

    case "weak":
      if (weakParts.length === 0) {
        return "Skvělá práce! Všechny tvoje partie jsou v dobré kondici. Pokračuj v udržovacím režimu.";
      }
      return getRandomItem(weakPartResponses).replace("{parts}", weakPartNames);

    case "exercise":
      // Try to find specific body part in message
      const mentionedPart = weakParts.find((p) =>
        userMessage.toLowerCase().includes(p.name.toLowerCase())
      );

      if (mentionedPart) {
        const exercises = mentionedPart.exercises
          .slice(0, 3)
          .map((e) => e.name)
          .join(", ");
        return getRandomItem(exerciseResponses)
          .replace("{part}", mentionedPart.name)
          .replace("{exercises}", exercises);
      }

      // Default to first weak part
      if (weakParts.length > 0) {
        const part = weakParts[0];
        const exercises = part.exercises
          .slice(0, 3)
          .map((e) => e.name)
          .join(", ");
        return getRandomItem(exerciseResponses)
          .replace("{part}", part.name)
          .replace("{exercises}", exercises);
      }

      return "Řekni mi, na kterou partii se chceš zaměřit, a doporučím ti nejlepší cviky.";

    case "motivation":
      return getRandomItem(motivationResponses);

    case "nutrition":
      return getRandomItem(nutritionResponses);

    case "rest":
      return getRandomItem(restResponses);

    case "schedule":
      const scheduleInfo = parseScheduleRequest(userMessage);
      if (scheduleInfo) {
        return getRandomItem(scheduleResponses)
          .replace("{workout}", scheduleInfo.workout)
          .replace("{date}", scheduleInfo.date);
      }
      return "Řekni mi jaký trénink chceš naplánovat a na kdy (např. 'naplánuj Push Day na zítra').";

    case "plan":
      // Detect how many days user wants to train
      const daysMatch = userMessage.match(/(\d+)\s*x?\s*t[yý]dn[ěé]/i);
      const days = daysMatch ? parseInt(daysMatch[1]) : 4;
      
      const plan = generatePersonalizedPlan(weakParts, days);
      const focusPart = weakParts.length > 0 ? weakParts[0].name : "vyvážený rozvoj";
      
      return getRandomItem(workoutPlanResponses)
        .replace("{weakParts}", weakPartNames || "všechny partie")
        .replace("{focus}", focusPart)
        .replace("{plan}", plan);

    default:
      // Enhanced generic response with suggestions
      const defaultResponses = [
        `Můžu ti pomoct s plánem tréninku, výživou nebo motivací. Co třeba vyzkoušet:\n• Napiš "vytvoř mi plán" pro týdenní rozvrh\n• "Naplánuj trénink na zítra" pro přidání do kalendáře\n• Zeptej se na cviky pro konkrétní partie`,
        
        `${weakParts.length > 0 
          ? `Vidím, že bys měl zaměřit na ${weakPartNames}. ` 
          : "Skvělá forma! "
        }Chceš, abych ti vytvořil tréninkový plán nebo naplánoval konkrétní trénink?`,
        
        `Jsem tu, abych ti pomohl s:\n• **Plánováním** - napiš "naplánuj mi týden"\n• **Cviky** - zeptej se "jaké cviky na záda?"\n• **Výživou** - "kolik bílkovin potřebuji?"\n• **Motivací** - "motivuj mě"`,
      ];
      return getRandomItem(defaultResponses);
  }
}

export function generateRecommendations(weakParts: BodyPart[]): string[] {
  const recommendations: string[] = [];

  if (weakParts.length > 0) {
    recommendations.push(
      `Zaměř se na ${weakParts[0].name} - má pouze ${weakParts[0].progress}% progress`
    );
  }

  if (weakParts.length > 1) {
    recommendations.push(
      `${weakParts[1].name} potřebuje více pozornosti`
    );
  }

  recommendations.push("Vytvoř si týdenní tréninkový plán s AI");
  recommendations.push("Naplánuj tréninky dopředu v kalendáři");

  return recommendations.slice(0, 3);
}

// Export workout plan generator for external use
export { generatePersonalizedPlan, parseScheduleRequest, exerciseDatabase, workoutTemplates };
