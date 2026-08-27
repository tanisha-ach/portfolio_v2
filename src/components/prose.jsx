/* Shared typographic primitives for the case study pages.

   Type scale — eight sizes, each with one job:
   46 hero · 30 figures · 26 section heading · 20 lead · 17 card title ·
   15 body · 13 caption · 11 label. Headline sizes step down on narrow
   screens; body, caption and label already sit at their readable floor. */

export const Heading = ({ children }) => (
  <h2 className="mb-3.5 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-ink lg:text-[26px]">
    {children}
  </h2>
);

export const Body = ({ children }) => (
  <p className="max-w-195 text-[15px] leading-[1.7] text-copy">{children}</p>
);

export const Caption = ({ children }) => (
  <p className="text-[13px] leading-[1.6] text-copy">{children}</p>
);

export const CardTitle = ({ children }) => (
  <h3 className="font-display text-[17px] leading-[1.35] font-semibold tracking-[-0.01em] text-ink">
    {children}
  </h3>
);

export const Label = ({ children, accent = false }) => (
  <div
    className={
      "text-[11px] font-semibold uppercase tracking-[0.1em] " +
      (accent ? "text-accent" : "text-label")
    }
  >
    {children}
  </div>
);

export const Figure = ({ children, accent = false }) => (
  <div
    className={
      "font-display text-[26px] leading-[1.1] font-extrabold tracking-[-0.03em] lg:text-[30px] " +
      (accent ? "text-accent" : "text-ink")
    }
  >
    {children}
  </div>
);

export const Card = ({ children, highlight = false }) => (
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

/* Verdict marks for weighing options: kept, ruled out, or a caveat to watch.
   The icon carries the judgement so the sentence beside it doesn't have to. */
const VERDICT = {
  pro: {
    color: "text-pro",
    path: "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
    label: "Works",
  },
  con: {
    color: "text-con",
    path: "M336-280l144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
    label: "Doesn't work",
  },
  warn: {
    color: "text-warn",
    path: "M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
    label: "Trade-off",
  },
};

export const Verdict = ({ kind, children }) => {
  const mark = VERDICT[kind];
  return (
    <li className="flex items-start gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        viewBox="0 -960 960 960"
        className={"mt-0.5 shrink-0 fill-current " + mark.color}
        role="img"
        aria-label={mark.label}
      >
        <path d={mark.path} />
      </svg>
      <span className="flex-1 text-[13px] leading-[1.6] text-copy">{children}</span>
    </li>
  );
};

/* Numbered marker used to tie an annotation to a spot on a screenshot. */
export const Marker = ({ n, className = "", style }) => (
  <span
    className={
      "flex size-3 shrink-0 items-center justify-center rounded-full bg-note text-[8px] font-semibold leading-none text-page " +
      className
    }
    style={style}
  >
    {n}
  </span>
);
