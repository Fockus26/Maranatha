# CURRENT_PHASE

Fase 04 — Componentes (cerrada) · Fase 05 — Navegación (cerrada) · Fase 06 — Secciones de Home (cerrada) · Fase 07 — Páginas (cerrada) · Fase 08 — Responsive (cerrada)

## Fases completadas
- Fase 01 — Colores ✅
- Fase 02 — Tipografía ✅
- Fase 03 — Tokens (spacing, radius, sombras, breakpoints, z-index) ✅
- Fase 04 — Componentes ✅ (incluye Dashboard Form + Image Upload Field, D023 — ya estaban implementados en el repo, faltaba reflejarlo acá)
- Fase 05 — Navegación ✅ (Navbar Home con anclas + scroll-spy, PageNavbar simplificado para el resto de páginas públicas, Dashboard Sidebar, Menú mobile overlay fullscreen — D024/D025/D026)
- Fase 06 — Secciones de Home ✅ (las 9 secciones de `app/page.tsx` implementadas: Hero, Áreas de Servicio, Liderazgo, Prédicas, Redes Sociales, Agenda, Historia, Proyectos, CTA Diezmo/Aportes — ver `SECTION_INVENTORY.md`)
- Fase 07 — Páginas ✅ (Proyectos listado + detalle, Dashboard Resumen + CRUD; Historia se removió como página propia y volvió a vivir solo como resumen en Home, D049 — ver `PAGE_INVENTORY.md`). Cerrada tras varias rondas de feedback puntual del cliente sobre las páginas ya construidas (D050–D056, detalle abajo) — sin trabajo estructural nuevo pendiente.
- Fase 08 — Adaptación mobile/responsive ✅ (auditoría completa frente a los breakpoints del theme, D064) más dos rondas de feedback puntual post-cierre (D065, D066, detalle abajo) — el cliente dio por culminada esta fase tras D066.

## Fase 04 — Componentes (cerrada)
Cerrados: Navbar (Home), PageNavbar, MobileMenuOverlay, Dashboard Sidebar, Footer, Theme Toggle, Botones, PhotoOverlayCard, Card de Área de Servicio, Card de Líder, YouTube Embed Card, Social Link Card, Agenda Item / Calendar Item, Timeline Item, Project Card, Project Detail, Formulario de Pago/Diezmo, Amount Selector, Donation Form Card, Formulario de Aporte a Proyecto, Confirm Dialog, Dashboard Table, Dashboard Form, Image Upload Field.

Sin pendientes.

## Fase 05 — Navegación (cerrada)
Navbar Home (anclas + scroll-spy vía `IntersectionObserver`), PageNavbar (variante sin anclas para Historia/Proyectos/detalle), MobileMenuOverlay (overlay fullscreen con stagger), Dashboard Sidebar + Dashboard Shell (sidebar fijo navy permanente + topbar). Ya integrado en el repo: `app/page.tsx` con ids de ancla, `ThemeToggle` con prop `sx` opcional.

Ronda de feedback (D054, fase 07): los links de página del Navbar (Proyectos) se separaban mal de las anclas de Home — mismo estilo de texto para ambos, podía confundirse "Proyectos" con una sección más de Home. Se agregó un divisor + tratamiento de píldora con ícono (Opción 1 de un comparador de 3 direcciones mostrado al cliente en `/design`), y un link explícito "Inicio" en `PageNavbar` (antes solo estaba el logo) — tanto en escritorio como en el menú mobile. El mismo tratamiento de píldora se llevó también al menú mobile (antes solo texto plano) en D065.

Nota: el Dashboard Sidebar original (fijo, 260px) fue reemplazado por `DashboardTopbar` en D059 (ver Fase 07) — queda sin uso en el repo.

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
- **D052**: fix del flash del divider del navbar al cargar (primer intento, resultó incompleto — ver D053); toggle lista/cuadrícula en `/proyectos` + animación de layout con `framer-motion` al cambiar de tab o de vista (el toggle se removió después en D065 — una sola vista).
- **D053**: fix definitivo del flash del navbar — el modo claro/oscuro se resuelve ahora en el servidor vía cookie (`app/layout.tsx` + `theme/ThemeRegistry.tsx`), no solo en el cliente.
- **D054**: UX del navbar — links de página diferenciados de las anclas (divisor + píldora con ícono) y link explícito "Inicio" en páginas internas; dirección elegida por el cliente entre 3 propuestas mostradas en un comparador visual (`/design`).
- **D055/D056**: transición entre páginas — primer intento con `AnimatePresence` a nivel de layout rompía el renderizado de Proyectos (tenía su propio `AnimatePresence` anidado); se resolvió con un enfoque más simple vía `app/template.tsx`, que solo anima la entrada de cada página sin depender de coordinar una salida.
- **D057/D058**: dos lotes de feedback sobre el modal de Diezmo (`TitheModal.tsx`) — colores más acentuados, animación de contador en el monto, fondo navy corregido en modo oscuro (overlay de elevación de MUI), entre otros.
- **D059**: rediseño completo del Dashboard (Opción B — `DashboardTopbar` reemplaza al sidebar fijo), elegido por el cliente entre 3 direcciones mostradas en `/design`.
- **D060/D061**: dos lotes de feedback puntual sobre el Dashboard rediseñado — transiciones, modal de proyecto compartido vía Context, animación de layout en tabla/navbars, chips de estado con más contraste, scrollbar personalizado, entre otros.
- **D062/D063**: dos lotes de feedback sobre el modal de crear/editar proyecto — nombre resaltado al confirmar borrado, selector de fecha propio (`DateField.tsx`, sin dependencias nuevas), calendario con diseño propio, banner de foto más grande, entre otros.

Sin pendientes de esta fase — el cliente confirmó el cierre de esta ronda.

## Fase 08 — Adaptación mobile/responsive (cerrada)
Auditoría completa de todas las páginas y componentes frente a los breakpoints del theme (D064): `DonationFormCard` responsive (Diezmo y Aporte a proyecto), `ProjectCard` layout `horizontal` apilado en mobile, `DashboardTable` con tarjetas apiladas por debajo de `sm`, `DashboardProjectForm` a 1 columna en mobile, ajustes de espaciado en `DashboardTopbar`. El resto del sitio (secciones de Home, navegación, Footer, formularios de contribución, tarjetas) ya cumplía el criterio desktop-first sin cambios adicionales.

Tras el cierre de D064, el cliente mandó dos rondas más de feedback puntual, ya resueltas:
- **D065** (11 items): umbral de animación más bajo en mobile (`Reveal.tsx`); acento del CTA de Prédicas unificado en naranja; `MobileMenuOverlay` theme-aware + píldoras para links de página; scroll roto del modal de Diezmo en mobile (primer intento — ver D066 para el fix completo); toggle lista/cuadrícula removido de `/proyectos`; `DashboardProjectModal` a `fullScreen`; `Hero` con `maxHeight` de 1024px; grids asimétricos en `ServiceAreas`/`Sermons` para evitar huecos; más padding en `ConfirmDialog`; primer intento de tipografía ≥1920px (solo a nivel de tema, resultó sin efecto visible — ver D066).
- **D066** (2 items, cierre de esta ronda): fix definitivo del ancho del modal de Diezmo en mobile (se quitó `scroll="body"`, que chocaba con `fullScreen`); sweep de tipografía ≥1920px aplicado directo en cada `sx.fontSize` literal de Hero, las 6 secciones de Home, Footer, Navbar/PageNavbar y el heading de `/proyectos` — cobertura que deliberadamente no incluye todavía Dashboard, modales (Diezmo/confirmación) ni Project card/sidebar/detalle.

El cliente confirmó el cierre de esta fase tras D066. Pendiente para una futura ronda, si se pide: sweep de tipografía ≥1920px sobre Dashboard/modales/Project cards-sidebar-detail, y verificación en vivo en dispositivos reales de todo lo implementado en Fase 08 (esta sesión solo pudo razonar sobre anchos de viewport y lógica de código, sin capturas del sitio corriendo).

## Siguientes fases
Sin una fase estructural nueva planteada por el cliente por el momento — a la espera de que indique el siguiente foco (p. ej. integración de backend/persistencia real, autenticación del Dashboard, proveedor de pago, o contenido real en reemplazo de los placeholders).

## Pendientes generales (no bloquean ninguna fase, ver `PAGE_INVENTORY.md`)
- Autenticación del Dashboard, persistencia real (backend/CMS), proveedor de pago real para Diezmo y aportes, contenido real (fotos, videos, agenda, proyectos) en reemplazo de los placeholders, y limpieza de archivos sin uso (`components/sections/Tithe.tsx`, `components/sections/Projects.tsx`, `app/historia/page.tsx`, `TimelineZigzagItem.tsx`, `components/layout/DashboardSidebar.tsx`) cuando se disponga de acceso de archivo completo.
- Sweep de tipografía ≥1920px sobre Dashboard, modales (Diezmo, confirmación) y Project card/sidebar/detalle (D066).
- Verificación en vivo en dispositivos reales de todo lo implementado en Fase 08 (D064–D066).