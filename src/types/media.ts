export type ImageMedia = {
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  priority?: boolean;
};

export type VideoMedia = {
  type: "video";
  src: string;
  poster: string;
  alt: string;
  width?: number;
  height?: number;
};

export type MediaItem = ImageMedia | VideoMedia;

export function isVideoMedia(media: MediaItem): media is VideoMedia {
  return media.type === "video";
}
