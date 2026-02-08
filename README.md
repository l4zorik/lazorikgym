<div align="center">

# LazorikGym

### Tvoje cesta k lepsimu ja

Komplexni fitness platforma s AI analyzou, interaktivni mapou tela, treninkovymi plany a sledovanim pokroku.

**Next.js 16** | **React 19** | **Tailwind CSS 4** | **TypeScript**

[Zacit trenovat](#spusteni) · [Funkce](#funkce) · [Technologie](#technologie)

</div>

---

## O projektu

LazorikGym je moderna webova aplikace pro fitness nadšence, ktera kombinuje personalizovane treninkove plany s AI analyzou slabych parti. Aplikace nabizi kompletni nastroje pro planovani treninku, sledovani pokroku a spravu vyzivovych planu — vse v elegantnim dark-mode rozhrani.

## Funkce

### Interaktivni mapa tela
- SVG vizualizace svalovych skupin s barevnym kodovanim podle pokroku
- Automaticka identifikace slabych parti (< 45%)
- Kliknutim na svalovou skupinu zobrazis detailni plan cviku

### Treninkovy kalendar
- Mesicni a tydenni pohled s plnou navigaci
- Propojeni s treninkovymi plany — automaticke naplneni tydne z aktivniho planu
- Vizualni odliseni planovych vs. vlastnich treninku (fialovy vs. oranzovy border)
- Sledovani streak a statistik

### Treninkove plany
- Predpripravene plany (Full Body, Push/Pull/Legs, Upper/Lower, Bro Split)
- Tydenni rozvrh s detaily pro kazdy den
- Sledovani dokonceni — zeleny checkmark na hotovych dnech
- Progress bar s procentualnim ukazatelem

### AI Asistent
- Chatbot pro fitness dotazy
- Personalizovana doporuceni na zaklade profilu
- Generovani treninkovych planu

### Jidelnicky
- Plany pro nabirani, redukci i udrzeni
- Detailni rozpis makrozivrin (protein, sacharidy, tuky)
- Snidane, obed, vecere a svaciny

### Dalsi sekce
- **Akademie** — clanky a videa o treninkove technice
- **Achievements** — system odmen za dosazene cile
- **Challenges** — tydenni a mesicni vyzvy
- **Sin slavy** — inspirace od ostatnich clenu
- **Pokrok** — grafy a statistiky v case
- **Suplementy** — pruvodce doplnky vyzivy

## Technologie

| Kategorie | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router, React Compiler, Turbopack) |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Komponenty | Radix UI (Dialog, Tabs, Tooltip, Progress) |
| Stav | localStorage hooks s hydration safety |
| Grafy | Recharts |
| Ikony | Lucide React |
| Jazyk | TypeScript 5, cestina (cs) |
| PWA | Service Worker, Web App Manifest |

## Architektura

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Hlavni dashboard + podstranky
│   │   ├── calendar/       # Treninkovy kalendar
│   │   ├── treninkove-plany/
│   │   ├── jidelnicky/
│   │   ├── akademie/
│   │   ├── achievements/
│   │   ├── challenges/
│   │   ├── history/
│   │   ├── profile/
│   │   ├── progress/
│   │   └── supplements/
│   ├── exercises/          # Katalog cviku
│   ├── workout/new/        # Novy trenink
│   └── wizard/             # Onboarding wizard
├── components/             # React komponenty
│   ├── ui/                 # Button, Card, Input, Modal, Progress, Tabs
│   ├── BodyMap.tsx         # Interaktivni SVG mapa tela
│   ├── MobileNav.tsx       # Mobilni navigace
│   └── ...
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts  # localStorage s hydration safety
│   ├── usePlan.ts          # Sprava aktivnich planu
│   └── useAIChat.ts        # AI chatbot logika
├── lib/                    # Data, utility, AI responses
│   ├── data.ts             # Vsechna staticka data (cviky, plany, jidelnicky)
│   ├── academyData.ts      # Clanky a videa
│   └── achievements.ts     # System odmen
└── types/                  # TypeScript typy
    └── index.ts            # Sdilene interface
```

## Spusteni

```bash
# Klonovani repozitare
git clone https://github.com/l4zorik/lazorikgym.git
cd lazorikgym

# Instalace zavislosti
npm install

# Spusteni dev serveru
npm run dev
```

Aplikace bezi na [http://localhost:3000](http://localhost:3000).

## Skripty

| Prikaz | Popis |
|--------|-------|
| `npm run dev` | Spusti vyvojovy server (Turbopack) |
| `npm run build` | Vytvori produkci build |
| `npm run start` | Spusti produkcni server |
| `npm run lint` | Spusti ESLint |

---

<div align="center">

Vytvoreno s Next.js, React a Tailwind CSS

</div>
