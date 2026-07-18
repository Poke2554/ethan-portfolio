import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/projets": {
      fr: "/projets",
      en: "/projects",
    },
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
    },
    "/projets/[slug]": {
      fr: "/projets/[slug]",
      en: "/projects/[slug]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
