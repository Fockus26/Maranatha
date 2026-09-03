"use client";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { primary, secondary, gray } from "@/theme/tokens";
import { PhotoOverlayCard } from "./PhotoOverlayCard";

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
  return (
    <PhotoOverlayCard
      imageUrl={imageUrl}
      onClick={onClick}
      topLeftSlot={
        <Box
          sx={{
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
      }
      bottomSlot={
        <>
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
        </>
      }
    />
  );
}