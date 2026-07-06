import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { ProjectMeta } from "@/types/project";

const projectsJsonPath = path.join(process.cwd(), "content", "projects.json");
const adminPassword = process.env.ADMIN_PASSWORD ?? "ethan2026";

function isAuthorized(request: Request) {
  const header = request.headers.get("x-admin-password");
  return header === adminPassword;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!fs.existsSync(projectsJsonPath)) {
    return NextResponse.json([]);
  }

  const raw = fs.readFileSync(projectsJsonPath, "utf-8");
  return NextResponse.json(JSON.parse(raw) as ProjectMeta[]);
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (process.env.NODE_ENV === "production" && process.env.ALLOW_ADMIN_SAVE !== "true") {
    return NextResponse.json(
      {
        error:
          "Sauvegarde désactivée en production. Utilise le panel en local (npm run dev) puis git push.",
      },
      { status: 403 },
    );
  }

  const projects = (await request.json()) as ProjectMeta[];

  fs.mkdirSync(path.dirname(projectsJsonPath), { recursive: true });
  fs.writeFileSync(projectsJsonPath, `${JSON.stringify(projects, null, 2)}\n`, "utf-8");

  return NextResponse.json({ ok: true });
}
