"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { primary, secondary } from "@/theme/tokens";
import type { MobileNavLink } from "./navItems";

export interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
  links: MobileNavLink[];
  onCtaClick: () => void;
  ctaLabel?: string;
}

/**
 * Menú mobile — overlay fullscreen con enlaces centrados y aparición en
 * stagger (D025). Compartido entre `Navbar` (Home) y `PageNavbar` (resto de
 * páginas públicas): ambos le pasan su propia lista de `links` ya resuelta
 * (con `active` calculado por scroll-spy o por ruta, según corresponda).
 *
 * Revisión (feedback de cliente, ronda post-fase 08):
 * - Antes el fondo era navy sólido fijo (`primary[900]`) sin importar el
 *   modo claro/oscuro (D025) — a propósito, igual que el sidebar del
 *   dashboard (D024). Pero al tocar el `ThemeToggle` DENTRO de este overlay
 *   fullscreen, el fondo no cambiaba (el resto del sitio sí cambia de modo,
 *   pero queda tapado detrás del propio menú), así que parecía que el botón
 *   no hacía nada. Ahora el fondo sigue el modo activo (igual que
 *   `background.default` del resto del sitio: navy en oscuro, claro en modo
 *   claro) — el toggle da feedback visual inmediato sin salir del menú.
 * - Los enlaces de ancla (secciones de Home) y los de página (Proyectos,
 *   Inicio) se veían idénticos — antes ambos usaban el mismo texto grande
 *   subrayado, sin la distinción que sí existe en escritorio (ahí las
 *   páginas usan una píldora con ícono y borde, ver `Navbar`/`PageNavbar`,
 *   D023). Ahora los links de página se renderizan como esa misma píldora
 *   (ícono + borde, tamaño más chico) para que se lea igual que en
 *   escritorio: "esto te lleva a otro lugar", no una sección de esta misma
 *   página.
 */
export default function MobileMenuOverlay({
  open,
  onClose,
  links,
  onCtaClick,
  ctaLabel = "Diezmo",
}: MobileMenuOverlayProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const overlayBg = isLight ? theme.palette.background.default : primary[900];
  const textColor = isLight ? theme.palette.text.primary : "#FFFFFF";
  const mutedColor = isLight ? theme.palette.text.secondary : "rgba(255,255,255,0.75)";
  const hoverBg = isLight ? theme.palette.action.hover : "rgba(255,255,255,0.12)";
  const dividerColor = isLight ? theme.palette.divider : "rgba(255,255,255,0.24)";

  // Cierra con Escape y bloquea el scroll del body mientras está abierto.
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const handleAnchorClick = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    onClose();
    // Espera a que termine el fade de cierre antes de scrollear, para que
    // el salto de posición no se vea detrás del overlay.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          role="dialog"
          aria-modal="true"
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: theme.zIndex.modal,
            bgcolor: overlayBg,
            transition: "background-color 0.2s ease",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={onClose} aria-label="Cerrar menú" sx={{ color: textColor }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            component="nav"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {links.map((link, index) => {
              const isActive = link.active;
              const key = link.kind === "anchor" ? link.id : link.href;

              return (
                <Box
                  key={key}
                  component={motion.div}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                >
                  {link.kind === "anchor" ? (
                    <Box
                      component="a"
                      href={`#${link.id}`}
                      onClick={handleAnchorClick(link.id)}
                      sx={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "28px",
                        textDecoration: "none",
                        color: isActive ? "secondary.main" : textColor,
                        borderBottom: "2px solid",
                        borderColor: isActive ? "secondary.main" : "transparent",
                        pb: 0.5,
                      }}
                    >
                      {link.label}
                    </Box>
                  ) : (
                    // Píldora con ícono — mismo criterio visual que los links
                    // de página en `Navbar`/`PageNavbar` (D023): borde +
                    // ícono en vez de texto plano, para distinguirse de las
                    // anclas de arriba. "Inicio" usa el ícono de casa, el
                    // resto (Proyectos, etc.) el de "abrir en otro lugar".
                    <Box
                      component={Link}
                      href={link.href}
                      onClick={onClose}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: "var(--font-body)",
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "16px",
                        textDecoration: "none",
                        color: isActive ? secondary[600] : mutedColor,
                        border: "1.5px solid",
                        borderColor: isActive ? secondary[600] : dividerColor,
                        backgroundColor: isActive ? alpha(secondary[600], 0.12) : "transparent",
                        borderRadius: "999px",
                        pl: 2,
                        pr: 2.5,
                        py: 1,
                      }}
                    >
                      {link.href === "/" ? (
                        <HomeRoundedIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
                      )}
                      {link.label}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              pb: 5,
              pt: 2,
            }}
          >
            <ThemeToggle
              size="medium"
              sx={{
                color: mutedColor,
                "&:hover": { backgroundColor: hoverBg, color: textColor },
              }}
            />
            <Button
              onClick={() => {
                onClose();
                onCtaClick();
              }}
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 5 }}
            >
              {ctaLabel}
            </Button>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
