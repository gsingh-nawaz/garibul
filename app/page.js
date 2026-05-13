import Scene from "@/components/canvas/Scene";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative z-10">
      <Scene /> {/* The 3D Background */}
      <Hero />
      <Projects />
      <Contact />
    </main>
  );
}
