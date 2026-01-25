"use client";

import { useState, useRef, useEffect } from "react";
import { BodyPart } from "@/types";
import { useAIChat } from "@/hooks/useAIChat";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import { Sparkles, Send, Trash2, ChevronRight, Target } from "lucide-react";
import Link from "next/link";

interface AIAssistantCardProps {
  weakBodyParts: BodyPart[];
}

export default function AIAssistantCard({ weakBodyParts }: AIAssistantCardProps) {
  const { messages, isLoading, sendMessage, clearHistory, recommendations } =
    useAIChat(weakBodyParts);
  const [input, setInput] = useState("");
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
    await sendMessage(message);
    inputRef.current?.focus();
  };

  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#ff6b35]/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center shadow-lg shadow-[#ff6b35]/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Trenér</h3>
            <p className="text-xs text-gray-500">Vždy připraven pomoct</p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          title="Vymazat historii"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Smart Recommendations */}
      {weakBodyParts.length > 0 && (
        <div className="px-4 pb-2">
          <div className="p-3 rounded-xl bg-[#ff6b35]/5 border border-[#ff6b35]/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3.5 h-3.5 text-[#ff6b35]" />
              <span className="text-xs font-semibold text-[#ff6b35]">Doporučení</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {weakBodyParts.slice(0, 2).map((part) => (
                <Link
                  key={part.id}
                  href={`/workout/new?focus=${part.id}`}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#ff6b35]/10 text-xs text-[#ff6b35] hover:bg-[#ff6b35]/20 transition-colors"
                >
                  {part.name}
                  <span className="text-[#ff6b35]/60">{part.progress}%</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["Jaké cviky?", "Slabé partie", "Výživa", "Motivace"].map((text) => (
            <button
              key={text}
              onClick={() => handleQuickAction(text)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap disabled:opacity-50"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zeptej se AI trenéra..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2a2a2a] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff6b35] transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#e53935] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
