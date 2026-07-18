import { instagramEmbedUrl, type InstagramKind } from "@/lib/instagram";

type InstagramEmbedProps = {
  shortcode: string;
  kind: InstagramKind;
  title: string;
  className?: string;
};

export function InstagramEmbed({ shortcode, kind, title, className = "" }: InstagramEmbedProps) {
  const aspectClass = kind === "reel" || kind === "tv" ? "aspect-[9/16]" : "aspect-square";

  return (
    <div className={`mx-auto w-full max-w-[420px] overflow-hidden bg-black ${aspectClass} ${className}`}>
      <iframe
        src={instagramEmbedUrl(shortcode, kind)}
        title={title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
        loading="lazy"
        scrolling="no"
      />
    </div>
  );
}
