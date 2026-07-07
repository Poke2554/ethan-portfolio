"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProjectCategory, ProjectMeta } from "@/types/project";

const emptyProject = (): ProjectMeta => ({
  slug: "",
  title: "",
  excerpt: "",
  description: "",
  category: "Photo",
  year: new Date().getFullYear(),
  youtubeUrls: [],
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [editing, setEditing] = useState<ProjectMeta | null>(null);
  const [youtubeDraft, setYoutubeDraft] = useState<string[]>([""]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const openEditor = (project: ProjectMeta) => {
    const urls = project.youtubeUrls ?? [];
    setYoutubeDraft(urls.length > 0 ? urls : [""]);
    setEditing(project);
  };

  const closeEditor = () => {
    setEditing(null);
    setYoutubeDraft([""]);
  };

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-admin-password": password,
    }),
    [password],
  );

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", { headers: headers() });
      if (!res.ok) throw new Error("Impossible de charger les projets");
      setProjects(await res.json());
      setStatus("");
    } catch {
      setStatus("Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    if (authed) loadProjects();
  }, [authed, loadProjects]);

  const login = async () => {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setStatus("");
    } else {
      setStatus("Mot de passe incorrect.");
    }
  };

  const saveAll = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(projects),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de sauvegarde");
      setStatus("Projets sauvegardés. Ajoute tes photos dans le dossier indiqué, puis git push.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erreur de sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const saveEditing = () => {
    if (!editing || !editing.slug.trim() || !editing.title.trim()) {
      setStatus("Slug et titre obligatoires.");
      return;
    }

    const projectToSave: ProjectMeta = {
      ...editing,
      youtubeUrls: youtubeDraft.map((url) => url.trim()).filter(Boolean),
    };

    const exists = projects.findIndex((p) => p.slug === projectToSave.slug);
    const next =
      exists >= 0
        ? projects.map((p, i) => (i === exists ? projectToSave : p))
        : [...projects, projectToSave];
    setProjects(next);
    closeEditor();
    setStatus("Projet ajouté à la liste — clique « Sauvegarder » pour enregistrer.");
  };

  const removeProject = (slug: string) => {
    setProjects(projects.filter((p) => p.slug !== slug));
    setStatus("Projet retiré — clique « Sauvegarder » pour confirmer.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    const text = await file.text();
    setProjects(JSON.parse(text) as ProjectMeta[]);
    setStatus("JSON importé — clique « Sauvegarder ».");
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-3xl uppercase">Admin</h1>
        <p className="mt-3 text-sm text-muted">Mot de passe par défaut : ethan2026 (modifiable dans .env.local)</p>
        <input
          type="password"
          dir="ltr"
          autoComplete="current-password"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full border border-border px-4 py-3 font-sans text-sm"
          placeholder="Mot de passe"
          onKeyDown={(e) => e.key === "Enter" && login()}
        />
        <button type="button" onClick={login} className="btn-primary mt-4">
          Entrer
        </button>
        {status && <p className="mt-4 text-sm text-red-600">{status}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase">Gérer les projets</h1>
          <p className="mt-2 text-sm text-muted">Pas besoin de lister les photos — dépose-les dans le dossier du projet.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={saveAll} disabled={loading} className="btn-primary">
            Sauvegarder
          </button>
          <button type="button" onClick={exportJson} className="btn-secondary">
            Exporter JSON
          </button>
          <label className="btn-secondary cursor-pointer">
            Importer JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {status && <p className="mt-4 rounded border border-border bg-surface px-4 py-3 text-sm">{status}</p>}

      <div className="mt-8 space-y-4">
        {projects.map((project) => (
          <article key={project.slug} className="border border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl uppercase">{project.title}</h2>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                  {project.category} · {project.year} · /projets/{project.slug}
                </p>
                <p className="mt-3 font-mono text-xs text-muted">
                  Dossier → public/media/projects/{project.slug}/
                  <br />
                  Couverture → {project.slug}.jpg
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => openEditor(project)} className="btn-secondary">
                  Modifier
                </button>
                <button type="button" onClick={() => removeProject(project.slug)} className="btn-secondary">
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => openEditor(emptyProject())}
        className="btn-primary mt-6"
      >
        + Nouveau projet
      </button>

      {editing && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-white p-6">
            <h3 className="font-display text-2xl uppercase">{editing.slug ? "Modifier" : "Nouveau"} projet</h3>

            <div className="mt-6 space-y-4">
              <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                Titre
                <input
                  value={editing.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditing({
                      ...editing,
                      title,
                      slug: editing.slug || slugify(title),
                    });
                  }}
                  className="mt-2 w-full border border-border px-3 py-2 font-sans text-sm"
                />
              </label>

              <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                Slug (URL)
                <input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })}
                  className="mt-2 w-full border border-border px-3 py-2 font-mono text-sm"
                  dir="ltr"
                />
              </label>

              <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                Résumé court
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={2}
                  className="mt-2 w-full border border-border px-3 py-2 font-sans text-sm"
                />
              </label>

              <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                Description
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={4}
                  className="mt-2 w-full border border-border px-3 py-2 font-sans text-sm"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Catégorie
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as ProjectCategory })}
                    className="mt-2 w-full border border-border px-3 py-2 font-sans text-sm"
                  >
                    <option value="Photo">Photo</option>
                    <option value="Vidéo">Vidéo</option>
                    <option value="Photo & Vidéo">Photo & Vidéo</option>
                  </select>
                </label>

                <label className="block text-xs uppercase tracking-[0.2em] text-muted">
                  Année
                  <input
                    type="number"
                    value={editing.year}
                    onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) })}
                    className="mt-2 w-full border border-border px-3 py-2 font-sans text-sm"
                  />
                </label>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Liens YouTube</p>
                <div className="mt-2 space-y-2">
                  {youtubeDraft.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={url}
                        onChange={(e) => {
                          const next = [...youtubeDraft];
                          next[index] = e.target.value;
                          setYoutubeDraft(next);
                        }}
                        dir="ltr"
                        placeholder="https://youtube.com/watch?v=XXXXX"
                        className="min-w-0 flex-1 border border-border px-3 py-2 font-mono text-xs"
                      />
                      {youtubeDraft.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setYoutubeDraft(youtubeDraft.filter((_, i) => i !== index))}
                          className="btn-secondary shrink-0 px-3"
                          aria-label="Supprimer ce lien"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setYoutubeDraft([...youtubeDraft, ""])}
                  className="btn-secondary mt-2"
                >
                  + Ajouter une vidéo
                </button>
              </div>

              <p className="rounded border border-border bg-surface px-3 py-3 text-xs leading-6 text-muted">
                <strong>Couverture :</strong> dépose{" "}
                <span className="font-mono text-foreground">
                  {editing.slug || "ton-slug"}.jpg
                </span>{" "}
                dans{" "}
                <span className="font-mono text-foreground">
                  public/media/projects/{editing.slug || "ton-slug"}/
                </span>{" "}
                (utilisée sur la carte et l&apos;en-tête, pas dans la galerie)
                <br />
                <strong>Photos :</strong> autres images dans le même dossier
                <br />
                <strong>Vidéos :</strong> upload sur YouTube (Non répertoriée) → colle les liens ci-dessus
                <br />
                Ou <span className="font-mono">npm run sync-media</span> pour les photos depuis E:\Dossier\Portfolio
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={saveEditing} className="btn-primary">
                Valider
              </button>
              <button type="button" onClick={closeEditor} className="btn-secondary">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
