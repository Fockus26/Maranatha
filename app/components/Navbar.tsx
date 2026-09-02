"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
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
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" }
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
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, lg: 3 },
          py: 1.5,
          minHeight: "auto",
        }}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "4px",
              bgcolor: "primary.main",
            }}
          />
          <Box
            component="span"
            sx={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 14,
              color: "primary.main",
            }}
          >
            Iglesia
          </Box>
        </Box>

        {/* Links */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
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
                  borderBottom: isActive ? "2px solid" : "2px solid transparent",
                  borderColor: isActive ? "secondary.main" : "transparent",
                  pb: 0.25,
                  "&:hover": { color: "text.primary" },
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
            {mode === "light" ? (
              <DarkModeOutlinedIcon fontSize="small" />
            ) : (
              <LightModeOutlinedIcon fontSize="small" />
            )}
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
    </AppBar>
  );
}