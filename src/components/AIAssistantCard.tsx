"use client";

import { useState, useRef, useEffect } from "react";
import { BodyPart, WorkoutSession } from "@/types";
import { useAIChat } from "@/hooks/useAIChat";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import { Sparkles, Send, Trash2, ChevronRight, Target, Zap, Calendar, Dumbbell, Brain, Lightbulb, Flame } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion, AnimatePresence } from "framer-motion";

interface AIAssistantCardProps {
  weakBodyParts: BodyPart[];
}

interface ScheduledWorkout {
  id: string;
  date: string;
  title: string;
  type: string;
  duration: number;
  completed: boolean;
  aiGenerated?: boolean;
  exercises?: string[];
}

export default function AIAssistantCard({ weakBodyParts }: AIAssistantCardProps) {
  const [history] = useLocalStorage<WorkoutSession[]>("workout_history", []);
  const [scheduledWorkouts, setScheduledWorkouts] = useLocalStorage<ScheduledWorkout[]>("scheduled_workouts", []);
  const { messages, isLoading, sendMessage, clearHistory, recommendations } =
    useAIChat(weakBodyParts, history);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput("");
    setShowQuickActions(false);
    await sendMessage(message);
    inputRef.current?.focus();
  };

  const handleQuickAction = (text: string) => {
    setShowQuickActions(false);
    sendMessage(text);
  };

  // Parse AI response for schedule actions
  const handleScheduleWorkout = () => {
    const today = new Date();
    const newWorkout = {
      id: Math.random().toString(36).substr(2, 9),
      date: today.toISOString().split("T")[0],
      title: "AI Trénink",
      type: "strength",
      duration: 60,
      completed: false,
      aiGenerated: true,
      exercises: ["Bench Press", "Squats", "Pull-ups", "Shoulder Press"],
    };
    setScheduledWorkouts([...scheduledWorkouts, newWorkout]);
    
    // Add confirmation message
    const confirmationMsg = {
      id: "confirm-" + Date.now(),
      role: "assistant" as const,
      content: "✅ Trénink byl přidán do tvého kalendáře na dnešek. Najdeš ho v sekci Kalendář!",
      timestamp: new Date(),
    };
    
    // This would need to be handled through the hook
    sendMessage("Přidej trénink do kalendáře");
  };

  const quickActions = [
    { text: "Vytvoř mi plán", icon: Calendar, color: "#3b82f6", description: "Týdenní rozvrh" },
    { text: "Slabé partie", icon: Target, color: "#ff6b35", description: "Co zlepšit?" },
    { text: "Motivace", icon: Flame, color: "#f59e0b", description: "Hodně štěstí!" },
    { text: "Výživa", icon: Lightbulb, color: "#10b981", description: "Stravování" },
  ];

  const aiFeatures = [
    { label: "Plánování", icon: Calendar, color: "#3b82f6" },
    { label: "Cviky", icon: Dumbbell, color: "#ff6b35" },
    { label: "Analýza", icon: Brain, color: "#8b5cf6" },
  ];

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col h-[600px] group/card">
      {/* Premium Header with animated gradient */}
      <div className="relative p-5 border-b border-white/5 flex items-center justify-between overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/10 via-[#e53935]/5 to-[#ff6b35]/10 animate-gradient opacity-80" />

        {/* Subtle glow orb */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff6b35]/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center shadow-lg shadow-[#ff6b35]/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] animate-ping opacity-20" />
          </div>
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 text-lg">
              AI Trenér
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ONLINE</span>
            </h3>
            <p className="text-xs text-gray-500">Vždy připraven pomoct</p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="relative z-10 p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          title="Vymazat historii"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* AI Features Bar */}
      <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01]">
        <div className="flex gap-2">
          {aiFeatures.map((feature) => (
            <div 
              key={feature.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium"
              style={{ color: feature.color }}
            >
              <feature.icon className="w-3.5 h-3.5" />
              {feature.label}
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ChatMessage message={msg} />
            
            {/* Add action buttons for plan generation messages */}
            {msg.role === "assistant" && (
              <div className="flex gap-2 mt-2 ml-12">
                {msg.content.toLowerCase().includes("plán") && (
                  <button
                    onClick={handleScheduleWorkout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium hover:bg-[#3b82f6]/20 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Přidat do kalendáře
                  </button>
                )}
                {msg.content.toLowerCase().includes("kalendář") && (
                  <Link href="/dashboard/calendar">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-xs font-medium hover:bg-[#ff6b35]/20 transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                      Otevřít kalendář
                    </button>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />

        {/* Welcome state with quick actions */}
        {messages.length === 1 && showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleQuickAction(action.text)}
                  disabled={isLoading}
                  className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-left"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                  <p className="text-sm font-medium text-gray-200">{action.text}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{action.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Example prompts */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">Nebo zkus napsat:</p>
              <div className="flex flex-wrap gap-2">
                {["Naplánuj trénink na zítra", "Jaké cviky na záda?", "Vytvoř 3denní plán"].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickAction(prompt)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:border-white/10 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Smart Recommendations with glow */}
      {weakBodyParts.length > 0 && messages.length < 3 && (
        <div className="px-4 pb-2">
          <div className="relative p-3 rounded-xl bg-[#ff6b35]/5 border border-[#ff6b35]/20 overflow-hidden group/rec">
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6b35]/5 to-transparent -translate-x-full group-hover/rec:translate-x-full transition-transform duration-1000" />

            <div className="relative flex items-center gap-2 mb-2">
              <Target className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span className="text-xs font-semibold text-[#ff6b35]">Doporučení</span>
              <Zap className="w-3 h-3 text-[#ff6b35] animate-pulse-glow" />
            </div>
            <div className="relative flex flex-wrap gap-2">
              {weakBodyParts.slice(0, 2).map((part, index) => (
                <button
                  key={part.id}
                  onClick={() => handleQuickAction(`Jaké cviky na ${part.name}?`)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#ff6b35]/10 text-xs text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b35]/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {part.name}
                  <span className="text-[#ff6b35]/60 font-bold">{part.progress}%</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar shortcut if workouts scheduled */}
      {scheduledWorkouts.length > 0 && (
        <div className="px-4 pb-2">
          <Link href="/dashboard/calendar">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{scheduledWorkouts.filter(w => !w.completed).length} naplánovaných tréninků</p>
                <p className="text-xs text-gray-500">Klikni pro zobrazení kalendáře</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#3b82f6] transition-colors" />
            </div>
          </Link>
        </div>
      )}

      {/* Premium Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
        <div className={`relative flex gap-2 transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          {/* Glow effect when focused */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-[#ff6b35]/20 to-[#e53935]/20 rounded-2xl blur-lg transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Zeptej se AI trenéra..."
            disabled={isLoading}
            className="relative flex-1 px-4 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff6b35] focus:shadow-lg focus:shadow-[#ff6b35]/10 transition-all duration-300 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="relative p-3.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Input hints */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[10px] text-gray-600">
            Zkus: &quot;Vytvoř mi plán&quot;, &quot;Naplánuj na zítra&quot;, &quot;Motivuj mě&quot;
          </p>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#8b5cf6]" />
            <span className="text-[10px] text-gray-600">AI-powered</span>
          </div>
        </div>
      </form>
    </div>
  );
}
