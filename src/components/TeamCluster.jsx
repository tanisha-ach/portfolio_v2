// Avatar + "+N" badge for the Team meta cell. The source photo is a full-length
// portrait, so `cover` alone leaves the face tiny — this zooms past cover and
// re-centres on the head.
//
// `roles` names who the +N actually are. It's a hover reveal, so it's also
// reachable by keyboard and announced through a live region rather than being
// mouse-only.
export default function TeamCluster({ avatar, avatarAlt, others, roles }) {
  const cluster = (
    <>
      <div
        role="img"
        aria-label={avatarAlt}
        className="size-8 shrink-0 rounded-full bg-surface"
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundSize: "240%",
          backgroundPosition: "54% 48%",
        }}
      />
      <div className="relative -left-2.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-page bg-accent text-[13px] font-semibold text-page">
        +{others}
      </div>
    </>
  );

  if (!roles) {
    return <div className="relative flex h-8 w-13.5 items-center">{cluster}</div>;
  }

  return (
    <div
      className="group relative flex h-8 w-fit items-center focus-within:outline-none"
      tabIndex={0}
      aria-label={`Team: me plus ${roles}`}
    >
      {cluster}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 whitespace-nowrap rounded-md border border-line bg-black px-3 py-2 text-[13px] font-medium text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {roles}
      </span>
    </div>
  );
}
