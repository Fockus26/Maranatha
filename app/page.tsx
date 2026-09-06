import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServiceAreas } from "@/components/sections/ServiceAreas";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceAreas />
      <Footer />
    </>
  );
}
