"use client";

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
                    priority={columnIndex === 0 && rowIndex < 2}
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
          <div className="hero-text-glow mx-auto w-full max-w-4xl px-8 py-14 text-center md:px-16 md:py-20">
            <p className="text-[11px] uppercase tracking-[0.45em] text-foreground/70">
              {homeHero.label}
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.25rem,12vw,7.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-foreground drop-shadow-[0_1px_12px_rgba(255,255,255,0.8)]">
              {homeHero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-sm uppercase tracking-[0.28em] text-foreground/65">
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
