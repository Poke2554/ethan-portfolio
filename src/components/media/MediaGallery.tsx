"use client";

import { useState } from "react";
import { MediaLightbox } from "@/components/media/MediaLightbox";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { OptimizedVideo } from "@/components/media/OptimizedVideo";
import { isVideoMedia, type MediaItem } from "@/types/media";

type MediaGalleryProps = {
  items: MediaItem[];
};

export function MediaGallery({ items }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 md:gap-8">
        {items.map((item, index) => (
          <figure
            key={`${item.type}-${item.src}-${index}`}
            className="overflow-hidden border border-border bg-surface"
          >
            <button
              type="button"
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden md:aspect-[16/10]"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Agrandir : ${item.alt}`}
            >
              {isVideoMedia(item) ? (
                <OptimizedVideo media={item} className="pointer-events-none h-full w-full" />
              ) : (
                <OptimizedImage
                  media={item}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="transition duration-500 group-hover:scale-[1.02]"
                />
              )}
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              <span className="absolute bottom-4 right-4 rounded-full border border-white/60 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">
                Agrandir
              </span>
            </button>
            <figcaption className="px-4 py-3 text-sm text-muted">{item.alt}</figcaption>
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          items={items}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
