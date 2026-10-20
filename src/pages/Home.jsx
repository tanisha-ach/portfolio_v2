import { useEffect, useRef, useState } from "react";
import { CursorBadge } from "../components/CursorBadge";
import PortfolioShell, { ACCENT } from "../components/PortfolioShell";
import StatusBadges from "../components/StatusBadges";
import { projects } from "../data/home";

// A card with no case study yet is a button rather than a link. Hovering it
// carries a "Coming soon" note beside the pointer, in the same badge the
// contact icons use. A tap has no hover, so it shows the note briefly at the
// tap; a keyboard press has no pointer, so it sits in the middle of the card.
function useComingSoon() {
  const [note, setNote] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const follow = (event) => {
    if (event.pointerType === "touch") return;
    clearTimeout(timer.current);
    setNote({ x: event.clientX, y: event.clientY, accent: event.currentTarget.dataset.accent });
  };
  const hide = () => {
    clearTimeout(timer.current);
    setNote(null);
  };
  const press = (event) => {
    if (note && event.detail) return; // already showing under a mouse
    let { clientX: x, clientY: y } = event;
    if (!event.detail) {
      const box = event.currentTarget.getBoundingClientRect();
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
    }
    setNote({ x, y, accent: event.currentTarget.dataset.accent });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNote(null), 1600);
  };
  return { note, follow, hide, press };
}

export default function Home() {
  // Which card the pointer is on, so the rail can borrow that card's hue.
  const [accent, setAccent] = useState(null);
  const soon = useComingSoon();

  return (
    <PortfolioShell
      activeTab="Case Studies"
      accent={accent ?? ACCENT}
      badges={<StatusBadges />}
    >
        <div className="flex flex-1 flex-col items-start gap-6 self-stretch lg:gap-4">
          {projects.map((project) => {
            const Card = project.comingSoon ? "button" : "a";
            const cardProps = project.comingSoon
              ? {
                  type: "button",
                  "data-accent": project.accent,
                  onClick: soon.press,
                  onPointerEnter: soon.follow,
                  onPointerMove: soon.follow,
                  onPointerLeave: soon.hide,
                  onPointerCancel: soon.hide,
                }
              : { href: project.href };
            return (
              <Card
                key={project.number}
                {...cardProps}
                onMouseEnter={() => setAccent(project.accent)}
                onMouseLeave={() => setAccent(null)}
                onFocus={() => setAccent(project.accent)}
                onBlur={() => {
                  setAccent(null);
                  soon.hide();
                }}
                className="group relative flex w-full shrink-0 cursor-pointer items-end overflow-hidden rounded-2xl px-5.5 pb-6 pt-[var(--reserve)] text-left transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100 lg:min-h-45 lg:items-center lg:p-8"
                style={{ backgroundImage: project.gradient, "--reserve": project.reserve }}
              >
                {/* The wide layout positions its art inside the text column — the
                    frame those offsets were authored in. The mobile design places
                    art against the card itself, so it gets its own layer. The
                    narrow card reserves room for the artwork as top padding rather
                    than fixing its own height: at this type size the copy decides
                    how tall the card needs to be, and a set ratio would run it into
                    the mockup. The reserve is shorter than the mockup on purpose —
                    the title tucks in beside it and only the description needs to
                    clear it. */}
                <div className="absolute inset-0 lg:hidden">
                  {project.images
                    .filter((img) => img.mobile)
                    .map((img, i) => (
                      <div
                        key={i}
                        className="absolute bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundSize: img.size,
                          backgroundPosition: img.position,
                          borderRadius: img.radius,
                          width: img.mobile.width,
                          // Height comes from the artwork's own ratio, so only the
                          // width needs declaring per breakpoint.
                          aspectRatio: `${img.width} / ${img.height}`,
                          right: img.mobile.right,
                          top: img.mobile.top,
                          backgroundImage: `url(${img.src})`,
                        }}
                      />
                    ))}
                </div>

                <div className="relative flex grow basis-0 flex-col gap-1 lg:gap-2.5">
                  <div className="text-[11px] leading-4 tracking-widest text-white/55 lg:leading-3.5">
                    {project.eyebrow}
                  </div>
                  <div
                    className="text-[30px] font-extrabold leading-[105%] tracking-[-0.02em] text-white lg:max-w-[var(--title-width)] lg:text-[28px]"
                    style={{ "--title-width": `${project.titleWidth}px` }}
                  >
                    {project.title}
                  </div>
                  {/* On desktop the description waits behind the headline and opens
                      out on hover or keyboard focus, growing the card with it. The
                      row collapses to nothing rather than being removed, so screen
                      readers still get the text. The negative margin cancels the
                      column gap while it is closed; the inner padding restores it
                      once open. */}
                  <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:-mt-2.5 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-visible:grid-rows-[1fr] lg:group-focus-visible:opacity-100">
                    <div className="min-h-0 overflow-hidden">
                      <div className="max-w-105 text-[15px] leading-[26px] text-white/75 lg:pt-2.5 lg:text-sm lg:leading-5.5">
                        {project.description}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-[20px] bg-white/[0.18] px-3 py-1.5 text-[11px] font-medium leading-4 text-white lg:py-1 lg:leading-normal"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Each image declares its own hover behaviour: `shift` slides it in
                      y, `zoom` scales it. An image that wants neither declares neither. */}
                  {project.images.map((img, i) => (
                    <div
                      key={i}
                      className="absolute hidden bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out group-hover:translate-y-[var(--shift)] group-hover:scale-[var(--zoom)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 lg:block"
                      style={{
                        width: img.width,
                        height: img.height,
                        right: img.right,
                        top: img.top,
                        backgroundImage: `url(${img.src})`,
                        backgroundSize: img.size,
                        backgroundPosition: img.position,
                        borderRadius: img.radius,
                        "--shift": `${img.shift ?? 0}px`,
                        "--zoom": img.zoom ?? 1,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute -left-0.75 -top-4.75 text-[120px] font-extrabold leading-[105%] tracking-[-0.02em] text-white/[0.18]">
                  {project.number}
                </div>
              </Card>
            );
          })}
        </div>

        {soon.note && (
          <CursorBadge
            x={soon.note.x}
            y={soon.note.y}
            label="Coming soon"
            tone="status"
            // The outline takes the hovered card's hue, as the sidebar pills do
            // at the same moment.
            color={soon.note.accent}
          />
        )}
        <span role="status" aria-live="polite" className="sr-only">
          {soon.note ? "Case study coming soon" : ""}
        </span>
    </PortfolioShell>
  );
}
