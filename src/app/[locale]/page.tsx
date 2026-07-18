import { HomeWall } from "@/components/home/HomeWall";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { RecentWorkSection } from "@/components/home/RecentWorkSection";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <HomeWall />
      <MarqueeStrip />
      <RecentWorkSection locale={locale as Locale} />
    </>
  );
}
