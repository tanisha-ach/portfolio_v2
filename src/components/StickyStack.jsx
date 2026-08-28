import { Children, useEffect, useRef, useState } from "react";

// On wide screens the section header pins while the items stack up underneath
// it. Below lg both go back to normal flow: a stack of full-height cards
// covering each other reads as broken on a small screen, and the pinned header
// would eat most of the viewport.
//
// The header's height is measured rather than guessed, since it wraps to a
// different number of lines at different widths and the items pin directly
// below it. `gutter` is passed in so the pinned header shares its page's
// padding — it spans the full width, so it can't sit inside a padded section.
export default function StickyStack({ header, gutter, children }) {
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Every item is held to the height of the tallest one. That is the smallest
  // height at which each still covers the item beneath it, and it keeps the
  // shortest step from leaving a screenful of empty page behind the stack.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const contents = list.querySelectorAll("[data-stack-content]");
      let tallest = 0;
      for (const content of contents) tallest = Math.max(tallest, content.scrollHeight);
      setItemHeight(tallest);
    };
    measure();
    const observer = new ResizeObserver(measure);
    for (const content of list.querySelectorAll("[data-stack-content]")) observer.observe(content);
    return () => observer.disconnect();
  }, [children]);

  return (
    <>
      <div ref={headerRef} className={`z-20 bg-page pt-16 pb-6 lg:sticky lg:top-0 ${gutter}`}>
        {header}
      </div>

      <div className={gutter}>
        {/* The gap between items is the dwell time before the next arrives. The
            opaque background is what covers the item beneath — not decoration,
            so it can't be dropped. */}
        <div ref={listRef} className="flex w-full max-w-276 flex-col gap-12 lg:gap-30">
          {Children.map(children, (child) => (
            <div
              className="static lg:sticky"
              style={{ top: headerHeight, "--stack-item": itemHeight ? `${itemHeight}px` : "auto" }}
            >
              <div className="bg-page lg:pt-5">
                {/* The floor sits on the wrapper, not on the measured element,
                    so the measurement stays the content's own height and cannot
                    feed back into itself. */}
                <div className="lg:min-h-[var(--stack-item)]">
                  <div data-stack-content>{child}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
