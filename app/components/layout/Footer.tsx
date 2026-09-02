"use client"

import Link from "next/link";
import { Box, Container, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const NAV_LINKS = [
  { label: "Áreas", href: "#areas" },
  { label: "Liderazgo", href: "#liderazgo" },
  { label: "Agenda", href: "#agenda" },
] as const;

const RESOURCE_LINKS = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Box
        component="span"
        sx={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: 12,
          color: "text.primary",
          mb: 0.5,
        }}
      >
        {title}
      </Box>
      {links.map((link) => (
        <Box
          key={link.href}
          component={Link}
          href={link.href}
          sx={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": { color: "secondary.main" },
          }}
        >
          {link.label}
        </Box>
      ))}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, lg: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1.3fr 1fr 1fr 1fr" },
            gap: { xs: 3, sm: 3 },
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "4px",
                  bgcolor: "primary.main",
                }}
              />
              <Box
                component="span"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "primary.main",
                }}
              >
                Iglesia
              </Box>
            </Box>
            <Box
              component="p"
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                lineHeight: 1.5,
                color: "text.secondary",
                m: 0,
              }}
            >
              Una comunidad creciendo en fe y propósito.
            </Box>
          </Box>

          <FooterColumn title="Navegación" links={NAV_LINKS} />
          <FooterColumn title="Recursos" links={RESOURCE_LINKS} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              component="span"
              sx={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 12,
                color: "text.primary",
              }}
            >
              Conecta
            </Box>
            <Box
              component="a"
              href="mailto:contacto@iglesia.org"
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { color: "secondary.main" },
              }}
            >
              contacto@iglesia.org
            </Box>
            <Box sx={{ display: "flex", gap: 0.75, mt: 0.5 }}>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  size="small"
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: "divider",
                    color: "text.secondary",
                    "&:hover": {
                      color: "secondary.main",
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 14 }} />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            mt: { xs: 3, lg: 4 },
            pt: 1.5,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            justifyContent: "space-between",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "text.muted",
          }}
        >
          <Box component="span">© 2026 Iglesia. Todos los derechos reservados.</Box>
          <Box component="span">Hecho con propósito</Box>
        </Box>
      </Container>
    </Box>
  );
}