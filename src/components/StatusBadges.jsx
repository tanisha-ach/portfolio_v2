import { useEffect, useRef, useState } from "react";
import useTypewriter from "../hooks/useTypewriter";
import { locationBadge, hireBadge } from "../data/home";

// The intro types itself out once per visit. Every page in the shell renders the
// same pair, so a second page — or a trip back to the first — would otherwise
// replay the whole sequence. The flag rides sessionStorage so the animation
// still greets a genuinely new visit, and is read once at module load so every
// badge in a render agrees on which state it is in.
const PLAYED_KEY = "status-badges-played";

function alreadyPlayed() {
  try {
    return sessionStorage.getItem(PLAYED_KEY) === "1";
  } catch {
    // Private modes and blocked storage: fall back to playing the intro.
    return false;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(PLAYED_KEY, "1");
  } catch {
    /* nothing to remember it with — the intro simply plays again */
  }
}

const settled = alreadyPlayed();

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
//
// That measurement is the pill's border box, but an absolutely positioned child
// is placed against its padding box — hence the pull back by the 1px border,
// without which the stroke rides a pixel down and right of the edge it traces.
function TraceOutline({ width, height, color, duration = 2000 }) {
  const inset = 0.75; // centre the stroke on the pill's own 1px border
  const w = width - inset * 2;
  const h = height - inset * 2;
  // A hidden pill measures zero, which would hand the rect negative geometry.
  if (w <= 0 || h <= 0) return null;
  const r = Math.min(24, h / 2);
  const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -top-px -left-px"
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
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          "--trace-len": perimeter,
          stroke: color,
          strokeDasharray: perimeter,
          strokeDashoffset: settled ? 0 : perimeter,
          filter: `drop-shadow(0 0 4px color-mix(in oklab, ${color} 55%, transparent))`,
          // Already-settled pills show the finished outline; only a first visit
          // watches it draw.
          animation: settled ? undefined : `trace-draw ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          transition: "stroke 300ms, filter 300ms",
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
    skip: settled,
  });
  const pillRef = useRef(null);
  const [box, setBox] = useState(null);

  // Remember the run the moment it finishes, so the next page in this session
  // opens on the settled pills rather than typing them again.
  useEffect(() => {
    if (done) markPlayed();
  }, [done]);

  useEffect(() => {
    if (!config.trace || !done || !pillRef.current) return;
    const el = pillRef.current;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      // The pills are hidden below lg, where the box measures zero and the
      // stroke geometry would go negative.
      setBox(width > 2 && height > 2 ? { width, height } : null);
    };
    measure();
    // The outline now stays for good, so a later size change — a web font
    // landing after the text settles, say — would otherwise leave it
    // permanently mismatched against the pill.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [config.trace, done]);

  // A pill with an `href` is a link, so it has to be an anchor rather than a
  // styled div — keyboard focus and middle-click come with the element.
  const Tag = config.href ? "a" : "div";
  const linkProps = config.href
    ? { href: config.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Tag
      ref={pillRef}
      {...linkProps}
      // Width is intentionally content-driven so the pill grows and shrinks with
      // the text; only `left` is animated.
      // While it types, the pill runs its longest phrase and reaches furthest
      // over the content column, so it goes fully opaque until the text settles
      // back to the short one.
      className={
        "absolute flex items-center gap-2.5 whitespace-nowrap rounded-3xl border border-[#333] px-4 py-2.5 text-[#e4e4e4] shadow-lg shadow-black/40 backdrop-blur-md transition-[left] duration-500 ease-out " +
        (done ? "bg-[#141414]/85" : "bg-[#141414]")
      }
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
      {box && <TraceOutline width={box.width} height={box.height} color={`var(--accent, ${config.trace})`} />}
    </Tag>
  );
}

// Both pills, in the order they settle. Pages render this rather than assembling
// the pair themselves, so the sequence stays identical wherever it appears.
export default function StatusBadges() {
  return (
    <>
      <StatusBadge icon={<PinIcon />} config={locationBadge} />
      <StatusBadge icon={<BriefcaseIcon />} config={hireBadge} />
    </>
  );
}
