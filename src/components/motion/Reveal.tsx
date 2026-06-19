"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Vertical offset (px) the element animates in from. */
  y?: number;
  /** Horizontal offset (px) the element animates in from. */
  x?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades + slides content in once it scrolls into view. */
export default function Reveal({ children, className, delay = 0, y = 24, x = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
