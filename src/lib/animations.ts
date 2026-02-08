import { Variants } from "framer-motion";

// Fade animations
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const scaleOnHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Slide animations
export const slideInFromLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInFromTop: Variants = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Modal animations
export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

export const overlayAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Card animations
export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 60px -15px rgba(255, 107, 53, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const cardPress: Variants = {
  rest: {
    scale: 1,
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Button animations
export const buttonHover: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Progress bar animation
export const progressBarAnimation: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "var(--progress-width, 100%)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

// Glow animation
export const glowAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: [0, 1, 0.5, 1],
    scale: [0.8, 1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Pulse animation
export const pulseAnimation: Variants = {
  hidden: {
    scale: 1,
    opacity: 1,
  },
  visible: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shimmer animation for loading states
export const shimmerAnimation = {
  animate: {
    backgroundPosition: ["200% center", "-200% center"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Floating animation
export const floatingAnimation: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Bounce animation
export const bounceAnimation: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: [-10, 0, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate animation
export const rotateAnimation: Variants = {
  hidden: {
    rotate: 0,
  },
  visible: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Flip animation
export const flipAnimation: Variants = {
  hidden: {
    rotateX: 0,
    opacity: 1,
  },
  hover: {
    rotateX: 10,
    opacity: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

// Spring animation presets
export const springConfig = {
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  snappy: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
  slow: {
    type: "spring",
    stiffness: 50,
    damping: 20,
  },
};

// Easing presets
export const easing = {
  easeOut: [0.25, 0.1, 0.25, 1],
  easeIn: [0.25, 0, 0.75, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.2, 1],
};
