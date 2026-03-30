"use client";

import { useState, useCallback } from "react";
import { ChatMessage, BodyPart, WorkoutSession } from "@/types";
import { generateAIResponse, generateRecommendations } from "@/lib/aiResponses";
import { getAIResponse, model as hasGemini } from "@/lib/gemini";
import { useDailyTracker } from "@/hooks/useDailyTracker";
import { useGoals } from "@/hooks/useGoals";
import { bodyPartsData } from "@/lib/data";
import { getMartialArtById } from "@/lib/martialArtsData";
import { getBookById } from "@/lib/booksData";
import { getFacilityById } from "@/lib/facilitiesData";

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
  const tracker = useDailyTracker();
  const goals = useGoals();

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

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        let aiResponseContent = "";

        if (hasGemini) {
          // Prepare rich context for the AI
          const context = {
            user_history: history.slice(-5), // Last 5 workouts
            weak_parts: weakParts.map(p => ({ name: p.name, progress: p.progress })),
            daily_stats: {
              calories: tracker.todayCalories,
              water: tracker.waterPercentage,
              sleep: tracker.todaySleep,
              mood: tracker.todayMoodEntry
            },
            active_goals: goals.activeGoals.map(g => {
              if (g.category === 'body_part') {
                const part = bodyPartsData.find(p => p.id === g.bodyPartId);
                return part?.name || 'Unknown';
              } else if (g.category === 'martial_art' && g.martialArtId) {
                const ma = getMartialArtById(g.martialArtId);
                return ma?.name || 'Unknown';
              } else if (g.category === 'book' && g.bookId) {
                const book = getBookById(g.bookId);
                return book?.title || 'Unknown';
              } else if (g.category === 'facility' && g.facilityId) {
                const facility = getFacilityById(g.facilityId);
                return facility?.name || 'Unknown';
              }
              return 'Unknown';
            }),
            stats: {
              total_workouts: history.length,
              current_streak: 0 // Will be added from streak hook if needed
            }
          };

          aiResponseContent = await getAIResponse(content, context);
        } else {
          // Fallback to legacy template system if no API key
          await new Promise((resolve) => setTimeout(resolve, 1000));
          aiResponseContent = generateAIResponse(content, weakParts, history);
        }

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: aiResponseContent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [weakParts, history, tracker, goals, isLoading]
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
