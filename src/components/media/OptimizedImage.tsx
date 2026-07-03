import Image from "next/image";
import { getBlurDataURL, imageSizes, resolveMediaSrc } from "@/lib/media";
import type { ImageMedia } from "@/types/media";

type OptimizedImageProps = {
  media: ImageMedia;
  className?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";
};

export function OptimizedImage({
  media,
  className = "",
  sizes = imageSizes.gallery,
  fill = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const src = resolveMediaSrc(media.src);
  const width = media.width ?? 1600;
  const height = media.height ?? 1200;

  const sharedProps = {
    src,
    alt: media.alt,
    className: `${objectFit === "cover" ? "object-cover" : "object-contain"} ${className}`,
    sizes,
    quality: 82,
    placeholder: "blur" as const,
    blurDataURL: getBlurDataURL(media.blurDataURL),
    priority: media.priority ?? false,
  };

  if (fill) {
    return <Image {...sharedProps} alt={media.alt} fill />;
  }

  return (
    <Image
      {...sharedProps}
      alt={media.alt}
      width={width}
      height={height}
    />
  );
}
