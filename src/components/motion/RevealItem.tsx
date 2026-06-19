"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealItemVariants } from "./RevealGroup";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
}

/** Use inside a RevealGroup — animates as part of the parent's stagger. */
export default function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div variants={revealItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
