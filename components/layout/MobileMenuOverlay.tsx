"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Box, IconButton, Button, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { primary } from "@/theme/tokens";
import type { MobileNavLink } from "./navItems";

// Blanco fijo: el overlay siempre es navy sólido (primary[900]) sin importar
// el modo claro/oscuro activo (D025) — theme.palette.primary.contrastText no
// sirve acá porque cambia de valor entre modos.
const ON_DARK = "#FFFFFF";

export interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
  links: MobileNavLink[];
  ctaHref: string;
  ctaLabel?: string;
}

/**
 * Menú mobile — overlay fullscreen navy con enlaces centrados y aparición en
 * stagger (D025). Compartido entre `Navbar` (Home) y `PageNavbar` (resto de
 * páginas públicas): ambos le pasan su propia lista de `links` ya resuelta
 * (con `active` calculado por scroll-spy o por ruta, según corresponda).
 */
export default function MobileMenuOverlay({
  open,
  onClose,
  links,
  ctaHref,
  ctaLabel = "Diezmo",
}: MobileMenuOverlayProps) {
  const theme = useTheme();

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
            bgcolor: primary[900],
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={onClose} aria-label="Cerrar menú" sx={{ color: ON_DARK }}>
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
              const commonSx = {
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "28px",
                textDecoration: "none",
                color: isActive ? "secondary.main" : ON_DARK,
                borderBottom: "2px solid",
                borderColor: isActive ? "secondary.main" : "transparent",
                pb: 0.5,
              } as const;

              return (
                <Box
                  key={link.kind === "anchor" ? link.id : link.href}
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
                      sx={commonSx}
                    >
                      {link.label}
                    </Box>
                  ) : (
                    <Box component={Link} href={link.href} onClick={onClose} sx={commonSx}>
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
                color: "rgba(255,255,255,0.75)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)", color: ON_DARK },
              }}
            />
            <Button
              component={Link}
              href={ctaHref}
              onClick={onClose}
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
