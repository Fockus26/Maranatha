"use client";

import Box from "@mui/material/Box";
import { DashboardTable, type DashboardProjectRow } from "@/components/ui/DashboardTable";

const DUMMY_ROWS: DashboardProjectRow[] = [
  { id: "1", title: "Remodelación salón de niños", status: "active", currentAmount: 18600, goalAmount: 30000, deadline: "2026-11-30", deadlineLabel: "30 Nov 2026" },
  { id: "2", title: "Equipo de sonido", status: "active", currentAmount: 5100, goalAmount: 15000, deadline: "2026-12-15", deadlineLabel: "15 Dic 2026" },
  { id: "3", title: "Banco de alimentos", status: "completed", currentAmount: 8000, goalAmount: 8000, deadline: "2026-08-20", deadlineLabel: "20 Ago 2026" },
];

export function DashboardProjectsSection() {
  return (
    <Box>
      <DashboardTable
        projects={DUMMY_ROWS}
        onEdit={(id) => console.log("editar", id)}
        onDelete={(id) => console.log("eliminar", id)}
      />
    </Box>
  );
}