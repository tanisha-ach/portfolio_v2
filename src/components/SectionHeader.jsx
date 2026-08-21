// Kicker label + hairline rule used at the top of each content section.
export default function SectionHeader({ kicker }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-label">
        {kicker}
      </span>
      <span className="h-px grow bg-rule" />
    </div>
  );
}
