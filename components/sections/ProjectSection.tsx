"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ProjectCard, type ProjectStatus } from "@/components/ui/ProjectCard";

type DummyProject = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  currentAmount: number;
  goalAmount: number;
};

const DUMMY_PROJECTS: DummyProject[] = [
  {
    id: "1",
    title: "Remodelación del salón de niños de la iglesia para las nuevas generaciones",
    description:
      "Ampliar y equipar el espacio para 80 niños, con mobiliario nuevo, aire acondicionado y una zona de juegos segura. Cierre: 30 Nov 2026.",
    status: "active",
    currentAmount: 18600,
    goalAmount: 30000,
  },
  {
    id: "2",
    title: "Equipo de sonido",
    description: "Renovar consola y micrófonos del templo. Cierre: 15 Dic 2026.",
    status: "active",
    currentAmount: 5100,
    goalAmount: 15000,
  },
  {
    id: "3",
    title: "Banco de alimentos",
    description: "Despensa mensual para 40 familias de la comunidad. Cerrado: 20 Ago 2026.",
    status: "completed",
    currentAmount: 8000,
    goalAmount: 8000,
  },
];

export function ProjectsSection() {
  const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical");

  return (
    <Box>
      <ToggleButtonGroup
        exclusive
        value={layout}
        onChange={(_, value) => value && setLayout(value)}
        size="small"
        sx={{ mb: 6 }}
      >
        <ToggleButton value="vertical">Vertical</ToggleButton>
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
      </ToggleButtonGroup>

      {layout === "vertical" ? (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 5 }}>
          {DUMMY_PROJECTS.map((project) => (
            <ProjectCard key={project.id} layout="vertical" {...project} />
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          {DUMMY_PROJECTS.map((project) => (
            <ProjectCard key={project.id} layout="horizontal" {...project} />
          ))}
        </Box>
      )}
    </Box>
  );
}