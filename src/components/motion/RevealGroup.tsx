"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Delay (seconds) between each child's reveal animation. */
  stagger?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Wraps a list of children and reveals them with a staggered
 * fade/slide-up animation as the group scrolls into view.
 * Each direct child is animated individually — wrap each item
 * in a plain element (e.g. a grid cell).
 */
export default function RevealGroup({ children, className, stagger = 0.1 }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={stagger}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { item as revealItemVariants };
