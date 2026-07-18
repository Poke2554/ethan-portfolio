"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  transparent?: boolean;
};

export function LanguageSwitcher({ transparent = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    if (pathname === "/projets/[slug]") {
      router.replace(
        { pathname: "/projets/[slug]", params: { slug: String(params.slug) } },
        { locale: nextLocale },
      );
      return;
    }

    if (pathname === "/") {
      router.replace("/", { locale: nextLocale });
      return;
    }

    if (pathname === "/projets") {
      router.replace("/projets", { locale: nextLocale });
      return;
    }

    if (pathname === "/a-propos") {
      router.replace("/a-propos", { locale: nextLocale });
    }
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-full border p-1 text-[10px] uppercase tracking-[0.2em] ${
        transparent ? "border-white/25 bg-white/10 text-white" : "border-border bg-background text-muted"
      }`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchLocale(item)}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === item
              ? transparent
                ? "bg-white text-foreground"
                : "bg-foreground text-background"
              : "hover:text-foreground"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
