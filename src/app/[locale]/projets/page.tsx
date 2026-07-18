import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/data/projects";
import { type Locale } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("pageTitle"),
    description: t("metadataDescription"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("projects");
  const projects = getProjects(locale as Locale);

  return (
    <section className="page-shell pt-28">
      <p className="text-[11px] uppercase tracking-[0.4em] text-muted">{t("pageLabel")}</p>
      <h1 className="page-title mt-5">{t("pageTitle")}</h1>
      <p className="page-intro">{t("pageIntro")}</p>

      <ProjectsGrid projects={projects} />
    </section>
  );
}
