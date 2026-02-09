"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { Quest } from "@/types";
import {
  QuestTemplate,
  createQuestFromTemplate,
  getAllQuestTemplates,
} from "@/lib/questTemplates";

export function useQuests() {
  const [quests, setQuests] = useLocalStorage<Quest[]>("user_quests", []);

  const activeQuests = useMemo(
    () => quests.filter((q) => q.status === "active"),
    [quests]
  );

  const completedQuests = useMemo(
    () => quests.filter((q) => q.status === "completed"),
    [quests]
  );

  const availableTemplates = useMemo(() => {
    const templates = getAllQuestTemplates();
    // Filter out templates where this exact template is already active
    const activeQuestTitles = activeQuests.map((q) => q.title);
    return templates.filter((t) => !activeQuestTitles.includes(t.title));
  }, [activeQuests]);

  const startQuest = useCallback(
    (template: QuestTemplate): Quest => {
      const quest = createQuestFromTemplate(template);
      setQuests((prev) => [...prev, quest]);
      return quest;
    },
    [setQuests]
  );

  const abandonQuest = useCallback(
    (questId: string) => {
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId ? { ...q, status: "abandoned" as const } : q
        )
      );
    },
    [setQuests]
  );

  const updateObjectiveProgress = useCallback(
    (questId: string, objectiveId: string, progress: number) => {
      setQuests((prev) =>
        prev.map((q) => {
          if (q.id !== questId || q.status !== "active") return q;
          const updatedObjectives = q.objectives.map((obj) => {
            if (obj.id !== objectiveId) return obj;
            const newCurrent = Math.min(progress, obj.target);
            return {
              ...obj,
              current: newCurrent,
              completed: newCurrent >= obj.target,
            };
          });
          return { ...q, objectives: updatedObjectives };
        })
      );
    },
    [setQuests]
  );

  const incrementObjective = useCallback(
    (questId: string, objectiveId: string, amount: number = 1) => {
      setQuests((prev) =>
        prev.map((q) => {
          if (q.id !== questId || q.status !== "active") return q;
          const updatedObjectives = q.objectives.map((obj) => {
            if (obj.id !== objectiveId || obj.completed) return obj;
            const newCurrent = Math.min(obj.current + amount, obj.target);
            return {
              ...obj,
              current: newCurrent,
              completed: newCurrent >= obj.target,
            };
          });
          return { ...q, objectives: updatedObjectives };
        })
      );
    },
    [setQuests]
  );

  const completeQuest = useCallback(
    (questId: string): number => {
      let xpGained = 0;
      setQuests((prev) =>
        prev.map((q) => {
          if (q.id !== questId) return q;
          xpGained = q.xpReward;
          return {
            ...q,
            status: "completed" as const,
            completedAt: new Date().toISOString(),
          };
        })
      );
      return xpGained;
    },
    [setQuests]
  );

  const getQuestForBodyPart = useCallback(
    (bodyPartId: string): Quest | null => {
      return activeQuests.find((q) => q.bodyPartId === bodyPartId) || null;
    },
    [activeQuests]
  );

  const checkQuestCompletion = useCallback(
    (questId: string): boolean => {
      const quest = quests.find((q) => q.id === questId);
      if (!quest || quest.status !== "active") return false;
      return quest.objectives.every((obj) => obj.completed);
    },
    [quests]
  );

  // Increment workout objectives for active quests matching bodyPartId
  const progressWorkoutObjectives = useCallback(
    (bodyPartId: string) => {
      setQuests((prev) =>
        prev.map((q) => {
          if (q.status !== "active" || q.bodyPartId !== bodyPartId) return q;
          const updatedObjectives = q.objectives.map((obj) => {
            if (obj.type !== "workout" || obj.completed) return obj;
            const newCurrent = Math.min(obj.current + 1, obj.target);
            return {
              ...obj,
              current: newCurrent,
              completed: newCurrent >= obj.target,
            };
          });
          return { ...q, objectives: updatedObjectives };
        })
      );
    },
    [setQuests]
  );

  // Check and update auto-progress objectives (streak, hydration, sleep, nutrition)
  const checkAutoProgress = useCallback(
    (data: {
      currentStreak: number;
      waterPercentage: number;
      sleepHours: number | null;
      proteinMet: boolean;
    }) => {
      setQuests((prev) =>
        prev.map((q) => {
          if (q.status !== "active") return q;
          const updatedObjectives = q.objectives.map((obj) => {
            if (obj.completed) return obj;

            switch (obj.type) {
              case "streak": {
                const newCurrent = Math.min(data.currentStreak, obj.target);
                return {
                  ...obj,
                  current: newCurrent,
                  completed: newCurrent >= obj.target,
                };
              }
              case "hydration": {
                // Count as a day if water >= 100%
                if (data.waterPercentage >= 100) {
                  const newCurrent = Math.min(obj.current + 1, obj.target);
                  return {
                    ...obj,
                    current: newCurrent,
                    completed: newCurrent >= obj.target,
                  };
                }
                return obj;
              }
              case "recovery": {
                // Count as a night if sleep >= 7 hours
                if (data.sleepHours !== null && data.sleepHours >= 7) {
                  const newCurrent = Math.min(obj.current + 1, obj.target);
                  return {
                    ...obj,
                    current: newCurrent,
                    completed: newCurrent >= obj.target,
                  };
                }
                return obj;
              }
              case "nutrition": {
                if (data.proteinMet) {
                  const newCurrent = Math.min(obj.current + 1, obj.target);
                  return {
                    ...obj,
                    current: newCurrent,
                    completed: newCurrent >= obj.target,
                  };
                }
                return obj;
              }
              default:
                return obj;
            }
          });
          return { ...q, objectives: updatedObjectives };
        })
      );
    },
    [setQuests]
  );

  return {
    quests,
    activeQuests,
    completedQuests,
    availableTemplates,
    startQuest,
    abandonQuest,
    updateObjectiveProgress,
    incrementObjective,
    completeQuest,
    getQuestForBodyPart,
    checkQuestCompletion,
    progressWorkoutObjectives,
    checkAutoProgress,
  };
}
