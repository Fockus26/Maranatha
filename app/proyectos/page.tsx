"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PageNavbar from "@/components/layout/PageNavbar";
import Footer from "@/components/layout/Footer";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projectsData";

/**
 * Página "Proyectos" (`/proyectos`, fase 07, D044) — listado completo, a
 * diferencia de los 3 destacados en Home (`components/sections/Projects.tsx`,
 * D041). Usa `ProjectCard` en layout `horizontal` (D016, pensado justo para
 * este listado), sin modificarlo.
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
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              Cada proyecto es una necesidad real de la iglesia — tu aporte hace la diferencia.
            </Typography>
          </Box>

          <Tabs
            value={tab}
            onChange={(_, value: FilterTab) => setTab(value)}
            sx={{
              mb: { xs: 4, md: 5 },
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
              "& .MuiTabs-indicator": { backgroundColor: "secondary.main", height: 2 },
              "& .Mui-selected": { color: "text.primary !important" },
            }}
          >
            <Tab value="all" label={`Todos (${PROJECTS.length})`} />
            <Tab value="active" label={`Activos (${PROJECTS.filter((p) => p.status === "active").length})`} />
            <Tab value="completed" label={`Completados (${PROJECTS.filter((p) => p.status === "completed").length})`} />
          </Tabs>

          {filtered.length === 0 ? (
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              No hay proyectos en esta categoría por ahora.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {filtered.map((project) => (
                <ProjectCard
                  key={project.slug}
                  layout="horizontal"
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  status={project.status}
                  currentAmount={project.currentAmount}
                  goalAmount={project.goalAmount}
                  onCtaClick={() => router.push(`/proyectos/${project.slug}`)}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
