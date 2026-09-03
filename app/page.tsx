import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { LeaderGrid } from "@/components/sections/LeaderGrid";
import { SermonsGrid } from "@/components/sections/SermonsGrid"
import { SocialLinksGrid } from "@/components/sections/SocialLinksGrid";
import { AgendaGrid } from "@/components/sections/AgendaGrid";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { ProjectsSection } from "@/components/sections/ProjectSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServiceAreaGrid />
      <LeaderGrid />
      <SermonsGrid />
      <SocialLinksGrid />
      <AgendaGrid />
      <HistoryTimeline />
      <ProjectsSection />
      <Footer />
    </>
  );
}
