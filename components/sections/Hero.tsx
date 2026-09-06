"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Link from "next/link";
import { alpha, keyframes } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { primary, secondary, gray } from "@/theme/tokens";

const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    id: "areas",
    eyebrow: "Nuestras áreas",
    headline: "Un lugar para servir en cada etapa de tu fe.",
    ctaLabel: "Conocer nuestras áreas",
    ctaHref: "#areas",
    imageUrl:
      "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=1920&h=1080&fit=crop&q=80",
  },
  {
    id: "proyectos",
    eyebrow: "Proyectos activos",
    headline: "Construimos juntos lo que la comunidad necesita.",
    ctaLabel: "Ver proyectos",
    ctaHref: "/proyectos",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&h=1080&fit=crop&q=80",
  },
  {
    id: "agenda",
    eyebrow: "Agenda y prédicas",
    headline: "Vive cada servicio, en persona o desde donde estés.",
    ctaLabel: "Ver agenda",
    ctaHref: "#agenda",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop&q=80",
  },
] as const;

const progressAnim = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

export function Hero() {
  const total = SLIDES.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, total]);

  const goTo = (next: number) => setIndex(((next % total) + total) % total);
  const slide = SLIDES[index];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "88vh" },
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* Foto de fondo — crossfade entre slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={slide.imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay navy — degradado horizontal para legibilidad del texto a la izquierda (mismo criterio que PhotoOverlayCard, D012) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(100deg,
            ${alpha(primary[900], 0.95)} 0%,
            ${alpha(primary[900], 0.82)} 35%,
            ${alpha(primary[900], 0.5)} 62%,
            ${alpha(primary[900], 0.22)} 100%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${alpha(primary[900], 0.55)} 0%, ${alpha(primary[900], 0)} 45%)`,
        }}
      />

      {/* Navegación manual — flechas, estilo "text button": sin fondo/borde en reposo, tenue background en hover (mismo criterio que los botones de texto del sistema) */}
      <IconButton
        onClick={() => goTo(index - 1)}
        aria-label="Slide anterior"
        sx={{
          position: "absolute",
          left: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          color: gray[50],
          bgcolor: "transparent",
          width: 40,
          height: 40,
          transition: "background-color 0.2s ease",
          "&:hover": { backgroundColor: alpha(gray[50], 0.14) },
        }}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <IconButton
        onClick={() => goTo(index + 1)}
        aria-label="Siguiente slide"
        sx={{
          position: "absolute",
          right: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          color: gray[50],
          bgcolor: "transparent",
          width: 40,
          height: 40,
          transition: "background-color 0.2s ease",
          "&:hover": { backgroundColor: alpha(gray[50], 0.14) },
        }}
      >
        <ChevronRightRoundedIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ position: "relative", pt: { xs: 14, md: 10 }, pb: { xs: 8, md: 10 } }}>
        <Box sx={{ maxWidth: 580 }}>
          {/* Barras de progreso — indican slide activo y son clicables (navegación manual) */}
          <Box sx={{ display: "flex", gap: 1, mb: 5, maxWidth: 220 }}>
            {SLIDES.map((s, i) => (
              <Box
                key={s.id}
                onClick={() => goTo(i)}
                role="button"
                aria-label={`Ir al slide ${i + 1}`}
                sx={{
                  flex: 1,
                  height: 2.5,
                  borderRadius: "999px",
                  bgcolor: alpha(gray[50], 0.22),
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {i === index && (
                  <Box
                    key={slide.id}
                    sx={{
                      height: "100%",
                      width: 0,
                      bgcolor: secondary[400],
                      animation: `${progressAnim} ${AUTOPLAY_MS}ms linear forwards`,
                    }}
                  />
                )}
                {i < index && <Box sx={{ height: "100%", bgcolor: alpha(gray[50], 0.55) }} />}
              </Box>
            ))}
          </Box>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: secondary[300],
                  mb: 1.5,
                }}
              >
                {slide.eyebrow}
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: { xs: "34px", md: "52px" },
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: gray[50],
                  mb: 4,
                  // Altura fija reservada para 3 líneas (el headline más largo de
                  // los 3 slides las ocupa) — evita que el resto del contenido
                  // (CTA, stats) salte de posición según el slide activo.
                  minHeight: "3.45em",
                }}
              >
                {slide.headline}
              </Typography>

              <Button
                component={Link}
                href={slide.ctaHref}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "6px",
                  px: 3,
                  color: gray[50],
                  borderColor: alpha(gray[50], 0.4),
                  "&:hover": {
                    borderColor: secondary[500],
                    color: secondary[300],
                    backgroundColor: alpha(secondary[500], 0.08),
                  },
                }}
              >
                {slide.ctaLabel}
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Stats — línea única minimalista, no cambia entre slides */}
          <Box
            sx={{
              mt: { xs: 5, md: 6 },
              pt: 2,
              borderTop: "1px solid",
              borderColor: alpha(gray[50], 0.15),
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "0.02em",
                color: gray[300],
              }}
            >
              +400 personas · 5 áreas de servicio · 11 años sirviendo
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
