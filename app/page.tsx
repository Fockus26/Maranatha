import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ServiceAreaGrid } from "./components/sections/ServiceAreaGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServiceAreaGrid />
      <Footer />
    </>
  );
}
