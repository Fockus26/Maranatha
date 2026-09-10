import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { PROJECTS } from "@/lib/projectsData";

/**
 * sitemap.xml (fase QA — SEO). Rutas públicas indexables: Home, el listado
 * de proyectos y el detalle de cada proyecto (generado desde
 * `lib/projectsData.ts`, la misma fuente que consumen las páginas — no a
 * mano). El dashboard y `/historia` quedan fuera (ver `robots.ts`).
 *
 * `lastModified` de los detalles: no hay campo de fecha de actualización en
 * los datos todavía, así que se usa la fecha de build. Cuando exista un
 * backend con `updatedAt`, mapearlo aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/proyectos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/proyectos/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
