"use client";

import { useState } from "react";
import { MediaLightbox } from "@/components/media/MediaLightbox";
import { OptimizedVideo } from "@/components/media/OptimizedVideo";
import { resolveMediaSrc } from "@/lib/media";
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
            className="overflow-hidden border border-border bg-white"
          >
            <button
              type="button"
              className="group relative w-full cursor-zoom-in overflow-hidden"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Agrandir : ${item.alt}`}
            >
              <div className="relative aspect-[4/3] w-full bg-neutral-100 md:aspect-[16/10]">
                {isVideoMedia(item) ? (
                  <OptimizedVideo media={item} className="h-full w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveMediaSrc(item.src)}
                    alt={item.alt}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/60 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">
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
