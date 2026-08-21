// Avatar + "+N" badge for the Team meta cell. The source photo is a full-length
// portrait, so `cover` alone leaves the face tiny — this zooms past cover and
// re-centres on the head. The badge is neutral rather than coloured; a count
// isn't worth spending the page's one accent on.
export default function TeamCluster({ avatar, avatarAlt, others }) {
  return (
    <div className="relative flex h-8 w-13.5 items-center">
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
      <div className="relative -left-2.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-page bg-line text-[13px] font-semibold text-copy">
        +{others}
      </div>
    </div>
  );
}
