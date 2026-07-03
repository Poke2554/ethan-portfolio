import { HomeWall } from "@/components/home/HomeWall";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { RecentWorkSection } from "@/components/home/RecentWorkSection";

export default function HomePage() {
  return (
    <>
      <HomeWall />
      <MarqueeStrip />
      <RecentWorkSection />
    </>
  );
}
