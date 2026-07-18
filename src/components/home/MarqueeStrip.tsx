import { getTranslations } from "next-intl/server";

export async function MarqueeStrip() {
  const t = await getTranslations("marquee");
  const items = t.raw("items") as string[];
  const track = [...items, ...items];

  return (
    <div className="relative z-30 overflow-hidden border-y border-border bg-white py-3" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-muted"
          >
            {item}
            <span className="text-border">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
