"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { OptimizedVideo } from "@/components/media/OptimizedVideo";
import { isVideoMedia, type MediaItem } from "@/types/media";

const MediaLightbox = dynamic(
  () => import("@/components/media/MediaLightbox").then((mod) => mod.MediaLightbox),
  { ssr: false },
);

type MediaGalleryProps = {
  items: MediaItem[];
};

export function MediaGallery({ items }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, index) => (
          <button
            key={`${item.type}-${item.src}-${index}`}
            type="button"
            className="group relative aspect-square cursor-zoom-in overflow-hidden border border-border bg-neutral-100"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Agrandir : ${item.alt}`}
          >
            {isVideoMedia(item) ? (
              <OptimizedVideo media={item} className="h-full w-full object-cover" />
            ) : (
              <OptimizedImage
                media={{ ...item, priority: index < 2 }}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={70}
                placeholder="empty"
                className="transition duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
              <span className="rounded-full border border-white/60 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                Agrandir
              </span>
            </span>
          </button>
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
