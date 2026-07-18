import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import { OptimizedImage } from "@/components/media/OptimizedImage";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { aboutContent, siteConfig } from "@/data/site";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const meta = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("metadataTitle"),
    description: meta("description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("about");
  const meta = await getTranslations("metadata");

  const services = [
    { title: t("services.photo.title"), description: t("services.photo.description") },
    { title: t("services.video.title"), description: t("services.video.description") },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-border pt-28">
        <div className="page-shell pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.45em] text-muted">{t("pageLabel")}</p>
              <h1 className="mt-6 font-display text-[clamp(3rem,10vw,6.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em]">
                {siteConfig.name}
              </h1>
              <p className="mt-6 max-w-md text-sm uppercase tracking-[0.28em] text-muted">{meta("role")}</p>
            </div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <p className="text-base leading-8 text-foreground md:text-lg">{t("intro")}</p>
              <p className="mt-6 text-sm leading-8 text-muted">{t("bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-[560px]">
          <OptimizedImage
            media={{
              type: "image",
              src: aboutContent.portrait,
              alt: t("portraitAlt", { name: siteConfig.name }),
              width: 1600,
              height: 2000,
              priority: true,
            }}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center border-t border-border px-6 py-16 md:px-10 lg:border-t-0 lg:border-l lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted">{t("servicesLabel")}</p>
          <div className="mt-10 space-y-10">
            {services.map((service, index) => (
              <article key={service.title} className="group border-t border-border pt-8 first:border-t-0 first:pt-0">
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl leading-none text-muted/40 transition group-hover:text-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-2xl uppercase tracking-[-0.02em]">{service.title}</h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-muted">{service.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="page-shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="text-[11px] uppercase tracking-[0.45em] text-background/50">{t("contactLabel")}</p>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
                {t("contactTitle")}
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-background/70">{t("contactIntro")}</p>
            </div>

            <div className="space-y-8 lg:col-span-6">
              <div className="border-t border-background/20 pt-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-background/45">{t("email")}</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 inline-block font-display text-2xl uppercase tracking-[-0.02em] transition hover:text-background/70 md:text-3xl"
                >
                  {siteConfig.email}
                </a>
                <CopyEmailButton email={siteConfig.email} />
              </div>

              <dl className="grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-background/45">{t("phone")}</dt>
                  <dd className="mt-3 text-sm">{siteConfig.phone}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-background/45">{t("location")}</dt>
                  <dd className="mt-3 text-sm">{siteConfig.location}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.28em] text-background/45">{t("instagram")}</dt>
                  <dd className="mt-3">
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm transition hover:text-background/70"
                    >
                      {t("viewProfile")}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-background/15 pt-10">
            <Link href="/projets" className="btn-primary bg-background text-foreground hover:bg-background/90">
              {t("viewProjects")}
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-secondary border-background/30 text-background hover:border-background"
            >
              {t("contactMe")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
