"use client";

import { motion } from "framer-motion";
import type { TestimonialItem } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TestimonialCard({ name, role, text }: TestimonialItem) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex h-full flex-col rounded-lg border border-white/10 bg-charcoal p-8 transition-colors duration-300 hover:border-gold/40 sm:p-9"
    >
      <span className="font-display text-6xl leading-none text-gold/20" aria-hidden="true">
        &ldquo;
      </span>
      <p className="-mt-2 flex-1 font-display text-lg leading-relaxed text-pretty text-cream/95 italic">
        {text}
      </p>
      <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-sm text-gold">
          {name.charAt(0)}
        </span>
        <div>
          <p className="text-sm text-cream">{name}</p>
          <p className="text-xs tracking-widest text-gold uppercase">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
