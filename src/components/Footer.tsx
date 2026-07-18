"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tMeta = useTranslations("metadata");

  return (
    <footer className="border-t border-border bg-white">
      <div className="page-shell flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-[-0.03em]">{siteConfig.name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted">{tMeta("role")}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.22em] text-muted">
          <Link href="/projets" className="link-hover">
            {t("projects")}
          </Link>
          <Link href="/a-propos" className="link-hover">
            {t("about")}
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="link-hover">
            {tFooter("email")}
          </a>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-[10px] uppercase tracking-[0.28em] text-muted md:px-10">
        © {year} {siteConfig.name}
      </div>
    </footer>
  );
}
