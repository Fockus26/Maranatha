"use client";

import Box from "@mui/material/Box";
import { ProjectDetailContent } from "@/components/ui/ProjectDetailContent";
import { ProjectSidebar } from "@/components/ui/ProjectSidebar";

const DUMMY_PROJECT = {
  title: "Remodelación del salón de niños",
  description:
    "Ampliar y equipar el espacio para 80 niños, con mobiliario nuevo, aire acondicionado y una zona de juegos segura para las edades más pequeñas de la congregación. Este proyecto busca crear un ambiente cálido y estimulante para el aprendizaje.",
  status: "active" as const,
  currentAmount: 18600,
  goalAmount: 30000,
  deadlineLabel: "cierra 30 Nov 2026",
  budget: [
    { label: "Mobiliario", amount: 12000 },
    { label: "Climatización", amount: 14000 },
    { label: "Zona de juegos", amount: 4000 },
  ],
  encargados: [
    { name: "María González", role: "Encargada", imageUrl: "https://picsum.photos/seed/maria/200/200", instagramUrl: "https://instagram.com" },
    { name: "Juan Pérez", role: "Encargado", imageUrl: "https://picsum.photos/seed/juan/200/200", instagramUrl: "https://instagram.com" },
  ],
};

export function ProjectDetailSection() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 6, alignItems: "start" }}>
      <ProjectDetailContent
        title={DUMMY_PROJECT.title}
        description={DUMMY_PROJECT.description}
        budget={DUMMY_PROJECT.budget}
      />
      <ProjectSidebar
        status={DUMMY_PROJECT.status}
        currentAmount={DUMMY_PROJECT.currentAmount}
        goalAmount={DUMMY_PROJECT.goalAmount}
        deadlineLabel={DUMMY_PROJECT.deadlineLabel}
        encargados={DUMMY_PROJECT.encargados}
      />
    </Box>
  );
}