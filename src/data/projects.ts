export type { Project, ProjectCategory, ProjectMeta } from "@/types/project";
export {
  getAllProjectSlugs,
  getLatestProject,
  getProjectBySlug,
  getProjectFirstImage,
  getProjectPhotoPath,
  getProjects,
  getProjectsMeta,
} from "@/lib/projects-loader";

import { getProjects } from "@/lib/projects-loader";

export const projects = getProjects();
