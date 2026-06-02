export function ExperienceStrip({ brands }: { brands: string[] }) {
  return (
    <section
      aria-label="Selected experience"
      data-reveal
      className="mt-20 border-t border-line pt-6 sm:mt-28"
    >
      <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-baseline">
        <span className="eyebrow shrink-0">Previously</span>
        <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-ink-soft">
          {brands.map((brand, i) => (
            <li key={brand} className="flex items-baseline gap-x-5">
              {i > 0 && (
                <span aria-hidden="true" className="text-line-strong">
                  &middot;
                </span>
              )}
              <span className="text-[0.95rem] font-medium tracking-tight">
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
