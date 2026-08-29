import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

// The cursor itself, replaced. It rides in a portal on the body so no clipped
// or scrolling ancestor can cut it off, and sits to the lower right of the
// pointer, clear of the arrow itself. It borrows the
// copied confirmation's own styling, so the two read as one voice — the badge
// names the action, the confirmation answers it.
function CursorBadge({ x, y, copied, burst, reduced }) {
  return createPortal(
    <span
      aria-hidden="true"
      className="pointer-events-none fixed z-50 flex items-center gap-2 overflow-visible whitespace-nowrap rounded-full bg-[#F5C842] px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#111111] shadow-lg shadow-black/40"
      style={{ left: x, top: y, transform: "translate(14px, -8px)" }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 6h16v12H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 7l8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {copied ? "Copied!" : "Copy email"}
      {copied &&
        !reduced &&
        CONFETTI.map((piece, i) => (
          <span
            key={`${burst}-${i}`}
            className="absolute left-1/2 top-1/2 block h-[7px] w-[3px] rounded-[1px]"
            style={{
              backgroundColor: piece.color,
              "--dx": `${piece.dx}px`,
              "--dy": `${piece.dy}px`,
              "--rot": `${piece.rot}deg`,
              animation: `confetti-fly 900ms cubic-bezier(0.2, 0.7, 0.3, 1) ${i * 12}ms both`,
            }}
          />
        ))}
    </span>,
    document.body,
  );
}

// The email address, click-to-copy. The confirmation lands under the pointer
// rather than under the middle of the address, so it reads as a response to the
// click itself.
//
// `children` swaps the address for another trigger — an icon, say. The icon has
// no text of its own, so that case needs `label` to name the button.
export default function CopyEmail({ email, children, label }) {
  const [copied, setCopied] = useState(false);
  // Where the pointer is over the trigger, or null when it is elsewhere. The
  // badge rides alongside the cursor rather than replacing it, and only for a
  // pointer that has a position to ride alongside — a finger does not.
  const [cursor, setCursor] = useState(null);
  const [burst, setBurst] = useState(0); // remounts the pill so the burst replays
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const track = (event) => {
    if (event.pointerType === "touch") return;
    setCursor({ x: event.clientX, y: event.clientY });
  };

  const copy = async () => {
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

  // An icon trigger sits in a flex row, where an inline-block wrapper would add
  // a line box under the glyph and push it off the row's centre. Text keeps
  // inline-block so it stays on the prose baseline.
  return (
    <span
      className={`relative align-baseline ${children ? "inline-flex" : "inline-block"}`}
    >
      <button
        type="button"
        onClick={copy}
        onPointerEnter={track}
        onPointerMove={track}
        onPointerLeave={() => setCursor(null)}
        onPointerCancel={() => setCursor(null)}
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

      {cursor && (
        <CursorBadge
          x={cursor.x}
          y={cursor.y}
          copied={copied}
          burst={burst}
          reduced={reduced}
        />
      )}

      {/* Visibility changes alone aren't announced, so the confirmation also
          enters and leaves this live region as text. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </span>
  );
}
