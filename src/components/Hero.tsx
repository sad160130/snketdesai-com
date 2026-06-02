import Image from "next/image";
import { Socials } from "@/components/Socials";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { SiteConfig } from "@/config/site";

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <header className="relative">
      {/* Top bar: wordmark + theme toggle */}
      <div className="flex items-center justify-between pt-7 sm:pt-9">
        <span className="font-display text-lg tracking-tightest text-ink">
          S<span className="text-accent">.</span>D
        </span>
        <ThemeToggle />
      </div>

      <div className="pt-14 sm:pt-20 lg:pt-24">
        <div className="flex flex-col items-start gap-8 sm:gap-10">
          <div
            data-reveal
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-line-strong sm:h-28 sm:w-28"
          >
            <Image
              src={site.avatar}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 640px) 112px, 96px"
              className="object-cover"
            />
          </div>

          <div className="max-w-3xl">
            <p data-reveal className="eyebrow mb-5">
              {site.role}
            </p>
            <h1
              data-reveal
              style={{ ["--reveal-delay" as string]: "60ms" }}
              className="text-balance font-display text-5xl font-light leading-[0.98] tracking-tightest text-ink sm:text-6xl lg:text-7xl"
            >
              {site.name}
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl"
            >
              {site.tagline}
            </p>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "220ms" }}
              className="mt-9"
            >
              <Socials links={site.socials} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
