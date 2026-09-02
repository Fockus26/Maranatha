import { createTheme, type PaletteMode, type ThemeOptions } from "@mui/material/styles";
import { primary, secondary, gray, semantic } from "./tokens";

function getPaletteOptions(mode: PaletteMode): ThemeOptions["palette"] {
  const isLight = mode === "light";

  return {
    mode,
    primary: {
      main: isLight ? primary[700] : primary[400],
      light: isLight ? primary[500] : primary[300],
      dark: isLight ? primary[900] : primary[600],
      contrastText: isLight ? "#FFFFFF" : gray[900],
    },
    secondary: {
      main: secondary[500],
      light: secondary[300],
      dark: secondary[700],
      contrastText: "#FFFFFF",
    },
    success: { main: semantic.success, contrastText: "#FFFFFF" },
    error: { main: semantic.error, contrastText: "#FFFFFF" },
    warning: { main: semantic.warning, contrastText: gray[900] },
    info: { main: semantic.info, contrastText: "#FFFFFF" },
    background: {
      default: isLight ? gray[50] : primary[900],
      paper: isLight ? "#FFFFFF" : gray[800],
    },
    text: {
      primary: isLight ? gray[900] : gray[50],
      secondary: isLight ? gray[600] : gray[300],
    },
    divider: isLight ? gray[200] : gray[700],
  };
}

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: getPaletteOptions(mode),
  });
}