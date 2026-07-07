import type { ImageMedia, MediaItem } from "@/types/media";

export type ProjectCategory = "Photo" | "Vidéo" | "Photo & Vidéo";

export type ProjectMeta = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: ProjectCategory;
  year: number;
  /** Liens YouTube — un par ligne, ex: https://youtube.com/watch?v=XXXX */
  youtubeUrls?: string[];
};

export type Project = ProjectMeta & {
  cover: ImageMedia;
  media: MediaItem[];
};
