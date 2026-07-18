export type InstagramKind = "reel" | "post" | "tv";

export type ParsedInstagram = {
  shortcode: string;
  kind: InstagramKind;
};

export function parseInstagramUrl(url: string): ParsedInstagram | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns: Array<{ regex: RegExp; kind: InstagramKind }> = [
    { regex: /instagram\.com\/reel\/([A-Za-z0-9_-]+)/i, kind: "reel" },
    { regex: /instagram\.com\/p\/([A-Za-z0-9_-]+)/i, kind: "post" },
    { regex: /instagram\.com\/tv\/([A-Za-z0-9_-]+)/i, kind: "tv" },
    { regex: /instagr\.am\/p\/([A-Za-z0-9_-]+)/i, kind: "post" },
  ];

  for (const { regex, kind } of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) {
      return { shortcode: match[1], kind };
    }
  }

  return null;
}

export function instagramEmbedUrl(shortcode: string, kind: InstagramKind) {
  const segment = kind === "reel" ? "reel" : kind === "tv" ? "tv" : "p";
  return `https://www.instagram.com/${segment}/${shortcode}/embed/captioned/?cr=1&v=14&wp=1080`;
}

export function instagramKindLabel(kind: InstagramKind) {
  if (kind === "reel") return "Reel";
  if (kind === "tv") return "IGTV";
  return "Post";
}
