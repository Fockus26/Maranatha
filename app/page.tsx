import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { LeaderGrid } from "@/components/sections/LeaderGrid";
import { SermonsGrid } from "@/components/sections/SermonsGrid"

export default function Home() {
  return (
    <>
      <Navbar />
      <ServiceAreaGrid />
      <LeaderGrid />
      <SermonsGrid />
      <Footer />
    </>
  );
}
