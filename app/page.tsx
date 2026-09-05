import Box from "@mui/material/Box";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { LeaderGrid } from "@/components/sections/LeaderGrid";
import { SermonsGrid } from "@/components/sections/SermonsGrid"
import { SocialLinksGrid } from "@/components/sections/SocialLinksGrid";
import { AgendaGrid } from "@/components/sections/AgendaGrid";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { ProjectsSection } from "@/components/sections/ProjectSection";
import { ProjectDetailSection } from "@/components/sections/ProjectDetailSection";
import { TitheForm } from "@/components/ui/TitheForm";
import { ProjectContributionForm } from "@/components/ui/ProjectContributionForm";
import { DashboardProjectsSection } from "@/components/sections/DashboardProjectsSection";
import { DashboardProjectForm } from "@/components/ui/DashboardProjectForm";

export default function Home() {
  return (
    <>
      <Navbar />
      {/*
        ids de ancla para la navegación del Navbar de Home (D023) — el
        espaciado/layout final de cada sección se resuelve en fase 06
        (SECTION_INVENTORY). Historia y Proyectos NO son anclas: son enlaces
        de página, por eso HistoryTimeline/ProjectsSection no llevan id.
      */}
      <Box component="section" id="areas">
        <ServiceAreaGrid />
      </Box>
      <Box component="section" id="liderazgo">
        <LeaderGrid />
      </Box>
      <Box component="section" id="predicas">
        <SermonsGrid />
      </Box>
      <Box component="section" id="redes">
        <SocialLinksGrid />
      </Box>
      <Box component="section" id="agenda">
        <AgendaGrid />
      </Box>
      <HistoryTimeline />
      <ProjectsSection />
      <ProjectDetailSection />
      {/* <TitheForm /> */}
      {/* <ProjectContributionForm /> */}
      <DashboardProjectsSection />
      <DashboardProjectForm />
      <Footer />
    </>
  );
}
