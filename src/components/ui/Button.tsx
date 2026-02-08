"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#ff6b35] via-[#ff8555] to-[#e53935] text-white shadow-lg shadow-[#ff6b35]/25 hover:shadow-xl hover:shadow-[#ff6b35]/40 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        destructive:
          "bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-white/10 bg-white/[0.02] backdrop-blur-sm text-white hover:bg-white/[0.05] hover:border-[#ff6b35]/30 hover:text-[#ff6b35] hover:shadow-lg hover:shadow-[#ff6b35]/5",
        secondary:
          "bg-white/[0.05] text-white border border-white/10 backdrop-blur-sm hover:bg-white/[0.1] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/5",
        ghost:
          "text-gray-400 hover:bg-white/[0.05] hover:text-white hover:backdrop-blur-sm",
        link:
          "text-[#ff6b35] underline-offset-4 hover:underline decoration-2 hover:decoration-[#ff6b35]/50 transition-colors",
        success:
          "bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0",
        glass:
          "bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, fullWidth, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Načítání...
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export default Button;
export { Button, buttonVariants };
