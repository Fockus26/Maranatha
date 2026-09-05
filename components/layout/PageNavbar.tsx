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
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { PAGE_NAV_ITEMS, type MobileNavLink } from "./navItems";

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

  const isActive = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

  const mobileLinks: MobileNavLink[] = PAGE_NAV_ITEMS.map((item) => ({
    kind: "page" as const,
    href: item.href,
    label: item.label,
    active: isActive(item.href),
  }));

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

            {/* Links de escritorio: solo páginas, sin anclas */}
            <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
              {PAGE_NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Box
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: 13,
                      textDecoration: "none",
                      color: active ? "text.primary" : "text.secondary",
                      borderBottom: "2px solid",
                      borderColor: active ? "secondary.main" : "transparent",
                      pb: 0.25,
                      "&:hover": { color: "secondary.main" },
                    }}
                  >
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
                  component={Link}
                  href="/#diezmo"
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
        ctaHref="/#diezmo"
      />
    </>
  );
}
