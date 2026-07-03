"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">Erreur</p>
      <h1 className="font-display text-3xl uppercase">Une erreur est survenue</h1>
      <button type="button" onClick={reset} className="btn-primary">
        Réessayer
      </button>
    </div>
  );
}
