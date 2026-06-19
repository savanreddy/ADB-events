"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types/content";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onChangeIndex }: LightboxProps) {
  const goPrev = useCallback(() => {
    onChangeIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((index + 1) % images.length);
  }, [index, images.length, onChangeIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        type="button"
        aria-label="Close preview"
        className="absolute top-4 right-4 z-10 text-cream transition-colors hover:text-gold"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      <button
        type="button"
        aria-label="Previous image"
        className="absolute left-2 z-10 p-2 text-cream transition-colors hover:text-gold sm:left-6"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
      >
        <ChevronLeft size={36} />
      </button>

      <div
        className="relative h-full max-h-[85vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.name}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <button
        type="button"
        aria-label="Next image"
        className="absolute right-2 z-10 p-2 text-cream transition-colors hover:text-gold sm:right-6"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
      >
        <ChevronRight size={36} />
      </button>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest text-stone uppercase">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}
