import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCard as ProjectCardType } from "@/config/site";

/** First letter(s) of the name, used as a fallback monogram logo. */
function monogram(name: string): string {
  const cleaned = name.replace(/^["']|["']$/g, "").trim();
  return cleaned.charAt(0).toUpperCase() || "•";
}

function Logo({ project }: { project: ProjectCardType }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-paper text-ink">
      {project.logo ? (
        <Image
          src={project.logo}
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-display text-lg leading-none" aria-hidden="true">
          {monogram(project.name)}
        </span>
      )}
    </div>
  );
}

function Tag({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ${
        muted
          ? "border-line text-ink-faint"
          : "border-line-strong text-ink-soft"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          muted ? "bg-ink-faint" : "bg-accent"
        }`}
      />
      {label}
    </span>
  );
}

/** Shared inner layout for both the linked and teaser variants. */
function CardBody({ project }: { project: ProjectCardType }) {
  const isTeaser = project.url === null;
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <Logo project={project} />
        <Tag label={project.tag} muted={isTeaser} />
      </div>

      <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink">
        {project.name}
      </h3>
      <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        {isTeaser ? (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-faint">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft motion-reduce:animate-none"
            />
            Coming soon
          </span>
        ) : (
          <>
            <span className="text-sm font-medium text-ink-soft transition-colors duration-300 group-hover:text-accent">
              Visit
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-[18px] w-[18px] text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
            />
          </>
        )}
      </div>
    </>
  );
}

export function ProjectCard({ project }: { project: ProjectCardType }) {
  const base =
    "flex h-full flex-col rounded-2xl p-6 transition-all duration-300";

  // Stealth / no-url: a non-clickable teaser with a dashed, muted treatment.
  if (project.url === null) {
    return (
      <article
        aria-label={`${project.name} — coming soon`}
        className={`${base} border border-dashed border-line-strong bg-transparent`}
      >
        <CardBody project={project} />
      </article>
    );
  }

  // Has a url: the entire card is the link.
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${project.description} (opens in a new tab)`}
      className={`group ${base} border border-line bg-paper-raised hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] motion-reduce:hover:translate-y-0`}
    >
      <CardBody project={project} />
    </a>
  );
}
