"use client";

import { IconButton, type IconButtonProps } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useColorMode } from "@/app/theme/ThemeRegistry";

type ThemeToggleProps = {
  size?: IconButtonProps["size"];
};

export default function ThemeToggle({ size = "small" }: ThemeToggleProps) {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      size={size}
      aria-label={mode === "light" ? "Activar modo oscuro" : "Activar modo claro"}
      sx={{
        color: "text.secondary",
        borderRadius: "16px",
        transition: (theme) =>
          theme.transitions.create(["transform", "background-color"], {
            duration: theme.transitions.duration.short,
          }),
        "&:hover": {
          backgroundColor: "action.hover",
          transform: "rotate(20deg)",
        },
      }}
    >
      {mode === "light" ? (
        <DarkModeOutlinedIcon fontSize={size === "large" ? "medium" : "small"} />
      ) : (
        <LightModeOutlinedIcon fontSize={size === "large" ? "medium" : "small"} />
      )}
    </IconButton>
  );
}