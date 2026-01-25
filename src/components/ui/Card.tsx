"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradient" | "glass";
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      hover = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-2xl transition-all duration-300";

    const variants = {
      default: "bg-bg-card border border-border",
      gradient: "gradient-bg-subtle border border-accent/20",
      glass: "glass border border-border",
    };

    const hoverStyles = hover
      ? "hover:-translate-y-1 hover:bg-bg-card-hover hover:border-border-light cursor-pointer"
      : "";

    const glowStyles = glow ? "glow hover:glow-strong" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${glowStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
