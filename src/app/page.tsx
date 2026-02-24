import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Indications from "@/components/Indications";
import Technology from "@/components/Technology";
import Results from "@/components/Results";
import Veterinary from "@/components/Veterinary";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Indications />
      <Process />
      <Results />
      <Veterinary />
      <Technology />
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
          src="/img/WhatsApp.svg"
          alt="WhatsApp"
          width={64}
          height={64}
          className="drop-shadow-2xl"
        />
      </a>
    </main>
  );
}
