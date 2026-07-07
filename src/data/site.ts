export const siteConfig = {
  name: "Ethan",
  fullName: "Ethan Frati",
  role: "Photographe & vidéaste",
  description:
    "Portfolio photo et vidéo d'Ethan Frati — portraits, food, architecture, events, street photo, shoot produits. Basé à Paris.",
  email: "contact@ethanfrati.fr",
  phone: "06 52 28 59 74",
  instagram: "https://instagram.com/ethanfrati",
  location: "Paris, France",
};

export const aboutContent = {
  intro:
    "Je raconte des histoires visuelles à travers la photo et la vidéo. Mon approche privilégie la lumière naturelle, la composition sobre et une direction artistique fidèle à l’identité de chaque projet.",
  services: [
    {
      title: "Photo",
      description: "Portraits, architecture et shootings produits, street photo.",
    },
    {
      title: "Vidéo",
      description: "Contenus réseaux sociaux food, pub produits, events.",
    },
  ],
  bio: "Basé à Paris, passionnée de photo et vidéo sur mon temps libre.",
  /** Photo grande à gauche sur /a-propos — chemin sous public/media/ */
  portrait: "projects/toulouse/IMG_1145.jpg",
};

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/a-propos" },
];

export type WallPhoto = {
  id: string;
  src: string;
  alt: string;
  rotation: number;
};

const wallImage = (src: string, alt: string, rotation: number): WallPhoto => ({
  id: `${src}-${rotation}`,
  src,
  alt,
  rotation,
});

/** Photos du mur polaroid accueil — fichiers dans public/media/home/ */
const homePhotos = [
  "IMG_0493.jpg",
  "IMG_1346.jpg",
  "IMG_7668.jpg",
  "IMG_7681.jpg",
  "IMG_7684.jpg",
  "IMG_7754.jpg",
  "IMG_7873.jpg",
  "IMG_7876.jpg",
  "IMG_7892.jpg",
  "IMG_7893.jpg",
  "IMG_8026.jpg",
  "IMG_9743.jpg",
] as const;

const homeRotations = [-3, 2, -2, 3, -4, 2, -2, 3, -3, 2, -2, 4];

const pool = homePhotos.map((file, index) =>
  wallImage(`home/${file}`, `Portfolio — photo ${index + 1}`, homeRotations[index] ?? 0),
);

/** 4 colonnes × 3 photos empilées par colonne */
export const homeWallColumns: WallPhoto[][] = [
  [pool[0], pool[1], pool[2]],
  [pool[3], pool[4], pool[5]],
  [pool[6], pool[7], pool[8]],
  [pool[9], pool[10], pool[11]],
];

export const homeWallPhotos = pool;

export const homeHero = {
  label: "Portfolio",
  title: siteConfig.name,
  subtitle: siteConfig.role,
  hint: "Défiler",
};

export const marqueeItems = [
  "Photo",
  "Portrait",
  "Events",
  "Architecture",
  "Vidéo",
  "Food",
  "Shooting Produits",
];
