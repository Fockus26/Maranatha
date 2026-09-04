"use client";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { radius } from "@/theme/tokens";

export interface DonationFormCardProps {
  width?: number;
  children: ReactNode;
}

export function DonationFormCard({ width = 320, children }: DonationFormCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${radius.lg}px`,
        backgroundColor: theme.palette.background.paper,
        p: 5.5,
      }}
    >
      {children}
    </Box>
  );
}