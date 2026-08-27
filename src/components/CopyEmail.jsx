import { useEffect, useRef, useState } from "react";

// Fixed vectors rather than random ones, so the burst looks the same every time
// instead of occasionally clumping. Party-confetti colours rather than a tint of
// the page accent: the whole point of confetti is that no two neighbouring
// pieces match, and every hue here still clears the dark background.
const CONFETTI = [
  { dx: -46, dy: -16, rot: -140, color: "#ff3b30" },
  { dx: -34, dy: -30, rot: 90, color: "#ff9500" },
  { dx: -14, dy: -38, rot: -60, color: "#ffd60a" },
  { dx: 8, dy: -40, rot: 120, color: "#34c759" },
  { dx: 28, dy: -32, rot: -100, color: "#0a84ff" },
  { dx: 44, dy: -14, rot: 70, color: "#bf5af2" },
  { dx: 48, dy: 10, rot: -130, color: "#ff2d95" },
  { dx: 32, dy: 28, rot: 80, color: "#ffd60a" },
  { dx: 10, dy: 38, rot: -70, color: "#34c759" },
  { dx: -12, dy: 36, rot: 110, color: "#ff9500" },
  { dx: -32, dy: 26, rot: -90, color: "#0a84ff" },
  { dx: -48, dy: 6, rot: 60, color: "#ff3b30" },
];

// Older browsers, and any non-secure context, don't get navigator.clipboard.
function legacyCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-9999px";
  document.body.appendChild(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(field);
  }
}

// The email address, click-to-copy. The confirmation lands under the pointer
// rather than under the middle of the address, so it reads as a response to the
// click itself.
//
// `children` swaps the address for another trigger — an icon, say. The icon has
// no text of its own, so that case needs `label` to name the button.
export default function CopyEmail({ email, children, label }) {
  const [copied, setCopied] = useState(false);
  const [originX, setOriginX] = useState(0);
  const [burst, setBurst] = useState(0); // remounts the pill so the burst replays
  const wrapRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const copy = async (event) => {
    const rect = wrapRef.current.getBoundingClientRect();
    // A keyboard-triggered click reports clientX 0 — centre on the address then.
    const keyboard = event.detail === 0;
    setOriginX(keyboard ? rect.width / 2 : event.clientX - rect.left);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        legacyCopy(email);
      }
    } catch {
      legacyCopy(email);
    }

    setBurst((n) => n + 1);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span ref={wrapRef} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={copy}
        title="Copy email address"
        aria-label={label}
        className={
          "cursor-pointer align-baseline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" +
          (children
            ? ""
            : " text-ink underline decoration-label underline-offset-[3px] transition-colors hover:decoration-ink")
        }
      >
        {children ?? email}
      </button>

      {copied && (
        <span
          key={burst}
          aria-hidden="true"
          className="pointer-events-none absolute top-full z-20 mt-2 -translate-x-1/2"
          style={{ left: originX }}
        >
          <span
            className="relative block whitespace-nowrap rounded-md border border-line bg-black px-3 py-2 text-[13px] font-medium text-ink"
            style={{ animation: "copied-pop 260ms ease-out both" }}
          >
            Email copied!
            {!reduced &&
              CONFETTI.map((p, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 block h-[7px] w-[3px] rounded-[1px]"
                  style={{
                    backgroundColor: p.color,
                    "--dx": `${p.dx}px`,
                    "--dy": `${p.dy}px`,
                    "--rot": `${p.rot}deg`,
                    animation: `confetti-fly 900ms cubic-bezier(0.2, 0.7, 0.3, 1) ${i * 12}ms both`,
                  }}
                />
              ))}
          </span>
        </span>
      )}

      {/* Visibility changes alone aren't announced, so the confirmation also
          enters and leaves this live region as text. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </span>
  );
}
