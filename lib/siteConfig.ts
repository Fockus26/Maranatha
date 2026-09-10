/**
 * Configuración base del sitio para SEO (fase QA — metadata/OG/JSON-LD).
 *
 * Fuente única para nombre, URL y textos que consumen `app/layout.tsx`,
 * `app/sitemap.ts`, `app/robots.ts`, los OG images y el JSON-LD de cada
 * página — así no se repiten literales sueltos que después se
 * desincronizan.
 *
 * CONTENIDO PENDIENTE (ver `maranatha-context/context/CONTENT_CHECKLIST.md`):
 * - Dominio real de producción → `NEXT_PUBLIC_SITE_URL` en el `.env` del
 *   deploy (hoy cae a `http://localhost:3000`, que rompe OG/canonical al
 *   compartir).
 * - `SITE_DESCRIPTION` es una descripción factual armada a partir del
 *   contenido del propio sitio — el cliente tiene que confirmarla o
 *   reemplazarla antes de producción.
 * - `SITE_LOCALE` asume España (`es_ES`); confirmar país.
 * - Datos de contacto, redes reales y razón social para el JSON-LD de
 *   `Organization` (hoy son placeholders).
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Iglesia Maranatha";

/** ≤60 car. — la plantilla de `app/layout.tsx` le antepone " | Iglesia Maranatha" al resto de páginas. */
export const SITE_TITLE_DEFAULT = "Iglesia Maranatha — comunidad de fe y propósito";

/** 150-160 car. — PENDIENTE de confirmación del cliente (CONTENT_CHECKLIST.md). */
export const SITE_DESCRIPTION =
  "Conoce a la Iglesia Maranatha: nuestras áreas de servicio, el liderazgo, las prédicas, la agenda de reuniones, los proyectos de la comunidad y nuestra historia.";

/** OG locale — PENDIENTE de confirmar país (CONTENT_CHECKLIST.md). */
export const SITE_LOCALE = "es_ES";

/** Contacto y redes — PENDIENTE: reemplazar por los reales (CONTENT_CHECKLIST.md). */
export const SITE_CONTACT_EMAIL = "contacto@iglesia.org";
export const SITE_SOCIAL_LINKS = [
  "https://instagram.com",
  "https://youtube.com",
];
