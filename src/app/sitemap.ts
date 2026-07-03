import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ton-domaine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${siteUrl}/projets/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/a-propos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...projectPages,
  ];
}
