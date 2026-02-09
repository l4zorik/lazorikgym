export interface MotivationalQuote {
  text: string;
  author: string;
  category: 'motivation' | 'discipline' | 'strength' | 'mindset' | 'health' | 'persistence';
}

export const motivationalQuotes: MotivationalQuote[] = [
  // Motivace
  { text: "Tvé tělo dokáže téměř všechno. Je to tvá mysl, kterou musíš přesvědčit.", author: "Anonymous", category: "motivation" },
  { text: "Nemusíš být skvělý, abys začal. Ale musíš začít, abys byl skvělý.", author: "Zig Ziglar", category: "motivation" },
  { text: "Bolest je dočasná. Vzdát se je navždy.", author: "Lance Armstrong", category: "motivation" },
  { text: "Každý trénink, který vynecháš, je trénink, který ti nikdy nevrátíš.", author: "Anonymous", category: "motivation" },
  { text: "Nejlepší projekt, na kterém můžeš pracovat, jsi ty sám.", author: "Anonymous", category: "motivation" },
  { text: "Síla nevychází z fyzických schopností. Vychází z nezlomné vůle.", author: "Mahatma Gandhi", category: "motivation" },
  { text: "Dneska děláš to, co ostatní nechtějí. Zítra budeš tam, kde ostatní nemůžou.", author: "Anonymous", category: "motivation" },

  // Disciplína
  { text: "Disciplína je most mezi cíli a jejich dosažením.", author: "Jim Rohn", category: "discipline" },
  { text: "Motivace tě nastartuje. Návyk tě udrží.", author: "Jim Ryun", category: "discipline" },
  { text: "Nespoléhej na motivaci. Spoléhej na disciplínu.", author: "Jocko Willink", category: "discipline" },
  { text: "Úspěch není náhoda. Je to tvrdá práce, vytrvalost a láska k tomu, co děláš.", author: "Pelé", category: "discipline" },
  { text: "Jediný špatný trénink je ten, který se nekonal.", author: "Anonymous", category: "discipline" },
  { text: "Vítěz není ten, kdo nikdy nepadne, ale ten, kdo pokaždé vstane.", author: "Anonymous", category: "discipline" },

  // Síla
  { text: "Čím těžší boj, tím slavnější vítězství.", author: "Anonymous", category: "strength" },
  { text: "Železo neodpouští lenost.", author: "Henry Rollins", category: "strength" },
  { text: "Nejsi slabý. Jsi na začátku.", author: "Anonymous", category: "strength" },
  { text: "Síla neroste z pohodlí. Roste z překonávání překážek.", author: "Arnold Schwarzenegger", category: "strength" },
  { text: "Zvedni víc, než ti říkali, že zvládneš.", author: "Anonymous", category: "strength" },
  { text: "Silní lidé se netvoří v lehkých časech.", author: "Anonymous", category: "strength" },

  // Myšlení
  { text: "Mysl je všechno. Čemu věříš, tím se stáváš.", author: "Buddha", category: "mindset" },
  { text: "Jsi o jednu rozhodnutí od úplně jiného života.", author: "Anonymous", category: "mindset" },
  { text: "Nesrovnávej svůj začátek s něčím koncem.", author: "Anonymous", category: "mindset" },
  { text: "Změna začíná na konci tvé komfortní zóny.", author: "Roy T. Bennett", category: "mindset" },
  { text: "Pokrok, ne dokonalost.", author: "Anonymous", category: "mindset" },
  { text: "Kdo chce, hledá způsob. Kdo nechce, hledá důvod.", author: "Anonymous", category: "mindset" },

  // Zdraví
  { text: "Postarej se o své tělo. Je to jediné místo, kde musíš žít.", author: "Jim Rohn", category: "health" },
  { text: "Fitness není o tom být lepší než někdo jiný. Je to o tom být lepší, než jsi byl včera.", author: "Anonymous", category: "health" },
  { text: "Tvé zdraví je investice, ne výdaj.", author: "Anonymous", category: "health" },
  { text: "Jez jako bys miloval sám sebe. Hýbej se, jako bys oslavoval, co tvé tělo umí.", author: "Anonymous", category: "health" },
  { text: "Nejlepší lék je pohyb.", author: "Anonymous", category: "health" },

  // Vytrvalost
  { text: "Není důležité, jak pomalu jdeš, pokud nezastavíš.", author: "Konfucius", category: "persistence" },
  { text: "Každý mistr byl jednou katastrofa.", author: "Anonymous", category: "persistence" },
  { text: "Vzdát se je jediný jistý způsob, jak prohrát.", author: "Anonymous", category: "persistence" },
  { text: "Rok odteď budeš rád, že jsi začal dnes.", author: "Karen Lamb", category: "persistence" },
  { text: "Nemodli se za lehký život. Modli se za sílu vydržet ten těžký.", author: "Bruce Lee", category: "persistence" },
  { text: "Malý pokrok je pořád pokrok.", author: "Anonymous", category: "persistence" },
  { text: "Maraton se běží po krocích, ne po kilometrech.", author: "Anonymous", category: "persistence" },
];

const categoryLabels: Record<MotivationalQuote['category'], string> = {
  motivation: "Motivace",
  discipline: "Disciplína",
  strength: "Síla",
  mindset: "Myšlení",
  health: "Zdraví",
  persistence: "Vytrvalost",
};

export function getCategoryLabel(category: MotivationalQuote['category']): string {
  return categoryLabels[category];
}

export function getQuoteOfTheDay(): MotivationalQuote {
  // Deterministic based on date so it stays the same all day
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
}

export function getRandomQuote(category?: MotivationalQuote['category']): MotivationalQuote {
  const pool = category
    ? motivationalQuotes.filter((q) => q.category === category)
    : motivationalQuotes;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuotesByCategory(category: MotivationalQuote['category']): MotivationalQuote[] {
  return motivationalQuotes.filter((q) => q.category === category);
}

export function getAllCategories(): MotivationalQuote['category'][] {
  return ['motivation', 'discipline', 'strength', 'mindset', 'health', 'persistence'];
}
