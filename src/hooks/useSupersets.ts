"use client";

import { useState, useCallback } from "react";
import { SupersetGroup } from "@/types";

const SUPERSET_COLORS = [
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#ef4444", // red
  "#84cc16", // lime
];

export function useSupersets() {
  const [groups, setGroups] = useState<SupersetGroup[]>([]);

  const createGroup = useCallback((exerciseIds: string[]) => {
    if (exerciseIds.length < 2) return null;

    const colorIndex = groups.length % SUPERSET_COLORS.length;
    const newGroup: SupersetGroup = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Superset ${groups.length + 1}`,
      color: SUPERSET_COLORS[colorIndex],
      exerciseIds,
    };

    setGroups(prev => [...prev, newGroup]);
    return newGroup;
  }, [groups.length]);

  const addToGroup = useCallback((groupId: string, exerciseId: string) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId && !g.exerciseIds.includes(exerciseId)
          ? { ...g, exerciseIds: [...g.exerciseIds, exerciseId] }
          : g
      )
    );
  }, []);

  const removeFromGroup = useCallback((groupId: string, exerciseId: string) => {
    setGroups(prev => {
      const updated = prev.map(g =>
        g.id === groupId
          ? { ...g, exerciseIds: g.exerciseIds.filter(id => id !== exerciseId) }
          : g
      );
      // Remove groups with less than 2 exercises
      return updated.filter(g => g.exerciseIds.length >= 2);
    });
  }, []);

  const disbandGroup = useCallback((groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
  }, []);

  const getGroupForExercise = useCallback((exerciseId: string) => {
    return groups.find(g => g.exerciseIds.includes(exerciseId)) || null;
  }, [groups]);

  const isInSuperset = useCallback((exerciseId: string) => {
    return groups.some(g => g.exerciseIds.includes(exerciseId));
  }, [groups]);

  return {
    groups,
    setGroups,
    createGroup,
    addToGroup,
    removeFromGroup,
    disbandGroup,
    getGroupForExercise,
    isInSuperset,
    SUPERSET_COLORS,
  };
}
