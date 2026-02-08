"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  variant?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const animationVariants: Record<string, any> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  bounce: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  },
  elastic: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export default function AnimatedSection({
  children,
  variant = "fadeUp",
  className = "",
  delay = 0,
  duration = 0.5,
  ...props
}: AnimatedSectionProps) {
  const selectedVariant = animationVariants[variant] || animationVariants.fadeUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: {
            delay,
            duration,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for lists
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated item for stagger containers
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  variant?: string;
  delay?: number;
}

export function AnimatedItem({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
}: AnimatedItemProps) {
  const selectedVariant = animationVariants[variant] || animationVariants.fadeUp;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: selectedVariant.hidden,
        visible: {
          ...selectedVariant.visible,
          transition: { delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Scroll reveal wrapper
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px", amount: threshold }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
}: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: -50 * speed }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Typing effect
interface TypingEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypingEffect({
  text,
  className = "",
  speed = 50,
}: TypingEffectProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * (speed / 1000) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Count up animation
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: CountUpProps) {
  return (
    <motion.span className={className}>
      {prefix}
      {to.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
