"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

export function Header() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("home"), href: "/" as const },
    { label: t("projects"), href: "/projets" as const },
    { label: t("about"), href: "/a-propos" as const },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-b border-border bg-background/92 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className={`font-display text-sm font-semibold uppercase tracking-[0.28em] ${
            transparent ? "text-white" : "text-foreground"
          }`}
        >
          Ethan
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-10">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.24em] transition ${
                    active
                      ? transparent
                        ? "text-white"
                        : "text-foreground"
                      : transparent
                        ? "text-white/70 hover:text-white"
                        : "text-muted link-hover"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher transparent={transparent} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher transparent={transparent} />
          <button
            type="button"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="inline-flex h-10 w-10 items-center justify-center"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-px w-full transition ${
                  transparent ? "bg-white" : "bg-foreground"
                } ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-full transition ${
                  transparent ? "bg-white" : "bg-foreground"
                } ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-px w-full transition ${
                  transparent ? "bg-white" : "bg-foreground"
                } ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm uppercase tracking-[0.2em]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
