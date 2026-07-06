import { KodakPrint } from "@/components/home/KodakPrint";
import { homeHero, homeWallColumns } from "@/data/site";

export function HomeWall() {
  return (
    <section id="home-wall" className="relative bg-white">
      <div className="wall-surface relative min-h-screen overflow-hidden">
        <div className="wall-texture pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
        <div className="film-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.035] mix-blend-multiply" aria-hidden="true" />

        <div className="absolute inset-0 z-[5] flex items-center justify-center px-3 md:px-6">
          <div className="wall-columns grid w-full max-w-5xl -translate-y-4 grid-cols-4 gap-x-2 md:-translate-y-8 md:gap-x-4">
            {homeWallColumns.map((column, columnIndex) => (
              <div key={`col-${columnIndex}`} className="flex flex-col items-center">
                {column.map((photo, rowIndex) => (
                  <KodakPrint
                    key={photo.id}
                    photo={photo}
                    priority={rowIndex === 0 && columnIndex < 2}
                    className={rowIndex > 0 ? "wall-stack-item" : ""}
                    style={{ zIndex: rowIndex + 1 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="wall-frost pointer-events-none absolute inset-0 z-[15]" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center px-6">
          <div className="hero-text-wrap mx-auto max-w-xl px-4 py-6 text-center">
            <p className="hero-label-shadow text-[10px] uppercase tracking-[0.42em] text-foreground/75">
              {homeHero.label}
            </p>
            <h1 className="hero-title-shadow mt-4 font-display text-[clamp(2.25rem,8vw,4.75rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-foreground">
              {homeHero.title}
            </h1>
            <p className="hero-label-shadow mx-auto mt-4 max-w-xs text-[11px] uppercase tracking-[0.26em] text-foreground/70">
              {homeHero.subtitle}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-[26] flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.35em] text-foreground/40">
            {homeHero.hint}
          </span>
          <span className="scroll-hint-arrow block h-8 w-px bg-foreground/30" />
        </div>
      </div>
    </section>
  );
}
