import { useEffect, useRef } from "react";

const BackLink = ({ className = "" }) => (
  <a
    href="/"
    className={
      "flex w-fit items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-copy " +
      className
    }
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 640 640" width="16" className="shrink-0">
      <path
        d="M208.666-613.333l130.667 130.667q8 8 7.666 18.666T338.666-445.333q-8 7.333-18.667 7.667T301.333-445.333L125.333-621.333q-4-4-5.667-8.667t-1.667-10q0-5.333 1.667-10t5.667-8.666l176-176q7.333-7.333 18.333-7.334t19 7.334q8 8 8 19T338.666-796.666L208.666-666.666h298q11.333 0 19 7.666T533.333-640q0 11.333-7.667 19T506.666-613.333H208.666Z"
        fill="currentColor"
      />
    </svg>
    Back
  </a>
);

export default function CaseStudySidebar({ nav, activeId }) {
  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => n.id === activeId)
  );
  const progress = ((activeIndex + 1) / nav.length) * 100;
  const railRef = useRef(null);
  const settled = useRef(false);

  // The rail is wider than a phone, so the section being read can sit off the
  // right edge with nothing on screen to say which one is current. Keep the
  // active tab centred as the page scrolls past each section. The first pass is
  // instant so the bar does not slide on load, and a reduced-motion preference
  // turns the animation off entirely.
  useEffect(() => {
    const rail = railRef.current;
    const tab = rail?.querySelector('[data-active="true"]');
    if (!rail || !tab) return;

    const target = tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2;
    const left = Math.max(0, Math.min(target, rail.scrollWidth - rail.clientWidth));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A hidden document drops smooth scrolls on the floor, which would leave the
    // rail parked on an old section when the tab comes back.
    const animate = settled.current && !reduced && !document.hidden;

    rail.scrollTo({ left, behavior: animate ? "smooth" : "auto" });
    settled.current = true;
  }, [activeId]);

  return (
    <>
      {/* Narrow screens: the rail collapses to a bar that stays at the top. The
          section list scrolls sideways rather than wrapping, so the bar keeps a
          fixed height and never pushes the page around. */}
      <div className="sticky top-0 z-30 border-b border-line bg-page lg:hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-4 sm:px-8">
          <BackLink />
          <span className="text-[11px] tracking-[0.04em] text-label">
            {activeIndex + 1}/{nav.length}
          </span>
        </div>
        {/* The active tab's underline lands on the bar's own bottom rule rather
            than floating above it, so the header closes on one line, not two. */}
        <ul
          ref={railRef}
          className="flex gap-1 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {nav.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  data-active={active}
                  className={
                    "-mb-px block whitespace-nowrap border-b-[3px] px-2.5 pb-3 text-[13px] transition-colors " +
                    (active
                      ? "border-accent font-semibold text-accent"
                      : "border-transparent font-medium text-label")
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Wide screens: the original rail. */}
      <aside className="sticky top-0 hidden h-screen w-55 shrink-0 flex-col border-r border-line bg-page py-7 lg:flex">
        <div className="border-b border-line px-6 pb-7">
          <BackLink />
        </div>

        <nav className="flex grow flex-col pt-6">
          <div className="mb-3.5 px-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-label">
            Contents
          </div>
          <ul className="flex flex-col gap-px">
            {nav.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={
                      "flex items-center border-l-2 px-6 py-2.5 text-[13px] transition-colors duration-200 " +
                      (active
                        ? "border-accent bg-accent/5 font-semibold text-accent"
                        : "border-transparent font-medium text-label hover:text-ink")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto px-6">
            <div className="h-0.5 w-full overflow-hidden rounded-[1px] bg-line">
              <div
                className="h-full rounded-[1px] bg-accent transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2.5 text-[11px] tracking-[0.04em] text-label">
              {activeIndex + 1} of {nav.length} sections
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
