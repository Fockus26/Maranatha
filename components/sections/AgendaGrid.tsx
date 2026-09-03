"use client";

import Box from "@mui/material/Box";
import { AgendaItem, type AgendaItemProps } from "@/components/ui/AgendaItem";

type AgendaEvent = Omit<AgendaItemProps, "onClick"> & { id: string };

const DUMMY_EVENTS: AgendaEvent[] = [
  {
    id: "1",
    day: "14",
    month: "Sep",
    title: "Servicio dominical",
    schedule: "9:00 AM · 11:00 AM",
    location: "Templo principal",
  },
  {
    id: "2",
    day: "17",
    month: "Sep",
    title: "Noche de oración",
    schedule: "7:00 PM",
    location: "Salón de oración",
  },
  {
    id: "3",
    day: "19",
    month: "Sep",
    title: "Reunión de jóvenes",
    schedule: "6:00 PM",
    location: "Salón multiusos",
  },
  {
    id: "4",
    day: "21",
    month: "Sep",
    title: "Servicio dominical",
    schedule: "9:00 AM · 11:00 AM",
    location: "Templo principal",
  },
  {
    id: "5",
    day: "24",
    month: "Sep",
    title: "Grupo de matrimonios",
    schedule: "7:30 PM",
    location: "Sala 2",
  },
];

export interface AgendaGridProps {
  events?: AgendaEvent[];
  onSelect?: (event: AgendaEvent) => void;
}

export function AgendaGrid({ events = DUMMY_EVENTS, onSelect }: AgendaGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 3, // spacing base (12px con factor*4) — ajustar a 4 (16px) si se prefiere más aire
      }}
    >
      {events.map((event) => (
        <AgendaItem
          key={event.id}
          day={event.day}
          month={event.month}
          title={event.title}
          schedule={event.schedule}
          location={event.location}
          onClick={onSelect ? () => onSelect(event) : undefined}
        />
      ))}
    </Box>
  );
}