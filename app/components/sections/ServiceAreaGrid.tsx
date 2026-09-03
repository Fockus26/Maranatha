"use client";

import Box from "@mui/material/Box";
import UsersIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CampaignIcon from "@mui/icons-material/CampaignOutlined";
import { ServiceAreaCard } from "@/app/components/ui/ServiceAreaCard";

const SERVICE_AREAS = [
  {
    name: "Alabanza",
    description: "Equipo de música y adoración para los servicios.",
    icon: <UsersIcon fontSize="small" />,
    imageUrl: "/images/areas/alabanza.jpg",
  },
  {
    name: "Servicio comunitario",
    description: "Apoyo directo a familias y vecinos de la zona.",
    icon: <FavoriteIcon fontSize="small" />,
    imageUrl: "/images/areas/servicio-comunitario.jpg",
  },
  {
    name: "Niños",
    description: "Espacio seguro y divertido para los más pequeños.",
    icon: <ChildCareIcon fontSize="small" />,
    imageUrl: "/images/areas/ninos.jpg",
  },
  {
    name: "Evangelismo",
    description: "Llevando el mensaje más allá de las puertas de la iglesia.",
    icon: <CampaignIcon fontSize="small" />,
    imageUrl: "/images/areas/evangelismo.jpg",
  },
] as const;

export function ServiceAreaGrid() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {SERVICE_AREAS.map((area) => (
        <ServiceAreaCard key={area.name} {...area} />
      ))}
    </Box>
  );
}