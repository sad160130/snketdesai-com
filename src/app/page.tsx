import { Hero } from "@/components/Hero";
import { ExperienceStrip } from "@/components/ExperienceStrip";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/config/site";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:max-w-5xl lg:px-8">
      <ScrollReveal />
      <main id="main">
        <Hero site={site} />
        <ExperienceStrip brands={site.experience} />
        <ProjectGrid projects={site.projects} />
      </main>
      <Footer site={site} />
    </div>
  );
}
