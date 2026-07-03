import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Projets — ${siteConfig.name}`,
  description: "Découvrez les projets photo et vidéo du portfolio.",
};

export default function ProjectsPage() {
  return (
    <section className="page-shell pt-28">
      <p className="text-[11px] uppercase tracking-[0.4em] text-muted">01 — Projets</p>
      <h1 className="page-title mt-5">Sélection</h1>
      <p className="page-intro">
        Une liste de projets photo et vidéo. Cliquez sur un projet pour lire la
        description complète et parcourir les médias associés.
      </p>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
