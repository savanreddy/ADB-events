"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  images: string[];
  photographerName: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_DURATION = 3000;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero({ title, subtitle, images, photographerName }: HeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[90dvh] w-full items-center justify-center overflow-hidden bg-charcoal">
      <AnimatePresence>
        {images[index] && (
          <motion.div
            key={images[index]}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: EASE },
              scale: { duration: SLIDE_DURATION / 1000, ease: "linear" },
            }}
          >
            <Image
              src={images[index]}
              alt={title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,12,13,0.6)_100%)]"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          variants={item}
          className="mb-5 text-[0.7rem] tracking-[0.35em] text-gold-light uppercase sm:text-xs"
        >
          {photographerName}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-5xl leading-[1.05] font-normal tracking-tight text-balance text-cream sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty text-stone/90 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="rounded-full bg-gold px-9 py-3.5 text-xs font-medium tracking-[0.12em] text-ink uppercase transition-colors hover:bg-gold-light"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-cream/25 px-9 py-3.5 text-xs font-medium tracking-[0.12em] text-cream uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Book a Session
          </Link>
        </motion.div>
      </motion.div>

      {images.length > 1 && (
        <div
          className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 gap-2.5"
          aria-hidden="true"
        >
          {images.map((src, i) => (
            <span
              key={src}
              className={`h-px rounded-full transition-all duration-700 ${
                i === index ? "w-8 bg-gold" : "w-4 bg-cream/25"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
