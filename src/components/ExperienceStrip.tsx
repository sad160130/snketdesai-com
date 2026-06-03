export function ExperienceStrip({ brands }: { brands: string[] }) {
  return (
    <section
      aria-label="Selected experience"
      data-reveal
      className="mt-20 border-t border-line pt-6 sm:mt-28"
    >
      <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-baseline">
        <span className="eyebrow shrink-0">Previously</span>
        {/*
          Trailing separators kept inside each nowrap item: on desktop the row
          reads as evenly-spaced "Brand · Brand"; when it wraps on mobile the
          dot stays glued to the end of its brand, so a dot never orphans to the
          start of a line.
        */}
        <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-ink-soft">
          {brands.map((brand, i) => (
            <li
              key={brand}
              className="flex items-baseline whitespace-nowrap text-[0.95rem] font-medium tracking-tight"
            >
              {brand}
              {i < brands.length - 1 && (
                <span aria-hidden="true" className="ml-4 text-line-strong">
                  &middot;
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
