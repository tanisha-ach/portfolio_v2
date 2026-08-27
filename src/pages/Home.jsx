import { useState } from "react";
import PortfolioShell, { ACCENT } from "../components/PortfolioShell";
import StatusBadges from "../components/StatusBadges";
import { projects } from "../data/home";

export default function Home() {
  // Which card the pointer is on, so the rail can borrow that card's hue.
  const [accent, setAccent] = useState(null);

  return (
    <PortfolioShell
      activeTab="Case Studies"
      accent={accent ?? ACCENT}
      badges={<StatusBadges />}
    >
        <div className="flex flex-1 flex-col items-start gap-6 self-stretch lg:gap-4">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.href}
              onMouseEnter={() => setAccent(project.accent)}
              onMouseLeave={() => setAccent(null)}
              onFocus={() => setAccent(project.accent)}
              onBlur={() => setAccent(null)}
              className="group relative flex h-93 w-full shrink-0 items-end overflow-hidden rounded-2xl px-5.5 py-6 transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 lg:h-54.5 lg:min-h-45 lg:items-center lg:p-8"
              style={{ backgroundImage: project.gradient }}
            >
              {/* The wide layout positions its art inside the text column — the
                  frame those offsets were authored in. The mobile design places
                  art against the card itself, so it gets its own layer. */}
              <div className="absolute inset-0 lg:hidden">
                {project.images
                  .filter((img) => img.mobile)
                  .map((img, i) => (
                    <div
                      key={i}
                      className="absolute bg-cover bg-center bg-no-repeat"
                      style={{
                        width: img.mobile.width,
                        height: img.mobile.height,
                        right: img.mobile.right,
                        top: img.mobile.top,
                        backgroundImage: `url(${img.src})`,
                      }}
                    />
                  ))}
              </div>

              <div className="relative flex max-w-[244px] grow basis-0 flex-col gap-1 lg:max-w-none lg:gap-2.5">
                <div className="text-[9px] leading-3 tracking-widest text-white/55 lg:text-[11px] lg:leading-3.5">
                  {project.eyebrow}
                </div>
                <div className="text-2xl font-extrabold leading-[105%] tracking-[-0.02em] text-white lg:text-[36px]">
                  {project.title}
                </div>
                <div className="max-w-105 text-xs leading-[22px] text-white/75 lg:text-sm lg:leading-5.5">
                  {project.description}
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-[20px] bg-white/[0.18] px-3 py-1.5 text-[9px] font-medium leading-3 text-white lg:px-3 lg:py-1 lg:text-[11px] lg:leading-normal"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Each image declares its own hover behaviour: `shift` slides it in
                    y, `zoom` scales it. An image that wants neither declares neither. */}
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className="absolute hidden bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out group-hover:translate-y-[var(--shift)] group-hover:scale-[var(--zoom)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 lg:block"
                    style={{
                      width: img.width,
                      height: img.height,
                      right: img.right,
                      top: img.top,
                      backgroundImage: `url(${img.src})`,
                      "--shift": `${img.shift ?? 0}px`,
                      "--zoom": img.zoom ?? 1,
                    }}
                  />
                ))}
              </div>

              <div className="absolute -left-0.75 -top-4.75 text-[120px] font-extrabold leading-[105%] tracking-[-0.02em] text-white/[0.18]">
                {project.number}
              </div>
            </a>
          ))}
        </div>
    </PortfolioShell>
  );
}
