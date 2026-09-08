import { DashboardProjectsProvider } from "@/lib/dashboardProjectsStore";
import { DashboardProjectModalProvider } from "@/lib/dashboardProjectModalStore";
import { DashboardProjectModal } from "@/components/ui/DashboardProjectModal";

/**
 * Layout de `/dashboard` (fase 07, D045) — provee el estado compartido de
 * proyectos (`DashboardProjectsProvider`) y, desde D059, también el del modal
 * de crear/editar proyecto (`DashboardProjectModalProvider`) a `/dashboard` y
 * `/dashboard/proyectos`. El modal (`DashboardProjectModal`) se monta acá una
 * sola vez — mismo criterio que `TitheModal` en `app/layout.tsx` (D049) — para
 * que el botón "Nuevo proyecto" de Resumen pueda abrirlo sin navegar primero
 * a Proyectos. El shell visual (`DashboardShell`, topbar, D024/D059) se monta
 * en cada página individualmente, ver nota en `DashboardShell.tsx`.
 */
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <DashboardProjectsProvider>
      <DashboardProjectModalProvider>
        {children}
        <DashboardProjectModal />
      </DashboardProjectModalProvider>
    </DashboardProjectsProvider>
  );
}
