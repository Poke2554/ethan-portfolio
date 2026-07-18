import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethanfrati.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllProjectSlugs();
  const now = new Date();

  const frProjectPages = slugs.map((slug) => ({
    url: `${siteUrl}/projets/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const enProjectPages = slugs.map((slug) => ({
    url: `${siteUrl}/en/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/en`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/en/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...frProjectPages,
    ...enProjectPages,
  ];
}
