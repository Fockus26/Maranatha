import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/lib/projectsData";
import { ProjectDetailClient } from "./ProjectDetailClient";

/**
 * Página "Proyecto — detalle" (`/proyectos/[slug]`, fase 07, D044).
 *
 * Server component: resuelve el proyecto por `slug` desde `lib/projectsData.ts`
 * y llama a `notFound()` si no existe (comportamiento estándar de Next, no es
 * un "estado de error" propio de la fase — la fase pide no diseñar estados de
 * error/loading todavía, y un 404 genérico no requiere diseño adicional).
 * El resto de la página (interactivo — modal de aporte) vive en
 * `ProjectDetailClient.tsx`.
 */

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProyectoDetallePage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
