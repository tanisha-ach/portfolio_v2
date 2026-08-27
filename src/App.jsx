import CaseStudySidebar from "./components/CaseStudySidebar";
import SectionHeader from "./components/SectionHeader";
import StickyStack from "./components/StickyStack";
import TeamCluster from "./components/TeamCluster";
import CopyEmail from "./components/CopyEmail";
import useScrollSpy from "./hooks/useScrollSpy";
import {
  nav,
  hero,
  meta,
  context,
  research,
  ideation,
  results,
  finalDesign,
  features,
  impact,
  future,
  learnings,
} from "./data/caseStudy";

const SECTION_IDS = nav.map((n) => n.id);

// One gutter value for the whole page so sections can't drift apart. GUTTER
// pads a section from the inside; INSET is the same step as a margin, for the
// two full-bleed blocks (hero image, meta grid) that own their own borders.
const GUTTER = "px-5 sm:px-8 lg:px-14";
const INSET = "mx-5 sm:mx-8 lg:mx-14";

/* Type scale — seven sizes, each with one job:
   46 hero · 30 figures · 26 section heading · 17 card title · 15 body ·
   13 caption · 11 label. Headline sizes step down on narrow screens; body,
   caption and label already sit at their readable floor and do not shrink. */

const Heading = ({ children }) => (
  <h2 className="mb-3.5 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-ink lg:text-[26px]">
    {children}
  </h2>
);

const Body = ({ children }) => (
  <p className="max-w-195 text-[15px] leading-[1.7] text-copy">{children}</p>
);

const Caption = ({ children }) => (
  <p className="text-[13px] leading-[1.6] text-copy">{children}</p>
);

const Figure = ({ children, accent = false }) => (
  <div
    className={
      "font-display text-[26px] leading-[1.1] font-extrabold tracking-[-0.03em] lg:text-[30px] " +
      (accent ? "text-accent" : "text-ink")
    }
  >
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="font-display text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] text-ink">
    {children}
  </h3>
);

const Label = ({ children, accent = false }) => (
  <div
    className={
      "text-[11px] font-semibold uppercase tracking-[0.1em] " +
      (accent ? "text-accent" : "text-label")
    }
  >
    {children}
  </div>
);

const Card = ({ children, highlight = false }) => (
  <div
    className={
      "p-5 " +
      (highlight
        ? "border border-accent-line border-l-[3px] border-l-accent bg-accent-wash"
        : "border border-line bg-surface")
    }
  >
    {children}
  </div>
);

// The callout crops and numbered markers were measured in px against a 542x412
// screenshot. Expressing them as percentages of that frame makes the whole
// annotation resolution-independent: the crop's own background-size and
// background-position are already percentages, so a callout that scales with
// the frame keeps showing exactly the same detail. No measuring, no JS.
const FRAME_W = 542;
const FRAME_H = 412;
const pctX = (px) => `${(px / FRAME_W) * 100}%`;
const pctY = (px) => `${(px / FRAME_H) * 100}%`;

function AnnotatedShot({ feature }) {
  const { callout, badge } = feature;

  return (
    <div className="relative flex aspect-[542/412] w-full shrink-0 items-center lg:w-135.5">
      <div
        className={feature.imageWidth ? "shrink-0 self-stretch" : "flex-1 self-stretch"}
        style={{
          width: feature.imageWidth ? pctX(feature.imageWidth) : undefined,
          backgroundImage: `url(${feature.image})`,
          backgroundSize: "cover",
          backgroundPosition: feature.imagePosition,
        }}
      />
      <div
        className="absolute border border-dashed border-accent bg-no-repeat"
        style={{
          width: pctX(callout.width),
          height: pctY(callout.height),
          left: pctX(callout.left),
          top: pctY(callout.top),
          backgroundImage: `url(${callout.image})`,
          backgroundSize: callout.size,
          backgroundPosition: callout.position,
        }}
      />
      <div
        className="absolute flex size-6 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-page lg:size-7.5 lg:text-[15px]"
        style={{ left: pctX(badge.left), top: pctY(badge.top) }}
      >
        {feature.number}
      </div>
    </div>
  );
}

function Feature({ feature }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex w-full shrink-0 flex-col items-start gap-2 border border-line bg-surface p-5 lg:w-136.5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-page">
            {feature.number}
          </div>
          <CardTitle>{feature.title}</CardTitle>
        </div>
        <div className="self-stretch pl-8.5">
          <Caption>{feature.body}</Caption>
        </div>
      </div>

      <AnnotatedShot feature={feature} />
    </div>
  );
}

function FinalDesign() {
  return (
    <section id="final-design" className="scroll-mt-24 lg:scroll-mt-8">
      <StickyStack
        gutter={GUTTER}
        header={
          <>
            <SectionHeader kicker="Prototyping" />
            <Heading>{finalDesign.heading}</Heading>
            <Body>{finalDesign.body}</Body>
          </>
        }
      >
        {features.map((feature) => (
          <Feature key={feature.number} feature={feature} />
        ))}
      </StickyStack>
    </section>
  );
}

export default function App() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <div className="flex min-h-screen flex-col bg-page text-ink lg:flex-row">
      <CaseStudySidebar nav={nav} activeId={activeId} />

      <main className="min-w-0 flex-1">
        {/* Overview */}
        <header id="overview" className={`scroll-mt-24 pt-9 lg:scroll-mt-8 ${GUTTER}`}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {hero.eyebrow.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-[11px] text-label">·</span>}
                <Label>{item}</Label>
              </span>
            ))}
          </div>
          <h1 className="mb-4 max-w-205 font-display text-[32px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink sm:text-[38px] lg:text-[46px] lg:leading-[1.08]">
            {hero.title}
          </h1>
          <p className="max-w-195 text-[17px] leading-[1.6] text-copy lg:text-[20px]">
            {hero.summary}
          </p>
        </header>

        <div className={`mt-9 flex items-center justify-center border border-line bg-surface p-4 lg:h-75 lg:p-0 ${INSET}`}>
          <div
            className="aspect-[508/302] w-full max-w-127 bg-contain bg-center bg-no-repeat lg:h-75.5 lg:bg-cover"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
        </div>

        {/* Meta — two columns on narrow screens, four when there is room. */}
        <div className={`mt-7 grid grid-cols-2 border-t border-line lg:grid-cols-4 ${INSET}`}>
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`border-b border-line p-5 ${i % 2 === 0 ? "border-r" : ""} ${i === meta.length - 1 ? "lg:border-r-0" : "lg:border-r"}`}
            >
              <div className="mb-2">
                <Label>{m.label}</Label>
              </div>
              {m.team ? (
                <TeamCluster {...m.team} />
              ) : (
                <div className="text-[15px] font-medium text-ink">{m.value}</div>
              )}
            </div>
          ))}
        </div>

        {/* Context & challenge */}
        <section id="context" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <div className="flex flex-col items-start gap-6 lg:flex-row">
            <div className="flex flex-1 flex-col">
              <SectionHeader kicker="Context" />
              <Body>{context.body}</Body>
              <div className="mt-6">
                <SectionHeader kicker="Challenge" />
              </div>
              <Body>{context.challenge}</Body>
            </div>
            {/* Narrow and fixed rather than half the row, so the question wraps
                into a block instead of a wide flat strip. min-h sets the squarer
                proportion as a floor — longer copy still grows the card rather
                than overflowing it. */}
            <div className="flex w-full shrink-0 flex-col justify-center self-start border border-line bg-surface p-8 lg:w-85 lg:min-h-60">
              <p className="font-display text-[18px] leading-[1.45] font-bold tracking-[-0.02em] text-ink lg:text-[20px]">
                {context.hmw}
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Research" />
          <Heading>{research.heading}</Heading>
          <div className="flex flex-col items-start gap-6 pb-6 lg:flex-row">
            <div className="flex-1">
              <Body>{research.body}</Body>
            </div>
            <p className="flex-1 border-l-2 border-line pl-5 text-[15px] leading-[1.65] italic text-copy">
              {research.quote}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {research.stats.map((s) => (
              <Card key={s.stat}>
                <div className="mb-2">
                  <Figure>{s.stat}</Figure>
                </div>
                <Caption>{s.copy}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* Ideation */}
        <section id="ideation" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Ideation directions" />
          <Heading>{ideation.heading}</Heading>
          <div className="mb-6">
            <Body>{ideation.body}</Body>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {ideation.directions.map((d) => (
              <div key={d.label}>
                <div className="mb-4 flex flex-col items-center border border-line bg-surface">
                  <div className="px-5 py-4">
                    <Label>{d.label}</Label>
                  </div>
                  <div
                    className="aspect-[303/230] w-full max-w-75.75 shrink-0 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${d.image})` }}
                  />
                </div>
                <Caption>{d.copy}</Caption>
              </div>
            ))}
          </div>
        </section>

        {/* Usability testing results */}
        <section id="results" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="User testing results" />
          <Heading>{results.heading}</Heading>
          <div className="mb-6">
            <Body>{results.body}</Body>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.stats.map((r) => (
              <Card key={r.kicker} highlight={r.highlight}>
                <div className="mb-2">
                  <Figure accent={r.highlight}>{r.stat}</Figure>
                </div>
                <div className="mb-2.5">
                  <Label accent={r.highlight}>{r.kicker}</Label>
                </div>
                <Caption>{r.copy}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* Final design — header pins while features stack beneath it */}
        <FinalDesign />

        {/* Business impact — same amber treatment as the headline testing
            result, so the two payoff moments of the case study read as a pair. */}
        <section id="impact" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <div className="border-2 border-accent-line border-l-[3px] border-l-accent bg-accent/8 p-5 sm:p-8">
            <div className="mb-4">
              <Label accent>{impact.kicker}</Label>
            </div>
            <h2 className="mb-3.5 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-ink lg:text-[26px]">
              {impact.heading}
            </h2>
            {/* Brighter than body copy elsewhere — it sits on the tinted wash. */}
            <p className="max-w-205 text-[15px] leading-[1.7] text-ink/85">{impact.body}</p>
          </div>
        </section>

        {/* Future of the design */}
        <section id="future" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Future of the design" />
          <div className="mb-6">
            <Body>{future.body}</Body>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {future.cards.map((c) => (
              <Card key={c.title}>
                <div className="mb-2.5">
                  <CardTitle>{c.title}</CardTitle>
                </div>
                <Caption>{c.copy}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* Learnings */}
        <section id="learnings" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Learnings" />
          <div className="mb-6">
            <Body>{learnings.body}</Body>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learnings.cards.map((c) => (
              <Card key={c.title}>
                <div className="mb-2.5">
                  <CardTitle>{c.title}</CardTitle>
                </div>
                <Caption>{c.copy}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* The page ends 80px after the last line. useScrollSpy's at-bottom check
            activates the final nav item, so no trailing runway is needed. */}
        <footer className={`mt-16 border-t border-rule pt-16 pb-20 ${GUTTER}`}>
          <div className="mb-4">
            <Label>End of case study</Label>
          </div>
          <Heading>Thanks for reading.</Heading>
          <div className="mb-8">
            <Body>
              I'm looking for my next role. Reach out to me{" "}
              <CopyEmail email="tanisha.acharya@utexas.edu" /> to talk about more projects!
            </Body>
          </div>
          <div className="flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[15px] font-semibold text-ink">Tanisha Acharya</div>
              <div className="mt-1 text-[13px] text-label">Senior Product Designer</div>
            </div>
            <a
              href="#overview"
              className="text-[11px] font-semibold uppercase tracking-[0.1em] text-label transition-colors hover:text-ink"
            >
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
