"use client";

import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { ReactNode } from "react";

interface DraggableItem {
  id: string;
  [key: string]: unknown;
}

interface DraggableExerciseListProps<T extends DraggableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
}

export default function DraggableExerciseList<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
}: DraggableExerciseListProps<T>) {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className="space-y-4"
    >
      {items.map((item, index) => (
        <Reorder.Item
          key={item.id}
          value={item}
          className="relative"
        >
          <div className="flex items-start gap-0">
            {/* Drag Handle */}
            <div className="pt-5 pr-1 cursor-grab active:cursor-grabbing touch-none">
              <GripVertical className="w-5 h-5 text-gray-600 hover:text-gray-400 transition-colors" />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              {renderItem(item, index)}
            </div>
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
