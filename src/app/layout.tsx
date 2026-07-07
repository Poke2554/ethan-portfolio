import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { siteConfig } from "@/data/site";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteConfig.fullName} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.fullName,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    jobTitle: siteConfig.role,
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
    <html lang="fr">
      <body className={`${display.variable} ${sans.variable} bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>    </html>
  );
}
