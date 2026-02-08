# LazorikGym - Technicka analyza a stav projektu
**Datum posledni aktualizace:** 8. unora 2026
**Verze:** 0.3.0 (Pokrocily Prototyp s Nutrient Tracking)
**Codebase:** ~18 500 radku | 66 souboru | 19 stranek

---

## Celkovy stav: 40 % (Production-Ready)

Projekt je ve fazi vizualne dokonceneho prototypu s bohatou sadou funkci vcetne kompletniho nutrient trackingu. Hlavni technologicky dluh je v oblasti backendu, bezpecnosti a testovani.

---

## Co je HOTOVE (silne stranky)

### Frontend & UI (95 % hotovo)
- Moderni dark-mode design na Tailwind CSS v4
- 24+ komponent s konzistentnim vizualnim jazykem
- Plynule animace (Framer Motion) — progress bary, modaly, prechody
- Responzivni layout s mobilni navigaci
- Radix UI primitiva (Dialog, Tabs, Tooltip, Progress)

### Dashboard (90 % hotovo)
- Goal-aware uvitaci sekce (adaptuje se podle uzivatelskeho cile)
- AI Insight banner
- Today Overview statistiky
- Denni treninky s 1-click startem
- Mini kalendar s tydennim prehledem
- Quick Planner + Equipment Manager
- Cilovy system s progress trackingem

### Nutrient Tracking (100 % hotovo) -- NOVE
- 7 sledovanych nutrientu: kalorie, protein, sacharidy, tuky, vlaknina, cukr, sodik
- NutritionPanel s animovanymi progress bary a vahovymi hodnotami
- NutrientGoalsModal pro editaci dennich cilu
- FoodLogModal s 6 nutrientovymi poli
- Mazani zaznamu jidel
- Konfigurovatelne defaults v nutrientConfig.ts
- Zpetna kompatibilita se starymi daty

### Dalsi moduly (85 % hotovo)
- Treninkovy kalendar (mesicni/tydenni)
- Treninkove plany (4 typy splitu)
- Knihovna 50+ cviku s popisy
- Akademie (clanky + videa)
- Achievement system
- Challenges s bodovanim
- Progress tracking (vahy, miry, fotky)
- Suplementy
- Jidelnicky (bulking/cutting/maintenance)
- Onboarding wizard

---

## SLABE STRANKY — Detailni analyza

### 1. Zadny backend / API (Zavaznost: KRITICKA)
**Skore: 95 % slabina**

**Soucasny stav:**
- Vsechna data jsou v `localStorage` prohlizece (19 klicu)
- Zadne API routes, zadna databaze, zadny server

**Konkretni dopady:**
- Smazani cache = ztrata VSECH dat (treninky, jidla, cile, mereni)
- Nemoznost synchronizace mezi zarizenimy (telefon vs. PC)
- Zadna moznost sdileni dat nebo socialnich funkci
- localStorage ma limit ~5-10 MB — pri velkych historii muze dojit misto
- Zadny backup, zadna obnova dat

**Doporuceni:**
- Supabase (PostgreSQL + Auth + Realtime) jako nejrychlejsi cesta
- Prisma ORM pro typove bezpecne databazove dotazy
- Migracni skripty z localStorage na DB

---

### 2. Mock autentizace (Zavaznost: KRITICKA)
**Skore: 90 % slabina**

**Soucasny stav** (`src/lib/auth.tsx`):
- React Context s hardcoded demo uctem (`demo@lazorikgym.cz / demo123`)
- Prijima JAKYKOLI email s heslem 4+ znaku
- Hesla se neukladaji, nejsou hashovana
- Session se neuchovava — refresh stranky = odhlaseni
- Zadna ochrana rout (kazdy muze jit na `/dashboard`)

**Konkretni dopady:**
- Absolutne nebezpecne pro realny provoz
- Zadna identifikace uzivatelu
- Nemoznost multi-user systemu

**Doporuceni:**
- NextAuth.js (Auth.js) s poskytovateli (Google, GitHub, email)
- Middleware pro ochranu `/dashboard/*` rout
- JWT + session management

---

### 3. Simulovana AI (Zavaznost: VYSOKA)
**Skore: 80 % slabina**

**Soucasny stav** (`src/lib/aiResponses.ts`):
- Keyword matching — rozpoznava 9 kategorii (cviceni, motivace, vyziva...)
- Sablonove odpovedi — kazda kategorie ma 3-5 prednapsanych odpovedi
- `generatePersonalizedPlan()` — nahodne generuje plany z predpripravenych sablon
- Neanalyzuje skutecna data uzivatele (historii, progress, nutrienty)

**Konkretni dopady:**
- AI odpovida stejne bez ohledu na uzivateluv pokrok
- Nereaguje na realnou historii treninku (jen pocita zaznamy)
- Neni schopna slozitejsi konverzace nebo follow-upu
- Doporuceni jsou genericka, ne data-driven

**Doporuceni:**
- Google Gemini API nebo OpenAI API
- System prompt s kontextem: uzivatelskeho profilu, historii, nutricnich dat
- RAG pattern pro doporuceni cviku z vlastni knihovny

---

### 4. Zadne testy (Zavaznost: VYSOKA)
**Skore: 100 % slabina**

**Soucasny stav:**
- 0 testovych souboru v celem projektu
- Zadny testovaci framework nainstalovany
- Zadne CI/CD pipeline

**Konkretni dopady:**
- Kazda zmena muze rozbít existujici funkcionalitu (regrese)
- Nemoznost bezpecne refaktorovat
- Zadna jistota, ze hooks funguji spravne po uprave

**Doporuceni:**
- Vitest pro unit testy hooku (`useDailyTracker`, `useGoals`, `useLocalStorage`)
- React Testing Library pro komponentove testy
- Playwright pro E2E testy (prihlaseni -> pridani jidla -> kontrola baru)
- GitHub Actions pro CI

---

### 5. Hardcoded obsah (Zavaznost: STREDNI)
**Skore: 70 % slabina**

**Soucasny stav:**
- Vsechna data cviku v `data.ts` (~800+ radku)
- Clanky akademie v `academyData.ts`
- Jidelnicky primo v page.tsx souborech
- Achievement definice v `achievements.ts`

**Konkretni dopady:**
- Pridani cviku nebo clanku = zmena kodu + deploy
- Nemoznost pro ne-programatory editovat obsah
- Velke soubory se statickymi daty znecistuji codebase

**Doporuceni:**
- Headless CMS (Sanity.io, Strapi) pro editovatelny obsah
- Nebo Supabase tabulky s admin panelem

---

### 6. Performance a bundle size (Zavaznost: NIZKA-STREDNI)
**Skore: 40 % slabina**

**Soucasny stav:**
- Dashboard page.tsx ma ~1170 radku — velmi velky soubor
- Vsechny dashboard komponenty se importuji eager (ne lazy)
- Lucide importuje 35+ ikon primo
- Recharts je velka knihovna (~300 kB)
- Zadne code-splitting krom App Router defaultu

**Doporuceni:**
- Rozdelit dashboard page na mensi sekce
- `dynamic()` importy pro modaly a tezke komponenty
- Tree-shaking kontrola pro lucide-react

---

### 7. Pristupnost / Accessibility (Zavaznost: STREDNI)
**Skore: 60 % slabina**

**Soucasny stav:**
- Radix UI zajistuje zakladni a11y pro dialogy a tabs
- Ale: vlastni tlacitka nemaji `aria-label`
- Emoji ikony nemaji `aria-hidden`
- Barevny kontrast na tmavem pozadi neovereny
- Zadne skip-to-content linky
- Keyboard navigace neni testovana mimo Radix

---

### 8. Mobilni UX (Zavaznost: NIZKA)
**Skore: 35 % slabina**

**Soucasny stav:**
- Responzivni layout (md: breakpointy)
- MobileNav pro spodni navigaci
- Ale: nekterymi modaly se obtizne proklikava na malych obrazovkach
- Dashboard grid muze byt prilis natlaceny na 320px

---

## Souhrnna tabulka

| Oblast | Stav | Zavaznost | Priorita |
|--------|------|-----------|----------|
| Frontend/UI | 95 % | -- | -- |
| Nutrient Tracking | 100 % | -- | -- |
| Dashboard funkce | 90 % | -- | -- |
| Backend/API | 5 % | Kriticka | 1 |
| Autentizace | 5 % | Kriticka | 1 |
| AI chatbot | 15 % | Vysoka | 2 |
| Testy | 0 % | Vysoka | 2 |
| CMS/Obsah | 0 % | Stredni | 3 |
| Pristupnost | 40 % | Stredni | 3 |
| Performance | 60 % | Nizka | 4 |
| Mobilni UX | 65 % | Nizka | 4 |

---

## Roadmapa k produkci

### Faze 1: Backend & Autentizace (Priorita 1)
- [ ] Zalozit Supabase projekt
- [ ] Databazove schema (Users, Workouts, FoodLog, Goals, Progress)
- [ ] Integrace NextAuth.js s Google/GitHub providerem
- [ ] Middleware pro ochranu dashboard rout
- [ ] Migrace z localStorage hooku na API volani
- [ ] Migracni utility pro existujici localStorage data

### Faze 2: AI & Testy (Priorita 2)
- [ ] Napojeni na Gemini/OpenAI API
- [ ] System prompt s kontextem uzivatele
- [ ] Instalace Vitest + React Testing Library
- [ ] Unit testy pro vsechny custom hooky
- [ ] E2E testy s Playwright (hlavni flows)
- [ ] GitHub Actions CI pipeline

### Faze 3: Obsah & Optimalizace (Priorita 3)
- [ ] Headless CMS pro akademii a cviky
- [ ] Code splitting (dynamic imports pro modaly)
- [ ] Accessibility audit + opravy
- [ ] PWA manifest + Service Worker pro offline

### Faze 4: Rozsireni
- [ ] Socialni funkce (sdileni progresu, pratelstvi)
- [ ] Push notifikace (treninky, hydratace)
- [ ] Export/import dat (CSV, JSON)
- [ ] Integrace s fitness API (Google Fit, Apple Health)

---

## Changelog

### v0.3.0 (8. unor 2026)
- Kompletni nutrient tracking (7 nutrientu)
- NutritionPanel s animovanymi progress bary
- NutrientGoalsModal pro editaci cilu
- Rozsireny FoodLogModal (vlaknina, cukr, sodik)
- Mazani zaznamu jidel
- Aktualizovana dokumentace

### v0.2.0
- Dashboard upgrade: Workout Planner, Daily Tracker, Equipment manager
- Goals system s progress trackingem
- Redesign Body Analysis sekce

### v0.1.0
- Zakladni struktura projektu
- Landing page, registrace, prihlaseni
- Interaktivni mapa tela
- Treninkovy kalendar a plany
- AI asistent (sablonovy)
- Akademie, Achievements, Challenges

---
*Dokumentace aktualizovana v ramci technicke revize projektu.*
