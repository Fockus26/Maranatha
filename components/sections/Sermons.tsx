"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { alpha, useTheme } from "@mui/material/styles";
import { YoutubeEmbedCard } from "@/components/ui/YoutubeEmbedCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Sección "Prédicas" (fase 06) — componente + datos en un solo archivo
 * (D030). Heading — mismo patrón izquierda/centrado que Áreas de Servicio
 * y Liderazgo (D032).
 *
 * NOTA DE CONTENIDO: `videoId` y `YOUTUBE_CHANNEL_URL` son placeholders —
 * el cliente aún no entregó IDs de video ni el handle real del canal.
 * Reemplazar antes de producción.
 */

const YOUTUBE_CHANNEL_URL = "https://youtube.com/@iglesia-maranatha";

const SERMONS = [
  {
    videoId: "sermon-placeholder-1",
    title: "El poder de la fe en tiempos de incertidumbre",
    publishedAt: "18 de agosto, 2026",
  },
  {
    videoId: "sermon-placeholder-2",
    title: "Servir con propósito: una vida entregada a los demás",
    publishedAt: "11 de agosto, 2026",
  },
  {
    videoId: "sermon-placeholder-3",
    title: "Gracia y comunidad: caminar juntos en fe",
    publishedAt: "4 de agosto, 2026",
  },
] as const;

export function Sermons() {
  const theme = useTheme();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <Box component="section" id="predicas" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box
            sx={{
              maxWidth: 640,
              mx: { xs: "auto", md: 0 },
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 5, md: 7 },
            }}
          >
            <Typography
              component="span"
              sx={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "secondary.main",
                mb: 1.5,
              }}
            >
              Prédicas
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: { xs: "28px", md: "38px" },
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "text.primary",
                mb: 2,
              }}
            >
              Vive cada mensaje, donde estés
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              Revive nuestros últimos servicios y prédicas directamente desde nuestro canal de YouTube.
            </Typography>
          </Box>
        </Reveal>

        <Reveal delay={0.12}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: "24px",
              mb: { xs: 5, md: 6 },
            }}
          >
            {SERMONS.map((sermon) => (
              <YoutubeEmbedCard
                key={sermon.videoId}
                videoId={sermon.videoId}
                title={sermon.title}
                publishedAt={sermon.publishedAt}
                onPlay={setActiveVideoId}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
            {/* Mismo tratamiento que "Ver proyecto" (ProjectCard/ProjectSidebar)
                y "Seguir" (SocialLinkCard): neutro en reposo, acento navy al
                interactuar — copiando el patrón del CTA del Hero (D028) pero
                con azul en vez de naranja (fase 07, ronda de feedback
                siguiente a D050). Reemplaza el pill redondeado distintivo de
                D048 — el cliente pidió unificar este botón con los demás en
                vez de mantenerle una firma visual propia. */}
            <Button
              variant="outlined"
              size="large"
              component="a"
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<YouTubeIcon />}
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              Ver canal de YouTube
            </Button>
          </Box>
        </Reveal>
      </Container>

      <Dialog
        open={activeVideoId !== null}
        onClose={() => setActiveVideoId(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { backgroundColor: "background.paper", borderRadius: "12px" },
          },
        }}
      >
        <Box sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={() => setActiveVideoId(null)}
            aria-label="Cerrar"
            sx={{
              position: "absolute",
              top: -44,
              right: 0,
              color: "common.white",
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          {activeVideoId && (
            <Box sx={{ position: "relative", aspectRatio: "16 / 9", backgroundColor: "#000" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1`}
                title="Prédica"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
