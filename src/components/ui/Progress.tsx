"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = "default", size = "md", showValue = false, animated = false, striped = false, ...props }, ref) => {
  const variants = {
    default: "from-[#ff6b35] via-[#ff8555] to-[#e53935]",
    success: "from-emerald-500 via-emerald-400 to-green-500",
    warning: "from-amber-500 via-amber-400 to-orange-500",
    danger: "from-red-500 via-rose-400 to-rose-500",
    info: "from-blue-500 via-cyan-400 to-sky-500",
    purple: "from-purple-500 via-violet-400 to-indigo-500",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
    xl: "h-5",
  };

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-white/[0.05] backdrop-blur-sm",
          sizes[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 rounded-full bg-gradient-to-r transition-all duration-700 ease-out relative",
            "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
            animated && "animate-pulse",
            striped && "bg-[length:20px_20px]",
            variants[variant]
          )}
          style={{ 
            transform: `translateX(-${100 - value}%)`,
            backgroundSize: striped ? "20px 20px" : undefined,
          }}
        >
          {striped && (
            <div 
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                backgroundSize: "20px 20px",
              }}
            />
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-medium text-gray-500">{value}%</span>
          <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full bg-gradient-to-r", variants[variant])}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
export default Progress;
