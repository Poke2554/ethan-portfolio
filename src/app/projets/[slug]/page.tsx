import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaGallery } from "@/components/media/MediaGallery";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: `Projet — ${siteConfig.name}` };
  }

  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <ProjectHero project={project} />

      <div className="page-shell py-16 md:py-24">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted">À propos du projet</p>
            <p className="mt-5 text-base leading-8 text-foreground md:text-lg">{project.description}</p>
          </div>
        </ScrollReveal>

        <div className="mt-16">
          <MediaGallery items={project.media} />
        </div>
      </div>
    </article>
  );
}
