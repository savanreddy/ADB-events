"use client";

import { useState } from "react";
import type { GalleryImage } from "@/types/content";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

interface MasonryGalleryProps {
  images: GalleryImage[];
}

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-stone">
        No photos yet. Drop some images into{" "}
        <code className="rounded bg-charcoal px-2 py-1 text-gold">/public/gallery</code> to
        see them here.
      </p>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image, i) => (
          <GalleryItem key={image.src} image={image} index={i} onClick={() => setActiveIndex(i)} />
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChangeIndex={setActiveIndex}
        />
      )}
    </>
  );
}
