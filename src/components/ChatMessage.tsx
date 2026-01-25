"use client";

import { ChatMessage as ChatMessageType } from "@/types";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
          ${isAssistant
            ? "bg-gradient-to-br from-[#ff6b35] to-[#e53935]"
            : "bg-white/10"
          }
        `}
      >
        {isAssistant ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`
          max-w-[80%] p-3 rounded-2xl text-sm
          ${isAssistant
            ? "bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-tl-sm"
            : "bg-[#ff6b35]/20 text-white rounded-tr-sm"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tl-sm p-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
