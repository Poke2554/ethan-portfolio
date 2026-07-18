import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaGallery } from "@/components/media/MediaGallery";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { routing, type Locale } from "@/i18n/routing";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale as Locale);

  if (!project) {
    return { title: siteConfig.fullName };
  }

  return {
    title: `${project.title} — ${siteConfig.fullName}`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("projects");
  const project = getProjectBySlug(slug, locale as Locale);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <ProjectHero project={project} />

      <div className="page-shell py-16 md:py-24">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted">{t("aboutProject")}</p>
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
