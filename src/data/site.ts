export const siteConfig = {
  name: "Ethan",
  role: "Photographe & vidéaste",
  description:
    "Portfolio photo et vidéo — portraits, food, architecture, events.",
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
      description: "Portraits, lifestyle, reportages et shootings produits.",
    },
    {
      title: "Vidéo",
      description: "Clips, contenus réseaux sociaux et captation d’événements.",
    },
    {
      title: "Direction artistique",
      description: "Moodboards, cadrage et cohérence visuelle de bout en bout.",
    },
  ],
  bio: "Basé à Paris, je collabore avec des marques, des créateurs et des particuliers. Chaque projet est pensé comme une série : une ambiance, un rythme, une narration visuelle claire.",
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

const pool = [
  wallImage("home/IMG_0493.jpg", "Portfolio — photo 1", -3),
  wallImage("home/IMG_0588.jpg", "Portfolio — photo 2", 2),
  wallImage("home/IMG_1145.jpg", "Portfolio — photo 3", -2),
  wallImage("home/IMG_1346.jpg", "Portfolio — photo 4", 3),
  wallImage("home/IMG_1359.jpg", "Portfolio — photo 5", -4),
  wallImage("home/IMG_7668.jpg", "Portfolio — photo 6", 2),
  wallImage("projects/projet-test/IMG_7759.jpg", "Portfolio — photo 7", -2),
  wallImage("projects/projet-test/IMG_7867.jpg", "Portfolio — photo 8", 3),
  wallImage("projects/projet-test/IMG_7957.jpg", "Portfolio — photo 9", -3),
  wallImage("projects/projet-test/IMG_9707.jpg", "Portfolio — photo 10", 2),
  wallImage("projects/projet-test/IMG_0493.jpg", "Portfolio — photo 11", -2),
  wallImage("projects/projet-test/IMG_1145.jpg", "Portfolio — photo 12", 4),
  wallImage("projects/projet-test/IMG_1359.jpg", "Portfolio — photo 13", -3),
  wallImage("projects/projet-test/IMG_7668.jpg", "Portfolio — photo 14", 2),
  wallImage("projects/projet-test/IMG_0588.jpg", "Portfolio — photo 15", -2),
  wallImage("projects/projet-test/IMG_1346.jpg", "Portfolio — photo 16", 3),
];

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
  "Portrait",
  "Reportage",
  "Lifestyle",
  "Direction artistique",
  "Captation vidéo",
  "Éditorial",
  "Paris",
];
