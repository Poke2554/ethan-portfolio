import Image from "next/image";
import { getBlurDataURL, imageSizes, resolveMediaSrc } from "@/lib/media";
import type { ImageMedia } from "@/types/media";

type OptimizedImageProps = {
  media: ImageMedia;
  className?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";
  quality?: number;
  placeholder?: "blur" | "empty";
};

export function OptimizedImage({
  media,
  className = "",
  sizes = imageSizes.gallery,
  fill = false,
  objectFit = "cover",
  quality = 75,
  placeholder,
}: OptimizedImageProps) {
  const src = resolveMediaSrc(media.src);
  const width = media.width ?? 1600;
  const height = media.height ?? 1200;
  const usePriority = media.priority ?? false;
  const useBlur = placeholder ?? (usePriority ? "blur" : "empty");

  const sharedProps = {
    src,
    alt: media.alt,
    className: `${objectFit === "cover" ? "object-cover" : "object-contain"} ${className}`,
    sizes,
    quality,
    priority: usePriority,
    ...(useBlur === "blur"
      ? {
          placeholder: "blur" as const,
          blurDataURL: getBlurDataURL(media.blurDataURL),
        }
      : {
          placeholder: "empty" as const,
        }),
  };

  if (fill) {
    return <Image {...sharedProps} alt={media.alt} fill />;
  }

  return <Image {...sharedProps} alt={media.alt} width={width} height={height} />;
}
