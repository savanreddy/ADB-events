"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Primary call-to-action link with a subtle premium hover lift. */
export default function CtaButton({ href, children, className }: CtaButtonProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      <Link
        href={href}
        className={
          className ??
          "inline-block rounded-full bg-gold px-10 py-3 text-sm font-medium tracking-wide text-ink uppercase transition-colors hover:bg-gold-light"
        }
      >
        {children}
      </Link>
    </motion.span>
  );
}
