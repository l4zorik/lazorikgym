"use client";

import { useState, useCallback } from "react";
import { ChatMessage, BodyPart, WorkoutSession } from "@/types";
import { generateAIResponse, generateRecommendations } from "@/lib/aiResponses";

interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  recommendations: string[];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function useAIChat(weakParts: BodyPart[], history: WorkoutSession[] = []): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: history.length > 0 
        ? `Ahoj! Vidím, že máš za sebou už ${history.length} tréninků. Skvělá práce! Jak ti mohu dnes pomoct?`
        : "Ahoj! Jsem tvůj AI trenér. Jak ti mohu dnes pomoct? Ptej se na cviky, výživu, nebo plán tréninku.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate AI thinking delay
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

      // Generate AI response
      const aiResponse = generateAIResponse(content, weakParts, history);

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    },
    [weakParts, isLoading]
  );

  const clearHistory = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Historie vymazána. Jak ti mohu pomoct?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const recommendations = generateRecommendations(weakParts);

  return {
    messages,
    isLoading,
    sendMessage,
    clearHistory,
    recommendations,
  };
}
