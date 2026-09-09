"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AnimatePresence, motion } from "framer-motion";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import PageNavbar from "@/components/layout/PageNavbar";
import Footer from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PROJECTS } from "@/lib/projectsData";
import { secondary } from "@/theme/tokens";

/**
 * Página "Proyectos" (`/proyectos`, fase 07, D044) — listado completo, a
 * diferencia de los 3 destacados en Home (`components/sections/Projects.tsx`,
 * D041). Usa `ProjectCard` sin modificarlo, alternando entre sus dos layouts
 * ya existentes (D016) según `viewMode` — ver nota más abajo.
 *
 * Filtro: tabs "Todos / Activos / Completados" (elegido explícitamente por el
 * cliente entre 3 opciones — tabs / chips+orden / sidebar de filtros) —
 * filtra por el único dato categórico real que existe hoy (estado); no hay
 * más de un criterio de filtro por ahora, así que un control más pesado
 * (sidebar) no se justifica.
 *
 * Datos: `lib/projectsData.ts`, compartidos con el detalle (`/proyectos/[slug]`)
 * y el dashboard — mismo criterio de contenido placeholder que el resto del
 * sitio.
 */

type FilterTab = "all" | "active" | "completed";

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function ProyectosPage() {
  const router = useRouter();
  const [tab, setTab] = useState<FilterTab>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return PROJECTS;
    return PROJECTS.filter((project) => project.status === tab);
  }, [tab]);

  return (
    <>
      <PageNavbar />

      <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 640, mb: { xs: 5, md: 7 } }}>
            <Typography
              component="span"
              sx={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "secondary.main",
                mb: 1.5,
                "@media (min-width:1920px)": { fontSize: "13px" },
              }}
            >
              Proyectos
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: { xs: "32px", md: "44px" },
                "@media (min-width:1920px)": { fontSize: "54px" },
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "text.primary",
                mb: 2,
              }}
            >
              Todos los proyectos
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                "@media (min-width:1920px)": { fontSize: "19px" },
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              Cada proyecto es una necesidad real de la iglesia — tu aporte hace la diferencia.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: 4, md: 5 },
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, value: FilterTab) => setTab(value)}
              // El indicador (línea inferior) sí usa el naranja de marca a toda
              // intensidad vía el prop nativo `indicatorColor` — es una línea
              // delgada de 2px, no compite. El TEXTO del tab activo, en cambio,
              // no usa `textColor="secondary"` (que lo pondría en `secondary.main`,
              // el naranja más vivo de la escala) — el cliente lo encontró
              // demasiado intenso como color de texto, así que baja un peldaño
              // a `secondary[600]`, más apagado/oscuro mantiene la identidad
              // naranja sin saturar el texto.
              indicatorColor="secondary"
              sx={{
                minHeight: "auto",
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: 14,
                  minHeight: "auto",
                  py: 1.5,
                },
                "& .MuiTabs-indicator": { height: 2 },
                "& .Mui-selected": { color: `${secondary[600]} !important`, fontWeight: 600 },
              }}
            >
              <Tab value="all" label={`Todos (${PROJECTS.length})`} />
              <Tab value="active" label={`Activos (${PROJECTS.filter((p) => p.status === "active").length})`} />
              <Tab value="completed" label={`Completados (${PROJECTS.filter((p) => p.status === "completed").length})`} />
            </Tabs>
          </Box>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchOffRoundedIcon}
              title="No hay proyectos en esta categoría"
              description="Probá con otra pestaña para ver el resto de los proyectos."
              ctaLabel={tab !== "all" ? "Ver todos los proyectos" : undefined}
              onCtaClick={tab !== "all" ? () => setTab("all") : undefined}
            />
          ) : (
            // `layout` en el contenedor y en cada card anima con FLIP
            // (framer-motion) el reflow al cambiar de tab (entran/salen
            // proyectos filtrados) — mismo criterio de easing/duración que
            // el resto de animaciones del sitio (`Reveal.tsx`, `Agenda.tsx`).
            //
            // Antes existía un toggle "lista"/"cuadrícula" (fase 07); el
            // cliente pidió quitarlo y dejar una sola visualización — la que
            // estaba por defecto (layout `horizontal`, una columna).
            <Box component={motion.div} layout transition={{ duration: 0.45, ease: EASE }} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <Box
                    key={project.slug}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <ProjectCard
                      layout="horizontal"
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      status={project.status}
                      currentAmount={project.currentAmount}
                      goalAmount={project.goalAmount}
                      onCtaClick={() => router.push(`/proyectos/${project.slug}`)}
                    />
                  </Box>
                ))}
              </AnimatePresence>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
