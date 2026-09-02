"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { getTheme } from "./theme";

const STORAGE_KEY = "color-mode";

type ColorModeContextValue = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ColorModeContext = React.createContext<ColorModeContextValue | null>(null);

export function useColorMode() {
  const ctx = React.useContext(ColorModeContext);
  if (!ctx) throw new Error("useColorMode debe usarse dentro de <ThemeRegistry>");
  return ctx;
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  // Al montar: usa preferencia guardada, si no, la del sistema.
  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  const toggleColorMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const contextValue = React.useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ColorModeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}