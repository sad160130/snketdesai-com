import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import type { SocialKey, SocialLink } from "@/config/site";

/** lucide has no official X glyph, so we hand-roll the brand mark. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

const ICONS: Record<SocialKey, LucideIcon | typeof XIcon> = {
  linkedin: Linkedin,
  github: Github,
  x: XIcon,
};

const iconLinkClass =
  "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-paper-raised text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:text-accent motion-reduce:hover:translate-y-0";

export function Socials({
  links,
  email,
  className = "",
}: {
  links: SocialLink[];
  /** When set, an email (mailto) icon is appended after the social links. */
  email?: string;
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((social) => {
        const Icon = ICONS[social.key];
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className={iconLinkClass}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}

      {email && (
        <li key="email">
          {/* mailto opens the visitor's mail client — no target/rel needed. */}
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${email}`}
            className={iconLinkClass}
          >
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </li>
      )}
    </ul>
  );
}
