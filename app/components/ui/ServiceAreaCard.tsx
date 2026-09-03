"use client";

import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { motion } from "framer-motion";
import type { KeyboardEvent, ReactNode } from "react";
import { primary, secondary, gray } from "@/app/theme/tokens";

export interface ServiceAreaCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  imageUrl: string;
  ctaLabel?: string;
  onClick?: () => void;
}

export function ServiceAreaCard({
  name,
  description,
  icon,
  imageUrl,
  ctaLabel = "Conocer más",
  onClick,
}: ServiceAreaCardProps) {
  const theme = useTheme();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Box
      component={motion.div}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      whileHover="hover"
      initial="rest"
      sx={{
        position: "relative",
        height: 360,
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.2s ease",
        "&:hover": { borderColor: theme.palette.secondary.main },
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.secondary.main}`,
          outlineOffset: "2px",
        },
      }}
    >
      {/* Foto de fondo — next/image optimiza automáticamente */}
      <Box
        component={motion.div}
        variants={{
          rest: { scale: 1.02, filter: "grayscale(35%) contrast(1.05)" },
          hover: { scale: 1.08, filter: "grayscale(10%) contrast(1.05)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        sx={{ position: "absolute", inset: 0 }}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Un solo overlay: gradiente navy de abajo hacia arriba */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top,
            ${alpha(primary[900], 0.92)} 0%,
            ${alpha(primary[900], 0.55)} 40%,
            ${alpha(primary[900], 0.05)} 70%)`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 36,
          height: 36,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(primary[700], 0.55),
          border: `1px solid ${alpha(gray[50], 0.25)}`,
          color: gray[50],
        }}
      >
        {icon}
      </Box>

      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: 2.25 }}>
        <Typography
          component="p"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "19px",
            color: gray[50],
            mb: 0.5,
            letterSpacing: "-0.01em",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: gray[200],
            lineHeight: 1.4,
            mb: 1.5,
          }}
        >
          {description}
        </Typography>

        <Box
          component={motion.span}
          variants={{
            rest: { gap: "4px", color: secondary[300] },
            hover: { gap: "8px", color: secondary[500] },
          }}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {ctaLabel} →
        </Box>
      </Box>
    </Box>
  );
}