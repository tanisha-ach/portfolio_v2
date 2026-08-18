import { useEffect, useRef, useState } from "react";
import { skillTags, tabs, projects, locationBadge, hireBadge } from "../data/home";
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

function EmailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M26.889 5L5.111 5C3.393 5 2 6.407 2 8.142L2 23.858C2 25.593 3.393 27 5.111 27L26.889 27C28.607 27 30 25.593 30 23.858L30 8.142C30 6.407 28.607 5 26.889 5Z"
        fill="#FFFFFF"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.167 7.75L13.113 15.057C14.824 16.314 17.176 16.314 18.887 15.057L28.833 7.75"
        fill="none"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M25.35 5H6.65C5.734 5 5 5.737 5 6.565v18.87c0 0.828 0.734 1.565 1.65 1.565h18.7c0.916 0 1.65-0.737 1.65-1.565V6.565C27 5.737 26.266 5 25.35 5zM11.508 23.778H8.3V13.284h3.208V23.778zM9.95 11.811c-1.008 0-1.925-0.828-1.925-1.933 0-1.105 0.825-1.933 1.925-1.933 1.008 0 1.925 0.828 1.925 1.933S10.958 11.811 9.95 11.811zM23.792 23.687H20.584v-5.156c0-1.197 0-2.853-1.742-2.853-1.742 0-1.925 1.381-1.926 2.669v5.247h-3.208V13.284h3.026v1.382h0.091c0.458-0.828 1.558-1.749 3.117-1.75 3.3 0 3.942 2.21 3.942 5.063V23.687z"
        fill="#FFFFFF"
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
    <div className="flex min-h-screen bg-[#151515] text-white">
      <aside className="relative flex w-95 shrink-0 flex-col gap-1 border-r border-[#2a2a2a] bg-[#111111] px-9 py-10">
        <div className="mb-7 flex w-fit items-center gap-5">
          <div className="relative h-70 w-70 shrink-0 overflow-hidden rounded-[20px] bg-[#ddd]">
            <div
              className="absolute left-1/2 top-1/2 h-135.75 w-90.5 -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://app.paper.design/file-assets/01KY86RD325CPNB088ESCM9HH1/01KY8DD6K8PS5XVMERCT51J7D3.jpg)",
              }}
            />
          </div>
        </div>

        <div className="font-display text-4xl font-bold leading-10 text-white">Tanisha Acharya</div>
        <div className="text-lg leading-6.5 text-white">Senior Product Designer</div>

        <div className="flex w-fit items-start gap-1.5 pb-7">
          <a href="mailto:tanisha.acharya@utexas.edu" aria-label="Email">
            <EmailIcon />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>

        <div className="flex w-fit flex-col items-start gap-3">
          <div className="self-stretch text-lg leading-6.5 text-white">
            Solving problems that happen to have interfaces.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 self-stretch">
            {skillTags.map((tag) => (
              <div key={tag} className="rounded-[20px] border border-[#333] px-3.5 py-1 text-xs text-[#aaa]">
                {tag}
              </div>
            ))}
          </div>
        </div>

        <StatusBadge icon={<PinIcon />} config={locationBadge} />
        <StatusBadge icon={<BriefcaseIcon />} config={hireBadge} />
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden px-10 py-9">
        <div className="mb-8 flex gap-8 border-b border-[#2a2a2a]">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={
                "w-fit px-4 pb-3 text-[15px] leading-4.5 " +
                (tab.active ? "border-b-2 border-[#f5c842] font-semibold text-white" : "text-[#666]")
              }
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col items-start gap-4 self-stretch">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.href}
              className="relative flex h-54.5 min-h-45 w-full shrink-0 items-center overflow-hidden rounded-2xl p-8"
              style={{ backgroundImage: project.gradient }}
            >
              <div className="relative flex grow basis-0 flex-col gap-2.5">
                <div className="text-[11px] leading-3.5 tracking-widest text-white/55">{project.number}</div>
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
      </main>
    </div>
  );
}
