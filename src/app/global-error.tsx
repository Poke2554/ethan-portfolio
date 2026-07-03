"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Erreur</p>
        <h1 className="text-3xl font-semibold">Le site a rencontré un problème</h1>
        <button
          type="button"
          onClick={reset}
          className="border border-black bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
