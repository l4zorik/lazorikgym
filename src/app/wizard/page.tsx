"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Dumbbell, 
  Calendar, 
  Check, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Brain,
  Zap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { bodyPartsData, getWeakBodyParts } from "@/lib/data";
import { BodyPart, Exercise } from "@/types";

type WizardStep = 'intro' | 'goal' | 'equipment' | 'frequency' | 'weaknesses' | 'generating' | 'result';

interface PlanConfig {
  goal: string;
  equipment: string[];
  daysPerWeek: number;
  focusParts: string[];
}

export default function PlanWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>('intro');
  const [config, setConfig] = useState<PlanConfig>({
    goal: 'gain_muscle',
    equipment: ['Vlastní váha'],
    daysPerWeek: 3,
    focusParts: getWeakBodyParts().map(p => p.id),
  });

  const [generatedPlan, setGeneratedPlan] = useState<{
    name: string;
    description: string;
    sessions: { title: string; exercises: any[] }[];
  } | null>(null);

  const nextStep = () => {
    if (step === 'intro') setStep('goal');
    else if (step === 'goal') setStep('equipment');
    else if (step === 'equipment') setStep('frequency');
    else if (step === 'frequency') setStep('weaknesses');
    else if (step === 'weaknesses') startGenerating();
  };

  const prevStep = () => {
    if (step === 'goal') setStep('intro');
    else if (step === 'equipment') setStep('goal');
    else if (step === 'frequency') setStep('equipment');
    else if (step === 'weaknesses') setStep('frequency');
  };

  const startGenerating = () => {
    setStep('generating');
    
    // Simulate complex calculation
    setTimeout(() => {
      const plan = generatePlanLogic(config);
      setGeneratedPlan(plan);
      setStep('result');
    }, 3000);
  };

  const generatePlanLogic = (cfg: PlanConfig) => {
    // Basic logic to pick exercises based on config
    const sessions = [];
    const days = cfg.daysPerWeek;

    // Simplified split logic
    for (let i = 1; i <= days; i++) {
      const sessionExercises: any[] = [];
      
      // Add exercises for focused parts first
      cfg.focusParts.forEach(partId => {
        const part = bodyPartsData.find(p => p.id === partId);
        if (part) {
          const ex = part.exercises.find(e => 
            cfg.equipment.includes(e.equipment) || cfg.equipment.includes('Vše')
          );
          if (ex) sessionExercises.push({ ...ex, partName: part.name });
        }
      });

      // Fill with general exercises if needed
      if (sessionExercises.length < 5) {
        bodyPartsData.forEach(part => {
          if (sessionExercises.length < 6) {
            const ex = part.exercises.find(e => 
              cfg.equipment.includes(e.equipment) && !sessionExercises.some(se => se.id === e.id)
            );
            if (ex) sessionExercises.push({ ...ex, partName: part.name });
          }
        });
      }

      sessions.push({
        title: `Trénink ${i}`,
        exercises: sessionExercises.slice(0, 6),
      });
    }

    return {
      name: cfg.goal === 'lose_weight' ? 'Fat Burn Master' : 'Muscle Builder Pro',
      description: `Personalizovaný plán na ${cfg.daysPerWeek} dny v týdnu se zaměřením na tvé priority.`,
      sessions
    };
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-white/5 flex items-center justify-between">
        <button 
          onClick={() => step === 'intro' ? router.back() : prevStep()}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1">
          {['goal', 'equipment', 'frequency', 'weaknesses'].map((s, i) => (
            <div 
              key={s} 
              className={`w-8 h-1 rounded-full transition-all ${
                ['intro', 'goal', 'equipment', 'frequency', 'weaknesses', 'generating', 'result'].indexOf(step) > i + 1
                  ? "bg-[#ff6b35]" 
                  : "bg-white/10"
              }`} 
            />
          ))}
        </div>
        <div className="w-9" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* INTRO */}
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff6b35] to-[#e53935] rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-[#ff6b35]/20 rotate-3">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight">Body Diagnostics 2.0</h1>
                <p className="text-gray-400 text-lg">
                  Analyzujeme tvou kondici, vybavení a slabiny, abychom vytvořili plán, který skutečně funguje.
                </p>
              </div>
              <Button size="lg" className="w-full h-16 text-lg rounded-2xl" onClick={nextStep}>
                Spustit diagnostiku
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {/* GOAL */}
          {step === 'goal' && (
            <motion.div 
              key="goal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-8"
            >
              <h2 className="text-3xl font-bold">Jaký je tvůj cíl?</h2>
              <div className="grid gap-4">
                {[
                  { id: 'lose_weight', label: 'Spalování tuků', desc: 'Soustředění na kalorie a tempo', icon: '🔥' },
                  { id: 'gain_muscle', label: 'Nabírání svalů', desc: 'Maximální hypertrofie a objem', icon: '💪' },
                  { id: 'strength', label: 'Budování síly', desc: 'Zvyšování maximálních vah', icon: '🏋️‍♂️' },
                ].map(g => (
                  <button
                    key={g.id}
                    onClick={() => setConfig({...config, goal: g.id})}
                    className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-6 ${
                      config.goal === g.id ? "border-[#ff6b35] bg-[#ff6b35]/5" : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <span className="text-4xl">{g.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{g.label}</h3>
                      <p className="text-sm text-gray-500">{g.desc}</p>
                    </div>
                    {config.goal === g.id && <Check className="w-6 h-6 text-[#ff6b35]" />}
                  </button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={nextStep}>Pokračovat</Button>
            </motion.div>
          )}

          {/* EQUIPMENT */}
          {step === 'equipment' && (
            <motion.div 
              key="equipment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-8"
            >
              <h2 className="text-3xl font-bold">Co máš k dispozici?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Vlastní váha', 'Jednoručky', 'Velká činka', 'Kladka', 'Hrazda', 'Stroj'].map(eq => {
                  const isSelected = config.equipment.includes(eq);
                  return (
                    <button
                      key={eq}
                      onClick={() => {
                        const newEq = isSelected 
                          ? config.equipment.filter(e => e !== eq)
                          : [...config.equipment, eq];
                        setConfig({...config, equipment: newEq});
                      }}
                      className={`p-6 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-3 ${
                        isSelected ? "border-[#ff6b35] bg-[#ff6b35]/5" : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                      }`}
                    >
                      <Dumbbell className={`w-8 h-8 ${isSelected ? "text-[#ff6b35]" : "text-gray-600"}`} />
                      <span className="font-medium text-sm">{eq}</span>
                    </button>
                  );
                })}
              </div>
              <Button size="lg" className="w-full" onClick={nextStep} disabled={config.equipment.length === 0}>
                Pokračovat
              </Button>
            </motion.div>
          )}

          {/* FREQUENCY */}
          {step === 'frequency' && (
            <motion.div 
              key="frequency"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-8"
            >
              <h2 className="text-3xl font-bold">Kolikrát týdně chceš cvičit?</h2>
              <div className="flex justify-between items-center bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setConfig({...config, daysPerWeek: num})}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                      config.daysPerWeek === num ? "bg-[#ff6b35] text-white scale-125" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex gap-4">
                <Info className="w-6 h-6 text-blue-400 shrink-0" />
                <p className="text-sm text-blue-200">
                  {config.daysPerWeek <= 3 
                    ? "Ideální pro udržení a regeneraci." 
                    : "Skvělá frekvence pro rychlé výsledky a pokrok."}
                </p>
              </div>
              <Button size="lg" className="w-full" onClick={nextStep}>Pokračovat</Button>
            </motion.div>
          )}

          {/* WEAKNESSES */}
          {step === 'weaknesses' && (
            <motion.div 
              key="weaknesses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold">Slabé partie</h2>
                <p className="text-gray-500 mt-2">Vyber partie, které chceš v plánu upřednostnit.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {bodyPartsData.map(part => {
                  const isSelected = config.focusParts.includes(part.id);
                  const isWeak = part.progress < 45;
                  return (
                    <button
                      key={part.id}
                      onClick={() => {
                        const newParts = isSelected 
                          ? config.focusParts.filter(p => p !== part.id)
                          : [...config.focusParts, part.id];
                        setConfig({...config, focusParts: newParts});
                      }}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col gap-1 ${
                        isSelected ? "border-[#ff6b35] bg-[#ff6b35]/5" : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{part.name}</span>
                        {isWeak && <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-500" style={{ width: `${part.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500">{part.progress}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <Button size="lg" className="w-full h-16" onClick={nextStep}>
                Vygenerovat můj plán
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* GENERATING */}
          {step === 'generating' && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-[#ff6b35]/20 border-t-[#ff6b35] animate-spin mx-auto" />
                <Sparkles className="w-10 h-10 text-[#ff6b35] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Sestavuji tvou transformaci...</h2>
                <div className="space-y-2 max-w-xs mx-auto">
                  {[
                    "Analyzuji slabé partie",
                    "Vybírám nejefektivnější cviky",
                    "Optimalizuji tréninkový objem",
                    "Sestavuji týdenní split"
                  ].map((text, i) => (
                    <motion.div 
                      key={text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.7 }}
                      className="flex items-center gap-3 text-sm text-gray-500"
                    >
                      <Check className="w-4 h-4 text-[#10b981]" />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {step === 'result' && generatedPlan && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="inline-block px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                  Plán vytvořen
                </div>
                <h2 className="text-4xl font-black">{generatedPlan.name}</h2>
                <p className="text-gray-500">{generatedPlan.description}</p>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-hide">
                {generatedPlan.sessions.map((session, idx) => (
                  <Card key={idx} className="p-5 border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#ff6b35]" />
                        {session.title}
                      </h3>
                      <span className="text-xs text-gray-500">{session.exercises.length} cviků</span>
                    </div>
                    <div className="space-y-3">
                      {session.exercises.map((ex: any, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] text-xs font-bold">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold">{ex.name}</p>
                            <p className="text-[10px] text-gray-500 uppercase">{ex.partName} • {ex.equipment}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold">3 × 12</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep('intro')}>
                  Zkusit znovu
                </Button>
                <Button className="flex-1" onClick={() => router.push('/dashboard')}>
                  Uložit a začít
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
