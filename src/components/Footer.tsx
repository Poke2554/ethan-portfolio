import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="page-shell flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-[-0.03em]">{siteConfig.name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted">{siteConfig.role}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.22em] text-muted">
          <Link href="/projets" className="link-hover">
            Projets
          </Link>
          <Link href="/a-propos" className="link-hover">
            À propos
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="link-hover">
            Email
          </a>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-[10px] uppercase tracking-[0.28em] text-muted md:px-10">
        © {year} {siteConfig.name}
      </div>
    </footer>
  );
}
