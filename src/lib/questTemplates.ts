import { Quest, QuestObjective } from "@/types";
import { bodyPartsData } from "./data";

export interface QuestTemplate {
  id: string;
  bodyPartId: string;
  title: string;
  description: string;
  difficulty: Quest["difficulty"];
  xpReward: number;
  durationDays: number;
  objectives: Omit<QuestObjective, "id" | "current" | "completed">[];
}

export const questTemplates: QuestTemplate[] = [
  {
    id: "quest-neck",
    bodyPartId: "neck",
    title: "Mise: Železný krk",
    description:
      "Posil svou krční páteř a zlepši držení těla. Mobilita a izometrická síla jsou klíčem k bezbolestnímu krku.",
    difficulty: "Začátečník",
    xpReward: 350,
    durationDays: 14,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 6 tréninků krku",
        description: "Odtrénuj 6 tréninků zaměřených na krční páteř",
        target: 6,
        unit: "tréninků",
        xpReward: 80,
        linkedExerciseIds: ["neck-1", "neck-2", "neck-3"],
      },
      {
        type: "streak",
        title: "Udržuj streak 5 dní",
        description: "Cvič alespoň 5 dní v kuse",
        target: 5,
        unit: "dní",
        xpReward: 60,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 4 noci",
        description: "Kvalitní spánek pomáhá regeneraci krční páteře",
        target: 4,
        unit: "nocí",
        xpReward: 50,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 4 dny",
        description: "Hydratace zlepšuje mobilitu kloubů a plotýnek",
        target: 4,
        unit: "dní",
        xpReward: 40,
      },
    ],
  },
  {
    id: "quest-abs",
    bodyPartId: "abs",
    title: "Operace: Ocelové břicho",
    description:
      "Intenzivní mise zaměřená na břišní svaly. Kombinuj trénink, stravu a disciplínu pro viditelné výsledky.",
    difficulty: "Střední",
    xpReward: 500,
    durationDays: 21,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 8 tréninků břicha",
        description: "Odtrénuj 8 tréninků zaměřených na břišní svaly",
        target: 8,
        unit: "tréninků",
        xpReward: 120,
        linkedExerciseIds: [
          "abs-1",
          "abs-2",
          "abs-3",
          "abs-4",
          "abs-5",
          "abs-6",
          "abs-7",
          "abs-8",
          "abs-9",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 5 dní v řadě",
        description: "Dosáhni svého denního proteinového cíle 5 dní po sobě",
        target: 5,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "streak",
        title: "Udržuj streak 7 dní",
        description: "Cvič alespoň 7 dní v kuse",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 5 dní",
        description: "Hydratace je základ pro viditelné břišní svaly",
        target: 5,
        unit: "dní",
        xpReward: 50,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 5 nocí",
        description: "Spánek je klíčový pro regeneraci a spalování tuků",
        target: 5,
        unit: "nocí",
        xpReward: 50,
      },
    ],
  },
  {
    id: "quest-core",
    bodyPartId: "core",
    title: "Projekt: Pevný core",
    description:
      "Stabilita je základ síly. Posilni svůj core pomocí plank challenges, stabilizačních cviků a správné regenerace.",
    difficulty: "Střední",
    xpReward: 450,
    durationDays: 21,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 8 tréninků core",
        description: "Odtrénuj 8 tréninků zaměřených na core stabilitu",
        target: 8,
        unit: "tréninků",
        xpReward: 120,
        linkedExerciseIds: [
          "core-1",
          "core-2",
          "core-3",
          "core-4",
          "core-5",
          "core-6",
          "core-7",
          "core-8",
          "core-9",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 4 dny",
        description: "Dosáhni svého denního proteinového cíle alespoň 4 dny",
        target: 4,
        unit: "dní",
        xpReward: 60,
      },
      {
        type: "streak",
        title: "Udržuj streak 6 dní",
        description: "Cvič alespoň 6 dní v kuse",
        target: 6,
        unit: "dní",
        xpReward: 70,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 5 dní",
        description: "Hydratovaný core funguje lépe",
        target: 5,
        unit: "dní",
        xpReward: 50,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 4 noci",
        description: "Odpočinek pomáhá budovat hlubší core svaly",
        target: 4,
        unit: "nocí",
        xpReward: 40,
      },
    ],
  },
  {
    id: "quest-arms",
    bodyPartId: "arms",
    title: "Výzva: Silné paže",
    description:
      "Objem a síla paží vyžadují pravidelnost a dostatek bílkovin. Přijmi tuto výzvu a uvidíš rozdíl.",
    difficulty: "Střední",
    xpReward: 500,
    durationDays: 28,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 10 tréninků paží",
        description: "Odtrénuj 10 tréninků zaměřených na biceps a triceps",
        target: 10,
        unit: "tréninků",
        xpReward: 140,
        linkedExerciseIds: [
          "arms-1",
          "arms-2",
          "arms-3",
          "arms-4",
          "arms-5",
          "arms-6",
          "arms-7",
          "arms-8",
          "arms-9",
          "arms-10",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 7 dní",
        description: "Proteiny jsou palivo pro růst svalů paží",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "streak",
        title: "Udržuj streak 7 dní",
        description: "Cvič alespoň 7 dní v kuse",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 5 dní",
        description: "Hydratované svaly rostou lépe",
        target: 5,
        unit: "dní",
        xpReward: 50,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 5 nocí",
        description: "Svaly rostou ve spánku, ne v posilovně",
        target: 5,
        unit: "nocí",
        xpReward: 50,
      },
    ],
  },
  // --- Nové mise pro všechny partie ---
  {
    id: "quest-chest",
    bodyPartId: "chest",
    title: "Operace: Ocelová hruď",
    description:
      "Vybuduj masivní hrudník kombinací tlakových pohybů, správné výživy a důsledné regenerace. Bench press, kliky a dipy budou tvoji nejlepší přátelé.",
    difficulty: "Střední",
    xpReward: 500,
    durationDays: 28,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 10 tréninků prsou",
        description: "Odtrénuj 10 tréninků zaměřených na hrudní svaly",
        target: 10,
        unit: "tréninků",
        xpReward: 140,
        linkedExerciseIds: [
          "chest-1", "chest-2", "chest-3", "chest-4", "chest-5",
          "chest-6", "chest-7", "chest-8", "chest-9", "chest-10", "chest-11",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 7 dní",
        description: "Bílkoviny jsou základ pro růst prsních svalů",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "streak",
        title: "Udržuj streak 7 dní",
        description: "Pravidelnost je klíč k mohutnému hrudníku",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 5 dní",
        description: "Hydratace podporuje svalovou pumpu a regeneraci",
        target: 5,
        unit: "dní",
        xpReward: 50,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 5 nocí",
        description: "Hrudník potřebuje odpočinek mezi tréninky",
        target: 5,
        unit: "nocí",
        xpReward: 50,
      },
    ],
  },
  {
    id: "quest-shoulders",
    bodyPartId: "shoulders",
    title: "Mise: Titánová ramena",
    description:
      "Široká ramena dělají postavu. Zaměř se na všechny tři hlavy deltového svalu pomocí tlaků, upažování a face pullů.",
    difficulty: "Střední",
    xpReward: 450,
    durationDays: 21,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 8 tréninků ramen",
        description: "Odtrénuj 8 tréninků zaměřených na deltové svaly",
        target: 8,
        unit: "tréninků",
        xpReward: 120,
        linkedExerciseIds: [
          "shoulders-1", "shoulders-2", "shoulders-3", "shoulders-4",
          "shoulders-5", "shoulders-6", "shoulders-7", "shoulders-8",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 5 dní",
        description: "Proteiny podporují regeneraci rotátorové manžety",
        target: 5,
        unit: "dní",
        xpReward: 70,
      },
      {
        type: "streak",
        title: "Udržuj streak 6 dní",
        description: "Ramena vyžadují pravidelnou stimulaci",
        target: 6,
        unit: "dní",
        xpReward: 70,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 4 dny",
        description: "Hydratace chrání klouby ramenního pletence",
        target: 4,
        unit: "dní",
        xpReward: 40,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 5 nocí",
        description: "Kvalitní spánek urychlí regeneraci ramen",
        target: 5,
        unit: "nocí",
        xpReward: 50,
      },
    ],
  },
  {
    id: "quest-back",
    bodyPartId: "back",
    title: "Projekt: Neprůstřelná záda",
    description:
      "Silná záda jsou základ atletické postavy i zdravého držení těla. Shyby, přítahy a deadlifty tě posunou na nový level.",
    difficulty: "Pokročilý",
    xpReward: 550,
    durationDays: 28,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 10 tréninků zad",
        description: "Odtrénuj 10 tréninků zaměřených na zádové svaly",
        target: 10,
        unit: "tréninků",
        xpReward: 150,
        linkedExerciseIds: [
          "back-1", "back-2", "back-3", "back-4", "back-5",
          "back-6", "back-7", "back-8", "back-9",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 7 dní",
        description: "Velké svalové skupiny potřebují dostatek bílkovin",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "streak",
        title: "Udržuj streak 7 dní",
        description: "Konzistentní trénink = širší záda",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 6 dní",
        description: "Hydratace chrání meziobratlové plotýnky",
        target: 6,
        unit: "dní",
        xpReward: 60,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 6 nocí",
        description: "Záda regenerují pomaleji - dopřej jim spánek",
        target: 6,
        unit: "nocí",
        xpReward: 60,
      },
    ],
  },
  {
    id: "quest-legs",
    bodyPartId: "legs",
    title: "Výzva: Drtivé nohy",
    description:
      "Nohy jsou největší svalová skupina v těle. Dřepy, mrtvé tahy a výpady uvolní maximální hormonální odezvu a posunou tvou sílu všude jinde.",
    difficulty: "Pokročilý",
    xpReward: 600,
    durationDays: 28,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 12 tréninků nohou",
        description: "Odtrénuj 12 tréninků zaměřených na dolní polovinu těla",
        target: 12,
        unit: "tréninků",
        xpReward: 170,
        linkedExerciseIds: [
          "legs-1", "legs-2", "legs-3", "legs-4", "legs-5", "legs-6",
          "legs-7", "legs-8", "legs-9", "legs-10", "legs-11", "legs-12",
          "legs-13", "legs-14",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 8 dní",
        description: "Nohy spotřebují obrovské množství proteinů na regeneraci",
        target: 8,
        unit: "dní",
        xpReward: 90,
      },
      {
        type: "streak",
        title: "Udržuj streak 7 dní",
        description: "Nikdy nevynechávej leg day!",
        target: 7,
        unit: "dní",
        xpReward: 80,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 6 dní",
        description: "Hydratace snižuje riziko křečí po těžkém leg day",
        target: 6,
        unit: "dní",
        xpReward: 60,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 6 nocí",
        description: "Po leg day je regenerace absolutní priorita",
        target: 6,
        unit: "nocí",
        xpReward: 60,
      },
    ],
  },
  {
    id: "quest-sixpack",
    bodyPartId: "abs",
    title: "Tajná mise: Vysněný sixpack",
    description:
      "Sixpack se dělá v kuchyni a leští v posilovně. Tato pokročilá mise kombinuje intenzivní trénink břicha, přísnou stravu a disciplínu na maximum.",
    difficulty: "Pokročilý",
    xpReward: 700,
    durationDays: 30,
    objectives: [
      {
        type: "workout",
        title: "Dokonči 12 tréninků břicha",
        description: "Odtrénuj 12 intenzivních tréninků zaměřených na břišní svaly",
        target: 12,
        unit: "tréninků",
        xpReward: 180,
        linkedExerciseIds: [
          "abs-1", "abs-2", "abs-3", "abs-4", "abs-5",
          "abs-6", "abs-7", "abs-8", "abs-9",
        ],
      },
      {
        type: "nutrition",
        title: "Splň proteinový cíl 10 dní",
        description: "Udržuj vysoký příjem bílkovin pro maximální definici",
        target: 10,
        unit: "dní",
        xpReward: 120,
      },
      {
        type: "streak",
        title: "Udržuj streak 10 dní",
        description: "Disciplína je základ sixpacku - cvič 10 dní v kuse",
        target: 10,
        unit: "dní",
        xpReward: 120,
      },
      {
        type: "hydration",
        title: "Pij 3l vody denně po 7 dní",
        description: "Voda pomáhá spalovat tuk a odhalovat břišní svaly",
        target: 7,
        unit: "dní",
        xpReward: 70,
      },
      {
        type: "recovery",
        title: "Spi 7+ hodin 7 nocí",
        description: "Spánek reguluje hormony hladu a spalování tuků",
        target: 7,
        unit: "nocí",
        xpReward: 70,
      },
    ],
  },
];

export function getQuestTemplatesForWeakParts(): QuestTemplate[] {
  const weakParts = bodyPartsData.filter((p) => p.progress < 45);
  return questTemplates.filter((t) =>
    weakParts.some((p) => p.id === t.bodyPartId)
  );
}

// Returns all templates, weak-part quests first
export function getAllQuestTemplates(): QuestTemplate[] {
  const weakPartIds = new Set(
    bodyPartsData.filter((p) => p.progress < 45).map((p) => p.id)
  );
  return [...questTemplates].sort((a, b) => {
    const aWeak = weakPartIds.has(a.bodyPartId) ? 0 : 1;
    const bWeak = weakPartIds.has(b.bodyPartId) ? 0 : 1;
    return aWeak - bWeak;
  });
}

export function getQuestTemplateById(
  templateId: string
): QuestTemplate | undefined {
  return questTemplates.find((t) => t.id === templateId);
}

export function createQuestFromTemplate(template: QuestTemplate): Quest {
  const now = new Date();
  const deadline = new Date(now);
  deadline.setDate(deadline.getDate() + template.durationDays);

  return {
    id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    bodyPartId: template.bodyPartId,
    title: template.title,
    description: template.description,
    difficulty: template.difficulty,
    status: "active",
    createdAt: now.toISOString(),
    xpReward: template.xpReward,
    durationDays: template.durationDays,
    deadlineDate: deadline.toISOString(),
    objectives: template.objectives.map((obj, i) => ({
      ...obj,
      id: `obj-${Date.now()}-${i}`,
      current: 0,
      completed: false,
    })),
  };
}
