import Link from "next/link";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import type { Project } from "@/types/project";
import { getProjectFirstImage } from "@/data/projects";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const heroImage = getProjectFirstImage(project);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-neutral-900">
      <div className="absolute inset-0">
        <OptimizedImage
          media={{ ...heroImage, priority: true }}
          fill
          sizes="100vw"
          quality={75}
          placeholder="empty"
          className="scale-105 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        <div className="film-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex min-h-[85vh] flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-16">
        <Link
          href="/projets"
          className="text-sm uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
        >
          ← Retour aux projets
        </Link>

        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-white/55">
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>{project.media.length} médias</span>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            {project.excerpt}
          </p>
        </div>
      </div>
    </section>
  );
}
