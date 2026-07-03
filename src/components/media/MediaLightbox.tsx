"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { resolveMediaSrc } from "@/lib/media";
import { isVideoMedia, type MediaItem } from "@/types/media";

type MediaLightboxProps = {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
};

export function MediaLightbox({ items, initialIndex, onClose }: MediaLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<number | null>(null);
  const item = items[index];

  const showPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  }, [items.length]);

  const showNext = useCallback(() => {
    setIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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

  if (!mounted || !item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Visualisation en plein écran">
      <button
        type="button"
        className="absolute inset-0 bg-black/94"
        onClick={onClose}
        aria-label="Fermer la visualisation"
      />

      <button
        type="button"
        className="absolute right-4 top-4 z-[210] rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white/10 md:right-8 md:top-8"
        onClick={onClose}
      >
        Fermer
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-[210] hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-white transition hover:bg-white/10 md:left-6 md:block"
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
            className="absolute right-2 top-1/2 z-[210] hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-white transition hover:bg-white/10 md:right-6 md:block"
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
        className="pointer-events-none absolute inset-0 z-[205] flex items-center justify-center p-4 md:p-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="pointer-events-auto flex max-h-[90vh] w-full max-w-6xl flex-col items-center">
          <div className="flex max-h-[78vh] w-full items-center justify-center">
            {isVideoMedia(item) ? (
              <video
                className="max-h-[78vh] max-w-full"
                controls
                autoPlay
                playsInline
                poster={resolveMediaSrc(item.poster)}
              >
                <source src={resolveMediaSrc(item.src)} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resolveMediaSrc(item.src)}
                alt={item.alt}
                className="max-h-[78vh] max-w-full object-contain"
                draggable={false}
              />
            )}
          </div>

          <p className="mt-4 max-w-3xl text-center text-sm text-white/80">{item.alt}</p>
          {items.length > 1 && (
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/50">
              {index + 1} / {items.length}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
