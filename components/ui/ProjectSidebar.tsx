"use client";

import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import { radius, typography } from "@/theme/tokens";
import type { ProjectStatus } from "./ProjectCard";

export interface Encargado {
  name: string;
  role: string;
  imageUrl: string;
  instagramUrl?: string;
}

export interface ProjectSidebarProps {
  status: ProjectStatus;
  currentAmount: number;
  goalAmount: number;
  deadlineLabel: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  encargados: Encargado[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function ProjectSidebar({
  status,
  currentAmount,
  goalAmount,
  deadlineLabel,
  ctaLabel,
  onCtaClick,
  encargados,
}: ProjectSidebarProps) {
  const theme = useTheme();
  const isCompleted = status === "completed";
  const percent = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 20,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${radius.lg}px`,
        backgroundColor: theme.palette.background.paper,
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 500,
          borderRadius: "20px",
          px: 2.25,
          py: 0.75,
          backgroundColor: isCompleted ? theme.palette.success.main : theme.palette.primary.main,
          color: isCompleted ? theme.palette.success.contrastText : theme.palette.primary.contrastText,
        }}
      >
        {isCompleted ? "Completado" : "Activo"}
      </Box>

      <Typography sx={{ fontFamily: typography.fontFamily.heading, fontWeight: 800, fontSize: "22px", color: theme.palette.text.primary, mt: 3, mb: 0.5 }}>
        {formatCurrency(currentAmount)}
      </Typography>
      <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "12px", color: theme.palette.text.secondary, mb: 2.5 }}>
        recaudado de {formatCurrency(goalAmount)}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={percent}
        color={isCompleted ? "success" : "secondary"}
        sx={{ height: 6, borderRadius: "20px", mb: 1.5, backgroundColor: theme.palette.action.hover }}
      />
      <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "11px", color: theme.palette.text.secondary, mb: 4 }}>
        {percent}% · {deadlineLabel}
      </Typography>

      <Button
        onClick={onCtaClick}
        fullWidth
        variant={isCompleted ? "outlined" : "contained"}
        color={isCompleted ? "primary" : "secondary"}
        sx={{ mb: 4.5 }}
      >
        {ctaLabel ?? (isCompleted ? "Ver proyecto" : "Aportar")}
      </Button>

      {encargados.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3.5 }}>
          <Typography
            sx={{
              fontFamily: typography.fontFamily.body,
              fontSize: "11px",
              color: theme.palette.text.disabled,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              mb: 2.5,
            }}
          >
            Encargados
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {encargados.map((encargado) => (
              <Box key={encargado.name} sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Avatar src={encargado.imageUrl} alt={encargado.name} sx={{ width: 48, height: 48, flexShrink: 0 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontFamily: typography.fontFamily.heading, fontWeight: 600, fontSize: "13px", color: theme.palette.text.primary }}>
                    {encargado.name}
                  </Typography>
                  <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: "11px", color: theme.palette.text.secondary }}>
                    {encargado.role}
                  </Typography>
                </Box>
                {encargado.instagramUrl && (
                  <IconButton
                    component="a"
                    href={encargado.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram de ${encargado.name}`}
                    size="small"
                    sx={{
                      width: 26,
                      height: 26,
                      flexShrink: 0,
                      borderRadius: `${radius.sm}px`,
                      border: `1px solid ${theme.palette.divider}`,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.main,
                        backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                      },
                    }}
                  >
                    <InstagramIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}