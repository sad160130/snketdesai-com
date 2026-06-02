import { ProjectCard } from "@/components/ProjectCard";
import type { ProjectCard as ProjectCardType } from "@/config/site";

export function ProjectGrid({ projects }: { projects: ProjectCardType[] }) {
  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="mt-24 sm:mt-32"
    >
      <div data-reveal className="flex items-baseline gap-4">
        <span className="eyebrow">01</span>
        <h2
          id="building-heading"
          className="font-display text-3xl font-light tracking-tightest text-ink sm:text-4xl"
        >
          What I&rsquo;m building
        </h2>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li
            key={project.name}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
