import { useEffect, useState } from "react";

// Returns the id of the section currently anchored in the upper portion of the
// viewport. The last section whose top has passed the activation line wins, so
// in-between (unlisted) sections keep the previous nav item highlighted.
//
// Two edge cases are handled explicitly:
//  - The activation line is a fraction of the viewport height, so short trailing
//    sections still get a turn as you scroll toward them.
//  - When the page is scrolled to the very bottom, the final section is forced
//    active — otherwise sections that share the last screenful can never reach
//    the activation line and would be skipped.
export default function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const handler = () => {
      // Kept below the tightest section spacing (~208px) so a section only
      // activates once its own heading reaches the line, never the next one early.
      const line = Math.min(160, window.innerHeight * 0.2);

      // Bottom of page: force the last section active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids]);

  return activeId;
}
