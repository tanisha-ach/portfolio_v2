import useScrollSpy from "../hooks/useScrollSpy";
import SectionHeader from "../components/SectionHeader";
import TeamCluster from "../components/TeamCluster";
import CopyEmail from "../components/CopyEmail";
import CaseStudySidebar from "../components/CaseStudySidebar";
import { Heading, Body, Caption, CardTitle, Label, Figure, Card, Verdict, Marker } from "../components/prose";
import {
  nav,
  hero,
  meta,
  context,
  research,
  competitive,
  commitments,
  approach,
  prototyping,
  decisions,
  results,
} from "../data/aimly";

const SECTION_IDS = nav.map((n) => n.id);
const GUTTER = "px-5 sm:px-8 lg:px-14";
const INSET = "mx-5 sm:mx-8 lg:mx-14";

// A design option with its screenshot and the verdicts that decided it. The
// chosen one is named as chosen rather than left for the reader to infer.
function OptionColumn({ option }) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className={"text-[13px] font-bold " + (option.chosen ? "text-note" : "text-copy")}>
        {option.label}
      </div>
      <div className="flex items-center justify-center overflow-hidden border border-line bg-surface p-3">
        <img src={option.image} alt="" className="w-full" loading="lazy" />
      </div>
      <ul className="flex flex-col gap-3">
        {option.notes.map((note, i) => (
          <Verdict key={i} kind={note.kind}>
            {note.text}
          </Verdict>
        ))}
      </ul>
    </div>
  );
}

// The final screens carry numbered markers baked into the artwork, so the notes
// beside them are numbered to match rather than positioned over the image —
// that keeps them readable at any width.
function AnnotatedFinal({ shot }) {
  return (
    <div className="flex flex-col items-start gap-6 lg:flex-row">
      <div className="w-full shrink-0 overflow-hidden border border-line bg-surface p-3 lg:w-146.25">
        <img src={shot.image} alt="" className="w-full" loading="lazy" />
      </div>
      <ol className="flex flex-1 flex-col gap-2">
        {shot.notes.map((note) => (
          <li key={note.n} className="flex items-start gap-2">
            <Marker n={note.n} className="mt-1" />
            <span className="flex-1 text-[13px] leading-[1.6] text-copy">{note.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Aimly() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <div
      className="flex min-h-screen flex-col bg-page text-ink lg:flex-row"
      // Aimly's accent is orange where IBM's is cyan; overriding the variables
      // here re-points every `accent` utility on the page.
      style={{
        "--color-accent": "#ff9400",
        "--color-accent-wash": "#1c1a14",
        "--color-accent-line": "#3a3320",
      }}
    >
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
          <p className="max-w-195 text-[17px] leading-[1.6] text-copy lg:text-[20px]">{hero.summary}</p>
        </header>

        <div
          className={`mt-9 flex h-60 items-center justify-center border border-line bg-surface lg:h-75 ${INSET}`}
        >
          <Label>Hero image — cover art</Label>
        </div>

        {/* Meta */}
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

        {/* Context */}
        <section id="context" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Context" />
          <div className="flex flex-col gap-4">
            {context.map((paragraph, i) => (
              <Body key={i}>{paragraph}</Body>
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={research.kicker} />
          <Heading>{research.heading}</Heading>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-16">
            <div className="flex-1">
              <Body>{research.body}</Body>
            </div>
            <p className="flex-1 font-display text-[20px] leading-[1.45] font-bold tracking-[-0.02em] text-ink">
              {research.statement}
            </p>
          </div>

          {/* Competitive analysis */}
          <div className="pt-11">
            <SectionHeader kicker={competitive.kicker} />
            <div className="flex flex-col items-start gap-6 lg:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                <Heading>{competitive.heading}</Heading>
                {competitive.paragraphs.map((paragraph, i) => (
                  <Body key={i}>{paragraph}</Body>
                ))}
              </div>
              <img
                src={competitive.image}
                alt="Feature comparison of Aimly against five competing fundraising platforms"
                className="w-full shrink-0 border border-line lg:w-134.25"
                loading="lazy"
              />
            </div>
          </div>

          {/* What we chose to build */}
          <div className="pt-11">
            <SectionHeader kicker={commitments.kicker} />
            <Heading>{commitments.heading}</Heading>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {commitments.cards.map((c) => (
                <Card key={c.title}>
                  <div className="mb-2.5">
                    <CardTitle>{c.title}</CardTitle>
                  </div>
                  <Caption>{c.copy}</Caption>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={approach.kicker} />
          <div className="flex flex-col gap-3">
            {approach.steps.map((step) => (
              <div key={step.step} className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex flex-col items-start gap-1.5 lg:flex-1 lg:pr-8">
                  <Label>{step.step}</Label>
                  <CardTitle>{step.title}</CardTitle>
                </div>
                <div className="flex flex-1 items-center justify-center gap-2 border border-line bg-surface p-3">
                  {step.images.map((src) => (
                    <img key={src} src={src} alt="" className="min-w-0 flex-1" loading="lazy" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prototyping */}
        <section id="prototyping" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={prototyping.kicker} />
          <Heading>{prototyping.cardsHeading}</Heading>
          <div className="mb-6">
            <Body>{prototyping.cardsIntro}</Body>
          </div>
          <div className="grid grid-cols-1 gap-6 pb-9 md:grid-cols-2 lg:grid-cols-3">
            {prototyping.cardVersions.map((option) => (
              <OptionColumn key={option.label} option={option} />
            ))}
          </div>

          <Heading>{prototyping.shellsHeading}</Heading>
          <div className="grid grid-cols-1 gap-6 pb-9 lg:grid-cols-2">
            {prototyping.shells.map((option) => (
              <OptionColumn key={option.label} option={option} />
            ))}
          </div>

          <Heading>{prototyping.finalHeading}</Heading>
          <div className="flex flex-col gap-8">
            {prototyping.finalShots.map((shot) => (
              <AnnotatedFinal key={shot.image} shot={shot} />
            ))}
          </div>
        </section>

        {/* Key decisions */}
        <section id="decisions" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={decisions.kicker} />
          <Heading>{decisions.heading}</Heading>
          <div className="mb-6">
            <Body>{decisions.intro}</Body>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {decisions.cards.map((c) => (
              <Card key={c.title}>
                <div className="mb-2.5">
                  <CardTitle>{c.title}</CardTitle>
                </div>
                <Caption>{c.copy}</Caption>
              </Card>
            ))}
          </div>
        </section>

        {/* Results */}
        <section id="results" className={`scroll-mt-24 pt-11 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={results.kicker} />
          <Heading>{results.heading}</Heading>
          <div className="mb-6">
            <Body>{results.intro}</Body>
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
