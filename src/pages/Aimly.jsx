import useScrollSpy from "../hooks/useScrollSpy";
import SectionHeader from "../components/SectionHeader";
import TeamCluster from "../components/TeamCluster";
import CopyEmail from "../components/CopyEmail";
import CaseStudySidebar from "../components/CaseStudySidebar";
import StickyStack from "../components/StickyStack";
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

// The markers live over the screenshot rather than in it, so they stay crisp at
// any width and keep their numbers tied to the notes beside them. Positions are
// percentages of the image, which is what lets them hold as it scales.
function AnnotatedFinal({ shot }) {
  return (
    <div className="flex flex-col items-start gap-6 lg:flex-row">
      <div className="w-full shrink-0 overflow-hidden border border-line bg-surface p-3 lg:w-146.25">
        <div className="relative">
          <img src={shot.image} alt="" className="w-full" loading="lazy" />
          {shot.markers?.map((m, i) => (
            <Marker
              key={`${m.n}-${i}`}
              n={m.n}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.left}%`, top: `${m.top}%` }}
            />
          ))}
        </div>
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
      // Aimly's accent is green where IBM's is cyan; overriding the variables
      // here re-points every `accent` utility on the page. The wash and line are
      // the same near-black steps as before, re-tinted to sit under the accent
      // rather than staying warm against it.
      style={{
        "--color-accent": "#38B440",
        "--color-accent-wash": "#141c16",
        "--color-accent-line": "#203a25",
        // `note` marks the chosen direction and the annotation markers. It is
        // orange page-wide; on this page it follows the accent so the labels
        // don't read as a second, unrelated highlight colour.
        "--color-note": "#38B440",
      }}
    >
      <CaseStudySidebar nav={nav} activeId={activeId} />

      <main className="min-w-0 flex-1">
        {/* Overview */}
        <header id="overview" className={`scroll-mt-24 pt-9 lg:scroll-mt-8 ${GUTTER}`}>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-12">
            {/* The copy stops around half the row, well short of the frame it
                shares the grid with — the two columns overlap by design, so the
                measure is what keeps them apart. */}
            <div className="min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:max-w-[34rem]">
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
            </div>

            {/* The frame is centred on the row's 75% line — the same line the
                Domain cell's left border falls on, so the two lock together. It
                spans the grid rather than sitting in the last column because a
                percentage margin resolves against the item's own area, and the
                row is the measure that matters here. Both children are pinned to
                row 1 so they overlap; the copy's measure is what keeps them
                apart. It tops out level with the eyebrow and runs well past the
                copy — at three-quarters of the viewport, tall enough to read as
                the phone it was shot on. With the height definite the frame can
                carry the source's own ratio
                and derive its width, so nothing is cropped or letterboxed. It
                loops, is silent and has no controls — art, not something to
                operate; `playsInline` keeps iOS from going fullscreen.
                The corner radius traces the phone in the recording rather than
                sitting outside it: measured off the source, the device's body
                straightens 80px in on a 532x1080 frame. Percentages so it holds
                as the frame scales — a fixed radius would drift at other
                viewport heights. No border or surface behind it either; with the
                shape matched there is nothing left for them to describe. */}
            <div
              style={{ borderRadius: "15% / 7.4%" }}
              className="aspect-[532/1080] h-[75vh] shrink-0 self-center overflow-hidden lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:ml-[75%] lg:-translate-x-1/2 lg:justify-self-start lg:self-start"
            >
              <video
                src="/aimly-dashboard-prototype.mp4"
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Screen recording of the Aimly fundraiser dashboard prototype"
              />
            </div>
          </div>
        </header>

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
        <section id="context" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker="Context" />
          <div className="flex flex-col gap-4">
            {context.map((paragraph, i) => (
              <Body key={i}>{paragraph}</Body>
            ))}
          </div>
        </section>

        {/* Research */}
        <section id="research" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
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
          <div className="pt-16">
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
          <div className="pt-16">
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
        <section id="approach" className="scroll-mt-24 lg:scroll-mt-8">
          <StickyStack gutter={GUTTER} header={<SectionHeader kicker={approach.kicker} />}>
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
          </StickyStack>
        </section>

        {/* Prototyping */}
        <section id="prototyping" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
          <SectionHeader kicker={prototyping.kicker} />
          <Heading>{prototyping.cardsHeading}</Heading>
          <div className="mb-6">
            <Body>{prototyping.cardsIntro}</Body>
          </div>
          <div className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
            {prototyping.cardVersions.map((option) => (
              <OptionColumn key={option.label} option={option} />
            ))}
          </div>

          <Heading>{prototyping.shellsHeading}</Heading>
          <div className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2">
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
        <section id="decisions" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
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
        <section id="results" className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}>
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
