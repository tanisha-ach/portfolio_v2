import { useEffect, useRef, useState } from "react";
import CopyEmail from "./CopyEmail";
import { skillTags, tabs, profile } from "../data/home";

function EmailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M26.889 5L5.111 5C3.393 5 2 6.407 2 8.142L2 23.858C2 25.593 3.393 27 5.111 27L26.889 27C28.607 27 30 25.593 30 23.858L30 8.142C30 6.407 28.607 5 26.889 5Z"
        fill="currentColor"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.167 7.75L13.113 15.057C14.824 16.314 17.176 16.314 18.887 15.057L28.833 7.75"
        fill="none"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M25.35 5H6.65C5.734 5 5 5.737 5 6.565v18.87c0 0.828 0.734 1.565 1.65 1.565h18.7c0.916 0 1.65-0.737 1.65-1.565V6.565C27 5.737 26.266 5 25.35 5zM11.508 23.778H8.3V13.284h3.208V23.778zM9.95 11.811c-1.008 0-1.925-0.828-1.925-1.933 0-1.105 0.825-1.933 1.925-1.933 1.008 0 1.925 0.828 1.925 1.933S10.958 11.811 9.95 11.811zM23.792 23.687H20.584v-5.156c0-1.197 0-2.853-1.742-2.853-1.742 0-1.925 1.381-1.926 2.669v5.247h-3.208V13.284h3.026v1.382h0.091c0.458-0.828 1.558-1.749 3.117-1.75 3.3 0 3.942 2.21 3.942 5.063V23.687z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 19" width="24" height="19" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        transform="translate(3 6)"
        d="M20 -2.306C20 -2.306 2 -2.306 2 -2.306C2 -2.306 2 -5.208 2 -5.208C2 -5.208 20 -5.208 20 -5.208C20 -5.208 20 -2.306 20 -2.306ZM0 12.208C0 12.208 0 9.306 0 9.306C0 9.306 4 9.306 4 9.306C4 9.306 4 12.208 4 12.208C4 12.208 0 12.208 0 12.208ZM1 4.952C1 4.952 1 2.048 1 2.048C1 2.048 13 2.048 13 2.048C13 2.048 13 4.952 13 4.952C13 4.952 1 4.952 1 4.952Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960" className="shrink-0">
      <path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Both icons draw themselves in the inherited colour, so one hover rule here
// lights either of them without the SVGs needing to know about it.
export const ACCENT = "#F5C842";

const SOCIAL = "block text-white transition-colors hover:text-[#F5C842]";

// A tab with no destination says so rather than looking broken. The label rides
// the pointer because the tab is inert — there is no control to anchor to, and a
// tooltip parked beside dead text reads like it belongs to a neighbour.
function ComingSoon({ label, className }) {
  const [point, setPoint] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const track = (event) => setPoint({ x: event.clientX, y: event.clientY });
  const hide = () => setPoint(null);
  // Touch has no hover, so a tap shows the same label and clears itself.
  const flash = (event) => {
    track(event);
    clearTimeout(timer.current);
    timer.current = setTimeout(hide, 1600);
  };

  return (
    <>
      <span
        className={`${className} cursor-default`}
        aria-disabled="true"
        onMouseEnter={track}
        onMouseMove={track}
        onMouseLeave={hide}
        onClick={flash}
      >
        {label}
        <span className="sr-only"> — coming soon</span>
      </span>

      {point && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed z-50 whitespace-nowrap rounded-md border border-line bg-black px-3 py-2 text-[13px] font-medium text-ink"
          style={{ left: point.x + 14, top: point.y + 16 }}
        >
          Coming soon!
        </span>
      )}
    </>
  );
}

// The menu the hamburger opens: the same tabs the lg tab bar shows, stacked and
// full-bleed. The active row is a filled band rather than a bare underline —
// at this width there is no neighbouring tab to compare it against.
function MobileMenu({ activeTab, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#151515] lg:hidden">
      <div className="flex items-center justify-between bg-[#111111] p-6">
        <MenuIcon />
        <button type="button" onClick={onClose} aria-label="Close menu" className={SOCIAL}>
          <CloseIcon />
        </button>
      </div>

      <nav className="flex flex-col items-center gap-8">
        {tabs.map((tab) => {
          const active = tab.label === activeTab;
          const label = (
            <span
              className={
                "px-4 text-[15px] leading-[18px] " +
                (active ? "font-semibold text-white" : "text-[#666]")
              }
            >
              {tab.label}
            </span>
          );

          if (!active) {
            return tab.href ? (
              <a key={tab.label} href={tab.href} className="pb-3">
                {label}
              </a>
            ) : (
              <ComingSoon key={tab.label} label={label} className="pb-3" />
            );
          }

          return (
            <div
              key={tab.label}
              aria-current="page"
              className="flex w-full flex-col items-center border-b-2 border-[#F5C842] bg-[#F5C842]/5 py-3"
            >
              {label}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

// The identity rail and tab bar are identical across the landing page and
// About, so they live here rather than being kept in sync by hand. `badges` is
// a slot because only the landing page carries the animated status pills.
// `accent` tints everything in the rail that isn't fixed brand colour, so a
// hover out in the main column can pull the sidebar toward that page's hue.
// It rides a CSS variable rather than props on each leaf, so nothing between
// here and the pills has to know about it.
export default function PortfolioShell({ activeTab, badges = null, accent = ACCENT, children }) {
  // Below lg the tab bar is folded behind the hamburger, so the rail can give
  // its whole width to the name.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col bg-[#151515] text-white lg:flex-row"
      style={{ "--accent": accent }}
    >
      {menuOpen && <MobileMenu activeTab={activeTab} onClose={() => setMenuOpen(false)} />}

      {/* The status pills overhang the rail into the content column, so the rail
          has to paint above it — otherwise the tab row, which is positioned for
          its own marker, draws over them. */}
      <aside className="relative z-20 flex shrink-0 flex-col gap-1 border-b border-[#2a2a2a] bg-[#111111] p-6 sm:px-9 sm:py-8 lg:w-95 lg:border-b-0 lg:border-r lg:py-10">
        <div className="hidden lg:mb-7 lg:flex lg:w-fit lg:items-center lg:gap-5">
          <div className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-[20px] bg-[#ddd] sm:w-56 lg:h-70 lg:w-70">
            <div
              className="absolute left-1/2 top-1/2 h-[194%] w-[129%] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.photo})` }}
            />
          </div>
        </div>

        <div className="font-display text-4xl font-bold leading-10 text-white">{profile.name}</div>
        <div className="text-lg italic leading-6.5 text-[#F5C842] lg:not-italic lg:text-white">
          {profile.title}
        </div>

        {/* On mobile this row leads the rail and carries the menu trigger; on lg
            it drops back under the name and the tab bar takes over. */}
        <div className="order-first flex items-center justify-end gap-1.5 self-stretch pb-7 lg:order-none lg:w-fit lg:items-start lg:justify-start lg:self-auto">
          <CopyEmail email={profile.email} label="Copy email address">
            <span className={SOCIAL}>
              <EmailIcon />
            </span>
          </CopyEmail>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={SOCIAL}>
            <LinkedInIcon />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={`${SOCIAL} flex size-8 items-center justify-center lg:hidden`}
          >
            <MenuIcon />
          </button>
        </div>

        {/* The byline runs under the name at every width. The skill pills stay
            behind until lg, where the rail has room for them. */}
        <div className="mt-5 self-stretch text-lg leading-6.5 text-white lg:mt-0 lg:w-fit">
          {profile.tagline}
        </div>

        <div className="hidden lg:mt-2 lg:flex lg:w-fit lg:flex-col lg:items-start lg:gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-2 self-stretch">
            {skillTags.map((tag) => (
              <div
                key={tag}
                className="rounded-[20px] px-3.5 py-1 text-xs text-[#aaa] transition-colors duration-300"
                style={{ backgroundColor: "color-mix(in oklab, var(--accent) 13%, transparent)" }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">{badges}</div>
      </aside>

      {/* Cards and the tab rule both take their width from this column, running
          the full remaining width inside a matching gutter on either side. */}
      <main className="flex min-w-0 flex-1 flex-col px-4 pb-12 pt-4 sm:px-10 sm:py-8 lg:py-9">
        <nav className="mb-8 hidden gap-4 overflow-x-auto border-b border-[#2a2a2a] sm:gap-8 lg:flex">
          {tabs.map((tab) => {
            const active = tab.label === activeTab;
            const className =
              "block w-fit shrink-0 whitespace-nowrap px-4 pb-3 text-[15px] leading-4.5 " +
              // The marker is a bar rather than a border, because a border
              // cannot carry a radius on only its top two corners.
              (active
                ? "relative font-semibold text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-2xl after:bg-[var(--accent)] after:transition-colors after:content-['']"
                : "text-[#666] transition-colors hover:text-[#aaa]");

            // Tabs without a destination yet render as plain text rather than
            // links that go nowhere.
            return tab.href ? (
              <a key={tab.label} href={tab.href} className={className}>
                {tab.label}
              </a>
            ) : (
              <ComingSoon key={tab.label} label={tab.label} className={className} />
            );
          })}
        </nav>

        {children}
      </main>
    </div>
  );
}
