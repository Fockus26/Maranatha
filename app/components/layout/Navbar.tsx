// components/layout/Navbar.tsx — reemplazar el <Toolbar> completo
"use client";

import * as React from "react";
import Link from "next/link";
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
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useColorMode } from "@/app/theme/ThemeRegistry";

const NAV_ITEMS = [
  { label: "Áreas", href: "#areas" },
  { label: "Liderazgo", href: "#liderazgo" },
  { label: "Prédicas", href: "#predicas" },
  { label: "Agenda", href: "#agenda" },
  { label: "Historia", href: "/historia" },
  { label: "Proyectos", href: "/proyectos" },
] as const;

type NavbarProps = {
  activeHref?: string;
};

export default function Navbar({ activeHref }: NavbarProps) {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
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

          {/* Links */}
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;
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
                    color: isActive ? "text.primary" : "text.secondary",
                    borderBottom: "2px solid",
                    borderColor: isActive ? "secondary.main" : "transparent",
                    pb: 0.25,
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>

          {/* Theme toggle + CTA */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={toggleColorMode}
              size="small"
              aria-label={mode === "light" ? "Activar modo oscuro" : "Activar modo claro"}
              sx={{ color: "text.secondary" }}
            >
              {mode === "light" ? <DarkModeOutlinedIcon fontSize="small" /> : <LightModeOutlinedIcon fontSize="small" />}
            </IconButton>
            <Button
              component={Link}
              href="#diezmo"
              variant="contained"
              color="secondary"
              size="small"
              sx={{ borderRadius: "6px", px: 2 }}
            >
              Diezmo
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}