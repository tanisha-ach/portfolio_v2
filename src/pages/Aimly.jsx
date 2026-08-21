import useScrollSpy from "../hooks/useScrollSpy";
import useActiveInView from "../hooks/useActiveInView";
import SectionHeader from "../components/SectionHeader";
import CopyEmail from "../components/CopyEmail";
import {
  nav,
  meta,
  contextParagraphs,
  researchStats,
  challengeRequirements,
  approachSteps,
  directions,
  features,
  results,
} from "../data/aimly";

const SECTION_IDS = nav.map((n) => n.id); // overview, context, research, challenge, prototyping, results, impact

// Faithful dashed-grid placeholder from the Paper design.
function Placeholder({ label, tall, compact, align = "center" }) {
  return (
    <div
      className={
        "relative overflow-hidden border border-[#222] bg-[#1a1a1a] " +
        (compact ? "h-36 " : tall ? "h-75 " : "h-70 ") +
        (align === "start" ? "flex items-start justify-start" : "flex items-center justify-center")
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "repeating-linear-gradient(135deg,#191919 0,#191919 1px,transparent 0,transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <span className="relative z-10 p-4.5 text-[10px] uppercase tracking-[0.05em] text-[#444]">
        {label}
      </span>
    </div>
  );
}

const Heading = ({ children, className = "" }) => (
  <h2 className={"mb-3.5 font-display text-2xl font-bold tracking-[-0.015em] text-white " + className}>
    {children}
  </h2>
);

const Body = ({ children }) => (
  <p className="max-w-195 text-[13px] leading-[1.7] text-[#888]">{children}</p>
);

// Avatar + "+N" badge for the Team meta cell. The full team makeup is a tooltip
// so the row stays scannable — hover, or tab to it for keyboard/touch.
function TeamCluster({ avatar, avatarAlt, others, breakdown }) {
  return (
    <div className="group relative inline-flex w-fit items-center" tabIndex={0}>
      <div
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-0 z-20 mb-2.5 whitespace-nowrap rounded-xl border border-[#2a2a2a] bg-black px-4 py-2.5 text-[13px] font-semibold text-white opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        {breakdown}
      </div>

      {/* The source is a full-length portrait, so `cover` alone leaves the face
          tiny — this zooms past cover and re-centers on the head. */}
      <div
        role="img"
        aria-label={avatarAlt}
        className="size-8 shrink-0 rounded-full bg-[#1a1a1a] ring-2 ring-[#111111]"
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundSize: "240%",
          backgroundPosition: "54% 48%",
        }}
      />
      <div className="-ml-2.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#4318c9] text-[11px] font-semibold text-white ring-2 ring-[#111111]">
        +{others}
      </div>
    </div>
  );
}

const Card = ({ kicker, children }) => (
  <div className="grow basis-0 border border-[#252525] bg-[#171717] px-5 py-4.5">
    <div className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#555]">
      {kicker}
    </div>
    <div className="text-[12px] leading-[1.6] text-[#999]">{children}</div>
  </div>
);

// Sidebar for this case study — a "Back" link in place of the identity block,
// and an amber accent for the active nav item rather than white.
function Sidebar({ activeId }) {
  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => n.id === activeId)
  );
  const progress = ((activeIndex + 1) / nav.length) * 100;

  return (
    <aside className="sticky top-0 flex h-screen w-55 shrink-0 flex-col border-r border-[#2a2a2a] bg-[#111111] py-7">
      <div className="border-b border-[#2a2a2a] px-6 pb-7">
        <a href="/" className="flex w-fit items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 640 640" width="16" className="shrink-0">
            <path
              d="M208.666-613.333l130.667 130.667q8 8 7.666 18.666T338.666-445.333q-8 7.333-18.667 7.667T301.333-445.333L125.333-621.333q-4-4-5.667-8.667t-1.667-10q0-5.333 1.667-10t5.667-8.666l176-176q7.333-7.333 18.333-7.334t19 7.334q8 8 8 19T338.666-796.666L208.666-666.666h298q11.333 0 19 7.666T533.333-640q0 11.333-7.667 19T506.666-613.333H208.666Z"
              fill="#FFFFFF"
            />
          </svg>
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-white">Back</span>
        </a>
      </div>

      <nav className="flex grow flex-col pt-6">
        <div className="mb-3.5 px-6 text-[9px] font-bold uppercase tracking-[0.12em] text-[#555]">
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
                    "flex items-center border-l-2 px-6 py-2.25 text-[11px] transition-colors duration-200 " +
                    (active
                      ? "border-[#f5c842] bg-[#f5c842]/5 font-semibold text-[#f5c842]"
                      : "border-transparent font-medium text-[#555] hover:text-[#888]")
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto px-6">
          <div className="h-0.5 w-full overflow-hidden rounded-[1px] bg-[#222]">
            <div
              className="h-full rounded-[1px] bg-white transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-[9px] tracking-[0.04em] text-[#444]">
            {activeIndex + 1} of {nav.length} sections
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default function Aimly() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [setApproachRef, activeApproach] = useActiveInView(approachSteps.length);

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      <Sidebar activeId={activeId} />

      <main className="flex-1">
        {/* Hero / Overview */}
        <header id="overview" className="scroll-mt-8 px-14 pt-9">
          <div className="mb-5.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#555]">
            <span>Aimly</span>
            <span className="text-[#333]">·</span>
            <span>Senior Product Designer</span>
            <span className="text-[#333]">·</span>
            <span>2026</span>
          </div>
          <h1 className="mb-7 max-w-205 font-display text-[46px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
            From blank canvas to a fully functional dashboard for Aimly
          </h1>
          <Body>
            How I designed a flexible, scalable dashboard from 0 to 1, that let users finally have
            control over their fundraisers, leading to a 90% reduction in customer complaints.
          </Body>
        </header>

        <div className="mx-14">
          <Placeholder label="Hero image — cover art" tall />
        </div>

        {/* Meta */}
        <div className="mx-14 mt-7 flex border-y border-[#222]">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={
                "grow basis-0 py-4.5 " +
                (i === 0 ? "" : "px-5 ") +
                (i < meta.length - 1 ? "border-r border-[#222]" : "")
              }
            >
              <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#555]">
                {m.label}
              </div>
              {m.team ? (
                <TeamCluster {...m.team} />
              ) : (
                <div className="text-[13px] font-medium text-[#ccc]">{m.value}</div>
              )}
            </div>
          ))}
        </div>

        {/* Context */}
        <section id="context" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Context" />
          {contextParagraphs.map((p, i) => (
            <div key={i} className={i < contextParagraphs.length - 1 ? "mb-4" : ""}>
              <Body>{p}</Body>
            </div>
          ))}
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="01 · Research" />
          <Heading>What you discovered</Heading>
          <div className="mb-6">
            <Body>
              Given that we did not have the budget or resources to talk to customers, I did the next
              best thing. I conducted stakeholder interviews with I spoke with two of the founders,
              the head of customer management and the VP of relationship success. They helped me
              surface issues that they were hearing from cutomers. I was also able to look at the
              google analytics data which further helped me prioritize features on the roadmap.
            </Body>
          </div>
          <div className="flex gap-3">
            {researchStats.map((s, i) => (
              <div key={i} className="grow basis-0 border border-[#252525] bg-[#171717] px-5 py-4.5">
                <div className="mb-1 text-[28px] font-extrabold tracking-[-0.03em] text-white">
                  {s.stat}
                </div>
                <div className="text-[11px] leading-[1.5] text-[#666]">{s.copy}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge */}
        <section id="challenge" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="02 · Challenge" />
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <Heading>
                Users on Aimly could only create their a campaign and share it. All of the management
                and editing of campaigns happened through calls to customer care which was a very
                PAINFUL process.
              </Heading>
            </div>
            <div className="flex w-136.75 shrink-0 flex-col items-start gap-4">
              <p className="text-[14px] leading-[1.7] text-[#888]">
                As senior product designer, I advocated that we as a team prioritize the creation of a
                dashboard that allowed users to edit and manage their campaigns.
              </p>
              <div className="flex w-full flex-col items-start gap-2">
                {challengeRequirements.map((r) => (
                  <div
                    key={r.kicker}
                    className="flex w-full flex-col items-start rounded-lg p-3 outline outline-1 outline-[#aaa]"
                  >
                    <div className="text-[16px] font-bold leading-[1.7] text-[#888]">{r.kicker}</div>
                    <div className="text-[12px] leading-[1.7] text-[#888]">{r.copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="px-14 pt-11">
          <SectionHeader kicker="03 · Approach" />
          <div className="flex flex-col gap-3">
            {approachSteps.map((step, i) => (
              <div key={step.title} className="flex items-stretch gap-4">
                <div className="flex grow basis-0 flex-col justify-center pr-8">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#555]">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Weight is the only emphasis — the step whose image sits at the
                      center of the viewport reads bold, the others stay regular. */}
                  <div
                    className={
                      "text-[15px] leading-[1.4] text-white " +
                      (activeApproach === i ? "font-bold" : "font-normal")
                    }
                  >
                    {step.title}
                  </div>
                </div>
                <div className="grow basis-0" ref={setApproachRef(i)}>
                  <Placeholder label={step.image} compact />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explorations / A-B directions */}
        <section className="px-14 pt-11">
          <Heading>Explorations or A / B directions</Heading>
          <div className="mb-6">
            <Body>[ Show the options you weighed and what differed. ]</Body>
          </div>
          <div className="flex gap-4">
            {directions.map((d) => (
              <div key={d.label} className="grow basis-0">
                <div className="mb-3.5">
                  <Placeholder label={d.label} align="start" />
                </div>
                <p className="text-[12px] leading-[1.65] text-[#888]">{d.copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prototyping */}
        <section id="prototyping" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="04 · Prototyping" />
          <Heading>Key features & decisions</Heading>
          <div className="mb-6">
            <Body>[ The handful of design decisions that mattered most. ]</Body>
          </div>
          <div className="flex gap-3">
            {features.map((f) => (
              <Card key={f.kicker} kicker={f.kicker}>
                {f.copy}
              </Card>
            ))}
          </div>
        </section>

        {/* Results */}
        <section id="results" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="05 · Results" />
          <Heading>The outcome, quantified</Heading>
          <div className="mb-6">
            <Body>[ How you measured success and what the numbers showed. ]</Body>
          </div>
          <div className="flex gap-3">
            {results.map((r, i) => (
              <div
                key={i}
                className={
                  "grow basis-0 px-5.5 py-5 " +
                  (r.highlight
                    ? "border border-[#3a3320] border-l-[3px] border-l-[#d4a437] bg-[#1c1a14]"
                    : "border border-[#252525] bg-[#171717]")
                }
              >
                <div
                  className={
                    "mb-1.5 text-3xl font-extrabold tracking-[-0.03em] text-white " +
                    (r.stat.startsWith("↑") ? "font-display" : "")
                  }
                >
                  {r.stat}
                </div>
                <div
                  className={
                    "mb-2 text-[9px] font-bold uppercase tracking-[0.08em] " +
                    (r.highlight ? "text-[#d4a437]" : "text-[#666]")
                  }
                >
                  {r.kicker}
                </div>
                <div className="text-[11px] leading-[1.55] text-[#999]">{r.copy}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="scroll-mt-8 px-14 pt-11">
          <div className="border border-[#252525] bg-[#171717] px-8 py-7">
            <div className="mb-3.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#555]">
              06 · Impact
            </div>
            <h2 className="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] text-white">
              The business outcome
            </h2>
            <p className="max-w-205 text-[13px] leading-[1.7] text-[#999]">
              [ What shipped, how adoption moved, and the measurable business impact. Close with the
              one number you're proudest of. ]
            </p>
          </div>
        </section>

        {/* Footer — also provides trailing scroll room so the final sections
            can reach the scroll-spy activation line. */}
        <footer className="mt-16 border-t border-[#1c1c1c] px-14 pt-16 pb-[40vh]">
          <div className="mb-4 text-[9px] font-bold uppercase tracking-[0.12em] text-[#555]">
            End of case study
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold tracking-[-0.015em] text-white">
            Thanks for reading.
          </h2>
          <p className="mb-8 max-w-195 text-[13px] leading-[1.7] text-[#888]">
            I'm looking for my next role. Reach out to me{" "}
            <CopyEmail email="tanisha.acharya@utexas.edu" /> to talk about more projects!
          </p>
          <div className="flex items-center justify-between border-t border-[#1c1c1c] pt-6">
            <div>
              <div className="text-[13px] font-semibold text-white">Tanisha Acharya</div>
              <div className="text-[11px] text-[#555]">Senior Product Designer</div>
            </div>
            <a
              href="#overview"
              className="text-[11px] uppercase tracking-[0.08em] text-[#888] transition-colors hover:text-white"
            >
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
