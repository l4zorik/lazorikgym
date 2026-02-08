"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "default" | "pills" | "underline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "inline-flex h-12 items-center justify-center rounded-xl bg-white/[0.03] backdrop-blur-sm p-1.5 text-gray-400 border border-white/5",
    pills: "inline-flex h-12 items-center justify-center rounded-full bg-white/[0.03] backdrop-blur-sm p-1.5 text-gray-400 border border-white/5",
    underline: "inline-flex h-12 items-center justify-center border-b border-white/10 text-gray-400",
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "pills" | "underline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:via-[#ff8555] data-[state=active]:to-[#e53935] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#ff6b35]/25 data-[state=active]:scale-[1.02]",
      "data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/[0.05]"
    ),
    pills: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6b35] data-[state=active]:to-[#e53935] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#ff6b35]/25",
      "data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/[0.05]"
    ),
    underline: cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-semibold transition-all duration-300 border-b-2 border-transparent -mb-[1px]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-[#ff6b35] data-[state=active]:border-[#ff6b35]",
      "data-[state=inactive]:hover:text-white data-[state=inactive]:hover:border-white/20"
    ),
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-[#030303] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35] focus-visible:ring-offset-2",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95 data-[state=active]:duration-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
