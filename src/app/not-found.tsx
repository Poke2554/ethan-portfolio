import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-muted">404</p>
      <h1 className="page-title mt-4">Page introuvable</h1>
      <p className="page-intro mx-auto">Cette page n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Accueil
        </Link>
        <Link href="/projets" className="btn-secondary">
          Projets
        </Link>
      </div>
    </section>
  );
}
