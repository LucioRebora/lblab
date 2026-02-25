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
    </main>
  );
}
