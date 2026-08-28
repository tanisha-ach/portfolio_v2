import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const GalleryContext = createContext(null);

// Any image on the page can ask to be opened; it only has to know its own src.
// The provider owns the list, so the viewer can walk the whole case study
// rather than the one picture that was clicked.
export function useGallery() {
  return useContext(GalleryContext);
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

export function GalleryProvider({ items, children }) {
  const [index, setIndex] = useState(null);
  const value = useMemo(
    () => ({
      open: (src) => {
        const found = items.findIndex((item) => item.src === src);
        if (found >= 0) setIndex(found);
      },
    }),
    [items],
  );

  return (
    <GalleryContext.Provider value={value}>
      {children}
      {index !== null && (
        <Lightbox
          items={items}
          index={index}
          onIndex={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </GalleryContext.Provider>
  );
}

function Lightbox({ items, index, onIndex, onClose }) {
  const item = items[index];
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const stageRef = useRef(null);
  const closeRef = useRef(null);
  const drag = useRef(null);
  const pinch = useRef(null);
  const imageRef = useRef(null);
  // The stage takes pointer capture to pan, which retargets the click that
  // follows onto the stage itself. So whether the press began on the picture is
  // recorded at pointerdown, while the target is still the real one.
  const pressedOutside = useRef(false);
  // A drag that ends on the backdrop is still a drag, not a click past the
  // picture, so a gesture that moved suppresses the dismiss.
  const moved = useRef(false);
  const restoreFocus = useRef(null);

  const reset = useCallback(() => setView({ scale: 1, x: 0, y: 0 }), []);
  const go = useCallback(
    (step) => {
      onIndex((current) => (current + step + items.length) % items.length);
      reset();
    },
    [items.length, onIndex, reset],
  );

  // Zoom toward a point rather than the centre, so the detail under the cursor
  // is the detail that stays put.
  const zoomAt = useCallback((factor, clientX, clientY) => {
    const stage = stageRef.current;
    if (!stage) return;
    const box = stage.getBoundingClientRect();
    const px = clientX - box.left - box.width / 2;
    const py = clientY - box.top - box.height / 2;
    setView((prev) => {
      const scale = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE);
      const ratio = scale / prev.scale;
      if (scale === MIN_SCALE) return { scale, x: 0, y: 0 };
      return {
        scale,
        x: px - (px - prev.x) * ratio,
        y: py - (py - prev.y) * ratio,
      };
    });
  }, []);

  // The page behind must not scroll while the viewer is up, and focus starts on
  // a control inside it so a keyboard user is not left behind on the page.
  useEffect(() => {
    restoreFocus.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      restoreFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "+" || event.key === "=")
        zoomAt(1.4, innerWidth / 2, innerHeight / 2);
      else if (event.key === "-")
        zoomAt(1 / 1.4, innerWidth / 2, innerHeight / 2);
      else if (event.key === "0") reset();
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, reset, zoomAt]);

  const onWheel = (event) => {
    event.preventDefault();
    zoomAt(event.deltaY < 0 ? 1.15 : 1 / 1.15, event.clientX, event.clientY);
  };

  const onPointerDown = (event) => {
    const stage = stageRef.current;
    pressedOutside.current = !imageRef.current?.contains(event.target);
    stage.setPointerCapture(event.pointerId);
    const points = (pinch.current ??= new Map());
    points.set(event.pointerId, { x: event.clientX, y: event.clientY });
    moved.current = false;
    if (points.size === 1 && view.scale > 1) {
      drag.current = { x: event.clientX - view.x, y: event.clientY - view.y };
    }
  };

  const onPointerMove = (event) => {
    const points = pinch.current;
    if (!points?.has(event.pointerId)) return;
    points.set(event.pointerId, { x: event.clientX, y: event.clientY });

    moved.current = true;
    if (points.size >= 2) {
      const [a, b] = [...points.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const previous = pinch.current.distance ?? distance;
      pinch.current.distance = distance;
      if (previous)
        zoomAt(distance / previous, (a.x + b.x) / 2, (a.y + b.y) / 2);
      return;
    }

    if (!drag.current) return;
    setView((prev) => ({
      ...prev,
      x: event.clientX - drag.current.x,
      y: event.clientY - drag.current.y,
    }));
  };

  const endPointer = (event) => {
    pinch.current?.delete(event.pointerId);
    if (!pinch.current?.size) pinch.current = null;
    drag.current = null;
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} — image ${index + 1} of ${items.length}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="text-[12px] tracking-[0.04em] text-label">
          {index + 1} / {items.length}
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-[13px] text-copy">
          {item.caption}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <div
        ref={stageRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={(event) =>
          view.scale > 1 ? reset() : zoomAt(2.5, event.clientX, event.clientY)
        }
        onClick={() => {
          if (pressedOutside.current && !moved.current) onClose();
        }}
        className="relative flex flex-1 touch-none items-center justify-center overflow-hidden"
      >
        {/* The image box is left to size itself to the picture rather than being
            stretched and letterboxed, so the empty space around it belongs to
            the stage — which is what makes "click outside to close" land where
            the reader expects. */}
        <img
          ref={imageRef}
          src={item.src}
          alt={item.caption}
          draggable="false"
          className="max-h-full max-w-full"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transformOrigin: "center",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-3 px-5 py-4">
        <ViewerButton onClick={() => go(-1)} label="Previous image">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </ViewerButton>
        <ViewerButton
          onClick={() => zoomAt(1 / 1.4, innerWidth / 2, innerHeight / 2)}
          label="Zoom out"
        >
          <path
            d="M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </ViewerButton>
        <span className="w-12 text-center text-[12px] tabular-nums text-label">
          {Math.round(view.scale * 100)}%
        </span>
        <ViewerButton
          onClick={() => zoomAt(1.4, innerWidth / 2, innerHeight / 2)}
          label="Zoom in"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </ViewerButton>
        <ViewerButton onClick={() => go(1)} label="Next image">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </ViewerButton>
      </div>
    </div>,
    document.body,
  );
}

function ViewerButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

// The trigger around any image that belongs to the gallery. It is a button, so
// it is reachable and announced the same way for a pointer and a keyboard.
export function GalleryTrigger({ src, className = "", children }) {
  const gallery = useGallery();
  return (
    <button
      type="button"
      onClick={() => gallery?.open(src)}
      aria-label="Open image full screen"
      className={
        "block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
        className
      }
    >
      {children}
    </button>
  );
}
