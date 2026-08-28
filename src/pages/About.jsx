import PortfolioShell from "../components/PortfolioShell";
import StatusBadges from "../components/StatusBadges";
import { statement, body, stats, pills } from "../data/about";
import { profile } from "../data/home";

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
      fill="currentColor"
    />
    <circle cx="12" cy="9" r="2.5" fill="currentColor" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
    <path
      d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"
      fill="currentColor"
    />
  </svg>
);

const ICONS = { pin: PinIcon, briefcase: BriefcaseIcon };

// Each pill hangs off an edge of the portrait rather than sitting beside it, so
// the glow reads against both the photo and the page behind it.
function Pill({ icon, label, className }) {
  const Icon = ICONS[icon];
  return (
    <span
      className={
        "absolute flex w-max items-center gap-2.5 rounded-3xl border-[1.5px] border-[#F5C842] bg-[#141414]/85 px-4 py-2.5 text-[15px] leading-[18px] text-[#E4E4E4] " +
        className
      }
      style={{ boxShadow: "0 0 4px #F5C8428C, 0 10px 15px #00000066" }}
    >
      <Icon />
      {label}
    </span>
  );
}

export default function About() {
  return (
    <PortfolioShell activeTab="About" badges={<StatusBadges />}>
      <div className="flex flex-col items-start self-stretch">
        {/* The rail shows the portrait from lg up, so this is the narrow-screen
            home for it — and the only place the pills have edges to hang from. */}
        <div className="relative mb-11 mt-6 w-61.5 shrink-0 self-center lg:hidden">
          <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#ddd]">
            {/* The frame is a 246px window onto a much larger photo; the offsets
                are the ones the crop was set with, not a fit. */}
            <div
              className="absolute left-[calc(50%-16.5px)] top-[calc(50%+0.5px)] h-135.75 w-80.25 -translate-x-1/2 -translate-y-1/2 bg-cover"
              style={{ backgroundImage: `url(${profile.photo})`, backgroundPosition: "9.756%" }}
            />
          </div>
          {/* One pill hangs off the top-left corner, the other off the
              bottom-right, so the frame reads as pinned between them. */}
          <Pill {...pills[0]} className="-left-[19px] -top-[22px]" />
          <Pill {...pills[1]} className="-bottom-[22px] -right-[19px]" />
        </div>

        <h1 className="mb-7 max-w-205 font-black text-[30px] leading-[1.25] tracking-[-0.01em] text-white sm:text-[36px] lg:text-[44px] lg:leading-[1.18]">
          {statement}
        </h1>

        <p className="max-w-180 text-[16px] leading-[1.75] text-[#b5b5b5] lg:text-[17px] lg:leading-[1.7]">
          {body}
        </p>

        <div className="mt-10 flex flex-col gap-8 self-stretch pb-12 sm:flex-row sm:gap-14">
          {stats.map((stat, i) => (
            <div key={stat.figure} className="flex gap-8 sm:gap-14">
              {i > 0 && <div className="hidden w-px shrink-0 bg-[#2a2a2a] sm:block" />}
              <div className="flex flex-col gap-1">
                <div className="font-black text-[28px] leading-[1.15] text-white lg:text-[32px]">
                  {stat.figure}
                </div>
                <div className="whitespace-pre-line text-[13px] leading-[1.6] text-[#888]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortfolioShell>
  );
}
