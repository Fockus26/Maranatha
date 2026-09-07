"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { DashboardTable, type DashboardProjectRow } from "@/components/ui/DashboardTable";
import { DashboardProjectForm, type DashboardProjectFormValues } from "@/components/ui/DashboardProjectForm";
import { useDashboardProjects } from "@/lib/dashboardProjectsStore";

/**
 * Página "Dashboard — Proyectos" (`/dashboard/proyectos`, fase 07, D045):
 * `DashboardTable` (D022) + `DashboardProjectForm` (D023) para crear/editar,
 * abierto en un **modal** sobre la tabla — elegido por el cliente entre 3
 * opciones (modal / rutas dedicadas / vista inline en la misma página) porque
 * no requiere navegar y alcanza sobradamente para el tamaño de la lista.
 *
 * `DashboardTable` ya trae su propio `ConfirmDialog` para eliminar (D021/D022)
 * — no se duplica acá.
 */

export default function DashboardProyectosPage() {
  const { projects, addProject, updateProject, deleteProject } = useDashboardProjects();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const rows: DashboardProjectRow[] = useMemo(
    () =>
      projects.map((project) => ({
        id: project.id,
        title: project.title,
        status: project.status,
        currentAmount: project.currentAmount,
        goalAmount: project.goalAmount,
        deadline: project.deadline,
        deadlineLabel: project.deadlineLabel,
      })),
    [projects],
  );

  const editingProject = editingId ? projects.find((project) => project.id === editingId) : undefined;

  const initialValues: Partial<DashboardProjectFormValues> | undefined = editingProject
    ? {
        title: editingProject.title,
        description: editingProject.description,
        imageUrl: editingProject.imageUrl,
        goalAmount: editingProject.goalAmount,
        currentAmount: editingProject.currentAmount,
        deadline: editingProject.deadline,
        budget: editingProject.budget,
        encargados: editingProject.encargados,
      }
    : undefined;

  function openCreate() {
    setEditingId(null);
    setFormOpen(true);
  }

  function openEdit(id: string) {
    setEditingId(id);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  function handleSubmit(values: DashboardProjectFormValues) {
    if (editingId) {
      updateProject(editingId, values);
    } else {
      addProject(values);
    }
    closeForm();
  }

  return (
    <DashboardShell title="Proyectos">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreate}>
          Nuevo proyecto
        </Button>
      </Box>

      <DashboardTable projects={rows} onEdit={openEdit} onDelete={deleteProject} />

      <Dialog open={formOpen} onClose={closeForm} maxWidth="md" fullWidth scroll="body">
        <IconButton
          onClick={closeForm}
          aria-label="Cerrar"
          sx={{ position: "absolute", top: 12, right: 12, zIndex: 1, color: "text.secondary" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <DialogContent sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <DashboardProjectForm
            key={editingId ?? "new"}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
