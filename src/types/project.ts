import type { ImageMedia, MediaItem } from "@/types/media";

export type ProjectCategory = "Photo" | "Vidéo" | "Photo & Vidéo";

export type ProjectMeta = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  titleEn?: string;
  excerptEn?: string;
  descriptionEn?: string;
  category: ProjectCategory;
  year: number;
  /** Liens YouTube — ex: https://youtube.com/watch?v=XXXX */
  youtubeUrls?: string[];
  /** Liens Instagram (Reels, posts vidéo) — ex: https://instagram.com/reel/XXXX */
  instagramUrls?: string[];
};

export type Project = ProjectMeta & {
  categoryLabel: string;
  cover: ImageMedia;
  media: MediaItem[];
};
