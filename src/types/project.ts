import type { MediaItem } from "@/types/media";

export type ProjectCategory = "Photo" | "Vidéo" | "Photo & Vidéo";

export type ProjectMeta = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: ProjectCategory;
  year: number;
};

export type Project = ProjectMeta & {
  cover: MediaItem;
  media: MediaItem[];
};
