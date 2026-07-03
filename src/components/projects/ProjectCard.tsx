import Link from "next/link";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import type { Project } from "@/data/projects";
import { isVideoMedia } from "@/types/media";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const cover =
    project.cover.type === "image"
      ? { ...project.cover, priority }
      : {
          type: "image" as const,
          src: project.cover.poster,
          alt: project.cover.alt,
          width: 1200,
          height: 1500,
          priority,
        };

  return (
    <Link href={`/projets/${project.slug}`} className="group block">
      <article>
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
          <OptimizedImage
            media={cover}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition duration-700 group-hover:scale-[1.02]"
          />
          {isVideoMedia(project.cover) && (
            <span className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.24em] text-white">
              Vidéo
            </span>
          )}
        </div>
        <div className="mt-5 space-y-2 border-t border-border pt-5">
          <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em] text-muted">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h2 className="font-display text-2xl uppercase tracking-[-0.02em]">{project.title}</h2>
          <p className="text-sm leading-6 text-muted">{project.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
