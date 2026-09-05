"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { DashboardSidebar, DASHBOARD_SIDEBAR_WIDTH } from "./DashboardSidebar";

export interface DashboardShellProps {
  title: string;
  onLogout?: () => void;
  children: React.ReactNode;
}

/**
 * Layout del dashboard privado (D024): `DashboardSidebar` fijo + topbar
 * superior minimal con el título de la sección activa. El resto de
 * controles (usuario, ThemeToggle, Salir) vive en el propio sidebar para no
 * duplicarlos en el topbar.
 *
 * Uso previsto (fase 07, cuando se creen las páginas del dashboard):
 *
 * ```tsx
 * // app/dashboard/layout.tsx
 * export default function DashboardLayout({ children }: { children: React.ReactNode }) {
 *   return <DashboardShell title="Resumen">{children}</DashboardShell>;
 * }
 * ```
 */
export function DashboardShell({ title, onLogout, children }: DashboardShellProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardSidebar onLogout={onLogout} />
      <Box sx={{ flex: 1, ml: `${DASHBOARD_SIDEBAR_WIDTH}px`, minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            px: 4,
            py: 2.5,
          }}
        >
          <Typography sx={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20 }}>
            {title}
          </Typography>
        </Box>
        <Box component="main" sx={{ p: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
