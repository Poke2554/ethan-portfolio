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

export type YouTubeMedia = {
  type: "youtube";
  videoId: string;
  src: string;
  alt: string;
};

export type MediaItem = ImageMedia | VideoMedia | YouTubeMedia;

export function isVideoMedia(media: MediaItem): media is VideoMedia {
  return media.type === "video";
}

export function isYouTubeMedia(media: MediaItem): media is YouTubeMedia {
  return media.type === "youtube";
}
