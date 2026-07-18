export type { Project, ProjectCategory, ProjectMeta } from "@/types/project";
export {
  getAllProjectSlugs,
  getLatestPhotoProject,
  getLatestProject,
  getProjectBySlug,
  getProjectFirstImage,
  getProjectPhotoPath,
  getProjects,
  getProjectsMeta,
} from "@/lib/projects-loader";
