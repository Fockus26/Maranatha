"use client";

import Box from "@mui/material/Box";
import { YoutubeEmbedCard } from "@/components/ui/YoutubeEmbedCard";

const PREDICAS = [
  {
    videoId: "REEMPLAZAR_ID_1",
    title: "El poder de la fe en tiempos difíciles",
    publishedAt: "18 de agosto, 2026",
  },
  {
    videoId: "REEMPLAZAR_ID_2",
    title: "Servicio dominical completo",
    publishedAt: "11 de agosto, 2026",
  },
  {
    videoId: "REEMPLAZAR_ID_3",
    title: "Caminando en propósito",
    publishedAt: "4 de agosto, 2026",
  },
  {
    videoId: "REEMPLAZAR_ID_4",
    title: "La gracia que sostiene",
    publishedAt: "28 de julio, 2026",
  },
] as const;

export function SermonsGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        gap: "24px",
      }}
    >
      {PREDICAS.map((video) => (
        <YoutubeEmbedCard
          key={video.videoId}
          {...video}
          onPlay={(id) => console.log("abrir modal con video:", id)}
        />
      ))}
    </Box>
  );
}