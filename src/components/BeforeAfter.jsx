import { useCallback, useEffect, useRef, useState } from "react";
import { useGallery } from "./Lightbox";

// Two states of the same surface, one on top of the other, with a divider the
// reader drags to wipe between them. A pair of side-by-side screenshots would
// make the reader do the alignment work themselves; here the comparison happens
// in place, at the same scale, on the same pixels.
//
// Both images are fitted into one fixed-ratio box, so the divider always has a
// straight edge to travel and neither document dictates the height.
export default function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  ratio = "11 / 10",
  beforeFill = "transparent",
  afterFill = "transparent",
}) {
  const gallery = useGallery();
  const [position, setPosition] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);
  const beforeTagRef = useRef(null);
  const afterTagRef = useRef(null);
  const handleRef = useRef(null);
  // Where each label ends, as a percentage of the frame. Measured rather than
  // assumed, because the labels are text and their width moves with the words.
  // The handle's own radius counts too, so a label goes before the circle
  // touches it rather than after it has already covered the word.
  const [tagEdges, setTagEdges] = useState({ before: 0, after: 100 });

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const box = frame.getBoundingClientRect();
      if (!box.width) return;
      const left = beforeTagRef.current?.getBoundingClientRect();
      const right = afterTagRef.current?.getBoundingClientRect();
      const grip = handleRef.current?.getBoundingClientRect();
      const reach = grip ? (grip.width / 2 / box.width) * 100 : 0;
      setTagEdges({
        before: left ? ((left.right - box.left) / box.width) * 100 + reach : 0,
        after: right
          ? ((right.left - box.left) / box.width) * 100 - reach
          : 100,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [beforeLabel, afterLabel]);

  // A label steps aside once the divider reaches it: the handle would otherwise
  // sit on top of the word, and a label over the state it no longer names is
  // worse than no label.
  const showBefore = position > tagEdges.before;
  const showAfter = position < tagEdges.after;

  const moveTo = useCallback((clientX) => {
    const frame = frameRef.current;
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    const next = ((clientX - box.left) / box.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  // Pointer events cover mouse, pen and touch in one path, and the capture keeps
  // the drag alive when the pointer leaves the frame.
  const onPointerDown = (event) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event) => {
    if (!dragging.current) return;
    moveTo(event.clientX);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - step));
    else if (event.key === "ArrowRight")
      setPosition((p) => Math.min(100, p + step));
    else if (event.key === "Home") setPosition(0);
    else if (event.key === "End") setPosition(100);
    else return;
    event.preventDefault();
  };

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative w-full touch-pan-y select-none overflow-hidden border border-line"
      style={{ aspectRatio: ratio }}
    >
      {/* The two guides are different shapes, so each is fitted into the same
          box against its own ground rather than scaled to match. The wipe then
          swaps one whole document for the other instead of sliding two
          mismatched crops past each other. */}
      <div className="absolute inset-0" style={{ backgroundColor: afterFill }}>
        <img
          src={after}
          alt={afterLabel}
          className="size-full object-contain"
          draggable="false"
          loading="lazy"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          backgroundColor: beforeFill,
        }}
        aria-hidden="true"
      >
        <img
          src={before}
          alt=""
          className="size-full object-contain"
          draggable="false"
          loading="lazy"
        />
      </div>

      <span
        ref={beforeTagRef}
        className={
          "pointer-events-none absolute left-3 top-3 rounded-full bg-page/85 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-ink backdrop-blur-sm transition-opacity duration-150 " +
          (showBefore ? "opacity-100" : "opacity-0")
        }
      >
        {beforeLabel}
      </span>
      <span
        ref={afterTagRef}
        className={
          "pointer-events-none absolute right-3 top-3 rounded-full bg-page/85 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-ink backdrop-blur-sm transition-opacity duration-150 " +
          (showAfter ? "opacity-100" : "opacity-0")
        }
      >
        {afterLabel}
      </span>

      <button
        type="button"
        // The frame takes pointer capture on pointerdown to run the wipe, which
        // would swallow this button's own press. Keep the press local.
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          gallery?.open(position > 50 ? before : after);
        }}
        aria-label="Open the visible guide full screen"
        className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-page/85 text-ink backdrop-blur-sm transition-colors hover:bg-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-accent"
        style={{ left: `${position}%` }}
      />

      <button
        ref={handleRef}
        type="button"
        role="slider"
        aria-label={`Reveal ${beforeLabel} or ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-accent text-page shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ left: `${position}%` }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="shrink-0"
        >
          <path d="M9 7l-5 5 5 5V13h6v4l5-5-5-5v4H9V7z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
