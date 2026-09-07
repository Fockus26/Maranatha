import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PageNavbar from "@/components/layout/PageNavbar";
import Footer from "@/components/layout/Footer";
import { TimelineZigzagItem } from "@/components/ui/TimelineZigzagItem";

/**
 * Página "Historia" (`/historia`, fase 07, D043) — línea de tiempo completa,
 * a diferencia del resumen de 4 hitos en Home (`components/sections/History.tsx`,
 * D040). Usa `PageNavbar` (sin anclas, D024) en vez del `Navbar` de Home.
 *
 * Layout: zigzag (foto + texto alternando de lado), elegido por el cliente entre
 * 2 opciones presentadas (lista vertical sin fotos vs. zigzag con fotos) — ver
 * comparación en DESIGN_DECISIONS D043.
 *
 * Contenido placeholder: los 6 hitos (años/títulos/descripciones/fotos) son
 * marcadores — mismo criterio que el resto del sitio (D040). Las fotos son
 * fotografía de stock de Unsplash sin relación directa con la iglesia real,
 * pendientes de que el cliente entregue fotos propias de cada hito.
 */

interface Milestone {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2015",
    title: "Un grupo pequeño, un mismo propósito",
    description:
      "Un puñado de familias comienza a reunirse en una casa, con el deseo de compartir el evangelio en el barrio.",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&h=700&fit=crop&q=80",
  },
  {
    year: "2017",
    title: "Primeras reuniones abiertas al barrio",
    description:
      "La casa ya no alcanza — se rentan salones prestados los domingos para recibir a más familias del barrio.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&h=700&fit=crop&q=80",
  },
  {
    year: "2019",
    title: "Nuestro primer templo propio",
    description:
      "La congregación crece y estrena un espacio propio, dejando atrás los salones prestados de los primeros años.",
    imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=900&h=700&fit=crop&q=80",
  },
  {
    year: "2022",
    title: "Cinco áreas, una sola familia",
    description:
      "Alabanza, jóvenes, niños, oración y servicio comunitario se consolidan como los pilares de todo lo que hacemos.",
    imageUrl: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=900&h=700&fit=crop&q=80",
  },
  {
    year: "2024",
    title: "Primer proyecto comunitario financiado",
    description:
      "La comunidad se une para renovar el salón multiusos, marcando el inicio de los proyectos de aporte colectivo.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=700&fit=crop&q=80",
  },
  {
    year: "2026",
    title: "Once años sirviendo a la comunidad",
    description:
      "Hoy somos más de 400 personas sirviendo juntas, con la misma convicción del primer día.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&h=700&fit=crop&q=80",
  },
];

export default function HistoriaPage() {
  return (
    <>
      <PageNavbar />

      <Box component="main" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 640, mx: "auto", textAlign: "center", mb: { xs: 7, md: 10 } }}>
            <Typography
              component="span"
              sx={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "secondary.main",
                mb: 1.5,
              }}
            >
              Nuestra historia
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: { xs: "32px", md: "44px" },
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "text.primary",
                mb: 2,
              }}
            >
              Once años de fe, paso a paso
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              El camino completo de la iglesia, desde el primer encuentro en una casa hasta la
              comunidad que somos hoy.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 8, md: 11 } }}>
            {MILESTONES.map((milestone, index) => (
              <TimelineZigzagItem
                key={milestone.year}
                year={milestone.year}
                title={milestone.title}
                description={milestone.description}
                imageUrl={milestone.imageUrl}
                reverse={index % 2 === 1}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
