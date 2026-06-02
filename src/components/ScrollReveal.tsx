"use client";

import { useEffect } from "react";

/**
 * Sets up a single IntersectionObserver that reveals any element carrying a
 * `data-reveal` attribute as it scrolls into view. Keeping this in one tiny
 * client component lets the rest of the page stay server-rendered.
 *
 * Respects prefers-reduced-motion: when reduced, elements are revealed
 * immediately and no observer is created.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-reveal", "in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
