/**
 * Builders de JSON-LD (schema.org) — fase QA (SEO).
 *
 * Solo se describe contenido que está visible en la página correspondiente.
 * Datos de contacto/redes son placeholders (ver `siteConfig.ts` y
 * CONTENT_CHECKLIST.md) — cuando el cliente entregue los reales, se
 * reemplazan aquí y se refleja en todas las páginas a la vez.
 */
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_SOCIAL_LINKS } from "./siteConfig";

/** Organización — se usa en Home. `@type: Church` es subtipo de PlaceOfWorship. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icon`,
    image: `${SITE_URL}/opengraph-image`,
    sameAs: SITE_SOCIAL_LINKS,
  };
}

/** Sitio web — se usa en Home. Sin `SearchAction`: no hay buscador global. */
export function webSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "es",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Migas de pan. `items`: [{ name, path }] en orden, empezando por Inicio. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
