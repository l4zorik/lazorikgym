import { BodyPart } from "@/types";

// Template responses for the AI coach
const greetings = [
  "Ahoj! Jsem tvůj AI trenér. Jak ti dnes mohu pomoct?",
  "Zdravím tě! Připraven na trénink? Ptej se na cokoliv.",
  "Čau! Co tě zajímá ohledně tréninku nebo výživy?",
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

// Keywords to match user queries
const keywordMap: Record<string, string[]> = {
  weak: ["slabé", "slabý", "nejslabší", "zlepšit", "zaměřit"],
  exercise: ["cvik", "cvičení", "cviky", "trénink", "jak trénovat"],
  motivation: ["motivace", "nevzdávám", "těžké", "vzdát", "motivuj"],
  nutrition: ["jídlo", "strava", "bílkoviny", "protein", "jíst", "výživa", "kalorie"],
  rest: ["odpočinek", "regenerace", "spánek", "únava", "přetrénování"],
  greeting: ["ahoj", "čau", "zdravím", "dobrý den", "hey", "hi"],
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

export function generateAIResponse(
  userMessage: string,
  weakParts: BodyPart[]
): string {
  const category = matchKeywords(userMessage);
  const weakPartNames = weakParts.map((p) => p.name).join(", ");

  switch (category) {
    case "greeting":
      return getRandomItem(greetings);

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

    default:
      // Generic helpful response
      const defaultResponses = [
        `Můžu ti pomoct s plánem tréninku, výživou nebo motivací. ${
          weakParts.length > 0
            ? `Momentálně bych doporučil zaměřit se na ${weakPartNames}.`
            : ""
        }`,
        "Zeptej se mě na konkrétní cviky, výživu, nebo jak zlepšit slabé partie. Jsem tu pro tebe!",
        "Potřebuješ radu ohledně tréninku? Ptej se na cviky, stravu, nebo regeneraci.",
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

  recommendations.push("Nezapomeň na protažení po tréninku");
  recommendations.push("Pij dostatek vody během dne");

  return recommendations.slice(0, 3);
}
