"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ServiceAreaGrid } from "./ServiceAreaGrid";

/**
 * Sección "Áreas de Servicio" (fase 06) — Opción A "Heading simple centrado"
 * (elegida sobre B "Asimétrico 2 columnas" y C "Numeración de sección").
 * El grid de cards (`ServiceAreaGrid`/`ServiceAreaCard`) ya estaba cerrado
 * en fase 04 (D012) — esta sección solo le agrega el encabezado editorial
 * y el espaciado/ancla que le faltaban.
 *
 * Nota de contenido: el copy no menciona un número fijo de áreas ("5 áreas")
 * a propósito — `SERVICE_AREAS` en ServiceAreaGrid hoy solo tiene 4 entradas
 * (Alabanza, Servicio comunitario, Niños, Evangelismo), mientras que
 * HistoryTimeline y el stat del Hero hablan de 5. Pendiente de reconciliar
 * con el cliente/usuario antes de cerrar fase 06 del todo.
 */
export function AreasSection() {
  return (
    <Box component="section" id="areas" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 640, mx: "auto", textAlign: "center", mb: { xs: 5, md: 7 } }}>
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
            Cómo servimos
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
            Encuentra tu lugar para servir
          </Typography>

          <Typography
            sx={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "text.secondary",
            }}
          >
            Cada área es una forma distinta de vivir la fe en comunidad — súmate a la que resuene contigo.
          </Typography>
        </Box>

        <ServiceAreaGrid />
      </Container>
    </Box>
  );
}
