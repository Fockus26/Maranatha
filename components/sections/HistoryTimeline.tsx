"use client";

import Box from "@mui/material/Box";
import { TimelineItem } from "@/components/ui/TimelineItem";

type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
};

const DUMMY_MILESTONES: Milestone[] = [
  {
    id: "1",
    year: "2015",
    title: "Fundación",
    description: "Comenzamos con 12 familias reunidas en una casa, con la visión de construir comunidad.",
  },
  {
    id: "2",
    year: "2017",
    title: "Primer local propio",
    description: "Alquilamos nuestro primer espacio fijo para los servicios dominicales.",
  },
  {
    id: "3",
    year: "2019",
    title: "Nuevo templo",
    description: "Inauguramos el templo actual, un hito clave en el crecimiento de la congregación.",
  },
  {
    id: "4",
    year: "2022",
    title: "Cinco áreas de servicio",
    description: "Se consolidan los equipos de alabanza, jóvenes, niños, oración y servicio comunitario.",
  },
  {
    id: "5",
    year: "2024",
    title: "Proyectos comunitarios",
    description: "Lanzamos el programa de proyectos con recaudación abierta a la congregación.",
  },
  {
    id: "6",
    year: "2026",
    title: "Hoy",
    description: "Más de 400 personas forman parte activa de la comunidad.",
  },
];

export interface HistoryTimelineProps {
  milestones?: Milestone[];
}

export function HistoryTimeline({ milestones = DUMMY_MILESTONES }: HistoryTimelineProps) {
  const total = milestones.length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {milestones.map((milestone, index) => (
        <TimelineItem
          key={milestone.id}
          year={milestone.year}
          title={milestone.title}
          description={milestone.description}
          progress={total > 1 ? index / (total - 1) : 1}
        />
      ))}
    </Box>
  );
}