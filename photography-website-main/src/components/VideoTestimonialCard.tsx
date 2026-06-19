"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getYouTubeId, getYouTubeThumbnail, loadYouTubeIframeApi, type YouTubePlayer } from "@/lib/youtube";
import type { TestimonialItem } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function VideoTestimonialCard({ name, role, videoUrl }: TestimonialItem) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const id = videoUrl ? getYouTubeId(videoUrl) : null;

  useEffect(() => {
    if (!id || !mountRef.current) return;
    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !mountRef.current || !window.YT) return;
      const player = new window.YT.Player(mountRef.current, {
        videoId: id,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          loop: 1,
          playlist: id,
          mute: 0,
        },
        events: {
          onReady: (event) => {
            const iframe = event.target.getIframe();
            iframe.classList.add("pointer-events-none", "absolute", "inset-0", "h-full", "w-full");
            playerRef.current = event.target;
            setReady(true);
          },
        },
      });
      return player;
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [id]);

  const handleToggle = () => {
    if (!ready) return;
    if (playing) {
      playerRef.current?.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current?.playVideo();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{ transformOrigin: "center center" }}
      className="relative flex h-full flex-col rounded-lg border border-white/10 bg-charcoal transition-[border-color,box-shadow] duration-300 hover:z-30 hover:border-gold/50 hover:shadow-2xl hover:shadow-ink/60"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-ink">
        {id ? (
          <>
            <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
            <button
              type="button"
              onClick={handleToggle}
              aria-label={
                playing ? `Pause video testimonial from ${name}` : `Play video testimonial from ${name}`
              }
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                playing && ready ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={getYouTubeThumbnail(id)}
                alt={`${name} video testimonial`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-ink shadow-lg transition-transform duration-200 hover:scale-105">
                  <Play size={22} fill="currentColor" />
                </span>
              </div>
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone">
            Video coming soon
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-white/10 p-5">
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
