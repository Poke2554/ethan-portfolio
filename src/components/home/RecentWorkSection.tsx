import Link from "next/link";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getLatestPhotoProject, getProjectFirstImage } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function RecentWorkSection() {
  const latestProject = getLatestPhotoProject();
  const previewImage = latestProject ? getProjectFirstImage(latestProject) : null;

  return (
    <div className="relative z-30 border-t border-border bg-white">
      <div className="page-shell py-14">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div className="flex max-w-xl flex-col items-center gap-6 md:flex-row md:items-end md:gap-8">
              {latestProject && previewImage && (
                <Link
                  href={`/projets/${latestProject.slug}`}
                  className="group shrink-0 overflow-hidden border border-border bg-neutral-100"
                >
                  <div className="relative h-28 w-24 md:h-32 md:w-28">
                    <OptimizedImage
                      media={{ ...previewImage, priority: false }}
                      fill
                      sizes="112px"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="border-t border-border px-2 py-1.5 text-[9px] uppercase tracking-[0.2em] text-muted">
                    {latestProject.title}
                  </p>
                </Link>
              )}

              <div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted">01 — Sélection</p>
                <h2 className="mt-4 font-display text-3xl uppercase tracking-[-0.03em] md:text-4xl">
                  Travaux récents
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">{siteConfig.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:justify-end">
              <Link href="/projets" className="btn-primary">
                Voir les projets
              </Link>
              <Link href="/a-propos" className="btn-secondary">
                À propos
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}