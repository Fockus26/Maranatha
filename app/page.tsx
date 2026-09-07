import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Leaders } from "@/components/sections/Leaders";
import { Sermons } from "@/components/sections/Sermons";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { Agenda } from "@/components/sections/Agenda";
import { History } from "@/components/sections/History";
import { Projects } from "@/components/sections/Projects";
import { Tithe } from "@/components/sections/Tithe";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceAreas />
      <Leaders />
      <Sermons />
      <SocialLinks />
      <Agenda />
      <History />
      <Projects />
      <Tithe />
      <Footer />
    </>
  );
}
