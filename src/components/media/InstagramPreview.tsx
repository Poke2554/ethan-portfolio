import { instagramKindLabel, type InstagramKind } from "@/lib/instagram";

type InstagramPreviewProps = {
  kind: InstagramKind;
  alt: string;
};

export function InstagramPreview({ kind, alt }: InstagramPreviewProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-4 text-white">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 opacity-95">
        <path
          fill="currentColor"
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
        />
      </svg>
      <p className="mt-3 text-[10px] uppercase tracking-[0.28em]">{instagramKindLabel(kind)}</p>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/45 text-lg">
          ▶
        </span>
      </span>
      <span className="sr-only">{alt}</span>
    </div>
  );
}
