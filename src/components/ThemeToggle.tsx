"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getActiveTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  // Start as null so SSR and first client render match (avoids hydration
  // mismatch); resolve the real theme after mount.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getActiveTheme());
  }, []);

  function toggle() {
    const next: Theme = getActiveTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be unavailable; ignore */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";
  const label =
    theme === null
      ? "Toggle color theme"
      : `Switch to ${isDark ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-paper-raised text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:text-accent"
    >
      {/* Render both, cross-fade with opacity so there's no layout shift. */}
      <Sun
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 motion-reduce:transition-none ${
          isDark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`h-[18px] w-[18px] transition-all duration-300 motion-reduce:transition-none ${
          isDark ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
