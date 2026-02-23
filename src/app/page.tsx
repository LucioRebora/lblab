import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Indications from "@/components/Indications";
import Technology from "@/components/Technology";
import Veterinary from "@/components/Veterinary";
import Results from "@/components/Results";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Technology />
      <Indications />
      <Process />
      <Veterinary />
      <Results />
      <Contact />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5493446330365"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 hover:scale-110 transition-transform"
      >
        <Image
          src="/WhatsApp.svg"
          alt="WhatsApp"
          width={64}
          height={64}
          className="drop-shadow-2xl"
        />
      </a>
    </main>
  );
}
