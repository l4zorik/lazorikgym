import { DrinkItem } from '@/types';

// ==================== Drinks Database ====================
// Kompletní databáze nápojů pro fitness aplikaci
// Nutriční hodnoty jsou uvedeny na jednu porci

export const drinksDatabase: DrinkItem[] = [
  // ==================== VODA ====================
  {
    id: 'drink-water-1',
    name: 'Čistá voda',
    category: 'water',
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
    emoji: '💧',
    benefits: [
      'Základní hydratace organismu',
      'Podpora metabolismu',
      'Zlepšení koncentrace',
      'Regulace tělesné teploty',
    ],
    servingSize: '250 ml',
    description:
      'Nejdůležitější nápoj pro správnou funkci těla. Doporučený denní příjem je 2–3 litry.',
  },
  {
    id: 'drink-water-2',
    name: 'Minerální voda',
    category: 'water',
    calories: 0,
    protein: 0,
    carbs: 0,
    sugar: 0,
    emoji: '🫧',
    benefits: [
      'Doplnění minerálních látek',
      'Podpora trávení',
      'Přirozený zdroj vápníku a hořčíku',
      'Hydratace s minerály',
    ],
    servingSize: '330 ml',
    description:
      'Přírodní minerální voda obohacená o minerály jako vápník, hořčík a sodík. Vhodná k doplnění elektrolytů.',
  },
  {
    id: 'drink-water-3',
    name: 'Kokosová voda',
    category: 'water',
    calories: 46,
    protein: 0.5,
    carbs: 11,
    sugar: 9,
    emoji: '🥥',
    benefits: [
      'Přirozený izotoniký nápoj',
      'Bohatá na draslík',
      'Rychlá rehydratace',
      'Nízký obsah kalorií oproti sportovním nápojům',
    ],
    servingSize: '250 ml',
    description:
      'Přírodní zdroj elektrolytů, zejména draslíku. Skvělá alternativa k umělým sportovním nápojům po tréninku.',
  },

  // ==================== SPORTOVNÍ NÁPOJE ====================
  {
    id: 'drink-sport-1',
    name: 'Iontový nápoj',
    category: 'sport',
    calories: 52,
    protein: 0,
    carbs: 13,
    sugar: 12,
    emoji: '⚡',
    benefits: [
      'Doplnění elektrolytů při tréninku',
      'Prevence křečí',
      'Rychlá absorpce tekutin',
      'Udržení sportovního výkonu',
    ],
    servingSize: '500 ml',
    description:
      'Izotonický nápoj s optimálním poměrem cukrů a minerálů pro efektivní hydrataci během intenzivního cvičení.',
  },
  {
    id: 'drink-sport-2',
    name: 'BCAA drink',
    category: 'sport',
    calories: 15,
    protein: 3.5,
    carbs: 0,
    sugar: 0,
    emoji: '💪',
    benefits: [
      'Podpora regenerace svalů',
      'Snížení svalového katabolismu',
      'Zlepšení výkonu při tréninku',
      'Podpora syntézy bílkovin',
    ],
    servingSize: '400 ml',
    description:
      'Nápoj s rozvětvenými aminokyselinami (leucin, izoleucin, valin). Ideální během nebo po silovém tréninku.',
  },
  {
    id: 'drink-sport-3',
    name: 'Pre-workout drink',
    category: 'sport',
    calories: 20,
    protein: 0,
    carbs: 4,
    sugar: 1,
    caffeine: 200,
    emoji: '🔥',
    benefits: [
      'Zvýšení energie a soustředění',
      'Lepší prokrvení svalů',
      'Oddálení únavy',
      'Zvýšení výkonu při tréninku',
    ],
    servingSize: '300 ml',
    description:
      'Předtréninkový nápoj s kofeinem, beta-alaninem a citrulinem. Užívá se 20–30 minut před tréninkem.',
  },
  {
    id: 'drink-sport-4',
    name: 'Elektrolytový nápoj',
    category: 'sport',
    calories: 10,
    protein: 0,
    carbs: 2,
    sugar: 1,
    emoji: '🧂',
    benefits: [
      'Doplnění sodíku a draslíku',
      'Prevence dehydratace',
      'Podpora nervosvalových funkcí',
      'Vhodný při intenzivním pocení',
    ],
    servingSize: '500 ml',
    description:
      'Nízkokalorický nápoj zaměřený na doplnění klíčových elektrolytů ztracených potem. Bez zbytečných cukrů.',
  },

  // ==================== PROTEINOVÉ NÁPOJE ====================
  {
    id: 'drink-protein-1',
    name: 'Proteinový shake',
    category: 'protein_drink',
    calories: 130,
    protein: 25,
    carbs: 3,
    sugar: 2,
    emoji: '🥛',
    benefits: [
      'Rychlý přísun bílkovin po tréninku',
      'Podpora růstu svalové hmoty',
      'Snadné doplnění denního příjmu bílkovin',
      'Rychlá příprava',
    ],
    servingSize: '300 ml',
    description:
      'Klasický whey proteinový shake smíchaný s vodou nebo mlékem. Základ potréninkovej výživy.',
  },
  {
    id: 'drink-protein-2',
    name: 'Kaseinový shake',
    category: 'protein_drink',
    calories: 140,
    protein: 24,
    carbs: 4,
    sugar: 3,
    emoji: '🌙',
    benefits: [
      'Pomalé uvolňování aminokyselin',
      'Ideální před spaním',
      'Prevence nočního katabolismu',
      'Dlouhodobý pocit sytosti',
    ],
    servingSize: '300 ml',
    description:
      'Kaseinový protein se vstřebává pomalu (6–8 hodin). Ideální jako poslední jídlo dne pro ochranu svalové hmoty.',
  },
  {
    id: 'drink-protein-3',
    name: 'Proteinové mléko',
    category: 'protein_drink',
    calories: 170,
    protein: 30,
    carbs: 12,
    sugar: 10,
    emoji: '🧴',
    benefits: [
      'Hotový proteinový nápoj k okamžité konzumaci',
      'Vysoký obsah bílkovin',
      'Přirozený zdroj vápníku',
      'Praktické balení na cesty',
    ],
    servingSize: '330 ml',
    description:
      'Hotové proteinové mléko (např. Milko Protein). Praktické řešení pro rychlý příjem bílkovin kdekoli.',
  },
  {
    id: 'drink-protein-4',
    name: 'Proteinový smoothie',
    category: 'protein_drink',
    calories: 220,
    protein: 22,
    carbs: 25,
    sugar: 18,
    emoji: '🫐',
    benefits: [
      'Kombinace bílkovin a sacharidů',
      'Přirozené vitamíny z ovoce',
      'Vhodný jako náhrada svačiny',
      'Skvělá chuť a výživová hodnota',
    ],
    servingSize: '400 ml',
    description:
      'Smoothie z ovoce (banán, borůvky) s přidaným proteinem a jogurtem. Plnohodnotný potréninkovej snack.',
  },

  // ==================== ČAJE ====================
  {
    id: 'drink-tea-1',
    name: 'Zelený čaj',
    category: 'tea',
    calories: 2,
    protein: 0,
    carbs: 0.5,
    sugar: 0,
    caffeine: 35,
    emoji: '🍵',
    benefits: [
      'Bohatý na antioxidanty (EGCG)',
      'Mírná podpora metabolismu',
      'Zlepšení soustředění',
      'Ochrana buněk před oxidativním stresem',
    ],
    servingSize: '250 ml',
    description:
      'Tradiční nápoj s vysokým obsahem katechinů. Podporuje spalování tuků a má protizánětlivé účinky.',
  },
  {
    id: 'drink-tea-2',
    name: 'Černý čaj',
    category: 'tea',
    calories: 2,
    protein: 0,
    carbs: 0.5,
    sugar: 0,
    caffeine: 50,
    emoji: '🫖',
    benefits: [
      'Střední obsah kofeinu pro energii',
      'Podpora kardiovaskulárního zdraví',
      'Antioxidační účinky',
      'Zlepšení střevní mikroflóry',
    ],
    servingSize: '250 ml',
    description:
      'Klasický černý čaj s vyšším obsahem kofeinu než zelený. Dobrá ranní alternativa k silné kávě.',
  },
  {
    id: 'drink-tea-3',
    name: 'Yerba Maté',
    category: 'tea',
    calories: 5,
    protein: 0,
    carbs: 1,
    sugar: 0,
    caffeine: 85,
    emoji: '🧉',
    benefits: [
      'Dlouhotrvající energie bez nervozity',
      'Bohatý zdroj antioxidantů',
      'Podpora spalování tuků',
      'Zlepšení mentální ostrosti',
    ],
    servingSize: '250 ml',
    description:
      'Jihoamerický nápoj s unikátní kombinací kofeinu, theobrominu a theaninu. Poskytuje stabilní energii.',
  },
  {
    id: 'drink-tea-4',
    name: 'Bylinný čaj',
    category: 'tea',
    calories: 1,
    protein: 0,
    carbs: 0.3,
    sugar: 0,
    emoji: '🌿',
    benefits: [
      'Bez kofeinu – vhodný i večer',
      'Podpora relaxace a spánku',
      'Přirozené protizánětlivé účinky',
      'Podpora trávení (heřmánek, máta)',
    ],
    servingSize: '250 ml',
    description:
      'Bylinné čaje (heřmánek, máta, meduňka) bez kofeinu. Ideální na uklidnění po náročném tréninku.',
  },

  // ==================== KÁVA ====================
  {
    id: 'drink-coffee-1',
    name: 'Espresso',
    category: 'coffee',
    calories: 3,
    protein: 0.1,
    carbs: 0.5,
    sugar: 0,
    caffeine: 63,
    emoji: '☕',
    benefits: [
      'Rychlý nástup energie',
      'Podpora soustředění',
      'Zlepšení sportovního výkonu',
      'Minimální kalorický obsah',
    ],
    servingSize: '30 ml',
    description:
      'Koncentrovaný kávový nápoj. Perfektní zdroj kofeinu před tréninkem bez zbytečných kalorií.',
  },
  {
    id: 'drink-coffee-2',
    name: 'Americano',
    category: 'coffee',
    calories: 5,
    protein: 0.2,
    carbs: 0.8,
    sugar: 0,
    caffeine: 63,
    emoji: '🫗',
    benefits: [
      'Nízkokalorický kofeinový nápoj',
      'Delší požitek z kávy',
      'Podpora metabolismu',
      'Hydratace s kofeinem',
    ],
    servingSize: '200 ml',
    description:
      'Espresso zalité horkou vodou. Mírnější chuť než espresso, ale stejný obsah kofeinu.',
  },
  {
    id: 'drink-coffee-3',
    name: 'Cold brew',
    category: 'coffee',
    calories: 5,
    protein: 0.2,
    carbs: 0.8,
    sugar: 0,
    caffeine: 100,
    emoji: '🧊',
    benefits: [
      'Vyšší obsah kofeinu',
      'Nižší kyselost – šetrnější k žaludku',
      'Osvěžující v létě',
      'Hladká chuť bez hořkosti',
    ],
    servingSize: '250 ml',
    description:
      'Káva louhovaná za studena 12–24 hodin. Méně kyselá a hořká, s vyšším obsahem kofeinu.',
  },
  {
    id: 'drink-coffee-4',
    name: 'Káva s mlékem',
    category: 'coffee',
    calories: 60,
    protein: 3,
    carbs: 5,
    sugar: 5,
    caffeine: 63,
    emoji: '🥛',
    benefits: [
      'Kombinace kofeinu a bílkovin',
      'Přirozený zdroj vápníku z mléka',
      'Jemnější chuť',
      'Pomalejší vstřebávání kofeinu',
    ],
    servingSize: '200 ml',
    description:
      'Espresso s plnotučným nebo polotučným mlékem (caffè latte). Vyvážená kombinace energie a chuti.',
  },

  // ==================== DŽUSY A SMOOTHIE ====================
  {
    id: 'drink-juice-1',
    name: 'Čerstvý pomerančový džus',
    category: 'juice',
    calories: 112,
    protein: 1.5,
    carbs: 26,
    sugar: 21,
    emoji: '🍊',
    benefits: [
      'Vysoký obsah vitamínu C',
      'Podpora imunitního systému',
      'Přírodní zdroj energie',
      'Obsahuje kyselinu listovou',
    ],
    servingSize: '250 ml',
    description:
      'Čerstvě vylisovaný pomerančový džus. Skvělý zdroj vitamínů, ale pozor na vysoký obsah cukru.',
  },
  {
    id: 'drink-juice-2',
    name: 'Řepný džus',
    category: 'juice',
    calories: 85,
    protein: 1.2,
    carbs: 19,
    sugar: 15,
    emoji: '🫙',
    benefits: [
      'Zvyšuje produkci oxidu dusnatého',
      'Zlepšuje vytrvalost a výkon',
      'Snižuje krevní tlak',
      'Bohatý na dusičnany a antioxidanty',
    ],
    servingSize: '250 ml',
    description:
      'Přírodní výkonnostní booster. Studie ukazují zlepšení sportovního výkonu o 1–3 % díky dusičnanům.',
  },
  {
    id: 'drink-juice-3',
    name: 'Zelený smoothie',
    category: 'juice',
    calories: 95,
    protein: 2.5,
    carbs: 20,
    sugar: 14,
    emoji: '🥬',
    benefits: [
      'Vysoký obsah vlákniny',
      'Bohatý na vitamíny a minerály',
      'Podpora detoxikace',
      'Alkalické prostředí v těle',
    ],
    servingSize: '300 ml',
    description:
      'Mix špenátu, celeru, jablka a zázvoru. Výživově nabitý nápoj pro doplnění mikronutrientů.',
  },

  // ==================== OSTATNÍ ====================
  {
    id: 'drink-other-1',
    name: 'Kombucha',
    category: 'other',
    calories: 30,
    protein: 0,
    carbs: 7,
    sugar: 5,
    caffeine: 15,
    emoji: '🍶',
    benefits: [
      'Probiotika pro zdraví střev',
      'Podpora trávení',
      'Antioxidační vlastnosti',
      'Přirozená detoxikace organismu',
    ],
    servingSize: '250 ml',
    description:
      'Fermentovaný čajový nápoj s živými kulturami. Podporuje zdravou střevní mikroflóru a imunitu.',
  },
  {
    id: 'drink-other-2',
    name: 'Kefírové mléko',
    category: 'other',
    calories: 65,
    protein: 3.5,
    carbs: 4,
    sugar: 4,
    emoji: '🥛',
    benefits: [
      'Bohatý zdroj probiotik',
      'Přirozený zdroj bílkovin a vápníku',
      'Snazší trávení než běžné mléko',
      'Podpora imunitního systému',
    ],
    servingSize: '250 ml',
    description:
      'Fermentovaný mléčný nápoj s vysokým obsahem prospěšných bakterií. Vhodný i pro osoby s mírnou intolerancí laktózy.',
  },
  {
    id: 'drink-other-3',
    name: 'Ovesné mléko',
    category: 'other',
    calories: 48,
    protein: 1,
    carbs: 9,
    sugar: 4,
    emoji: '🌾',
    benefits: [
      'Rostlinná alternativa mléka',
      'Obsahuje beta-glukan pro zdraví srdce',
      'Vhodné pro laktózovou intoleranci',
      'Nízký obsah tuků',
    ],
    servingSize: '250 ml',
    description:
      'Populární rostlinný nápoj z ovsa. Krémová textura, vhodný do kávy, smoothie i cereálií.',
  },
];

// ==================== Helper Functions ====================

/**
 * Vrátí nápoje podle kategorie.
 */
export function getDrinksByCategory(category: DrinkItem['category']): DrinkItem[] {
  return drinksDatabase.filter(d => d.category === category);
}

/**
 * Najde nápoj podle ID.
 */
export function getDrinkById(id: string): DrinkItem | undefined {
  return drinksDatabase.find(d => d.id === id);
}

/**
 * Vrátí nízkokalorické nápoje (výchozí limit je 10 kcal).
 */
export function getLowCalorieDrinks(maxCalories = 10): DrinkItem[] {
  return drinksDatabase.filter(d => d.calories <= maxCalories);
}

/**
 * Vrátí nápoje obsahující kofein.
 */
export function getCaffeinatedDrinks(): DrinkItem[] {
  return drinksDatabase.filter(d => d.caffeine && d.caffeine > 0);
}

// ==================== Category Metadata ====================

export const drinkCategories = [
  { id: 'water', name: 'Voda', emoji: '💧' },
  { id: 'sport', name: 'Sportovní nápoje', emoji: '⚡' },
  { id: 'protein_drink', name: 'Proteinové nápoje', emoji: '🥛' },
  { id: 'tea', name: 'Čaje', emoji: '🍵' },
  { id: 'coffee', name: 'Káva', emoji: '☕' },
  { id: 'juice', name: 'Džusy a smoothie', emoji: '🧃' },
  { id: 'other', name: 'Ostatní', emoji: '🥤' },
] as const;
