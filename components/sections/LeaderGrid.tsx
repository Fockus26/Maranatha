"use client";

import Box from "@mui/material/Box";
import { LeaderCard } from "@/components/ui/LeaderCard";

const LEADERS = [
  {
    name: "Daniel Ramírez",
    role: "Pastor principal",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    instagramUrl: "https://instagram.com",
  },
  {
    name: "Andrea Torres",
    role: "Líder de alabanza",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&q=80",
    instagramUrl: "https://instagram.com",
  },
  {
    name: "Carlos Medina",
    role: "Líder de jóvenes",
    imageUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&h=800&fit=crop&q=80",
    instagramUrl: "https://instagram.com",
  },
  {
    name: "Valeria Soto",
    role: "Coordinadora de niños",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&q=80",
    instagramUrl: "https://instagram.com",
  },
] as const;

export function LeaderGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        gap: "24px",
      }}
    >
      {LEADERS.map((leader) => (
        <LeaderCard key={leader.name} {...leader} />
      ))}
    </Box>
  );
}