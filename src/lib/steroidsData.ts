import { SteroidInfo } from '@/types';

// ============================================================
// EDUKATIVNI DATABAZE - Steroidy a podobne latky
// Tyto informace slouzi vyhradne k edukaci a harm-reduction.
// Pouziti bez lekarského predpisu je nelegalni a nebezpecne.
// ============================================================

export const steroidsDatabase: SteroidInfo[] = [
  // ==================== ANABOLICKE STEROIDY ====================
  {
    id: 'steroid-1',
    name: 'Testosteron',
    otherNames: ['Test', 'T'],
    category: 'anabolic',
    description:
      'Testosteron je primární mužský pohlavní hormon a zároveň nejpoužívanější anabolický steroid. V medicíně se používá při hormonální substituční terapii (TRT) u mužů s diagnostikovaným hypogonadismem. Ve fitness prostředí je zneužíván v suprafyziologických dávkách pro zvýšení svalové hmoty a síly.',
    mechanism:
      'Váže se na androgenní receptory v buňkách svalové tkáně, kde aktivuje proteosyntézu a zvyšuje retenci dusíku. Zvyšuje produkci IGF-1 a erytropoetinu. V suprafyziologických dávkách potlačuje přirozenou osu HPG (hypotalamus-hypofýza-gonády), což vede k útlumu vlastní produkce testosteronu.',
    sideEffects: [
      'Potlačení vlastní produkce testosteronu',
      'Gynekomastie (zvětšení prsní tkáně u mužů)',
      'Retence vody a otoky',
      'Akné a mastná pleť',
      'Vypadávání vlasů (androgenní alopecie)',
      'Zvýšení hematokritu (zahušťování krve)',
      'Změny nálad a zvýšená podrážděnost',
      'Atrofie varlat',
    ],
    healthRisks: [
      'Kardiovaskulární komplikace – zvýšení krevního tlaku, ateroskleróza',
      'Poškození jater (zejména u orálních forem)',
      'Zvýšené riziko trombózy a mozkové mrtvice',
      'Dlouhodobý hypogonadismus po vysazení',
      'Neplodnost',
      'Zvýšené riziko kardiomyopatie',
    ],
    legalStatus:
      'V ČR je testosteron bez lékařského předpisu nelegální. Spadá pod zákon o léčivech a jeho neoprávněné držení a distribuce je trestné.',
    emoji: '💉',
    dangerLevel: 3,
  },
  {
    id: 'steroid-2',
    name: 'Nandrolon (Deca-Durabolin)',
    otherNames: ['Deca-Durabolin', 'Deca', 'NPP'],
    category: 'anabolic',
    description:
      'Nandrolon je 19-nor anabolický steroid, známý pod obchodním názvem Deca-Durabolin. V medicíně byl historicky používán k léčbě anémie, osteoporózy a svalového úbytku. Je oblíbený pro svůj údajně příznivý efekt na klouby, avšak nese specifická rizika.',
    mechanism:
      'Má silnou anabolickou aktivitu při nižší androgenní aktivitě než testosteron. Váže se na androgenní receptory a zvyšuje proteosyntézu. Konvertuje na dihydronandrolon (slabší androgen), nikoli na DHT. Zvyšuje syntézu kolagenu v kloubech. Výrazně potlačuje osu HPG i v nízkých dávkách.',
    sideEffects: [
      'Výrazné potlačení vlastní produkce testosteronu (tzv. Deca Dick)',
      'Erektilní dysfunkce a snížení libida',
      'Progestinní vedlejší účinky',
      'Retence vody',
      'Akné',
      'Gynekomastie (progestinního původu)',
      'Zvýšení krevního tlaku',
    ],
    healthRisks: [
      'Kardiovaskulární poškození – negativní vliv na lipidový profil',
      'Prolongovaný hypogonadismus po vysazení (obnova trvá měsíce)',
      'Poškození jater při dlouhodobém užívání',
      'Zvýšené riziko aterosklerózy',
      'Neurotoxicita při chronickém užívání',
      'Neplodnost',
    ],
    legalStatus:
      'V ČR nelegální bez lékařského předpisu. Spadá pod kontrolované látky a zákon o léčivech.',
    emoji: '💉',
    dangerLevel: 3,
  },
  {
    id: 'steroid-3',
    name: 'Trenbolon',
    otherNames: ['Tren', 'Trenacetat'],
    category: 'anabolic',
    description:
      'Trenbolon je extrémně silný anabolický steroid původně vyvinutý pro veterinární použití (výkrm dobytka). Nikdy nebyl schválen pro použití u lidí. Je považován za jeden z nejnebezpečnějších steroidů s vážnými vedlejšími účinky na fyzické i psychické zdraví.',
    mechanism:
      'Má 5x vyšší anabolickou i androgenní aktivitu než testosteron. Silně se váže na androgenní receptory, zvyšuje proteosyntézu a retenci dusíku. Nemůže aromatizovat na estrogen, ale má progestinní aktivitu. Výrazně zvyšuje oxidaci tuků a nutriční partitioning. Potlačuje produkci kortizolu.',
    sideEffects: [
      'Těžká insomnie (nespavost)',
      'Noční pocení',
      'Extrémní agrese a paranoia ("Tren rage")',
      'Úzkostné stavy a deprese',
      'Výrazné zvýšení krevního tlaku',
      'Dušnost a snížená kardiovaskulární výkonnost',
      'Erektilní dysfunkce',
      'Silné akné',
      'Tmavý moč a přetížení ledvin',
      'Kašel po aplikaci (tzv. Tren cough)',
    ],
    healthRisks: [
      'Vážné kardiovaskulární poškození – hypertrofie levé komory',
      'Nefrotoxicita – poškození ledvin',
      'Neurodegenerativní účinky – poškození mozkových buněk',
      'Extrémní potlačení vlastní hormonální produkce',
      'Psychiatrické poruchy – úzkost, paranoia, agrese',
      'Poškození lipidového profilu',
      'Zvýšené riziko náhlé srdeční smrti',
      'Chronické respirační problémy',
    ],
    legalStatus:
      'V ČR zcela nelegální. Trenbolon není schválen pro humánní medicínu nikde na světě. Držení a distribuce je trestným činem.',
    emoji: '☠️',
    dangerLevel: 5,
  },
  {
    id: 'steroid-4',
    name: 'Boldenon (Equipoise)',
    otherNames: ['Equipoise', 'EQ', 'Bold'],
    category: 'anabolic',
    description:
      'Boldenon undecylenát je anabolický steroid původně vyvinutý pro veterinární použití (koně). Nikdy nebyl schválen pro humánní medicínu. Je používán pro údajné zvýšení svalové hmoty s nižší retencí vody a zvýšení chuti k jídlu.',
    mechanism:
      'Strukturálně je podobný testosteronu s dvojnou vazbou na C1-C2. Má mírně nižší androgenní aktivitu. Zvyšuje erytropoézu (tvorbu červených krvinek) výrazněji než jiné steroidy, což zvyšuje riziko polycytémie. Konvertuje na DHB (dihydroboldenon) a mírně aromatizuje na estradiol.',
    sideEffects: [
      'Výrazné zvýšení hematokritu a polycytémie',
      'Zvýšení krevního tlaku',
      'Akné',
      'Vypadávání vlasů',
      'Potlačení vlastní produkce testosteronu',
      'Zvýšená chuť k jídlu',
      'Úzkost a insomnie',
      'Bolest v místě injekce',
    ],
    healthRisks: [
      'Polycytémie – nebezpečné zahušťování krve s rizikem trombózy',
      'Kardiovaskulární poškození',
      'Zvýšené riziko mozkové mrtvice a srdečního infarktu',
      'Poškození ledvin při dlouhodobém užívání',
      'Dlouhá detekční doba – měsíce po vysazení',
      'Hormonální dysbalance',
    ],
    legalStatus:
      'V ČR nelegální. Veterinární přípravek bez schválení pro lidské použití. Držení a distribuce je trestné.',
    emoji: '💉',
    dangerLevel: 3,
  },
  {
    id: 'steroid-5',
    name: 'Oxandrolon (Anavar)',
    otherNames: ['Anavar', 'Var', 'Oxan'],
    category: 'anabolic',
    description:
      'Oxandrolon je orální anabolický steroid považovaný za mírnější ve srovnání s jinými steroidy. V medicíně se používá k léčbě svalového úbytku (kachexie), při popáleninách a Turnerově syndromu. Přesto nese zdravotní rizika, zejména na játra a lipidový profil.',
    mechanism:
      'Orální steroid s 17-alfa alkylací umožňující přežití prvního průchodu játry. Má silnější anabolickou než androgenní aktivitu. Nekonvertuje na estrogen (nearomatizuje). Snižuje SHBG (globulin vázající pohlavní hormony), čímž zvyšuje volný testosteron. Podporuje oxidaci tuků.',
    sideEffects: [
      'Hepatotoxicita (zatížení jater)',
      'Výrazné zhoršení lipidového profilu (snížení HDL)',
      'Potlačení vlastní produkce testosteronu',
      'Virilizace u žen (zhrubnutí hlasu, hirsutismus)',
      'Bolesti hlavy',
      'Nauzea',
      'Změny libida',
    ],
    healthRisks: [
      'Poškození jater – hepatotoxicita spojená s 17-alfa alkylací',
      'Kardiovaskulární riziko – dramatické zhoršení lipidů',
      'Potlačení HDL cholesterolu až o 50 %',
      'Hormonální dysbalance po vysazení',
      'U žen nevratná virilizace',
      'Zvýšené riziko aterosklerózy',
    ],
    legalStatus:
      'V ČR dostupný pouze na lékařský předpis pro specifické diagnózy. Neoprávněné držení a distribuce je nelegální.',
    emoji: '💊',
    dangerLevel: 2,
  },
  {
    id: 'steroid-6',
    name: 'Stanozolol (Winstrol)',
    otherNames: ['Winstrol', 'Winny', 'Stano'],
    category: 'anabolic',
    description:
      'Stanozolol je orální (nebo injekční) anabolický steroid známý z dopingových skandálů (Ben Johnson, 1988). V medicíně se používal k léčbě hereditárního angioedému. Je známý svou hepatotoxicitou a negativním dopadem na klouby a šlachy.',
    mechanism:
      'DHT derivát s 17-alfa alkylací. Má silnou anabolickou aktivitu a sníženou androgenní aktivitu. Snižuje SHBG a nemůže aromatizovat na estrogen. Snižuje retenci vody, což vede k „suchému" vzhledu. Negativně ovlivňuje syntézu kolagenu, čímž oslabuje klouby a šlachy.',
    sideEffects: [
      'Výrazná hepatotoxicita',
      'Bolest a poškození kloubů a šlach',
      'Zhoršení lipidového profilu',
      'Vypadávání vlasů',
      'Akné',
      'Potlačení vlastní produkce testosteronu',
      'Virilizace u žen',
      'Zvýšené riziko poranění šlach',
    ],
    healthRisks: [
      'Vážné poškození jater – cholestáza, peliosis hepatis',
      'Zvýšené riziko ruptury šlach',
      'Kardiovaskulární poškození – zhoršení lipidů',
      'Zvýšené riziko srdečních onemocnění',
      'Kloubní degenerace při dlouhodobém užívání',
      'Hormonální dysbalance',
    ],
    legalStatus:
      'V ČR nelegální bez lékařského předpisu. Kontrolovaná látka pod zákonem o léčivech.',
    emoji: '💊',
    dangerLevel: 3,
  },
  {
    id: 'steroid-7',
    name: 'Metandienon (Dianabol)',
    otherNames: ['Dianabol', 'Dbol', 'Methan'],
    category: 'anabolic',
    description:
      'Metandienon je jeden z nejstarších a nejznámějších orálních anabolických steroidů, vyvinutý v 50. letech v USA. Je extrémně hepatotoxický a způsobuje masivní retenci vody. Přesto je stále jedním z nejrozšířenějších zneužívaných steroidů kvůli rychlým nárůstům hmotnosti.',
    mechanism:
      'Testosteronový derivát s 17-alfa alkylací a přidanou dvojnou vazbou na C1-C2. Silně zvyšuje proteosyntézu a retenci dusíku. Výrazně aromatizuje na estrogen (methylestradiol), což způsobuje retenci vody a gynekomastii. Má relativně krátký poločas rozpadu (3–6 hodin).',
    sideEffects: [
      'Výrazná retence vody a otoky',
      'Silná hepatotoxicita',
      'Gynekomastie',
      'Vysoký krevní tlak',
      'Akné',
      'Potlačení vlastní produkce testosteronu',
      'Zvýšený estrogen',
      'Nadýmání a zažívací problémy',
    ],
    healthRisks: [
      'Vážné poškození jater – hepatotoxicita, žloutenka, tumory jater',
      'Kardiovaskulární komplikace – hypertenze, hypertrofie srdce',
      'Drastické zhoršení lipidového profilu',
      'Zvýšené riziko mozkové mrtvice',
      'Dlouhodobé hormonální poruchy',
      'Zvýšené riziko hepatocelulárního karcinomu',
    ],
    legalStatus:
      'V ČR zcela nelegální. Metandienon není v žádné zemi schválen pro lékařské použití. Držení a distribuce je trestné.',
    emoji: '☠️',
    dangerLevel: 4,
  },

  // ==================== SARMs ====================
  {
    id: 'sarm-1',
    name: 'Ostarine (MK-2866)',
    otherNames: ['MK-2866', 'Enobosarm', 'Ostarine'],
    category: 'sarm',
    description:
      'Ostarine je selektivní modulátor androgenních receptorů (SARM), vyvíjený farmaceutickou společností GTx pro léčbu svalové atrofie a osteoporózy. Nikdy nebyl schválen pro klinické použití. Přestože je prezentován jako „bezpečnější alternativa" steroidů, dlouhodobé účinky nejsou dostatečně prozkoumány.',
    mechanism:
      'Selektivně se váže na androgenní receptory ve svalové a kostní tkáni s minimálním působením na prostatu a vlasové folikuly. Stimuluje proteosyntézu a anabolismus ve svalech. I přes selektivitu stále potlačuje vlastní produkci testosteronu v závislosti na dávce.',
    sideEffects: [
      'Potlačení vlastní produkce testosteronu',
      'Bolesti hlavy',
      'Nauzea',
      'Únava',
      'Zhoršení lipidového profilu',
      'Dočasné zvýšení jaterních enzymů',
      'Změny nálad',
    ],
    healthRisks: [
      'Nedostatečně prozkoumané dlouhodobé účinky',
      'Hormonální dysbalance',
      'Kontaminace produktů – černý trh (často obsahují jiné látky)',
      'Potenciální hepatotoxicita',
      'Riziko nedostatečně prozkoumané karcinogeneze',
      'Neschváleno žádnou lékovou agenturou',
    ],
    legalStatus:
      'V ČR není schválen jako léčivo ani doplněk stravy. Prodej jako „výzkumná chemikálie" je v šedé právní zóně. Od roku 2024 na seznamu zakázaných látek WADA.',
    emoji: '💊',
    dangerLevel: 2,
  },
  {
    id: 'sarm-2',
    name: 'Ligandrol (LGD-4033)',
    otherNames: ['LGD-4033', 'Ligandrol', 'VK5211'],
    category: 'sarm',
    description:
      'Ligandrol je silnější SARM vyvíjený firmou Ligand Pharmaceuticals. Je výrazně silnější než Ostarine a způsobuje větší potlačení hormonální osy. Nikdy nebyl schválen pro klinické použití a je klasifikován jako zakázaná dopingová látka.',
    mechanism:
      'Selektivní agonista androgenních receptorů s vysokou afinitou ke svalové a kostní tkáni. Silnější anabolický účinek než Ostarine. Výrazněji potlačuje vlastní produkci testosteronu a LH (luteinizační hormon). Ovlivňuje lipidový profil negativněji než mírnější SARMs.',
    sideEffects: [
      'Výrazné potlačení vlastní produkce testosteronu',
      'Snížení LH a FSH',
      'Únava a letargie',
      'Bolesti hlavy',
      'Zhoršení lipidového profilu',
      'Suchá ústa',
      'Retence vody',
    ],
    healthRisks: [
      'Výrazná hormonální suprese vyžadující PCT',
      'Neznámé dlouhodobé účinky na orgány',
      'Potenciální hepatotoxicita',
      'Kardiovaskulární riziko',
      'Kontaminace produktů na černém trhu',
      'Neschváleno pro humánní použití',
    ],
    legalStatus:
      'V ČR není schválen jako léčivo. Prodej pro lidskou konzumaci je nelegální. Na seznamu zakázaných látek WADA.',
    emoji: '💊',
    dangerLevel: 3,
  },
  {
    id: 'sarm-3',
    name: 'RAD-140 (Testolone)',
    otherNames: ['Testolone', 'RAD140'],
    category: 'sarm',
    description:
      'RAD-140 je jeden z nejsilnějších SARMs, vyvíjený firmou Radius Health. Je extrémně silný a jeho vedlejší účinky se blíží klasickým anabolickým steroidům. Byl v raných fázích klinického výzkumu pro léčbu rakoviny prsu, ale nikdy nebyl schválen.',
    mechanism:
      'Velmi silný agonista androgenních receptorů s vysokou selektivitou pro svalovou tkáň. Má výrazný anabolický potenciál srovnatelný s nižšími dávkami testosteronu. Silně potlačuje osu HPG. Může ovlivňovat mozkové androgenní receptory, což vysvětluje behaviorální změny.',
    sideEffects: [
      'Silné potlačení vlastní produkce testosteronu',
      'Agresivita a změny chování',
      'Zvýšení jaterních enzymů',
      'Insomnie',
      'Bolesti hlavy',
      'Vypadávání vlasů',
      'Zvýšení krevního tlaku',
      'Úzkostné stavy',
    ],
    healthRisks: [
      'Hepatotoxicita – dokumentované případy poškození jater',
      'Výrazná hormonální suprese',
      'Kardiovaskulární riziko',
      'Neurobehaviorální změny',
      'Zcela neznámé dlouhodobé účinky',
      'Kontaminace produktů',
      'Případy hospitalizace kvůli poškození jater',
    ],
    legalStatus:
      'V ČR není schválen pro žádné použití. Klasifikován jako zakázaná látka. Prodej i držení pro lidskou konzumaci je nelegální.',
    emoji: '⚠️',
    dangerLevel: 3,
  },
  {
    id: 'sarm-4',
    name: 'Cardarine (GW-501516)',
    otherNames: ['GW-501516', 'Endurobol', 'Cardarine'],
    category: 'sarm',
    description:
      'Cardarine technicky není SARM, ale agonista PPAR-delta receptorů. Byl vyvíjen firmou GlaxoSmithKline pro léčbu metabolických a kardiovaskulárních onemocnění. Vývoj byl zastaven poté, co se u laboratorních zvířat vyvinuly nádory. Přesto je na černém trhu stále dostupný.',
    mechanism:
      'Aktivuje PPAR-delta receptory, které regulují metabolismus tuků a glukózy. Zvyšuje oxidaci mastných kyselin ve svalech, zlepšuje vytrvalost a spalování tuků. Nemá přímý vliv na androgenní receptory, proto nepotlačuje testosteron. Avšak jeho vliv na buněčný růst může být karcinogenní.',
    sideEffects: [
      'Možné karcinogenní účinky (prokázáno na zvířatech)',
      'Bolesti hlavy',
      'Nauzea',
      'Průjem',
      'Zažívací obtíže',
      'Neznámé dlouhodobé účinky u lidí',
    ],
    healthRisks: [
      'Prokázaná karcinogeneze u laboratorních zvířat – nádory střev, jater, žaludku, kůže',
      'Vývoj léku zastaven kvůli bezpečnostním obavám',
      'Neexistují dlouhodobé studie na lidech',
      'Potenciální mutagenní účinky',
      'Kontaminace produktů z černého trhu',
      'Nevratné poškození zdraví nelze vyloučit',
    ],
    legalStatus:
      'V ČR není schválen pro žádné použití. Vývoj léku ukončen. Na seznamu zakázaných látek WADA. Prodej pro lidskou konzumaci je nelegální.',
    emoji: '☠️',
    dangerLevel: 3,
  },

  // ==================== PEPTIDY ====================
  {
    id: 'peptide-1',
    name: 'HGH (Růstový hormon)',
    otherNames: ['Somatotropin', 'GH', 'Růstový hormon', 'HGH'],
    category: 'peptide',
    description:
      'Lidský růstový hormon (HGH) je peptidový hormon produkovaný hypofýzou. V medicíně se používá k léčbě růstových poruch u dětí a deficitu GH u dospělých. Ve fitness je zneužíván pro svůj lipolytický a anabolický účinek. Syntetický HGH je extrémně drahý a na černém trhu často padělaný.',
    mechanism:
      'Stimuluje produkci IGF-1 v játrech. Zvyšuje lipolýzu (spalování tuků), proteosyntézu a růst tkání. Má antikatabolické účinky. Podporuje regeneraci, růst chrupavky a kolagenu. V suprafyziologických dávkách může způsobit abnormální růst orgánů (visceromegálii) a kostních struktur.',
    sideEffects: [
      'Retence vody a otoky',
      'Syndrom karpálního tunelu',
      'Bolesti kloubů a svalů',
      'Zvýšení hladiny cukru v krvi',
      'Inzulínová rezistence',
      'Zvětšení vnitřních orgánů (visceromegalie)',
      'Gynekomastie',
      'Necitlivost a brnění končetin',
    ],
    healthRisks: [
      'Diabetes mellitus 2. typu',
      'Akromegalie – abnormální růst kostí a tkání',
      'Kardiomegalie – zvětšení srdce',
      'Zvětšení vnitřních orgánů (GH belly)',
      'Zvýšené riziko rakoviny (stimulace IGF-1)',
      'Inzulínová rezistence až diabetes',
      'Poškození kloubů při dlouhodobém užívání',
    ],
    legalStatus:
      'V ČR dostupný pouze na lékařský předpis pro diagnostikované deficity. Neoprávněné držení a distribuce je trestné. Většina produktů na černém trhu je padělána.',
    emoji: '💉',
    dangerLevel: 3,
  },
  {
    id: 'peptide-2',
    name: 'IGF-1',
    otherNames: ['Insulin-like Growth Factor 1', 'Mecasermin', 'Somatomedin C'],
    category: 'peptide',
    description:
      'IGF-1 (inzulínu podobný růstový faktor 1) je peptidový hormon s anabolickými účinky. Přirozeně je produkován v játrech pod vlivem růstového hormonu. V medicíně se používá pod názvem Mecasermin k léčbě těžkého deficitu IGF-1. Zneužívání je extrémně nebezpečné kvůli riziku nekontrolovaného buněčného růstu.',
    mechanism:
      'Váže se na IGF-1 receptory a stimuluje buněčný růst, diferenciaci a přežití buněk. Má silný anabolický efekt na svalovou tkáň. Podporuje hyperplazii (tvorbu nových buněk), nejen hypertrofii. Silný antiapoptotický účinek – zabraňuje programované buněčné smrti, což může podpořit růst nádorů.',
    sideEffects: [
      'Hypoglykémie (pokles cukru v krvi)',
      'Bolesti hlavy',
      'Otoky',
      'Bolesti kloubů',
      'Zvýšení nitrolebního tlaku',
      'Nauzea a zvracení',
      'Únava',
    ],
    healthRisks: [
      'Výrazně zvýšené riziko rakoviny – stimulace růstu nádorových buněk',
      'Těžká hypoglykémie – může být život ohrožující',
      'Nekontrolovaný buněčný růst',
      'Kardiomegalie',
      'Akromegalie',
      'Neznámé dlouhodobé účinky exogenního podávání',
      'Zvýšené riziko kolorektálního karcinomu a karcinomu prostaty',
    ],
    legalStatus:
      'V ČR pouze na specializovaný lékařský předpis pro diagnostikovaný deficit IGF-1. Zneužívání je nelegální a extrémně nebezpečné.',
    emoji: '☠️',
    dangerLevel: 4,
  },

  // ==================== OSTATNI ====================
  {
    id: 'other-1',
    name: 'Inzulín',
    otherNames: ['Insulin', 'Slin', 'Humalog', 'NovoRapid'],
    category: 'other',
    description:
      'Inzulín je peptidový hormon produkovaný slinivkou, klíčový pro metabolismus glukózy. V medicíně je nezbytný pro léčbu diabetu. Ve fitness bodybuilding je zneužíván pro svůj extrémně silný anabolický účinek – je to nejsilnější anabolický hormon v těle. Zneužívání inzulínu je smrtelně nebezpečné.',
    mechanism:
      'Aktivuje inzulínové receptory, stimuluje příjem glukózy a aminokyselin do buněk. Silně stimuluje proteosyntézu a lipogenezi. V suprafyziologických dávkách masivně zvyšuje transport živin do svalů. Předávkování způsobuje hypoglykémii, která může vést ke kómatu a smrti během minut.',
    sideEffects: [
      'Hypoglykémie – životně ohrožující pokles cukru v krvi',
      'Nárůst tukové hmoty',
      'Retence vody',
      'Zvýšení chuti k jídlu',
      'Ospalost',
      'Riziko hypoglykemického šoku',
      'Pocení a třes',
    ],
    healthRisks: [
      'SMRT z hypoglykémie – reálné riziko při každé aplikaci',
      'Hypoglykemické kóma',
      'Trvalé poškození mozku při hypoglykémii',
      'Inzulínová rezistence a diabetes 2. typu',
      'Nárůst viscerálního tuku',
      'Kardiovaskulární komplikace',
      'Nelze zvrátit po aplikaci – čas do hypoglykémie může být minuty',
    ],
    legalStatus:
      'V ČR je inzulín dostupný na lékařský předpis pro diabetiky. Zneužívání pro sportovní účely je extrémně nebezpečné a eticky nepřijatelné. Distribuce neoprávněným osobám je trestná.',
    emoji: '☠️',
    dangerLevel: 5,
  },
  {
    id: 'other-2',
    name: 'Clenbuterol',
    otherNames: ['Clen', 'Spiropent', 'Clenbuterol hydrochlorid'],
    category: 'other',
    description:
      'Clenbuterol je beta-2 agonista původně vyvinutý jako bronchodilatátor pro léčbu astmatu (u koní). V některých zemích je schválen pro humánní použití, v ČR ne. Je zneužíván pro svůj termogenní efekt (spalování tuků). Je extrémně nebezpečný pro srdce.',
    mechanism:
      'Stimuluje beta-2 adrenergní receptory, což zvyšuje termogenezi a metabolický obrat. Zvyšuje bazální metabolický výdej o 5–10 %. Má mírný antikatabolický účinek. Stimuluje centrální nervový systém. Způsobuje tachykardii a zvýšení krevního tlaku. Má kumulativní toxický účinek na srdeční sval.',
    sideEffects: [
      'Tachykardie (zrychlený tep)',
      'Třes rukou',
      'Nespavost',
      'Pocení',
      'Úzkost a nervozita',
      'Zvýšený krevní tlak',
      'Svalové křeče (deplece taurinu a draslíku)',
      'Bolesti hlavy',
      'Nauzea',
    ],
    healthRisks: [
      'Kardiotoxicita – přímé poškození srdečního svalu',
      'Srdeční arytmie a riziko náhlé srdeční smrti',
      'Hypertrofie levé komory',
      'Nekróza srdečního svalu (kardiomyocytů)',
      'Hypokalémie – nebezpečný pokles draslíku',
      'Zvýšené riziko mozkové mrtvice',
      'Kumulativní poškození srdce při opakovaném užívání',
      'Případy smrtelných předávkování',
    ],
    legalStatus:
      'V ČR není schválen pro humánní použití. Je veterinární přípravek. Držení a distribuce pro lidskou konzumaci je nelegální.',
    emoji: '☠️',
    dangerLevel: 4,
  },
];

// ==================== HELPER FUNKCE ====================

export function getSteroidsByCategory(category: SteroidInfo['category']): SteroidInfo[] {
  return steroidsDatabase.filter(s => s.category === category);
}

export function getSteroidById(id: string): SteroidInfo | undefined {
  return steroidsDatabase.find(s => s.id === id);
}

export function getMostDangerous(): SteroidInfo[] {
  return steroidsDatabase.filter(s => s.dangerLevel >= 4);
}

export const steroidCategories = [
  { id: 'anabolic', name: 'Anabolické steroidy', emoji: '💉' },
  { id: 'sarm', name: 'SARMs', emoji: '💊' },
  { id: 'peptide', name: 'Peptidy', emoji: '🧬' },
  { id: 'other', name: 'Ostatní', emoji: '⚠️' },
] as const;

export const EDUCATIONAL_DISCLAIMER =
  'Tyto informace jsou čistě edukativní. Použití anabolických steroidů a podobných látek bez lékařského předpisu je nelegální a zdraví nebezpečné. Vždy konzultujte s lékařem.';
