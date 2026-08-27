import { useEffect, useRef, useState } from "react";
import PortfolioShell from "../components/PortfolioShell";
import { projects, locationBadge, hireBadge } from "../data/home";
import useTypewriter from "../hooks/useTypewriter";

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="shrink-0">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="shrink-0">
      <path
        d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"
        fill="currentColor"
      />
    </svg>
  );
}

// A stroke that draws itself around the pill and stays, becoming the pill's
// lit border. Sized from a measurement of the pill rather than percentages so
// the dash maths are exact; `pathLength` is avoided for the same reason.
function TraceOutline({ width, height, color, duration = 2000 }) {
  const inset = 0.75; // centre the stroke on the pill's own 1px border
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.min(24, h / 2);
  const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
    >
      <rect
        x={inset}
        y={inset}
        width={w}
        height={h}
        rx={r}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          "--trace-len": perimeter,
          strokeDasharray: perimeter,
          strokeDashoffset: perimeter,
          filter: `drop-shadow(0 0 4px ${color}8C)`,
          animation: `trace-draw ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />
    </svg>
  );
}

// Dark glass pills so the badges belong to the site's surface language instead
// of reading as light chips pasted onto it. The outline draws once the pill has
// finished typing — by then its width has settled, so the stroke geometry stays
// put while it draws — and then remains as the pill's lit border.
function StatusBadge({ icon, config }) {
  const { text, index, done } = useTypewriter(config.phrases, {
    startDelay: config.startDelay,
  });
  const pillRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    if (!config.trace || !done || !pillRef.current) return;
    const el = pillRef.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setBox({ width, height });
    };
    measure();
    // The outline now stays for good, so a later size change — a web font
    // landing after the text settles, say — would otherwise leave it
    // permanently mismatched against the pill.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [config.trace, done]);

  return (
    <div
      ref={pillRef}
      // Width is intentionally content-driven so the pill grows and shrinks with
      // the text; only `left` is animated.
      className="absolute flex items-center gap-2.5 whitespace-nowrap rounded-3xl border border-[#333] bg-[#141414]/85 px-4 py-2.5 text-[#e4e4e4] shadow-lg shadow-black/40 backdrop-blur-md transition-[left] duration-500 ease-out"
      style={{ top: config.top, left: config.left[Math.min(index, config.left.length - 1)] }}
      // The text mutates every few ms, so expose the settled phrase instead of
      // letting assistive tech announce each keystroke.
      aria-label={config.phrases[config.phrases.length - 1]}
    >
      {icon}
      <span aria-hidden="true" className="text-[15px] leading-5">
        {text}
      </span>
      {!done && (
        <span
          aria-hidden="true"
          className="-ml-1 inline-block h-4.5 w-px shrink-0 bg-current"
          style={{ animation: "caret-blink 1s step-end infinite" }}
        />
      )}
      {box && <TraceOutline width={box.width} height={box.height} color={config.trace} />}
    </div>
  );
}

export default function Home() {
  return (
    <PortfolioShell
      activeTab="Case Studies"
      badges={
        <>
          <StatusBadge icon={<PinIcon />} config={locationBadge} />
          <StatusBadge icon={<BriefcaseIcon />} config={hireBadge} />
        </>
      }
    >
        <div className="flex flex-1 flex-col items-start gap-4 self-stretch">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.href}
              className="relative flex h-54.5 min-h-45 w-full shrink-0 items-center overflow-hidden rounded-2xl p-8"
              style={{ backgroundImage: project.gradient }}
            >
              <div className="relative flex grow basis-0 flex-col gap-2.5">
                <div className="text-[11px] leading-3.5 tracking-widest text-white/55">{project.eyebrow}</div>
                <div className="text-[36px] font-extrabold leading-[105%] tracking-[-0.02em] text-white">
                  {project.title}
                </div>
                <div className="max-w-105 text-sm leading-5.5 text-white/75">{project.description}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-[20px] bg-white/[0.18] px-3 py-1 text-[11px] font-medium text-white"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {project.images.map((img, i) => (
                  <div
                    key={i}
                    className="absolute bg-cover bg-center"
                    style={{
                      width: img.width,
                      height: img.height,
                      left: img.left,
                      top: img.top,
                      backgroundImage: `url(${img.src})`,
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
