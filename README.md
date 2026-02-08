<div align="center">

# LazorikGym

### Tvoje cesta k lepsimu ja

Komplexni fitness platforma s AI analyzou, interaktivni mapou tela, treninkovymi plany, kompletnim nutrient trackingem a sledovanim pokroku.

**Next.js 16** | **React 19** | **Tailwind CSS 4** | **TypeScript 5** | **Framer Motion**

~18 500 radku kodu | 66 TypeScript souboru | 19 stranek

[Zacit trenovat](#spusteni) · [Funkce](#funkce) · [Technologie](#technologie) · [Architektura](#architektura)

</div>

---

## O projektu

LazorikGym je moderna webova aplikace pro fitness nadsence, ktera kombinuje personalizovane treninkove plany s AI analyzou slabych parti. Aplikace nabizi kompletni nastroje pro planovani treninku, sledovani pokroku, nutrient tracking se 7 makronutrienty a spravu vyzivovych planu — vse v elegantnim dark-mode rozhrani.

## Funkce

### Interaktivni mapa tela
- SVG vizualizace svalovych skupin s barevnym kodovanim podle pokroku
- Automaticka identifikace slabych parti (< 45%)
- Kliknutim na svalovou skupinu zobrazis detailni plan cviku

### Dashboard s dennmi prehledem
- Goal-aware uvitaci sekce prisposobena uzivatelskymu cili (hubnovani, nabirani, sila)
- AI Insight banner s personalizovanymi radami
- Today Overview — kalorie, voda, spanek, nalada na jeden pohled
- Denni treninky s 1-click startem primo z dashboardu
- Mini kalendar s tydennim prehledem

### Kompletni nutrient tracking
- **7 sledovanych nutrientu:** kalorie, protein, sacharidy, tuky, vlaknina, cukr, sodik
- Animovane progress bary s vahovymi udaji (napr. "125g / 160g")
- Cervene zvyrazneni pri prekroceni cile
- Konfigurovatelne denni cile pres NutrientGoalsModal
- Rozbalovaci seznam jidel s moznosti mazani
- FoodLogModal s plnymi makry + dalsi nutrienty (vlaknina, cukr, sodik)

### Sledovani denniho rezimu
- **Voda** — SVG kruhovy progress, rychle pridani (250/500/750 ml)
- **Spanek** — hodiny + kvalita (spatna/uchazejici/dobra/vyborna)
- **Nalada & energie** — 5-stupnova skala s emoji

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

### Goal system
- Pridani cilu pro konkretni svalove partie
- Sledovani progresu s animovanymi progress bary
- Automaticky generovane treninky zamerene na cilove partie
- Hodnoceni a poznamky k cilum

### AI Asistent
- Chatbot pro fitness dotazy (cestina)
- Personalizovana doporuceni na zaklade profilu a slabych parti
- Generovani treninkovych planu
- Analyza historie treninku

### Jidelnicky
- Plany pro nabirani, redukci i udrzeni
- Detailni rozpis makrozivrin (protein, sacharidy, tuky)
- Snidane, obed, vecere a svaciny

### Dalsi moduly
- **Akademie** — clanky a videa o treninkove technice
- **Achievements** — system odmen za dosazene cile
- **Challenges** — tydenni a mesicni vyzvy s bodovanim
- **Sin slavy** — inspirace od ostatnich clenu
- **Pokrok** — grafy hmotnosti, mereni, progress fotky
- **Suplementy** — pruvodce doplnky vyzivy a sledovani davkovani
- **Profil** — sprava uzivatelskeho profilu a cilu

## Technologie

| Kategorie | Technologie |
|-----------|-------------|
| Framework | Next.js 16.1.6 (App Router, React Compiler, Turbopack) |
| UI | React 19.2.3, Tailwind CSS 4, Framer Motion 12 |
| Komponenty | Radix UI (Dialog, Tabs, Tooltip, Progress, Slot) |
| Stav | Custom `useLocalStorage` hook s SSR-safe hydration |
| Grafy | Recharts 3.7 |
| Ikony | Lucide React 0.563 |
| Utility | clsx, tailwind-merge, class-variance-authority |
| Jazyk | TypeScript 5, cestina (cs-CZ) |

## Architektura

```
src/
├── app/                         # Next.js App Router (19 stranek)
│   ├── page.tsx                 # Landing page
│   ├── login/ & register/       # Autentizace
│   ├── wizard/                  # Onboarding wizard
│   ├── exercises/               # Katalog cviku
│   ├── workout/new/             # Aktivni trenink
│   └── dashboard/               # Hlavni dashboard + 12 podstranek
│       ├── page.tsx             # Dashboard (~1170 radku)
│       ├── calendar/            # Treninkovy kalendar
│       ├── treninkove-plany/    # Sprava planu
│       ├── jidelnicky/          # Jidelnicky
│       ├── akademie/            # Vzdelavaci obsah
│       ├── achievements/        # Odznaky
│       ├── challenges/          # Vyzvy
│       ├── history/             # Historie treninku
│       ├── profile/             # Uzivatelsky profil
│       ├── progress/            # Grafy a mereni
│       ├── sin-slavy/           # Hall of Fame
│       ├── supplements/         # Suplementy
│       └── tipy/                # Treninkove tipy
│
├── components/                  # 24+ React komponent
│   ├── dashboard/               # 12 dashboard komponent
│   │   ├── NutritionPanel.tsx   # 7 nutrient progress baru
│   │   ├── NutrientGoalsModal.tsx
│   │   ├── FoodLogModal.tsx     # Logovani jidla (6 nutrientu)
│   │   ├── DailyTrackerSection.tsx
│   │   ├── GoalsSection.tsx     # Cilovy system
│   │   ├── TodayWorkouts.tsx    # Denni treninky
│   │   ├── TodayOverview.tsx    # Prehledove statistiky
│   │   ├── WorkoutPlannerModal.tsx
│   │   ├── EquipmentModal.tsx
│   │   ├── AddGoalModal.tsx
│   │   ├── QuickPlannerButton.tsx
│   │   └── WorkoutHoverPreview.tsx
│   ├── ui/                      # Znovupouzitelne UI (Button, Card, Input...)
│   ├── BodyMap.tsx              # Interaktivni SVG mapa tela
│   ├── BodyMapModal.tsx         # Detail svalove skupiny
│   ├── BodyPartGrid.tsx         # Mrizka parti
│   ├── AIAssistantCard.tsx      # AI chatbot widget
│   └── MobileNav.tsx            # Mobilni navigace
│
├── hooks/                       # 5 custom React hooku
│   ├── useLocalStorage.ts       # SSR-safe localStorage s hydration
│   ├── useDailyTracker.ts       # Jidlo, voda, spanek, nalada, nutrienty
│   ├── usePlan.ts               # Aktivni treninkove/jiidelni plany
│   ├── useGoals.ts              # System cilu
│   └── useAIChat.ts             # AI chatbot logika
│
├── lib/                         # 9 knihovnich souboru
│   ├── data.ts                  # Staticka data (cviky, plany, partie)
│   ├── nutrientConfig.ts        # 7 nutrientu — barvy, ikony, defaults
│   ├── goalPlans.ts             # Sablony pro cile
│   ├── academyData.ts           # Clanky a videa
│   ├── achievements.ts          # System odmen
│   ├── aiResponses.ts           # AI sablonovity system
│   ├── animations.ts            # Framer Motion varianty
│   ├── auth.tsx                 # Mock autentizace (context)
│   └── utils.ts                 # Utility funkce
│
└── types/
    └── index.ts                 # 20+ sdilenych TypeScript interface
```

### Datova persistence (localStorage)

Aplikace pouziva 19 localStorage klicu:

| Klic | Typ | Ucel |
|------|-----|------|
| `food_log` | FoodLogEntry[] | Zaznam jidel s nutrienty |
| `nutrient_goals` | NutrientGoals | Denni cile (7 nutrientu) |
| `sleep_log` | SleepLogEntry[] | Sledovani spanku |
| `daily_mood` | DailyMoodEntry[] | Nalada a energie |
| `water_entries` | WaterEntry[] | Prijem vody |
| `daily_water_goal` | number | Denni cil vody (ml) |
| `workout_history` | WorkoutSession[] | Dokoncene treninky |
| `scheduled_workouts` | ScheduledWorkout[] | Naplanovane treninky |
| `body_part_goals` | BodyPartGoal[] | Aktivni cile pro partie |
| `active_workout_plan` | string | ID aktivniho planu |
| `active_meal_plan` | string | ID aktivniho jidelnicku |
| `plan_start_date` | string | Zacatek planu |
| `user_equipment` | string[] | Dostupne vybaveni |
| `challenges` | Challenge[] | Aktivni vyzvy |
| `challenge_points` | number | Body za vyzvy |
| `progress_photos` | ProgressPhoto[] | Fotky progresu |
| `weight_history` | WeightEntry[] | Historie hmotnosti |
| `measurements` | Measurement[] | Telesne miry |
| `supplements` | Supplement[] | Sledovani suplementu |

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

### Demo prihlaseni

- **Email:** `demo@lazorikgym.cz`
- **Heslo:** `demo123`

(Prijima jakykoli email s heslem 4+ znaku)

## Skripty

| Prikaz | Popis |
|--------|-------|
| `npm run dev` | Spusti vyvojovy server (Turbopack) |
| `npm run build` | Vytvori produkcni build |
| `npm run start` | Spusti produkcni server |
| `npm run lint` | Spusti ESLint |

---

<div align="center">

Vytvoreno s Next.js 16, React 19 a Tailwind CSS 4

</div>
