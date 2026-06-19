"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import VideoTestimonialCard from "@/components/VideoTestimonialCard";
import type { TestimonialItem } from "@/types/content";

interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-testimonial-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const showArrows = testimonials.length > 1;

  return (
    <div className="relative mt-12">
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-6"
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            data-testimonial-card
            className="w-[85vw] shrink-0 snap-center sm:w-[420px]"
          >
            {testimonial.videoUrl ? (
              <VideoTestimonialCard {...testimonial} />
            ) : (
              <TestimonialCard {...testimonial} />
            )}
          </div>
        ))}
      </div>

      {showArrows && (
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone transition-colors hover:border-gold/40 hover:text-gold"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone transition-colors hover:border-gold/40 hover:text-gold"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
