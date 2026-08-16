import { useCallback, useEffect, useRef, useState } from "react";

// Returns the index of the tracked element sitting closest to the vertical
// center of the viewport, or -1 when none of them are on screen. Attach the
// returned setter to each item you want tracked.
//
// Picking the single nearest element (rather than reporting everything that is
// technically visible) is what makes this useful for short stacked items: on a
// tall screen the whole group can be visible at once, so "is it visible" would
// light them all up and read as no emphasis at all.
//
// Uses scroll/resize listeners rather than IntersectionObserver to match
// useScrollSpy, which already does this rect math for the section nav.
export default function useActiveInView(count) {
  const elements = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const setRef = useCallback(
    (index) => (node) => {
      elements.current[index] = node;
    },
    []
  );

  useEffect(() => {
    const handler = () => {
      const viewportHeight = window.innerHeight;
      const center = viewportHeight / 2;

      let best = -1;
      let bestDistance = Infinity;

      for (let i = 0; i < count; i++) {
        const node = elements.current[i];
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= viewportHeight) continue; // off screen

        const distance = Math.abs((rect.top + rect.bottom) / 2 - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      }

      setActiveIndex(best);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [count]);

  return [setRef, activeIndex];
}
