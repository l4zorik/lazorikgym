import { Dumbbell, Target, Pill, Users, BookOpen, Crown } from "lucide-react";

export interface AcademyArticle {
  id: string;
  title: string;
  category: "anatomy" | "supplements" | "exercises" | "plans" | "legends";
  description: string;
  content: string;
  image?: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

export const academyCategories = [
  { id: "anatomy", name: "Anatomie", icon: Target, color: "#ff6b35", description: "Poznej své tělo a jak svaly fungují." },
  { id: "supplements", name: "Suplementace", icon: Pill, color: "#3b82f6", description: "Průvodce doplňky stravy pro maximální výkon." },
  { id: "exercises", name: "Technika cviků", icon: Dumbbell, color: "#10b981", description: "Správné provedení pro bezpečný progres." },
  { id: "plans", name: "Metodika tréninku", icon: BookOpen, color: "#8b5cf6", description: "Jak sestavit plán, který funguje." },
  { id: "legends", name: "Legendy", icon: Crown, color: "#f59e0b", description: "Příběhy ikon, které psaly historii." },
];

export const academyArticles: AcademyArticle[] = [
  // ANATOMY
  {
    id: "anatomy-chest",
    title: "Anatomie prsních svalů",
    category: "anatomy",
    description: "Hluboký pohled na velký a malý prsní sval a jak je izolovat.",
    readTime: "5 min",
    difficulty: "Beginner",
    tags: ["Prsa", "Svaly", "Základy"],
    content: "Velký prsní sval (musculus pectoralis major) je vějířovitý sval, který tvoří většinu hrudníku. Dělí se na klavikulární (horní), sternokostální (střední) a abdominální (dolní) část..."
  },
  
  // SUPPLEMENTS
  {
    id: "supp-creatine",
    title: "Kreatin: Král suplementů",
    category: "supplements",
    description: "Vše, co potřebuješ vědět o nejvíce prozkoumaném doplňku stravy.",
    readTime: "7 min",
    difficulty: "Beginner",
    tags: ["Kreatin", "Síla", "Věda"],
    content: "Kreatin monohydrát je nejúčinnější legální doplněk pro zvýšení síly a výbušnosti. Funguje na principu doplňování zásob ATP v buňkách..."
  },
  {
    id: "supp-protein",
    title: "Průvodce proteiny",
    category: "supplements",
    description: "Syrovátka, kasein nebo rostlinné? Vyber si ten správný pro své cíle.",
    readTime: "6 min",
    difficulty: "Beginner",
    tags: ["Bílkoviny", "Regenerace", "Výživa"],
    content: "Protein není náhrada jídla, ale praktický pomocník pro doplnění denního příjmu bílkovin. Syrovátkový koncentrát je zlatý standard..."
  },

  // LEGENDS
  {
    id: "legend-arnold",
    title: "Arnold Schwarzenegger",
    category: "legends",
    description: "Příběh sedminásobného Mr. Olympia, který změnil pohled na kulturistiku.",
    readTime: "10 min",
    difficulty: "Beginner",
    tags: ["Golden Era", "Kulturistika", "Motivace"],
    content: "Arnold se narodil v Rakousku a díky své neuvěřitelné vůli se stal největší ikonou sportu. Jeho přístup k tréninku byl založen na 'propojení mysli a svalu'..."
  },
  {
    id: "legend-ronnie",
    title: "Ronnie Coleman",
    category: "legends",
    description: "Osmkrát na vrcholu. Příběh neuvěřitelné síly a 'Lightweight Baby!'.",
    readTime: "8 min",
    difficulty: "Intermediate",
    tags: ["Hardcore", "Mr. Olympia", "Síla"],
    content: "Ronnie Coleman zavedl standardy, které se zdály být nemožné. Kombinoval powerlifterské váhy s kulturistickým objemem..."
  },

  // PLANS
  {
    id: "plans-ppl",
    title: "Push, Pull, Legs rozdělení",
    category: "plans",
    description: "Proč je PPL považováno za jeden z nejlepších systémů pro naturály.",
    readTime: "8 min",
    difficulty: "Intermediate",
    tags: ["Metodika", "Hypertrofie", "Split"],
    content: "Systém PPL rozděluje tělo podle pohybových vzorců. To umožňuje procvičit svaly častěji při zachování dostatku času na regeneraci..."
  },
  {
    id: "plans-fullbody",
    title: "Fullbody vs Split",
    category: "plans",
    description: "Souboj dvou přístupů. Který z nich přinese výsledky právě tobě?",
    readTime: "6 min",
    difficulty: "Beginner",
    tags: ["Základy", "Trénink", "Srovnání"],
    content: "Fullbody je ideální pro začátečníky díky časté stimulaci proteinové syntézy. Splity naopak umožňují vyšší objem na konkrétní partii..."
  }
];
