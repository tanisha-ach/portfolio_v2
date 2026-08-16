import Sidebar from "./components/Sidebar";
import SectionHeader from "./components/SectionHeader";
import useScrollSpy from "./hooks/useScrollSpy";
import {
  nav,
  meta,
  researchStats,
  approach,
  features,
  directions,
  results,
} from "./data/caseStudy";

const SECTION_IDS = nav.map((n) => n.id); // overview, challenge, research, prototyping, results, impact

// Faithful dashed-grid placeholder from the Paper design.
function Placeholder({ label, tall, align = "center" }) {
  return (
    <div
      className={
        "relative overflow-hidden border border-[#222] bg-[#1a1a1a] " +
        (tall ? "h-75 " : "h-70 ") +
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

const Heading = ({ children }) => (
  <h2 className="mb-3.5 font-display text-2xl font-bold tracking-[-0.015em] text-white">
    {children}
  </h2>
);

const Body = ({ children }) => (
  <p className="max-w-195 text-[13px] leading-[1.7] text-[#888]">{children}</p>
);

const Card = ({ kicker, children }) => (
  <div className="grow basis-0 border border-[#252525] bg-[#171717] px-5 py-4.5">
    <div className="mb-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#555]">
      {kicker}
    </div>
    <div className="text-[12px] leading-[1.6] text-[#999]">{children}</div>
  </div>
);

export default function App() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      <Sidebar activeId={activeId} />

      <main className="flex-1">
        {/* Hero */}
        <header className="px-14 pt-9">
          <div className="mb-5.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#555]">
            <span>IBM Power Systems</span>
            <span className="text-[#333]">·</span>
            <span>UX Design</span>
            <span className="text-[#333]">·</span>
            <span>Research</span>
          </div>
          <h1 className="mb-7 max-w-205 font-display text-[46px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
            Helping 120k companies around the world avoid a loss of $1M+
          </h1>
        </header>

        <div className="mx-14">
          <Placeholder label="Hero — IBM HMC console" tall />
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
              <div className="text-[13px] font-medium text-[#ccc]">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <section id="overview" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Overview" />
          <Heading>Redesigning the HMC upgrade experience</Heading>
          <Body>
            The HMC (Hardware Management Console) upgrade process existed only in the command line —
            requiring technical expertise, manual compatibility checks, and multiple steps with no
            progress visibility. As primary UX designer, I created the research plan, led stakeholder
            and user interviews, built experience maps, prototyped two design directions, and ran
            concept testing and usability testing with 12 participants. Shipped in the Autumn 2023
            Power10 release.
          </Body>
        </section>

        {/* Challenge */}
        <section id="challenge" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="01 · Challenge" />
          <Heading>A critical process stuck in the command line</Heading>
          <Body>
            IBM Power HMC helps companies bridge the gap between physical servers and virtual cloud,
            helping them innovate and modernise their applications. Upgrades to the HMC software were
            released regularly — but the entire upgrade process could only be performed by typing
            commands into a terminal. This meant system administrators had to manually research
            compatibility, download files to a separate server, and execute multi-step commands —
            with no progress visibility and no error guidance. A time-consuming, error-prone process
            in a high-stakes environment.{" "}
            <span className="text-[#ccc]">
              HMW: How might we bring the upgrade process to the GUI so that users can easily bring
              their systems to the latest level — saving time and money?
            </span>
          </Body>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="02 · Research" />
          <Heading>Discovery with stakeholders — what we found</Heading>
          <div className="mb-6">
            <Body>
              We ran collaborative design workshops with IBM stakeholders and real HMC users to
              surface pain points and map the process end-to-end. User quote: “I would love to have
              the system run pre-requisite checks and let me know which level is the best for me
              based on my machine type.”
            </Body>
          </div>
          <div className="flex gap-3">
            {researchStats.map((s) => (
              <div
                key={s.stat}
                className="grow basis-0 border border-[#252525] bg-[#171717] px-5 py-4.5"
              >
                <div className="mb-1 text-[28px] font-extrabold tracking-[-0.03em] text-white">
                  {s.stat}
                </div>
                <div className="text-[11px] leading-[1.5] text-[#666]">{s.copy}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="px-14 pt-11">
          <SectionHeader kicker="03 · Approach" />
          <Heading>IBM Design Thinking Loop</Heading>
          <div className="mb-6">
            <Body>
              We used IBM's Enterprise Design Thinking framework — a continuous loop of observing
              users, reflecting on insights, and making solutions — to ensure every design decision
              was grounded in real user needs.
            </Body>
          </div>
          <div className="flex gap-3">
            {approach.map((a) => (
              <Card key={a.kicker} kicker={a.kicker}>
                {a.copy}
              </Card>
            ))}
          </div>
        </section>

        {/* Prototyping */}
        <section id="prototyping" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="04 · Prototyping" />
          <Heading>Key features for the final upgrade flow</Heading>
          <div className="mb-6">
            <Body>
              Drawing from initial findings, we identified and prioritized features that directly
              addressed core pain points. Two distinct interaction patterns were built to test how
              users respond to different approaches.
            </Body>
          </div>
          <div className="flex gap-3">
            {features.map((f) => (
              <Card key={f.kicker} kicker={f.kicker}>
                {f.copy}
              </Card>
            ))}
          </div>
        </section>

        {/* Two directions */}
        <section className="px-14 pt-11">
          <Heading>Two design directions — A &amp; B</Heading>
          <div className="mb-6">
            <Body>
              Two distinct interaction patterns were built to test how users respond to different
              approaches. Both shared the same content — only the interaction model differed.
            </Body>
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

        {/* Results */}
        <section id="results" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="05 · Testing Results" />
          <Heading>Screen B wins — 9 out of 12 participants preferred it</Heading>
          <div className="mb-6">
            <Body>
              12 participants completed moderated usability sessions testing both designs
              back-to-back. Participants rated clarity, confidence, and perceived effort. The
              tearsheet gave operators room to work through each step without feeling visually
              constrained.
            </Body>
          </div>
          <div className="flex gap-3">
            {results.map((r) => (
              <div
                key={r.stat}
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
                    (r.stat.startsWith("↓") ? "font-display" : "")
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
              06 · Business Impact
            </div>
            <h2 className="mb-3 font-display text-[22px] font-bold tracking-[-0.015em] text-white">
              Shipped in the Autumn 2023 Power10 release
            </h2>
            <p className="max-w-205 text-[13px] leading-[1.7] text-[#999]">
              The design was approved by IBM's PM, development and testing teams. Upgrades through
              the UI directly increase adoption of the latest software versions — meaning more
              frequent security patching for virtual servers, protecting companies from malicious
              attacks. Increased adoption also means faster access to new features. Led to a 30%
              increase in NPS across IBM Power enterprise clients.
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
            Want the full walkthrough — including the interactive prototypes and research artifacts?
            Happy to share the deep dive.
          </p>
          <div className="flex items-center justify-between border-t border-[#1c1c1c] pt-6">
            <div>
              <div className="text-[13px] font-semibold text-white">Tanisha Acharya</div>
              <div className="text-[11px] text-[#555]">
                Primary UX Designer · IBM Power Systems
              </div>
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
