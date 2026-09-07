import { DashboardProjectsProvider } from "@/lib/dashboardProjectsStore";

/**
 * Layout de `/dashboard` (fase 07, D045) — solo provee el estado compartido
 * de proyectos (`DashboardProjectsProvider`) a `/dashboard` y
 * `/dashboard/proyectos`. El shell visual (`DashboardShell`, sidebar + topbar,
 * D024) se monta en cada página individualmente porque su prop `title` varía
 * por página ("Resumen" vs "Proyectos") — ver nota en `DashboardShell.tsx`.
 */
export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <DashboardProjectsProvider>{children}</DashboardProjectsProvider>;
}
