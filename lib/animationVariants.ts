// lib/animationVariants.ts
export const cardContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const modalVariants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.4, ease: "easeIn" } },
};

// AI Theme Animations
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glowPulseVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(34, 211, 238, 0.3)",
      "0 0 40px rgba(34, 211, 238, 0.6)",
      "0 0 20px rgba(34, 211, 238, 0.3)",
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const gradientShiftVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
