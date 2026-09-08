"use client";

import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { radius, secondary } from "@/theme/tokens";
import { ConfirmDialog } from "./ConfirmDialog";
import type { ProjectStatus } from "./ProjectCard";

/**
 * Antes era un `<Table>` semántico de MUI. El cliente pidió una animación de
 * layout al crear/eliminar filas (mismo lenguaje que el toggle lista/grilla
 * de `/proyectos`, D052) — animar `<tr>` con `framer-motion` es poco
 * confiable entre navegadores (los transforms que usa `layout` para el FLIP
 * no se aplican de forma consistente sobre elementos de tabla), así que se
 * pasa a una "tabla" armada con CSS Grid (encabezado + filas como `Box`
 * `display: grid` con las mismas columnas), donde `layout` + `AnimatePresence`
 * sí funcionan igual que en el resto del sitio. `role="table"/"row"/"cell"`
 * mantiene la semántica de tabla para lectores de pantalla.
 */

export interface DashboardProjectRow {
  id: string;
  title: string;
  status: ProjectStatus;
  currentAmount: number;
  goalAmount: number;
  deadline: string;
  deadlineLabel: string;
}

export interface DashboardTableProps {
  projects: DashboardProjectRow[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

type SortColumn = "title" | "status" | "progress" | "deadline";
type SortDirection = "asc" | "desc";

const EASE = [0.2, 0.8, 0.2, 1] as const;
const GRID_COLUMNS = "minmax(0,1fr) 130px 200px 130px 96px";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function progressOf(row: DashboardProjectRow) {
  return Math.min((row.currentAmount / row.goalAmount) * 100, 100);
}

export function DashboardTable({ projects, onEdit, onDelete }: DashboardTableProps) {
  const theme = useTheme();
  const [sortColumn, setSortColumn] = useState<SortColumn>("deadline");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deleteTarget, setDeleteTarget] = useState<DashboardProjectRow | null>(null);

  function handleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const sortedProjects = useMemo(() => {
    const factor = sortDirection === "asc" ? 1 : -1;
    return [...projects].sort((a, b) => {
      switch (sortColumn) {
        case "title":
          return a.title.localeCompare(b.title) * factor;
        case "status":
          return a.status.localeCompare(b.status) * factor;
        case "progress":
          return (progressOf(a) - progressOf(b)) * factor;
        case "deadline":
        default:
          return (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) * factor;
      }
    });
  }, [projects, sortColumn, sortDirection]);

  return (
    <>
      <Box
        role="table"
        aria-label="Proyectos"
        sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: `${radius.lg}px`, backgroundColor: theme.palette.background.paper, overflow: "hidden" }}
      >
        <Box
          role="row"
          sx={{
            display: "grid",
            gridTemplateColumns: GRID_COLUMNS,
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : theme.palette.action.hover,
            px: 3,
            py: 1,
          }}
        >
          {/* Antes sin `fontSize` propio: al dejar de estar dentro de un
              `<TableCell>` (que MUI dimensiona a ~14px por defecto, D0XX),
              estos encabezados heredaban el tamaño de cuerpo ambiente (16px)
              y se veían desproporcionados frente al resto de la tabla. */}
          {(
            [
              { column: "title" as const, label: "Proyecto" },
              { column: "status" as const, label: "Estado" },
              { column: "progress" as const, label: "Progreso" },
              { column: "deadline" as const, label: "Cierre" },
            ]
          ).map(({ column, label }) => (
            <Box
              key={column}
              role="columnheader"
              sx={{
                fontSize: 13,
                color: theme.palette.text.secondary,
                "& .MuiTableSortLabel-root": { fontSize: 13, fontWeight: 500 },
              }}
            >
              <TableSortLabel active={sortColumn === column} direction={sortColumn === column ? sortDirection : "asc"} onClick={() => handleSort(column)}>
                {label}
              </TableSortLabel>
            </Box>
          ))}
          <Box role="columnheader" sx={{ textAlign: "right", fontSize: 13, fontWeight: 500, color: theme.palette.text.secondary }}>
            Acciones
          </Box>
        </Box>

        <AnimatePresence initial={false}>
          {sortedProjects.map((row) => {
            const isCompleted = row.status === "completed";
            const percent = progressOf(row);

            return (
              <Box
                key={row.id}
                role="row"
                component={motion.div}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: isCompleted ? 0.6 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: EASE }}
                sx={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLUMNS,
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  "&:last-of-type": { borderBottom: "none" },
                }}
              >
                <Box role="cell" sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.text.primary, pr: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.title}
                </Box>
                <Box role="cell">
                  <Box
                    sx={{
                      display: "inline-block",
                      fontSize: "11px",
                      fontWeight: 600,
                      borderRadius: "20px",
                      px: 2.25,
                      py: 0.5,
                      // Antes: fondo translúcido ("26" ≈ 15% opacidad) con
                      // texto en el color de acento — subir la opacidad no fue
                      // suficiente (el cliente lo siguió viendo apagado), así
                      // que se pasa a fondo sólido + texto blanco, mismo
                      // criterio de contraste que la píldora del topbar
                      // (D060/D061).
                      backgroundColor: isCompleted ? theme.palette.success.main : secondary[600],
                      color: "#FFFFFF",
                    }}
                  >
                    {isCompleted ? "Completado" : "Activo"}
                  </Box>
                </Box>
                <Box role="cell">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      color={isCompleted ? "success" : "secondary"}
                      sx={{ width: 80, height: 5, borderRadius: "20px", backgroundColor: theme.palette.action.hover }}
                    />
                    <Box component="span" sx={{ fontSize: "11px", color: theme.palette.text.secondary }}>
                      {Math.round(percent)}%
                    </Box>
                  </Box>
                </Box>
                <Box role="cell" sx={{ fontSize: 13, color: theme.palette.text.secondary }}>
                  {row.deadlineLabel}
                </Box>
                <Box role="cell">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    {/* Un proyecto completado ya no se puede editar — pedido
                        del cliente; Eliminar sigue disponible en cualquier
                        estado. */}
                    {!isCompleted && (
                      <IconButton
                        size="small"
                        onClick={() => onEdit(row.id)}
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: `${radius.sm}px`,
                          color: theme.palette.primary.main,
                          "&:hover": { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main },
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => setDeleteTarget(row)}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: `${radius.sm}px`,
                        color: theme.palette.text.secondary,
                        "&:hover": { borderColor: theme.palette.error.main, color: theme.palette.error.main },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </AnimatePresence>
      </Box>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Eliminar proyecto"
        description={
          deleteTarget ? (
            <>
              Esta acción no se puede deshacer. Se eliminará{" "}
              <Box component="span" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                &quot;{deleteTarget.title}&quot;
              </Box>{" "}
              permanentemente.
            </>
          ) : (
            ""
          )
        }
        confirmLabel="Eliminar"
        destructive
        onConfirm={() => deleteTarget && onDelete(deleteTarget.id)}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
