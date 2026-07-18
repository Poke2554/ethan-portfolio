import type { Locale } from "@/i18n/routing";
import type { ProjectCategory, ProjectMeta } from "@/types/project";

export function localizeProjectMeta(meta: ProjectMeta, locale: Locale) {
  if (locale === "en") {
    return {
      title: meta.titleEn ?? meta.title,
      excerpt: meta.excerptEn ?? meta.excerpt,
      description: meta.descriptionEn ?? meta.description,
    };
  }

  return {
    title: meta.title,
    excerpt: meta.excerpt,
    description: meta.description,
  };
}

export function localizeCategory(category: ProjectCategory, locale: Locale): string {
  const labels: Record<Locale, Record<ProjectCategory, string>> = {
    fr: {
      Photo: "Photo",
      Vidéo: "Vidéo",
      "Photo & Vidéo": "Photo & Vidéo",
    },
    en: {
      Photo: "Photo",
      Vidéo: "Video",
      "Photo & Vidéo": "Photo & Video",
    },
  };

  return labels[locale][category];
}
