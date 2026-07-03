const DEFAULT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

export function resolveMediaSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  return `/media/${path}`;
}

export function getBlurDataURL(blurDataURL?: string): string {
  return blurDataURL ?? DEFAULT_BLUR;
}

export const imageSizes = {
  hero: "(max-width: 768px) 100vw, 50vw",
  cover: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  gallery: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px",
  background: "100vw",
} as const;
