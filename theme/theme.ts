import { createTheme, type PaletteMode, type ThemeOptions } from "@mui/material/styles";
import { primary, secondary, gray, semantic, typography, spacing, radius, shadow, breakpoints, zIndex } from "./tokens";


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

function getShapeOptions(): ThemeOptions["shape"] {
  return {
    borderRadius: radius.sm, 
  };
}

function getShadowsOptions(mode: PaletteMode): ThemeOptions["shadows"] {
  const flat = "none";
  const sm = shadow.sm;
  const md = shadow.md;
  const lg = shadow.lg;

  return [
    flat,       
    sm, sm, sm, 
    md, md, md, md, md, 
    lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, lg, 
  ] as ThemeOptions["shadows"];
}

function getBreakpointsOptions(): ThemeOptions["breakpoints"] {
  return { values: breakpoints };
}

function getZIndexOptions(): ThemeOptions["zIndex"] {
  return {
    mobileStepper: zIndex.base,
    appBar: zIndex.navbar,
    drawer: zIndex.sidebar,
    modal: zIndex.modal,
    snackbar: zIndex.toast,
    tooltip: zIndex.dropdown,
  };
}

function getTypographyOptions(): ThemeOptions["typography"] {
  return {
    fontFamily: typography.fontFamily.body,
    h1: {
      fontFamily: typography.fontFamily.heading,
      fontWeight: typography.weight.h1,
      fontSize: typography.size.h1.desktop,
      lineHeight: typography.lineHeight.h1,
    },
    h2: {
      fontFamily: typography.fontFamily.heading,
      fontWeight: typography.weight.h2,
      fontSize: typography.size.h2.desktop,
      lineHeight: typography.lineHeight.h2,
    },
    h3: {
      fontFamily: typography.fontFamily.heading,
      fontWeight: typography.weight.h3,
      fontSize: typography.size.h3.desktop,
      lineHeight: typography.lineHeight.h3,
    },
    h4: {
      fontFamily: typography.fontFamily.heading,
      fontWeight: typography.weight.h4,
      fontSize: typography.size.h4.desktop,
      lineHeight: typography.lineHeight.h4,
    },
    body1: {
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.weight.body,
      fontSize: typography.size.bodyLarge,
      lineHeight: typography.lineHeight.body,
    },
    body2: {
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.weight.body,
      fontSize: typography.size.body,
      lineHeight: typography.lineHeight.body,
    },
    caption: {
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.weight.body,
      fontSize: typography.size.small,
      lineHeight: typography.lineHeight.small,
    },
    button: {
      fontFamily: typography.fontFamily.body,
      fontWeight: typography.weight.bodyMedium,
      textTransform: "none",
    },
  };
}


export function getTheme(mode: PaletteMode) {
  const baseTheme = createTheme({
    palette: getPaletteOptions(mode),
    typography: getTypographyOptions(),
    shape: getShapeOptions(),
    shadows: getShadowsOptions(mode),
    breakpoints: getBreakpointsOptions(),
    zIndex: getZIndexOptions(),
    spacing: (factor: number) => `${factor * 4}px`,
  });

  return createTheme(baseTheme, {
    typography: {
      h1: { [baseTheme.breakpoints.down("sm")]: { fontSize: typography.size.h1.mobile } },
      h2: { [baseTheme.breakpoints.down("sm")]: { fontSize: typography.size.h2.mobile } },
      h3: { [baseTheme.breakpoints.down("sm")]: { fontSize: typography.size.h3.mobile } },
      h4: { [baseTheme.breakpoints.down("sm")]: { fontSize: typography.size.h4.mobile } },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: radius.lg, boxShadow: shadow.sm },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: radius.sm,
            fontFamily: typography.fontFamily.body,
            fontWeight: typography.weight.bodyMedium,
            textTransform: "none",
            transition: "background-color 0.15s ease, border-color 0.15s ease",
          },
          sizeSmall: { padding: "8px 16px", fontSize: 13 },
          sizeMedium: { padding: "9px 18px", fontSize: 14 },
          sizeLarge: { padding: "12px 24px", fontSize: 15 },
          containedPrimary: {
            "&:hover": { backgroundColor: primary[600] },
            "&.Mui-disabled": {
              backgroundColor: gray[200],
              color: gray[400],
            },
          },
          containedSecondary: {
            "&:hover": { backgroundColor: secondary[600] },
            "&.Mui-disabled": {
              backgroundColor: gray[200],
              color: gray[400],
            },
          },
          outlined: {
            borderWidth: "1px",
            "&:hover": { borderWidth: "1px" },
          },
          text: {
            padding: "9px 12px",
            "&:hover": { backgroundColor: "transparent", color: secondary[500] },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: radius.xs },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: radius.xl, boxShadow: shadow.lg },
        },
      },
      MuiTextField: {
        defaultProps: {
          slotProps: { input: { style: { borderRadius: radius.xs } } },
        },
      },
    },
  });
}