"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { radius, typography } from "@/theme/tokens";
import { useDashboardProjects } from "@/lib/dashboardProjectsStore";

/**
 * Página "Dashboard — Resumen" (`/dashboard`, fase 07, D045): tarjetas de KPI
 * (recaudado total, proyectos activos, proyectos completados) + una mini-lista
 * de los proyectos activos con cierre más próximo — elegido por el cliente
 * entre 3 opciones (stats+próximos cierres / solo redirect / solo stats).
 *
 * Lee el mismo estado compartido que `/dashboard/proyectos`
 * (`useDashboardProjects`), así que refleja cualquier alta/edición/baja hecha
 * ahí durante la sesión.
 */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${radius.lg}px`,
        backgroundColor: theme.palette.background.paper,
        p: 4,
      }}
    >
      <Typography
        sx={{
          fontFamily: typography.fontFamily.body,
          fontSize: 12,
          color: theme.palette.text.secondary,
          mb: 1.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: typography.fontFamily.heading,
          fontWeight: 800,
          fontSize: 28,
          color: accent ? theme.palette.secondary.main : theme.palette.text.primary,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function DashboardResumenPage() {
  const theme = useTheme();
  const { projects } = useDashboardProjects();

  const stats = useMemo(() => {
    const totalRecaudado = projects.reduce((sum, project) => sum + project.currentAmount, 0);
    const activos = projects.filter((project) => project.status === "active");
    const completados = projects.filter((project) => project.status === "completed");
    const proximosCierres = [...activos]
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 4);
    return { totalRecaudado, activos, completados, proximosCierres };
  }, [projects]);

  return (
    <DashboardShell title="Resumen">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 3, mb: 5 }}>
        <StatCard label="Total recaudado" value={formatCurrency(stats.totalRecaudado)} accent />
        <StatCard label="Proyectos activos" value={String(stats.activos.length)} />
        <StatCard label="Proyectos completados" value={String(stats.completados.length)} />
      </Box>

      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${radius.lg}px`,
          backgroundColor: theme.palette.background.paper,
          p: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: typography.fontFamily.heading,
            fontWeight: 600,
            fontSize: 14,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          Próximos cierres
        </Typography>

        {stats.proximosCierres.length === 0 ? (
          <Typography sx={{ fontSize: 13, color: theme.palette.text.secondary }}>
            No hay proyectos activos por el momento.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {stats.proximosCierres.map((project) => {
              const percent = Math.min(Math.round((project.currentAmount / project.goalAmount) * 100), 100);
              return (
                <Box
                  key={project.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    pb: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    "&:last-of-type": { borderBottom: "none", pb: 0 },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: typography.fontFamily.heading,
                        fontWeight: 600,
                        fontSize: 13,
                        color: theme.palette.text.primary,
                        mb: 0.75,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.title}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      color="secondary"
                      sx={{ height: 5, borderRadius: "20px", backgroundColor: theme.palette.action.hover }}
                    />
                  </Box>
                  <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: theme.palette.text.primary }}>
                      {project.deadlineLabel}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: theme.palette.text.secondary }}>{percent}%</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </DashboardShell>
  );
}
