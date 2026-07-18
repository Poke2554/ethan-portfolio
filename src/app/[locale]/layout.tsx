import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import "../globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethanfrati.fr";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteConfig.fullName} — ${t("role")}`,
      template: `%s — ${siteConfig.fullName}`,
    },
    description: t("description"),
    alternates: {
      canonical: locale === "fr" ? siteUrl : `${siteUrl}/en`,
      languages: {
        fr: siteUrl,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: `${siteConfig.fullName} — ${t("role")}`,
      description: t("description"),
      url: locale === "fr" ? siteUrl : `${siteUrl}/en`,
      siteName: siteConfig.fullName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.fullName} — ${t("role")}`,
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    jobTitle: t("role"),
    email: siteConfig.email,
    url: siteUrl,
    sameAs: [siteConfig.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
  };

  return (
    <html lang={locale}>
      <body className={`${display.variable} ${sans.variable} bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
