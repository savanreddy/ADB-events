"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TeamMemberCard({ name, role, bio, photo }: TeamMember) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group h-full rounded-lg border border-white/10 bg-charcoal p-6 transition-colors duration-300 hover:border-gold/40"
    >
      <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full bg-ink ring-1 ring-white/10 transition-all duration-300 group-hover:ring-gold/50">
        {photo ? (
          <Image src={photo} alt={name} fill sizes="128px" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-2xl text-stone">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="mt-5 text-center">
        <p className="font-display text-lg text-cream">{name}</p>
        <p className="mt-1 text-xs tracking-widest text-gold uppercase">{role}</p>
        {bio && <p className="mt-3 text-sm leading-relaxed text-stone">{bio}</p>}
      </div>
    </motion.div>
  );
}
