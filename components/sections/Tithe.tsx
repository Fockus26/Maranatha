"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import { TitheForm, type TitheFormValues } from "@/components/ui/TitheForm";

/**
 * Sección "CTA Diezmo/Aportes" (fase 06) — componente + datos en un solo archivo (D030).
 *
 * Última sección pendiente de Fase 06 (SECTION_INVENTORY). Es el CTA de más alta
 * prioridad del sitio (D011) — a diferencia de las demás secciones de Home (fondo
 * `background.default`/`paper`), esta usa **fondo navy sólido fijo**, sin importar el
 * modo claro/oscuro activo (mismo criterio que el sidebar del dashboard, D025, y el
 * overlay del menú mobile, D026) para que se sienta como el "cierre" del recorrido de
 * Home, no una sección más.
 *
 * Reutiliza `TitheForm` (`components/ui/TitheForm.tsx`, D018/D019) **sin modificarlo**
 * — trae su propio `DonationFormCard` (fondo `background.paper`, así que sobre el navy
 * de la sección queda como una card clara flotando, con buen contraste). `onSubmit` es
 * un placeholder (`console.log` + no-op) — el formulario no captura tarjeta ni procesa
 * pago (D018), solo recolecta los datos; la integración con un proveedor de pago real
 * queda fuera de alcance de esta fase.
 *
 * `id="diezmo"` — coincide con `TITHE_ANCHOR_ID` (`components/layout/navItems.ts`),
 * el ancla que ya usan el botón "Diezmo" del Navbar, el PageNavbar y el
 * MobileMenuOverlay (a diferencia de Historia/Proyectos, que son páginas propias, D007,
 * este sí es un scroll-target real dentro de Home).
 */

export function Tithe() {
  function handleSubmit(values: TitheFormValues) {
    // Placeholder: no hay proveedor de pago integrado todavía (fuera de alcance de
    // esta fase). El formulario ya valida y entrega los datos vía onSubmit (D018);
    // acá solo se registran en consola hasta que exista un backend/proveedor real.
    console.log("Tithe form submitted (placeholder):", values);
  }

  return (
    <Box
      component="section"
      id="diezmo"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#101B45",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              maxWidth: 480,
              textAlign: { xs: "center", md: "left" },
              pt: { md: 2 },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "12px",
                backgroundColor: "rgba(245,246,250,0.1)",
                color: "secondary.light",
                mb: 3,
              }}
            >
              <VolunteerActivismRoundedIcon fontSize="small" />
            </Box>

            <Typography
              component="span"
              sx={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "secondary.light",
                mb: 1.5,
              }}
            >
              Da con propósito
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: { xs: "28px", md: "38px" },
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#F5F6FA",
                mb: 2,
              }}
            >
              Tu diezmo y tus aportes sostienen esta obra
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(245,246,250,0.72)",
              }}
            >
              Cada aporte se destina directamente a nuestras áreas de servicio y proyectos
              activos. Elige un monto, única vez o mensual, y completa tus datos — sin
              compromisos, cancela cuando quieras.
            </Typography>
          </Box>

          <Box sx={{ flexShrink: 0 }}>
            <TitheForm width={440} onSubmit={handleSubmit} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
