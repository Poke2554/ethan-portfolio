import { OptimizedImage } from "@/components/media/OptimizedImage";
import type { WallPhoto } from "@/data/site";

type KodakPrintProps = {
  photo: WallPhoto;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function KodakPrint({ photo, priority = false, className = "", style }: KodakPrintProps) {
  return (
    <article
      className={`kodak-print relative w-full max-w-[172px] md:max-w-[210px] ${className}`}
      style={{ transform: `rotate(${photo.rotation}deg)`, ...style }}
    >
      <div className="kodak-pin" aria-hidden="true" />
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <OptimizedImage
          media={{
            type: "image",
            src: photo.src,
            alt: photo.alt,
            width: 420,
            height: 525,
            priority,
          }}
          fill
          sizes="(max-width: 768px) 22vw, 210px"
          quality={70}
          placeholder="empty"
        />
      </div>
      <div className="kodak-strip" aria-hidden="true" />
    </article>
  );
}
