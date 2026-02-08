"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
  variant?: "default" | "glass" | "filled";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, helperText, variant = "default", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const variants = {
      default: "bg-[#0a0a0a] border-white/10 focus:border-[#ff6b35] focus:bg-[#0f0f0f]",
      glass: "bg-white/[0.03] backdrop-blur-xl border-white/10 focus:border-[#ff6b35]/50 focus:bg-white/[0.05]",
      filled: "bg-white/[0.05] border-transparent focus:border-[#ff6b35]/50 focus:bg-white/[0.08]",
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium transition-colors duration-200",
              error ? "text-red-400" : "text-gray-400"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-200 group-focus-within:text-[#ff6b35]">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              "flex h-12 w-full rounded-xl border px-4 py-3 text-sm text-white",
              "placeholder:text-gray-500 placeholder:transition-colors",
              "transition-all duration-300 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              icon && "pl-12",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              variants[variant],
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-400" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
export { Input };
