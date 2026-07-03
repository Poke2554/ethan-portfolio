"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { resolveMediaSrc } from "@/lib/media";
import { isVideoMedia, type MediaItem } from "@/types/media";

type MediaLightboxProps = {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
};

export function MediaLightbox({ items, initialIndex, onClose }: MediaLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [animKey, setAnimKey] = useState(0);
  const touchStart = useRef<number | null>(null);
  const item = items[index];

  const showPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? items.length - 1 : current - 1));
    setAnimKey((k) => k + 1);
  }, [items.length]);

  const showNext = useCallback(() => {
    setIndex((current) => (current === items.length - 1 ? 0 : current + 1));
    setAnimKey((k) => k + 1);
  }, [items.length]);

  useEffect(() => {
    setIndex(initialIndex);
    setAnimKey((k) => k + 1);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showNext, showPrevious]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPrevious();
    else showNext();
  };

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Visualisation en plein écran"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white/10 md:right-8 md:top-8"
        onClick={onClose}
      >
        Fermer
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 px-4 py-3 text-white transition hover:bg-white/10 md:left-6 md:block"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Média précédent"
          >
            ←
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/20 px-4 py-3 text-white transition hover:bg-white/10 md:right-6 md:block"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Média suivant"
          >
            →
          </button>
        </>
      )}

      <div
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          key={animKey}
          className="lightbox-media relative flex max-h-[80vh] w-full items-center justify-center overflow-hidden"
        >
          {isVideoMedia(item) ? (
            <video
              className="max-h-[80vh] max-w-full"
              controls
              autoPlay
              playsInline
              poster={resolveMediaSrc(item.poster)}
            >
              <source src={resolveMediaSrc(item.src)} type="video/mp4" />
            </video>
          ) : (
            <div className="relative h-[80vh] w-full max-w-6xl">
              <OptimizedImage
                media={{
                  ...item,
                  priority: true,
                }}
                fill
                objectFit="contain"
                sizes="100vw"
              />
            </div>
          )}
        </div>

        <p className="mt-4 max-w-3xl text-center text-sm text-white/75">{item.alt}</p>
        {items.length > 1 && (
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/45">
            {index + 1} / {items.length}
            <span className="mx-2 opacity-30">·</span>
            <span className="hidden sm:inline">Glisser ou flèches</span>
          </p>
        )}
      </div>
    </div>
  );
}
