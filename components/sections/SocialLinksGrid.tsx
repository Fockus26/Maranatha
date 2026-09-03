"use client";

import Box from "@mui/material/Box";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";

const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    handle: "@iglesiacomunidad",
    href: "https://instagram.com/iglesiacomunidad",
    icon: InstagramIcon,
    ctaLabel: "Seguir",
  },
  {
    platform: "YouTube",
    handle: "Iglesia Comunidad",
    href: "https://youtube.com/@iglesiacomunidad",
    icon: YouTubeIcon,
    ctaLabel: "Suscribirse",
  },
] as const;

export function SocialLinksGrid() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: "16px" }}>
      {SOCIAL_LINKS.map((link) => (
        <SocialLinkCard key={link.platform} {...link} />
      ))}
    </Box>
  );
}