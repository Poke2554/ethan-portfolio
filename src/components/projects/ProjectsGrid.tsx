"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/types/project";

type ProjectsGridProps = {
  projects: Project[];
};

const filters = ["Tous", "Photo", "Vidéo", "Photo & Vidéo"] as const;

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [active, setActive] = useState<(typeof filters)[number]>("Tous");

  const filtered = useMemo(() => {
    if (active === "Tous") return projects;
    return projects.filter((project) => project.category === active);
  }, [active, projects]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count =
            filter === "Tous" ? projects.length : projects.filter((p) => p.category === filter).length;
          if (filter !== "Tous" && count === 0) return null;

          const selected = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {filter}
              <span className="ml-2 opacity-50">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 80}>
            <ProjectCard project={project} priority={index < 3} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">Aucun projet dans cette catégorie.</p>
      )}
    </>
  );
}
