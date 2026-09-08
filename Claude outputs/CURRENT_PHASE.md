# CURRENT_PHASE

Fase 04 — Componentes (cerrada) · Fase 05 — Navegación (cerrada) · Fase 06 — Secciones de Home (cerrada) · Fase 07 — Páginas (cerrada)

## Fases completadas
- Fase 01 — Colores ✅
- Fase 02 — Tipografía ✅
- Fase 03 — Tokens (spacing, radius, sombras, breakpoints, z-index) ✅
- Fase 04 — Componentes ✅ (incluye Dashboard Form + Image Upload Field, D023 — ya estaban implementados en el repo, faltaba reflejarlo acá)
- Fase 05 — Navegación ✅ (Navbar Home con anclas + scroll-spy, PageNavbar simplificado para el resto de páginas públicas, Dashboard Sidebar, Menú mobile overlay fullscreen — D024/D025/D026)
- Fase 06 — Secciones de Home ✅ (las 9 secciones de `app/page.tsx` implementadas: Hero, Áreas de Servicio, Liderazgo, Prédicas, Redes Sociales, Agenda, Historia, Proyectos, CTA Diezmo/Aportes — ver `SECTION_INVENTORY.md`)
- Fase 07 — Páginas ✅ (Proyectos listado + detalle, Dashboard Resumen + CRUD; Historia se removió como página propia y volvió a vivir solo como resumen en Home, D049 — ver `PAGE_INVENTORY.md`). Cerrada tras varias rondas de feedback puntual del cliente sobre las páginas ya construidas (D050–D056, detalle abajo) — sin trabajo estructural nuevo pendiente.

## Fase 04 — Componentes (cerrada)
Cerrados: Navbar (Home), PageNavbar, MobileMenuOverlay, Dashboard Sidebar, Footer, Theme Toggle, Botones, PhotoOverlayCard, Card de Área de Servicio, Card de Líder, YouTube Embed Card, Social Link Card, Agenda Item / Calendar Item, Timeline Item, Project Card, Project Detail, Formulario de Pago/Diezmo, Amount Selector, Donation Form Card, Formulario de Aporte a Proyecto, Confirm Dialog, Dashboard Table, Dashboard Form, Image Upload Field.

Sin pendientes.

## Fase 05 — Navegación (cerrada)
Navbar Home (anclas + scroll-spy vía `IntersectionObserver`), PageNavbar (variante sin anclas para Historia/Proyectos/detalle), MobileMenuOverlay (overlay fullscreen con stagger), Dashboard Sidebar + Dashboard Shell (sidebar fijo navy permanente + topbar). Ya integrado en el repo: `app/page.tsx` con ids de ancla, `ThemeToggle` con prop `sx` opcional.

Ronda de feedback (D054, fase 07): los links de página del Navbar (Proyectos) se separaban mal de las anclas de Home — mismo estilo de texto para ambos, podía confundirse "Proyectos" con una sección más de Home. Se agregó un divisor + tratamiento de píldora con ícono (Opción 1 de un comparador de 3 direcciones mostrado al cliente en `/design`), y un link explícito "Inicio" en `PageNavbar` (antes solo estaba el logo) — tanto en escritorio como en el menú mobile.

## Fase 06 — Secciones de Home (cerrada)
Las 9 secciones de Home implementadas como archivos consolidados en `components/sections/` (convención D030 — componente + datos juntos, un archivo por sección), integradas en `app/page.tsx` en este orden: `Hero.tsx`, `ServiceAreas.tsx`, `Leaders.tsx`, `Sermons.tsx`, `SocialLinks.tsx`, `Agenda.tsx`, `History.tsx`, `Projects.tsx`, `Tithe.tsx`. Detalle completo de cada una (heading, contenido, decisiones de diseño puntuales) en `SECTION_INVENTORY.md`; el registro cronológico de decisiones (D027–D042) en `DESIGN_DECISIONS.md`.

Notas que quedan abiertas para fases posteriores:
- Varias secciones tienen **contenido placeholder** pendiente de que el cliente lo confirme/entregue: `videoId`s y canal de YouTube (Prédicas), cuentas/handles/posts de Instagram (Redes Sociales), agenda real (Agenda), proyectos reales (Proyectos).
- El formulario de Diezmo/Aportes (`Tithe.tsx`, ahora modal global — ver Fase 07) no tiene proveedor de pago integrado — su `onSubmit` es un placeholder (`console.log`).
- Foto de Oración (Áreas de Servicio) sigue siendo un placeholder temporal (reutiliza la que antes usaba Evangelismo).

## Fase 07 — Páginas (cerrada)
Historia (línea de tiempo completa como página propia — luego removida, D049), Proyectos (listado + detalle), Dashboard (CRUD) — detalle completo de cada página en `PAGE_INVENTORY.md`. Incluye montar `PageNavbar` en Historia/Proyectos y `DashboardShell` en `/dashboard`, y el modal global de Diezmo (`TitheModal`, D049).

Tras el cierre inicial (D044–D049), el cliente pasó varias rondas de feedback puntual sobre lo ya construido, documentadas en `DESIGN_DECISIONS.md`:
- **D050**: modal de Diezmo a pantalla completa; Hero a `100vh` real (menos altura del navbar, medida vía `ResizeObserver`); CTAs de `ProjectSidebar` con el tratamiento del Hero; tabs de Proyectos con color nativo; chip "Activo" con más contraste en modo oscuro.
- **D051**: tab activo de Proyectos con naranja más apagado (`secondary[600]`); scroll suave global en toda ancla del sitio; CTA de Prédicas (`Sermons.tsx`) por fin con el tratamiento Hero-style que le faltaba desde D048.
- **D052**: fix del flash del divider del navbar al cargar (primer intento, resultó incompleto — ver D053); toggle lista/cuadrícula en `/proyectos` + animación de layout con `framer-motion` al cambiar de tab o de vista.
- **D053**: fix definitivo del flash del navbar — el modo claro/oscuro se resuelve ahora en el servidor vía cookie (`app/layout.tsx` + `theme/ThemeRegistry.tsx`), no solo en el cliente.
- **D054**: UX del navbar — links de página diferenciados de las anclas (divisor + píldora con ícono) y link explícito "Inicio" en páginas internas; dirección elegida por el cliente entre 3 propuestas mostradas en un comparador visual (`/design`).
- **D055/D056**: transición entre páginas — primer intento con `AnimatePresence` a nivel de layout rompía el renderizado de Proyectos (tenía su propio `AnimatePresence` anidado); se resolvió con un enfoque más simple vía `app/template.tsx`, que solo anima la entrada de cada página sin depender de coordinar una salida.

Sin pendientes de esta fase — el cliente confirmó el cierre de esta ronda.

## Siguientes fases
- Fase 08 — Adaptación mobile / responsive (incluye colapso del Dashboard Sidebar, reutilizando el patrón de `MobileMenuOverlay`)

## Pendientes generales (no bloquean ninguna fase, ver `PAGE_INVENTORY.md`)
- Autenticación del Dashboard, persistencia real (backend/CMS), proveedor de pago real para Diezmo y aportes, contenido real (fotos, videos, agenda, proyectos) en reemplazo de los placeholders, y limpieza de archivos sin uso (`components/sections/Tithe.tsx`, `components/sections/Projects.tsx`, `app/historia/page.tsx`, `TimelineZigzagItem.tsx`) cuando se disponga de acceso de archivo completo.
