"use client";

import { useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { resolveMediaSrc } from "@/lib/media";
import type { VideoMedia } from "@/types/media";

type OptimizedVideoProps = {
  media: VideoMedia;
  className?: string;
};

export function OptimizedVideo({ media, className = "" }: OptimizedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    setShouldLoad(true);

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-black/5 ${className}`}>
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 z-10 flex items-center justify-center"
          aria-label={`Lire la vidéo : ${media.alt}`}
        >
          <OptimizedImage
            media={{
              type: "image",
              src: media.poster,
              alt: media.alt,
              width: media.width ?? 1600,
              height: media.height ?? 900,
              priority: false,
            }}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="transition duration-500 group-hover:scale-[1.01]"
          />
          <span className="absolute inset-0 bg-black/15 transition group-hover:bg-black/25" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white backdrop-blur-sm">
            ▶
          </span>
        </button>
      )}

      {shouldLoad && (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${isPlaying ? "relative z-20" : "hidden"}`}
          controls
          playsInline
          preload="none"
          poster={resolveMediaSrc(media.poster)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={resolveMediaSrc(media.src)} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
