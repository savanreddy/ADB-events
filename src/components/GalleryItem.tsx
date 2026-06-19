"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/types/content";

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GalleryItem({ image, index, onClick }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: EASE }}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-charcoal"
      aria-label={`Open ${image.name} in full screen`}
    >
      <div
        className={`absolute inset-0 animate-pulse bg-white/5 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={image.src}
        alt={image.name}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        onLoad={() => setLoaded(true)}
        className={`h-auto w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Expand className="text-cream" size={26} />
      </span>
    </motion.button>
  );
}
