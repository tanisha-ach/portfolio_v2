import { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import SectionHeader from "./components/SectionHeader";
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

/* Type scale — seven sizes, each with one job:
   46 hero · 30 figures · 26 section heading · 17 card title · 15 body ·
   13 caption · 11 label. Nothing on the page sits outside this. */

const Heading = ({ children }) => (
  <h2 className="mb-3.5 font-display text-[26px] font-bold leading-[1.25] tracking-[-0.02em] text-ink">
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
      "font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] " +
      (accent ? "text-accent" : "text-ink")
    }
  >
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="font-display text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink">
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
      "grow basis-0 p-5 " +
      (highlight
        ? "border border-accent-line border-l-[3px] border-l-accent bg-accent-wash"
        : "border border-line bg-surface")
    }
  >
    {children}
  </div>
);

// One key feature: the description beside its screenshot, with a dashed callout
// cropping into that same screenshot and a matching numbered marker. The marker
// and callout are amber rather than IBM blue so the annotation layer separates
// from the product UI it sits on top of — that UI is itself blue.
function Feature({ feature }) {
  const { callout, badge } = feature;

  return (
    <div className="flex items-start gap-4 self-stretch">
      <div className="flex w-136.5 shrink-0 flex-col items-start gap-2 border border-line bg-surface p-5">
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

      <div className="relative flex h-103 w-135.5 shrink-0 items-center">
        <div
          className={feature.imageWidth ? "shrink-0 self-stretch" : "flex-1 self-stretch"}
          style={{
            width: feature.imageWidth,
            backgroundImage: `url(${feature.image})`,
            backgroundSize: "cover",
            backgroundPosition: feature.imagePosition,
          }}
        />
        <div
          className="absolute border border-dashed border-accent bg-no-repeat"
          style={{
            width: callout.width,
            height: callout.height,
            left: callout.left,
            top: callout.top,
            backgroundImage: `url(${callout.image})`,
            backgroundSize: callout.size,
            backgroundPosition: callout.position,
          }}
        />
        <div
          className="absolute flex size-7.5 items-center justify-center rounded-full bg-accent text-[15px] font-bold text-page"
          style={{ left: badge.left, top: badge.top }}
        >
          {feature.number}
        </div>
      </div>
    </div>
  );
}

// The section header pins at the top for the whole section while the feature
// cards stack up underneath it. The cards stick directly below the header, and
// the header's height changes with the viewport (its paragraph rewraps), so it
// is measured rather than hard-coded.
function FinalDesign() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="final-design" className="scroll-mt-8">
      <div ref={headerRef} className="sticky top-0 z-20 bg-page px-14 pt-11 pb-6">
        <SectionHeader kicker="Prototyping" />
        <Heading>{finalDesign.heading}</Heading>
        <Body>{finalDesign.body}</Body>
      </div>

      <div className="px-14">
        {/* The gap between cards is the dwell time before the next arrives. The
            opaque background is what covers the card beneath — not decoration,
            so it can't be dropped. */}
        <div className="flex w-276 flex-col gap-30">
          {features.map((feature) => (
            <div key={feature.number} className="sticky" style={{ top: headerHeight }}>
              <div className="bg-page pt-5">
                <Feature feature={feature} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <div className="flex min-h-screen bg-page text-ink">
      <Sidebar activeId={activeId} />

      <main className="flex-1">
        {/* Overview */}
        <header id="overview" className="scroll-mt-8 px-14 pt-9">
          <div className="mb-6 flex items-center gap-2">
            {hero.eyebrow.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span className="text-[11px] text-label">·</span>}
                <Label>{item}</Label>
              </span>
            ))}
          </div>
          <h1 className="mb-4 max-w-205 font-display text-[46px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
            {hero.title}
          </h1>
          <p className="max-w-195 text-[20px] leading-[1.6] text-copy">{hero.summary}</p>
        </header>

        <div className="mx-14 mt-9 flex h-75 items-center justify-center border border-line bg-surface">
          <div
            className="h-75.5 w-127 shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
        </div>

        {/* Meta */}
        <div className="mx-14 mt-7 flex border-y border-line">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={
                "grow basis-0 py-5 " +
                (i === 0 ? "" : "px-5 ") +
                (i < meta.length - 1 ? "border-r border-line" : "")
              }
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
        <section id="context" className="scroll-mt-8 px-14 pt-11">
          <div className="flex items-start gap-6">
            <div className="flex flex-1 flex-col">
              <SectionHeader kicker="Context" />
              <Body>{context.body}</Body>
              <div className="mt-6">
                <SectionHeader kicker="Challenge" />
              </div>
              <Body>{context.challenge}</Body>
            </div>
            <div className="flex-1 border border-line bg-surface p-6">
              <p className="font-display text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-ink">
                {context.hmw}
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Research" />
          <Heading>{research.heading}</Heading>
          <div className="flex items-start gap-6 pb-6">
            <div className="flex-1">
              <Body>{research.body}</Body>
            </div>
            <p className="flex-1 border-l-2 border-line pl-5 text-[15px] italic leading-[1.65] text-copy">
              {research.quote}
            </p>
          </div>
          <div className="flex gap-3">
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
        <section id="ideation" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Ideation directions" />
          <Heading>{ideation.heading}</Heading>
          <div className="mb-6">
            <Body>{ideation.body}</Body>
          </div>
          <div className="flex gap-4">
            {ideation.directions.map((d) => (
              <div key={d.label} className="grow basis-0">
                <div className="mb-4 flex h-70 flex-col items-center border border-line bg-surface">
                  <div className="px-5 py-4">
                    <Label>{d.label}</Label>
                  </div>
                  <div
                    className="h-57.5 w-75.75 shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${d.image})` }}
                  />
                </div>
                <Caption>{d.copy}</Caption>
              </div>
            ))}
          </div>
        </section>

        {/* Usability testing results */}
        <section id="results" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="User testing results" />
          <Heading>{results.heading}</Heading>
          <div className="mb-6">
            <Body>{results.body}</Body>
          </div>
          <div className="flex gap-3">
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
        <section id="impact" className="scroll-mt-8 px-14 pt-11">
          <div className="border border-accent-line border-l-[3px] border-l-accent bg-accent-wash p-8">
            <div className="mb-4">
              <Label accent>{impact.kicker}</Label>
            </div>
            <h2 className="mb-3.5 font-display text-[26px] font-bold leading-[1.25] tracking-[-0.02em] text-ink">
              {impact.heading}
            </h2>
            <p className="max-w-205 text-[15px] leading-[1.7] text-copy">{impact.body}</p>
          </div>
        </section>

        {/* Future of the design */}
        <section id="future" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Future of the design" />
          <div className="mb-6">
            <Body>{future.body}</Body>
          </div>
          <div className="flex items-stretch gap-3">
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
        <section id="learnings" className="scroll-mt-8 px-14 pt-11">
          <SectionHeader kicker="Learnings" />
          <div className="mb-6">
            <Body>{learnings.body}</Body>
          </div>
          <div className="flex items-stretch gap-3">
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
        <footer className="mt-16 border-t border-rule px-14 pt-16 pb-20">
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
          <div className="flex items-center justify-between border-t border-rule pt-6">
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
