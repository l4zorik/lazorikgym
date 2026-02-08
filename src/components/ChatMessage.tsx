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
      className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"} group`}
    >
      {/* Avatar */}
      <div
        className={`
          relative w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110
          ${isAssistant
            ? "bg-gradient-to-br from-[#ff6b35] to-[#e53935] shadow-lg shadow-[#ff6b35]/20"
            : "bg-white/10"
          }
        `}
      >
        {isAssistant ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-gray-400" />
        )}
        {/* Subtle glow for assistant */}
        {isAssistant && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e53935] blur-md opacity-30" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`
          relative max-w-[80%] p-3 rounded-2xl text-sm transition-all duration-300 group-hover:scale-[1.01]
          ${isAssistant
            ? "bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-tl-sm message-glow"
            : "bg-gradient-to-br from-[#ff6b35]/20 to-[#e53935]/20 text-white rounded-tr-sm border border-[#ff6b35]/10"
          }
        `}
      >
        {/* Shimmer effect on hover for assistant */}
        {isAssistant && (
          <div className="absolute inset-0 rounded-2xl rounded-tl-sm overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
        )}

        <span className="relative">{message.content}</span>

        {/* Subtle gradient line at bottom for assistant */}
        {isAssistant && (
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#ff6b35]/20">
        <Bot className="w-4 h-4 text-white" />
        {/* Pulsing glow */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#e53935] animate-ping opacity-30" />
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tl-sm p-3 relative overflow-hidden">
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6b35]/5 to-transparent animate-shimmer" />

        <div className="relative flex gap-1.5">
          <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-bounce shadow-lg shadow-[#ff6b35]/30" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-bounce shadow-lg shadow-[#ff6b35]/30" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-bounce shadow-lg shadow-[#ff6b35]/30" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
