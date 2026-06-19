"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "@/types/content";

interface ServiceCardProps extends ServiceItem {
  index?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServiceCard({ title, description, price, index }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-charcoal p-8 transition-[border-color,box-shadow] duration-300 hover:border-gold/40 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.75)] sm:p-9"
    >
      {typeof index === "number" && (
        <span className="font-display text-5xl font-normal text-white/[0.06] transition-colors duration-300 group-hover:text-gold/15">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3 className="mt-5 font-display text-xl font-normal tracking-tight text-cream">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone/80">{description}</p>
      <p className="mt-7 inline-block self-start rounded-full border border-gold/30 px-4 py-1.5 text-[0.7rem] tracking-[0.1em] text-gold uppercase">
        {price}
      </p>
    </motion.div>
  );
}
