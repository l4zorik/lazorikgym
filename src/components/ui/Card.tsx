"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "ghost" | "gradient" | "glass";
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, glow = false, ...props }, ref) => {
    const variants = {
      default: "bg-white/[0.02] border border-white/5 backdrop-blur-sm",
      elevated: "bg-[#0a0a0a] border border-white/5 shadow-2xl shadow-black/40",
      outline: "bg-transparent border-2 border-white/10 hover:border-white/20",
      ghost: "bg-transparent",
      gradient: "bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/10",
      glass: "bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-xl shadow-black/20",
      neon: "bg-[#0a0a0a] border border-[#ff6b35]/20 shadow-lg shadow-[#ff6b35]/5",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl text-white transition-all duration-300 ease-out",
          variants[variant],
          hover && "cursor-pointer hover:border-[#ff6b35]/40 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#ff6b35]/10",
          glow && "hover:shadow-lg hover:shadow-[#ff6b35]/20",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-bold leading-tight tracking-tight text-white", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-4 p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export default Card;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
