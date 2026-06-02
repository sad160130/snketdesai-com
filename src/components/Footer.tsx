import type { SiteConfig } from "@/config/site";

export function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();
  const linkedin = site.socials.find((s) => s.key === "linkedin");
  const x = site.socials.find((s) => s.key === "x");

  const linkClass =
    "font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent";

  return (
    <footer className="mt-24 border-t border-line pt-10 sm:mt-32">
      <div
        data-reveal
        className="flex flex-col gap-8 pb-12 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-md">
          <span className="eyebrow">Get in touch</span>
          <p className="mt-3 text-balance font-display text-2xl font-light leading-snug tracking-tight text-ink sm:text-3xl">
            Reach me on{" "}
            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
              </a>
            )}
            ,{" "}
            {x && (
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                X
              </a>
            )}
            , or{" "}
            <a href={`mailto:${site.email}`} className={linkClass}>
              email
            </a>
            .
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm text-ink-soft underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
          >
            {site.email}
          </a>
        </div>

        <p className="text-sm text-ink-faint">
          &copy; {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
