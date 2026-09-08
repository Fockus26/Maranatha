"use client";

import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DashboardProjectForm, type DashboardProjectFormValues } from "./DashboardProjectForm";
import { useDashboardProjects } from "@/lib/dashboardProjectsStore";
import { useDashboardProjectModal } from "@/lib/dashboardProjectModalStore";

/**
 * Modal "Crear/editar proyecto" del dashboard — montado una sola vez en
 * `app/dashboard/layout.tsx` (mismo patrón que `TitheModal`, D049) para que
 * tanto Resumen como Proyectos puedan abrirlo (`useDashboardProjectModal`)
 * sin duplicar el Dialog ni navegar primero.
 *
 * Revisión (feedback del cliente): altura fija `95vh` con scroll interno del
 * contenido (antes el Dialog crecía con el contenido y usaba `scroll="body"`,
 * lo que scrolleaba la página entera en vez del modal) — `DashboardProjectForm`
 * ahora se usa con la prop `bare` para no duplicar el borde/fondo/padding que
 * ya aporta el propio `Dialog` (antes se veía como una tarjeta blanca flotando
 * sobre el fondo de otra tarjeta, con espacio "de más" alrededor).
 */
export function DashboardProjectModal() {
  const theme = useTheme();
  const { open, editingId, close } = useDashboardProjectModal();
  const { projects, addProject, updateProject } = useDashboardProjects();

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

  function handleSubmit(values: DashboardProjectFormValues) {
    if (editingId) {
      updateProject(editingId, values);
    } else {
      addProject(values);
    }
    close();
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="sm"
      fullWidth
      slotProps={{
        // `elevation: 0` — mismo diagnóstico que `TitheModal`/`ConfirmDialog`
        // (D057/D058/D061): sin esto, el overlay blanco automático de MUI en
        // modo oscuro aclaraba el fondo del modal más de lo esperado.
        paper: {
          elevation: 0,
          sx: {
            height: "95vh",
            maxHeight: "95vh",
            m: { xs: 2, sm: 4 },
          },
        },
      }}
    >
      <IconButton
        onClick={close}
        aria-label="Cerrar"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1,
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          "&:hover": { borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main },
        }}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
      <DialogContent sx={{ p: { xs: 3, sm: 5 }, pt: { xs: 6, sm: 6.5 } }}>
        <DashboardProjectForm
          key={editingId ?? "new"}
          bare
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={close}
        />
      </DialogContent>
    </Dialog>
  );
}
