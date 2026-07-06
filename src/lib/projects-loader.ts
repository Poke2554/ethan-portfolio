import fs from "fs";
import path from "path";
import type { Project, ProjectMeta } from "@/types/project";
import type { MediaItem } from "@/types/media";

const projectsJsonPath = path.join(process.cwd(), "content", "projects.json");
const mediaRoot = path.join(process.cwd(), "public", "media", "projects");

const imagePattern = /\.(jpe?g|png|webp)$/i;
const videoPattern = /\.mp4$/i;

function readProjectsMeta(): ProjectMeta[] {
  if (!fs.existsSync(projectsJsonPath)) return [];
  const raw = fs.readFileSync(projectsJsonPath, "utf-8");
  return JSON.parse(raw) as ProjectMeta[];
}

function loadMediaFromSlug(slug: string, title: string): MediaItem[] {
  const dir = path.join(mediaRoot, slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((file) => imagePattern.test(file) || videoPattern.test(file))
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

function fallbackCover(slug: string, title: string): MediaItem {
  return {
    type: "image",
    src: `projects/${slug}/.placeholder`,
    alt: `${title} — couverture`,
    width: 1600,
    height: 1067,
  };
}

export function getProjects(): Project[] {
  return readProjectsMeta().map((meta) => {
    const media = loadMediaFromSlug(meta.slug, meta.title);
    return {
      ...meta,
      cover: media[0] ?? fallbackCover(meta.slug, meta.title),
      media,
    };
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return readProjectsMeta().map((project) => project.slug);
}

export function getLatestProject(): Project | undefined {
  const projects = getProjects();
  if (projects.length === 0) return undefined;

  const meta = readProjectsMeta();
  return [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return meta.findIndex((m) => m.slug === b.slug) - meta.findIndex((m) => m.slug === a.slug);
  })[0];
}

export function getProjectFirstImage(project: Project) {
  const firstMedia = project.media[0] ?? project.cover;

  if (firstMedia.type === "image") {
    return firstMedia;
  }

  return {
    type: "image" as const,
    src: firstMedia.poster,
    alt: firstMedia.alt,
    width: firstMedia.width ?? 1600,
    height: firstMedia.height ?? 1067,
  };
}

export function getProjectsMeta(): ProjectMeta[] {
  return readProjectsMeta();
}

export function getProjectPhotoPath(slug: string): string {
  return `public/media/projects/${slug}/`;
}
