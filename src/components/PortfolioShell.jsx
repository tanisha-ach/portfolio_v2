import { skillTags, tabs, profile } from "../data/home";

function EmailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path
        d="M26.889 5L5.111 5C3.393 5 2 6.407 2 8.142L2 23.858C2 25.593 3.393 27 5.111 27L26.889 27C28.607 27 30 25.593 30 23.858L30 8.142C30 6.407 28.607 5 26.889 5Z"
        fill="#FFFFFF"
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
        fill="#FFFFFF"
      />
    </svg>
  );
}

// The identity rail and tab bar are identical across the landing page and
// About, so they live here rather than being kept in sync by hand. `badges` is
// a slot because only the landing page carries the animated status pills.
export default function PortfolioShell({ activeTab, badges = null, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#151515] text-white lg:flex-row">
      <aside className="relative flex shrink-0 flex-col gap-1 border-b border-[#2a2a2a] bg-[#111111] px-6 py-8 sm:px-9 lg:w-95 lg:border-b-0 lg:border-r lg:py-10">
        <div className="mb-7 flex w-fit items-center gap-5">
          <div className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-[20px] bg-[#ddd] sm:w-56 lg:h-70 lg:w-70">
            <div
              className="absolute left-1/2 top-1/2 h-[194%] w-[129%] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.photo})` }}
            />
          </div>
        </div>

        <div className="font-display text-3xl font-bold leading-tight text-white lg:text-4xl lg:leading-10">
          {profile.name}
        </div>
        <div className="text-lg leading-6.5 text-white">{profile.title}</div>

        <div className="flex w-fit items-start gap-1.5 pb-7">
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <EmailIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>

        <div className="flex w-fit flex-col items-start gap-3">
          <div className="self-stretch text-lg leading-6.5 text-white">{profile.tagline}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 self-stretch">
            {skillTags.map((tag) => (
              <div key={tag} className="rounded-[20px] border border-[#333] px-3.5 py-1 text-xs text-[#aaa]">
                {tag}
              </div>
            ))}
          </div>
        </div>

        {badges}
      </aside>

      <main className="flex min-w-0 flex-1 flex-col px-6 py-8 sm:px-10 lg:py-9">
        <nav className="mb-8 flex gap-4 overflow-x-auto border-b border-[#2a2a2a] sm:gap-8">
          {tabs.map((tab) => {
            const active = tab.label === activeTab;
            const className =
              "block w-fit shrink-0 whitespace-nowrap px-4 pb-3 text-[15px] leading-4.5 " +
              (active
                ? "border-b-2 border-[#f5c842] font-semibold text-white"
                : "text-[#666] transition-colors hover:text-[#aaa]");

            // Tabs without a destination yet render as plain text rather than
            // links that go nowhere.
            return tab.href ? (
              <a key={tab.label} href={tab.href} className={className}>
                {tab.label}
              </a>
            ) : (
              <span key={tab.label} className={className} aria-disabled="true">
                {tab.label}
              </span>
            );
          })}
        </nav>

        {children}
      </main>
    </div>
  );
}
