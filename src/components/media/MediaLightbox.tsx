"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { InstagramEmbed } from "@/components/media/InstagramEmbed";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { resolveMediaSrc } from "@/lib/media";
import { isInstagramMedia, isVideoMedia, isYouTubeMedia, type MediaItem } from "@/types/media";

type MediaLightboxProps = {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
};

export function MediaLightbox({ items, initialIndex, onClose }: MediaLightboxProps) {
  const t = useTranslations("projects");
  const [index, setIndex] = useState(initialIndex);
  const item = items[index];

  const showPrevious = useCallback(() => {
    setIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  }, [items.length]);

  const showNext = useCallback(() => {
    setIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  }, [items.length]);

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

  if (!item || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t("lightboxLabel")}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white/20 md:right-8 md:top-8"
        onClick={onClose}
      >
        {t("close")}
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-lg text-white transition hover:bg-white/20 md:left-8"
            onClick={showPrevious}
            aria-label={t("previous")}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-lg text-white transition hover:bg-white/20 md:right-8"
            onClick={showNext}
            aria-label={t("next")}
          >
            ›
          </button>
        </>
      )}

      <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
        {isYouTubeMedia(item) ? (
          <YouTubeEmbed videoId={item.videoId} title={item.alt} className="max-h-[75vh] w-full" />
        ) : isInstagramMedia(item) ? (
          <InstagramEmbed
            shortcode={item.shortcode}
            kind={item.kind}
            title={item.alt}
            className="max-h-[82vh]"
          />
        ) : isVideoMedia(item) ? (
          <video
            className="max-h-[82vh] max-w-full"
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
            key={item.src}
            src={resolveMediaSrc(item.src)}
            alt={item.alt}
            className="max-h-[82vh] max-w-full object-contain"
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
    </div>,
    document.body,
  );
}
