"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { SvgIconComponent } from "@mui/icons-material";

export interface SocialLinkCardProps {
  platform: string;
  handle: string;
  href: string;
  icon: SvgIconComponent;
  ctaLabel: string;
  /**
   * Cuando es `true`, omite el border/radius/fondo/padding propios del
   * card — para embeberlo dentro de otro contenedor que ya resuelve esos
   * estilos (ej. el panel de cuenta activa en `SocialLinks.tsx`, D036).
   * Por defecto `false`: se comporta exactamente igual que antes (D013).
   */
  bare?: boolean;
}

export function SocialLinkCard({
  platform,
  handle,
  href,
  icon: Icon,
  ctaLabel,
  bare = false,
}: SocialLinkCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        ...(bare
          ? {}
          : {
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "12px",
              p: 2,
              backgroundColor: "background.paper",
            }),
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backgroundColor: (t) =>
            t.palette.mode === "light" ? "primary.50" : "primary.dark",
        }}
      >
        <Icon
          sx={{
            fontSize: 20,
            color: (t) => (t.palette.mode === "light" ? "primary.main" : "primary.light"),
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component="p"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "13px",
            color: "text.primary",
          }}
        >
          {platform}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "text.secondary",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {handle}
        </Typography>
      </Box>

      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        color="primary"
        size="small"
        sx={{ flexShrink: 0 }}
      >
        {ctaLabel}
      </Button>
    </Box>
  );
}