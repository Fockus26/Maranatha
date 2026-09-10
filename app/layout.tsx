import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { sora, ibmPlexSans } from "../theme/fonts";
import ThemeRegistry from "../theme/ThemeRegistry";
import { TitheModalProvider } from "@/lib/titheModalStore";
import { TitheModal } from "@/components/ui/TitheModal";
import { SITE_URL, SITE_NAME, SITE_TITLE_DEFAULT, SITE_DESCRIPTION, SITE_LOCALE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: "/",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

// `color-scheme` le dice al navegador que la página soporta ambos modos —
// evita el flash de formularios/scrollbars nativos en el modo equivocado.
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F6FA" },
    { media: "(prefers-color-scheme: dark)", color: "#060A1D" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Modo claro/oscuro resuelto en el SERVIDOR, leyendo la cookie
  // `color-mode` que `ThemeRegistry.tsx` escribe al guardar la preferencia
  // (además de `localStorage`, que ahí solo sirve como respaldo/migración).
  // El intento anterior (script bloqueante en `<head>`) seguía siendo
  // client-side: corría antes de que React hidratara, pero el HTML que
  // manda el SERVIDOR ya llegaba en modo "light" siempre, así que si la
  // preferencia real era "dark" el navegador pintaba el divider (y el resto
  // de colores dependientes del modo) claro por un instante y luego, de
  // golpe, oscuro — justo el flash que el cliente seguía viendo. Con la
  // cookie, el propio HTML generado por el servidor ya sale en el modo
  // correcto: no hay nada que corregir después en el cliente.
  // Excepción inevitable: la primerísima visita de alguien, antes de que
  // exista la cookie (ahí se usa "light" por defecto); desde esa primera
  // visita en adelante siempre coincide.
  const cookieStore = await cookies();
  const initialMode = cookieStore.get("color-mode")?.value === "dark" ? "dark" : "light";

  return (
     <html lang="es" className={`${sora.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body>
        {/* Skip link (WCAG 2.4.1) — el primer elemento enfocable de la página.
            Oculto visualmente hasta recibir foco por teclado; salta al
            `<main id="main-content">` que renderiza cada página. */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <ThemeRegistry initialMode={initialMode}>
          {/* Montado una sola vez a nivel raíz (fase 07): el modal de Diezmo se
              abre desde 3 componentes distintos (Navbar, PageNavbar,
              MobileMenuOverlay) en cualquier página — ver `lib/titheModalStore.tsx`. */}
          <TitheModalProvider>
            {children}
            <TitheModal />
          </TitheModalProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
