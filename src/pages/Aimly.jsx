import { Fragment, useEffect, useRef, useState } from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import SectionHeader from "../components/SectionHeader";
import TeamCluster from "../components/TeamCluster";
import CopyEmail from "../components/CopyEmail";
import CaseStudySidebar from "../components/CaseStudySidebar";
import StickyStack from "../components/StickyStack";
import BeforeAfter from "../components/BeforeAfter";
import { GalleryProvider, GalleryTrigger } from "../components/Lightbox";
import {
  Heading,
  Body,
  Caption,
  CardTitle,
  Label,
  Figure,
  Card,
  Verdict,
  Marker,
} from "../components/prose";
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

// Every still on the page, in reading order, so the viewer can walk the case
// study rather than the single picture that was clicked. Full-size sources
// only — the phone crops are a layout convenience, not a separate image.
const GALLERY = [
  {
    src: competitive.image,
    caption: `${competitive.heading} — feature comparison`,
  },
  ...approach.steps.flatMap((step) => [
    ...(step.images ?? []).map((src) => ({ src, caption: step.title })),
    ...(step.compare
      ? [
          { src: step.compare.before, caption: `${step.title} — before` },
          { src: step.compare.after, caption: `${step.title} — after` },
        ]
      : []),
  ]),
  ...prototyping.cardVersions
    .filter((option) => option.image)
    .map((option) => ({
      src: option.image,
      caption: `Event card — ${option.label}`,
    })),
  ...prototyping.shells.map((option) => ({
    src: option.image,
    caption: `Dashboard shell — ${option.label}`,
  })),
  ...prototyping.finalShots.map((shot, i) => ({
    src: shot.image,
    caption:
      i === 0
        ? "Final dashboard — desktop and mobile"
        : "Final dashboard — mobile screens",
  })),
];
const GUTTER = "px-5 sm:px-8 lg:px-14";
const INSET = "mx-5 sm:mx-8 lg:mx-14";

// A design option with its screenshot and the verdicts that decided it. The
// chosen one is named as chosen rather than left for the reader to infer.
function OptionColumn({ option }) {
  return (
    <div className="flex flex-col gap-3.5 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
      <div
        className={
          "text-[13px] font-bold " + (option.chosen ? "text-note" : "text-copy")
        }
      >
        {option.label}
      </div>
      {/* The versions are not the same height, so the shots hang from a shared
          baseline rather than each starting at the top of its own column —
          subgrid takes the row's height from the tallest of them, and the notes
          below start level as a result. */}
      <div
        className={option.frame ? "flex items-center" : "flex items-end"}
        style={{ backgroundColor: option.frame }}
      >
        {option.video ? (
          <LoopingVideo
            src={option.video}
            label={option.videoLabel}
            controlLabel={`the ${option.label.split(" — ")[0]} recording`}
            className="w-full rounded-lg"
            style={{ aspectRatio: option.videoRatio }}
          />
        ) : (
          /* The shells are Paper artboards: the mockups sit on a grey field that
             carries all the way to the edge of the frame. That field is dead
             weight on a phone, so a crop to the screens themselves is served
             there instead. */
          <GalleryTrigger src={option.image} className="w-full">
            <picture className="block w-full">
              {option.imageMobile && (
                <source
                  media="(max-width: 767px)"
                  srcSet={option.imageMobile}
                />
              )}
              <img
                src={option.image}
                alt=""
                className="w-full"
                loading="lazy"
              />
            </picture>
          </GalleryTrigger>
        )}
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
      <div className="w-full shrink-0 lg:w-146.25">
        <div className="relative" style={{ backgroundColor: shot.frame }}>
          <GalleryTrigger src={shot.image} className="w-full">
            <picture className="block w-full">
              {shot.imageMobile && (
                <source media="(max-width: 767px)" srcSet={shot.imageMobile} />
              )}
              <img src={shot.image} alt="" className="w-full" loading="lazy" />
            </picture>
          </GalleryTrigger>
          {/* Each marker is pinned twice: once against the full artboard, once
              against the tighter crop a phone gets. Same point on the screen,
              different denominator. */}
          {shot.markers?.map((m, i) => (
            <Fragment key={`${m.n}-${i}`}>
              <Marker
                n={m.n}
                className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:flex"
                style={{ left: `${m.left}%`, top: `${m.top}%` }}
              />
              <Marker
                n={m.n}
                className="absolute -translate-x-1/2 -translate-y-1/2 md:hidden"
                style={{
                  left: `${m.mobileLeft ?? m.left}%`,
                  top: `${m.mobileTop ?? m.top}%`,
                }}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <ol className="flex flex-1 flex-col gap-2">
        {shot.notes.map((note) => (
          <li key={note.n} className="flex items-start gap-2">
            <Marker n={note.n} className="mt-1" />
            <span className="flex-1 text-[13px] leading-[1.6] text-copy">
              {note.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// The prototype recording, and the one control it needs. It plays on its own —
// it is cover art, not a player — but a looping video with no way to stop it is
// a trap for anyone who finds the motion distracting, so a single toggle sits in
// the corner. `playsInline` keeps iOS from going fullscreen.
//
// The frame is centred on the row's 75% line, the same line the Domain cell's
// left border falls on. It spans the grid rather than sitting in the last column
// because a percentage margin resolves against the item's own area, and the row
// is the measure that matters here. The corner radius traces the phone in the
// recording: measured off the source, the device's body straightens 80px in on a
// 532x1080 frame, in percentages so it holds as the frame scales.
function LoopingVideo({ src, label, controlLabel, className, style }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  // Hover is what hides and shows the control on a pointer device. A touch
  // screen has none, so there the recording itself is the switch and the state
  // has to drive opacity directly.
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const sync = () => setTouch(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // While the recording plays, the control has done its job once it has been
  // seen, so it steps back off the artwork. A paused recording keeps it — that
  // is the only way back to playing.
  useEffect(() => {
    if (!touch || !revealed || !playing) return;
    const timer = setTimeout(() => setRevealed(false), 3000);
    return () => clearTimeout(timer);
  }, [touch, revealed, playing]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div
      style={style}
      className={`group relative overflow-hidden ${className}`}
      onClick={() => setRevealed((open) => !open)}
    >
      {/* The button mirrors the video rather than the other way round, so it
          stays honest if playback stops for a reason we did not ask for. It is
          hidden until the pointer is over the recording, so the control does not
          sit on the artwork permanently. Touch has no hover, so a tap on the
          recording brings it out and another puts it away; keyboard focus
          reveals it either way. */}
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={label}
      />

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
        aria-label={playing ? `Pause ${controlLabel}` : `Play ${controlLabel}`}
        className={
          "absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-black/75 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
          (touch
            ? revealed
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0 group-hover:opacity-100")
        }
      >
        {playing ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}

function PrototypeVideo() {
  return (
    <LoopingVideo
      src="/aimly-dashboard-prototype.mp4"
      label="Screen recording of the Aimly fundraiser dashboard prototype"
      controlLabel="the prototype recording"
      style={{ borderRadius: "15% / 7.4%" }}
      className="aspect-[532/1080] h-[75vh] shrink-0 self-center lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:ml-[75%] lg:-translate-x-1/2 lg:justify-self-start lg:self-start"
    />
  );
}

export default function Aimly() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <GalleryProvider items={GALLERY}>
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
          <header
            id="overview"
            className={`scroll-mt-24 pt-9 lg:scroll-mt-8 ${GUTTER}`}
          >
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-12">
              {/* The copy and the frame share one grid cell, so the measure is the
                only thing keeping them apart. It is derived rather than fixed:
                the frame is centred on the row's 75% line and its width tracks
                75vh through the recording's ratio, so the copy may run to that
                line less half the frame less the 24px gap. A fixed cap held only
                at the width it was chosen at — narrow the window and the frame
                slid over the text. The 50% ceiling is the other half of it: the
                meta row below splits into four equal cells, so half the row is
                its middle rule, and the copy stops there however much space the
                frame leaves. `max()` keeps the whole thing sane if the frame ever
                grows past the line. */}
              <div className="min-w-0 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:max-w-[min(50%,max(0px,calc(75%-18.472vh-24px)))]">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {hero.eyebrow.map((item, i) => (
                    <span key={item} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-[11px] text-label">·</span>
                      )}
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

              <PrototypeVideo />
            </div>
          </header>

          {/* Meta */}
          <div
            className={`mt-7 grid grid-cols-2 border-t border-line lg:grid-cols-4 ${INSET}`}
          >
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
                  <div className="text-[15px] font-medium text-ink">
                    {m.value}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Context */}
          <section
            id="context"
            className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}
          >
            <SectionHeader kicker="Context" />
            <div className="flex flex-col gap-4">
              {context.map((paragraph, i) => (
                <Body key={i}>{paragraph}</Body>
              ))}
            </div>
          </section>

          {/* Research */}
          <section
            id="research"
            className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}
          >
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
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-16">
                <div className="flex w-full flex-col gap-4 lg:flex-1">
                  <Heading>{competitive.heading}</Heading>
                  {competitive.paragraphs.map((paragraph, i) => (
                    <Body key={i}>{paragraph}</Body>
                  ))}
                </div>
                <div className="flex w-full justify-center lg:flex-1">
                  <GalleryTrigger
                    src={competitive.image}
                    className="w-full shrink lg:w-134.25 lg:max-w-full"
                  >
                    <img
                      src={competitive.image}
                      alt="Feature comparison of Aimly against five competing fundraising platforms"
                      className="w-full border border-line"
                      loading="lazy"
                    />
                  </GalleryTrigger>
                </div>
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
            <StickyStack
              gutter={GUTTER}
              header={<SectionHeader kicker={approach.kicker} />}
            >
              {approach.steps.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col gap-4 lg:flex-row lg:items-start"
                >
                  <div className="flex flex-col items-start gap-1.5 lg:flex-1 lg:pr-8">
                    <Label>{step.step}</Label>
                    <CardTitle>{step.title}</CardTitle>
                    <Caption>{step.copy}</Caption>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-2">
                    {step.compare ? (
                      <BeforeAfter {...step.compare} />
                    ) : step.doc ? (
                      <iframe
                        src={step.doc.src}
                        title={step.doc.title}
                        loading="lazy"
                        className="h-100 w-full border border-line bg-white lg:h-131"
                      />
                    ) : (
                      step.images.map((src) => (
                        <GalleryTrigger
                          key={src}
                          src={src}
                          className="w-full min-w-0 flex-1"
                        >
                          <img
                            src={src}
                            alt=""
                            className="w-full"
                            loading="lazy"
                          />
                        </GalleryTrigger>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </StickyStack>
          </section>

          {/* Prototyping */}
          <section
            id="prototyping"
            className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}
          >
            <SectionHeader kicker={prototyping.kicker} />
            <Heading>{prototyping.cardsHeading}</Heading>
            <div className="mb-6">
              <Body>{prototyping.cardsIntro}</Body>
            </div>
            <div className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-y-3.5">
              {prototyping.cardVersions.map((option) => (
                <OptionColumn key={option.label} option={option} />
              ))}
            </div>

            <Heading>{prototyping.shellsHeading}</Heading>
            <div className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] lg:gap-y-3.5">
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
          <section
            id="decisions"
            className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}
          >
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
          <section
            id="results"
            className={`scroll-mt-24 pt-16 lg:scroll-mt-8 ${GUTTER}`}
          >
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

          <footer
            className={`mt-16 border-t border-rule pt-16 pb-20 ${GUTTER}`}
          >
            <div className="mb-4">
              <Label>End of case study</Label>
            </div>
            <Heading>Thanks for reading.</Heading>
            <div className="mb-8">
              <Body>
                I'm looking for my next role. Reach out to me{" "}
                <CopyEmail email="tanisha.acharya@utexas.edu" /> to talk about
                more projects!
              </Body>
            </div>
            <div className="flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[15px] font-semibold text-ink">
                  Tanisha Acharya
                </div>
                <div className="mt-1 text-[13px] text-label">
                  Senior Product Designer
                </div>
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
    </GalleryProvider>
  );
}
