"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";

/**
 * Sección "Redes Sociales" (fase 06) — componente + datos en un solo
 * archivo (D030). Heading — mismo patrón izquierda/centrado que las
 * secciones anteriores (D032).
 *
 * Revisión (D035): la organización tiene 3 cuentas de Instagram, no una
 * sola. Se agrega un selector de cuenta.
 *
 * Revisión (D036): el selector deja de ser chips sueltos + card aparte —
 * ahora son tabs que se fusionan visualmente con el `SocialLinkCard`
 * (efecto "pestaña de Chrome": la tab activa comparte fondo y esquinas
 * redondeadas con el panel de abajo, como si el panel saliera de ella).
 * `SocialLinkCard` recibe `bare` (D036) para no duplicar el borde/fondo
 * que ya resuelve el panel. Las portadas de posts pasan de 1:1 a 4:5
 * (más altura, más parecido al grid real de Instagram).
 *
 * Sin reproducción de reels ni integración con la API oficial de Meta
 * (fuera de alcance, a pedido explícito del usuario) — cada portada es
 * solo un link que abre el post real en Instagram en una pestaña nueva.
 *
 * NOTA DE CONTENIDO: handles, URLs y portadas de posts son placeholders
 * (gradientes de marcador, no capturas reales) — pendientes de que el
 * cliente entregue las cuentas y el contenido reales.
 */

const ACCOUNTS = [
  {
    id: "maranatha",
    label: "Iglesia Maranatha",
    handle: "@iglesia.maranatha",
    href: "https://instagram.com/iglesia.maranatha",
    posts: [
      { id: "m1", href: "https://instagram.com/p/placeholder-m1", gradient: "radial-gradient(400px 400px at 70% 20%, #5B6B9E 0%, #1E2B5C 55%, #0B1433 100%)" },
      { id: "m2", href: "https://instagram.com/p/placeholder-m2", gradient: "radial-gradient(400px 400px at 30% 70%, #8894C2 0%, #37447A 55%, #101B45 100%)" },
      { id: "m3", href: "https://instagram.com/p/placeholder-m3", gradient: "radial-gradient(400px 400px at 70% 70%, #FCA355 0%, #B34C02 55%, #0B1433 100%)" },
      { id: "m4", href: "https://instagram.com/p/placeholder-m4", gradient: "radial-gradient(400px 400px at 30% 20%, #AFB7D6 0%, #434A63 55%, #0B1433 100%)" },
    ],
  },
  {
    id: "evangelio",
    label: "El Evangelio Cambia",
    handle: "@elevangeliocambia",
    href: "https://instagram.com/elevangeliocambia",
    posts: [
      { id: "e1", href: "https://instagram.com/p/placeholder-e1", gradient: "radial-gradient(400px 400px at 70% 20%, #FA8A2E 0%, #8A3B03 55%, #0B1433 100%)" },
      { id: "e2", href: "https://instagram.com/p/placeholder-e2", gradient: "radial-gradient(400px 400px at 30% 70%, #5B6B9E 0%, #1E2B5C 55%, #0B1433 100%)" },
      { id: "e3", href: "https://instagram.com/p/placeholder-e3", gradient: "radial-gradient(400px 400px at 70% 70%, #8894C2 0%, #37447A 55%, #101B45 100%)" },
      { id: "e4", href: "https://instagram.com/p/placeholder-e4", gradient: "radial-gradient(400px 400px at 30% 20%, #FCA355 0%, #B34C02 55%, #0B1433 100%)" },
    ],
  },
  {
    id: "generacion-jef",
    label: "Generación JEF",
    handle: "@generacionjef",
    href: "https://instagram.com/generacionjef",
    posts: [
      { id: "g1", href: "https://instagram.com/p/placeholder-g1", gradient: "radial-gradient(400px 400px at 70% 20%, #AFB7D6 0%, #434A63 55%, #0B1433 100%)" },
      { id: "g2", href: "https://instagram.com/p/placeholder-g2", gradient: "radial-gradient(400px 400px at 30% 70%, #FA8A2E 0%, #8A3B03 55%, #0B1433 100%)" },
      { id: "g3", href: "https://instagram.com/p/placeholder-g3", gradient: "radial-gradient(400px 400px at 70% 70%, #5B6B9E 0%, #1E2B5C 55%, #0B1433 100%)" },
      { id: "g4", href: "https://instagram.com/p/placeholder-g4", gradient: "radial-gradient(400px 400px at 30% 20%, #8894C2 0%, #37447A 55%, #101B45 100%)" },
    ],
  },
] as const;

export function SocialLinks() {
  const [activeId, setActiveId] = useState<(typeof ACCOUNTS)[number]["id"]>(ACCOUNTS[0].id);
  const active = ACCOUNTS.find((a) => a.id === activeId) ?? ACCOUNTS[0];

  return (
    <Box component="section" id="redes" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 640,
            mx: { xs: "auto", md: 0 },
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 5, md: 6 },
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
            Redes sociales
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
            Síguenos en cada cuenta
          </Typography>

          <Typography
            sx={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "text.secondary",
            }}
          >
            Elige una cuenta para ver sus últimas publicaciones y seguirla desde ahí.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: { xs: 4, md: 5 },
            maxWidth: 480,
            mx: { xs: "auto", md: 0 },
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[100] : alpha(t.palette.common.white, 0.04),
            }}
          >
            {ACCOUNTS.map((account) => {
              const isActive = account.id === activeId;
              return (
                <ButtonBase
                  key={account.id}
                  onClick={() => setActiveId(account.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.6,
                    flexGrow: isActive ? 1.3 : 1,
                    flexBasis: 0,
                    minWidth: 0,
                    py: 1.4,
                    px: 0.75,
                    backgroundColor: isActive ? "background.paper" : "transparent",
                    color: isActive ? "text.primary" : "text.secondary",
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "12px",
                    borderTopLeftRadius: isActive ? "14px" : 0,
                    borderTopRightRadius: isActive ? "14px" : 0,
                    transition:
                      "flex-grow 0.3s ease, background-color 0.3s ease, color 0.2s ease",
                  }}
                >
                  <InstagramIcon sx={{ fontSize: 15, flexShrink: 0 }} />
                  <Box
                    component="span"
                    sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {account.label}
                  </Box>
                </ButtonBase>
              );
            })}
          </Box>

          <Box sx={{ backgroundColor: "background.paper", p: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
              >
                <SocialLinkCard
                  bare
                  platform={active.label}
                  handle={active.handle}
                  href={active.href}
                  icon={InstagramIcon}
                  ctaLabel="Seguir"
                />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: "16px",
          }}
        >
          {active.posts.map((post) => (
            <Box
              key={post.id}
              component="a"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver publicación en Instagram de ${active.label}`}
              sx={{
                position: "relative",
                display: "block",
                aspectRatio: "4 / 5",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: "secondary.main" },
              }}
            >
              <Box sx={{ position: "absolute", inset: 0, background: post.gradient }} />
              <InstagramIcon
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  fontSize: 16,
                  color: "rgba(245,246,250,0.85)",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
