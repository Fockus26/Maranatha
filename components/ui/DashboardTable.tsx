"use client";

import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { radius } from "@/theme/tokens";
import { ConfirmDialog } from "./ConfirmDialog";
import type { ProjectStatus } from "./ProjectCard";

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
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: `${radius.lg}px` }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active={sortColumn === "title"} direction={sortColumn === "title" ? sortDirection : "asc"} onClick={() => handleSort("title")}>
                  Proyecto
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={sortColumn === "status"} direction={sortColumn === "status" ? sortDirection : "asc"} onClick={() => handleSort("status")}>
                  Estado
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={sortColumn === "progress"} direction={sortColumn === "progress" ? sortDirection : "asc"} onClick={() => handleSort("progress")}>
                  Progreso
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel active={sortColumn === "deadline"} direction={sortColumn === "deadline" ? sortDirection : "asc"} onClick={() => handleSort("deadline")}>
                  Cierre
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProjects.map((row) => {
              const isCompleted = row.status === "completed";
              const percent = progressOf(row);

              return (
                <TableRow key={row.id} sx={{ opacity: isCompleted ? 0.6 : 1 }}>
                  <TableCell sx={{ fontWeight: 500 }}>{row.title}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        fontSize: "11px",
                        fontWeight: 500,
                        borderRadius: "20px",
                        px: 2.25,
                        py: 0.5,
                        backgroundColor: isCompleted ? theme.palette.success.main + "1A" : theme.palette.secondary.main + "1A",
                        color: isCompleted ? theme.palette.success.main : theme.palette.secondary.dark,
                      }}
                    >
                      {isCompleted ? "Completado" : "Activo"}
                    </Box>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>{row.deadlineLabel}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Eliminar proyecto"
        description={deleteTarget ? `Esta acción no se puede deshacer. Se eliminará "${deleteTarget.title}" permanentemente.` : ""}
        confirmLabel="Eliminar"
        destructive
        onConfirm={() => deleteTarget && onDelete(deleteTarget.id)}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}