"use client";

import Box from "@mui/material/Box";
import UsersIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CampaignIcon from "@mui/icons-material/CampaignOutlined";
import { ServiceAreaCard } from "@/components/ui/ServiceAreaCard";

const SERVICE_AREAS = [
  {
    name: "Alabanza",
    description: "Equipo de música y adoración para los servicios.",
    icon: <UsersIcon fontSize="small" />,
    imageUrl:
      "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800&h=1000&fit=crop&q=80",
  },
  {
    name: "Servicio comunitario",
    description: "Apoyo directo a familias y vecinos de la zona.",
    icon: <FavoriteIcon fontSize="small" />,
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=1000&fit=crop&q=80",
  },
  {
    name: "Niños",
    description: "Espacio seguro y divertido para los más pequeños.",
    icon: <ChildCareIcon fontSize="small" />,
    imageUrl:
      "https://images.unsplash.com/photo-1761208663763-c4d30657c910?w=800&h=1000&fit=crop&q=80",
  },
  {
    name: "Evangelismo",
    description: "Llevando el mensaje más allá de las puertas de la iglesia.",
    icon: <CampaignIcon fontSize="small" />,
    imageUrl:
      "https://images.unsplash.com/photo-1764455488345-47cff12340d6?w=800&h=1000&fit=crop&q=80",
  },
] as const;

export function ServiceAreaGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        gap: "24px",
      }}
    >
      {SERVICE_AREAS.map((area) => (
        <ServiceAreaCard key={area.name} {...area} />
      ))}
    </Box>
  );
}