"use client";
import { useColorMode } from "@/app/theme/ThemeRegistry";
import IconButton from "@mui/material/IconButton";

export function ThemeToggle() {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <IconButton onClick={toggleColorMode} aria-label="Cambiar tema">
      {mode === "light" ? <i className="ti ti-moon" /> : <i className="ti ti-sun" />}
    </IconButton>
  );
}