import type { MediaItem } from "@/types/media";

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: "Photo" | "Vidéo" | "Photo & Vidéo";
  year: number;
  cover: MediaItem;
  media: MediaItem[];
};

const projetTestFiles = [
  "IMG_0493.jpg",
  "IMG_0588.jpg",
  "IMG_1145.jpg",
  "IMG_1346.jpg",
  "IMG_1359.jpg",
  "IMG_7668.jpg",
  "IMG_7867.jpg",
  "IMG_7957.jpg",
  "IMG_9707.jpg",
];

function projectImage(file: string, alt: string): MediaItem {
  return {
    type: "image",
    src: `projects/projet-test/${file}`,
    alt,
    width: 1600,
    height: 1067,
  };
}

const projetTestMedia = projetTestFiles.map((file, index) =>
  projectImage(file, `Projet test — photo ${index + 1}`),
);

export const projects: Project[] = [
  {
    slug: "projet-test",
    title: "Projet test",
    excerpt: "Première série intégrée au portfolio — sélection de photos test.",
    description:
      "Ce projet sert de base pour valider la mise en page du portfolio. Il regroupe une sélection de photographies issues du dossier Projet test. Chaque image peut être ouverte en plein écran pour apprécier le détail et la composition.",
    category: "Photo",
    year: 2026,
    cover: projetTestMedia[0],
    media: projetTestMedia,
  },
  {
    slug: "lumieres-du-soir",
    title: "Lumières du soir",
    excerpt: "Série intimiste — jeux de lumière naturelle et atmosphères douces.",
    description:
      "Une exploration des heures dorées et des contrastes subtils. Cette série met en avant la texture de la lumière naturelle, les ombres portées et la palette chaude du crépuscule. Chaque image invite à ralentir et à observer.",
    category: "Photo",
    year: 2025,
    cover: projetTestMedia[3],
    media: projetTestMedia.slice(2, 7),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getLatestProject(): Project | undefined {
  if (projects.length === 0) return undefined;

  return [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return projects.indexOf(b) - projects.indexOf(a);
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
