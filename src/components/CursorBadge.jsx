import { useState } from "react";
import { createPortal } from "react-dom";

// A yellow label that rides alongside the cursor while it is over a control,
// naming what a click there will do. It rides in a portal on the body so no
// clipped or scrolling ancestor can cut it off, and sits to the lower right of
// the pointer, clear of the arrow itself. `children` carries anything layered
// on top of the label, such as the copy confirmation's confetti.
//
// The status tone is for a note rather than an action — it says what isn't
// there yet — so it borrows the sidebar's status pills instead: dark glass,
// sentence case, a glowing outline in `color`, and an optional leading icon.
const TONES = {
  accent:
    "rounded-full bg-[#F5C842] px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#111111]",
  status:
    "gap-2.5 rounded-3xl border-[1.5px] bg-[#141414]/85 px-4 py-2.5 text-[15px] leading-5 text-[#e4e4e4] backdrop-blur-md",
};

export function CursorBadge({ x, y, label, tone = "accent", color, icon, children }) {
  return createPortal(
    <span
      aria-hidden="true"
      className={`pointer-events-none fixed z-50 flex items-center overflow-visible whitespace-nowrap shadow-lg shadow-black/40 ${TONES[tone]}`}
      style={{
        left: x,
        top: y,
        transform: "translate(14px, -8px)",
        ...(color && {
          borderColor: color,
          boxShadow: `0 0 6px color-mix(in oklab, ${color} 55%, transparent), 0 10px 15px -3px rgb(0 0 0 / 0.4)`,
        }),
      }}
    >
      {icon}
      {label}
      {children}
    </span>,
    document.body,
  );
}

// Where the pointer is over the trigger, or null when it is elsewhere. Only a
// pointer that has a position to ride alongside gets the badge — a finger does
// not.
export function useCursor() {
  const [cursor, setCursor] = useState(null);
  const track = (event) => {
    if (event.pointerType === "touch") return;
    setCursor({ x: event.clientX, y: event.clientY });
  };
  const clear = () => setCursor(null);
  return {
    cursor,
    handlers: {
      onPointerEnter: track,
      onPointerMove: track,
      onPointerLeave: clear,
      onPointerCancel: clear,
    },
  };
}
