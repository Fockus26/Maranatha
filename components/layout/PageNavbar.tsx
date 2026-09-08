"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { PAGE_NAV_ITEMS, type MobileNavLink } from "./navItems";
import { useTitheModal } from "@/lib/titheModalStore";
import { secondary } from "@/theme/tokens";

/**
 * Variante simplificada de `Navbar` para toda página pública que no sea Home
 * (Historia, Proyectos, detalle de proyecto) — D023. Mismo shell (sticky,
 * sombra al hacer scroll, ThemeToggle, CTA Diezmo, menú mobile), pero sin
 * anclas: solo los enlaces de página, con estado activo resuelto por ruta.
 *
 * El CTA "Diezmo" apunta a `/#diezmo` (navega a Home y hace scroll) porque
 * esa sección solo existe ahí.
 */
export default function PageNavbar() {
  const theme = useTheme();
  const pathname = usePathname();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { openTithe } = useTitheModal();

  const isActive = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

  // Píldora de link de página — mismo tratamiento que el Navbar de Home
  // (Opción 1 del comparador de navbar, /design): borde + ícono en vez de
  // texto plano, para que se lea como "esto te lleva a otro lugar" y no
  // como una ancla de la página actual. El estado activo (la página en la
  // que ya estás) usa el mismo naranja apagado que el tab seleccionado de
  // `/proyectos` (`secondary[600]`, D051) en vez del naranja vivo — mismo
  // criterio: como estado persistente (no un hover pasajero), el naranja
  // vivo se siente demasiado intenso.
  const pillSx = (active: boolean) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    fontFamily: "var(--font-body)",
    fontWeight: active ? 600 : 500,
    fontSize: 13,
    textDecoration: "none",
    color: active ? secondary[600] : "text.secondary",
    border: "1px solid",
    borderColor: active ? secondary[600] : "divider",
    backgroundColor: active ? alpha(secondary[600], 0.08) : "transparent",
    borderRadius: "999px",
    pl: 1.5,
    pr: 1.75,
    py: 0.75,
    ...(!active && { "&:hover": { color: "secondary.main", borderColor: "secondary.main" } }),
  });

  // "Inicio" también se agrega al menú mobile por la misma razón que en
  // escritorio — antes el overlay mobile de páginas internas tampoco tenía
  // ningún link de regreso más allá de cerrar el menú y tocar el logo.
  const mobileLinks: MobileNavLink[] = [
    { kind: "page" as const, href: "/", label: "Inicio", active: false },
    ...PAGE_NAV_ITEMS.map((item) => ({
      kind: "page" as const,
      href: item.href,
      label: item.label,
      active: isActive(item.href),
    })),
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.appBar,
          backgroundColor: "background.default",
          color: "text.primary",
          borderBottom: scrolled ? "none" : `1px solid ${theme.palette.divider}`,
          boxShadow: scrolled ? theme.shadows[1] : "none",
          transition: theme.transitions.create(["box-shadow", "border-bottom"], {
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        <Container maxWidth="lg" disableGutters={false}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              py: 1.5,
              minHeight: "auto",
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
            >
              <Box sx={{ width: 18, height: 18, borderRadius: "4px", bgcolor: "primary.main" }} />
              <Box
                component="span"
                sx={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "primary.main" }}
              >
                Iglesia
              </Box>
            </Box>

            {/* Links de escritorio: solo páginas, sin anclas (esta página no
                tiene secciones). Antes solo mostraba el link de página
                actual (ej. "Proyectos" en /proyectos) sin ninguna forma de
                volver a Inicio salvo el logo — el cliente señaló que no
                era suficientemente explícito. Se agrega "Inicio" siempre
                primero, con el mismo tratamiento de píldora que el resto
                (Opción 1 del comparador de navbar, /design). */}
            <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.25 }}>
              <Box component={Link} href="/" sx={pillSx(false)}>
                <HomeRoundedIcon sx={{ fontSize: 13 }} />
                Inicio
              </Box>
              {PAGE_NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Box key={item.href} component={Link} href={item.href} sx={pillSx(active)}>
                    <OpenInNewRoundedIcon sx={{ fontSize: 13 }} />
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            {/* Theme toggle + CTA (escritorio) / hamburguesa (mobile) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
                <ThemeToggle />
                <Button
                  onClick={openTithe}
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ borderRadius: "6px", px: 2 }}
                >
                  Diezmo
                </Button>
              </Box>
              <IconButton
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
                sx={{ display: { xs: "inline-flex", md: "none" }, color: "text.primary" }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenuOverlay
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={mobileLinks}
        onCtaClick={openTithe}
      />
    </>
  );
}
