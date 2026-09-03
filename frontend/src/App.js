import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Vibe from "@/components/Vibe";
import MenuHighlights from "@/components/MenuHighlights";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App min-h-screen bg-[#09090B] text-[#F7F5F0]">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Vibe />
        <MenuHighlights />
        <Events />
        <Gallery />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-center" theme="dark" />
    </div>
  );
}

export default App;
