import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";
import { localizeCategory, localizeProjectMeta } from "@/lib/project-i18n";
import { extractYouTubeId, youTubeThumbnail } from "@/lib/youtube";
import { parseInstagramUrl } from "@/lib/instagram";
import type { Project, ProjectMeta } from "@/types/project";
import type { ImageMedia, MediaItem } from "@/types/media";

const projectsJsonPath = path.join(process.cwd(), "content", "projects.json");
const mediaRoot = path.join(process.cwd(), "public", "media", "projects");

const imagePattern = /\.(jpe?g|png|webp)$/i;
const videoPattern = /\.mp4$/i;

function isCoverFile(slug: string, file: string): boolean {
  const lower = file.toLowerCase();
  if (lower.startsWith("cover.")) return true;
  return imagePattern.test(lower) && lower.startsWith(`${slug.toLowerCase()}.`);
}

function findCustomCover(slug: string, title: string): ImageMedia | null {
  const dir = path.join(mediaRoot, slug);
  if (!fs.existsSync(dir)) return null;

  const candidates = [
    `${slug}.jpg`,
    `${slug}.jpeg`,
    `${slug}.png`,
    `${slug}.webp`,
    "cover.jpg",
    "cover.jpeg",
    "cover.png",
    "cover.webp",
  ];

  for (const file of candidates) {
    const match = fs
      .readdirSync(dir)
      .find((entry) => entry.localeCompare(file, undefined, { sensitivity: "accent" }) === 0);

    if (match) {
      return {
        type: "image",
        src: `projects/${slug}/${match}`,
        alt: `${title} — couverture`,
        width: 1600,
        height: 2000,
      };
    }
  }

  return null;
}

function readProjectsMeta(): ProjectMeta[] {
  if (!fs.existsSync(projectsJsonPath)) return [];
  const raw = fs.readFileSync(projectsJsonPath, "utf-8");
  return JSON.parse(raw) as ProjectMeta[];
}

function loadLocalMedia(slug: string, title: string): MediaItem[] {
  const dir = path.join(mediaRoot, slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        !isCoverFile(slug, file) && (imagePattern.test(file) || videoPattern.test(file)),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((file, index) => {
    if (videoPattern.test(file)) {
      return {
        type: "video" as const,
        src: `projects/${slug}/${file}`,
        poster: `projects/${slug}/${file.replace(/\.mp4$/i, ".jpg")}`,
        alt: `${title} — vidéo ${index + 1}`,
        width: 1600,
        height: 900,
      };
    }

    return {
      type: "image" as const,
      src: `projects/${slug}/${file}`,
      alt: `${title} — photo ${index + 1}`,
      width: 1600,
      height: 1067,
    };
  });
}

function loadYouTubeMedia(urls: string[] | undefined, title: string): MediaItem[] {
  if (!urls?.length) return [];

  return urls
    .map((url, index) => {
      const videoId = extractYouTubeId(url);
      if (!videoId) return null;

      return {
        type: "youtube" as const,
        videoId,
        src: url.trim(),
        alt: `${title} — vidéo ${index + 1}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function loadInstagramMedia(urls: string[] | undefined, title: string): MediaItem[] {
  if (!urls?.length) return [];

  return urls
    .map((url, index) => {
      const parsed = parseInstagramUrl(url);
      if (!parsed) return null;

      return {
        type: "instagram" as const,
        shortcode: parsed.shortcode,
        kind: parsed.kind,
        src: url.trim(),
        alt: `${title} — Instagram ${index + 1}`,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function youtubeCover(videoId: string, alt: string): ImageMedia {
  return {
    type: "image",
    src: youTubeThumbnail(videoId),
    alt,
    width: 1280,
    height: 720,
  };
}

function fallbackCover(slug: string, title: string): ImageMedia {
  return {
    type: "image",
    src: `projects/${slug}/.placeholder`,
    alt: `${title} — couverture`,
    width: 1600,
    height: 1067,
  };
}

function mediaToCover(media: MediaItem | undefined, slug: string, title: string): ImageMedia {
  const item = media ?? fallbackCover(slug, title);

  if (item.type === "youtube") {
    return youtubeCover(item.videoId, item.alt);
  }

  if (item.type === "instagram") {
    return fallbackCover(slug, title);
  }

  if (item.type === "video") {
    return {
      type: "image",
      src: item.poster,
      alt: item.alt,
      width: item.width ?? 1600,
      height: item.height ?? 900,
    };
  }

  return item;
}

export function getProjects(locale: Locale = "fr"): Project[] {
  return readProjectsMeta().map((meta) => {
    const localized = localizeProjectMeta(meta, locale);
    const localMedia = loadLocalMedia(meta.slug, localized.title);
    const youtubeMedia = loadYouTubeMedia(meta.youtubeUrls, localized.title);
    const instagramMedia = loadInstagramMedia(meta.instagramUrls, localized.title);
    const media = [...localMedia, ...youtubeMedia, ...instagramMedia];

    const cover =
      findCustomCover(meta.slug, localized.title) ??
      mediaToCover(media[0], meta.slug, localized.title);

    return {
      ...meta,
      ...localized,
      categoryLabel: localizeCategory(meta.category, locale),
      cover,
      media,
    };
  });
}

export function getProjectBySlug(slug: string, locale: Locale = "fr"): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return readProjectsMeta().map((project) => project.slug);
}

function sortProjectsByRecency(projects: Project[], meta: ProjectMeta[]): Project[] {
  return [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return meta.findIndex((m) => m.slug === b.slug) - meta.findIndex((m) => m.slug === a.slug);
  });
}

export function getLatestProject(locale: Locale = "fr"): Project | undefined {
  const projects = getProjects(locale);
  if (projects.length === 0) return undefined;

  return sortProjectsByRecency(projects, readProjectsMeta())[0];
}

export function getLatestPhotoProject(locale: Locale = "fr"): Project | undefined {
  const photoProjects = getProjects(locale).filter((project) => project.category === "Photo");
  if (photoProjects.length === 0) return undefined;

  return sortProjectsByRecency(photoProjects, readProjectsMeta())[0];
}

export function getProjectFirstImage(project: Project) {
  return project.cover;
}

export function getProjectsMeta(): ProjectMeta[] {
  return readProjectsMeta();
}

export function getProjectPhotoPath(slug: string): string {
  return `public/media/projects/${slug}/`;
}
