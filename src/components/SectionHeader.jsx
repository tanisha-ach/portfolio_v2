// Kicker label + hairline rule used at the top of each content section.
export default function SectionHeader({ kicker }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#555]">
        {kicker}
      </span>
      <span className="h-px grow bg-[#1c1c1c]" />
    </div>
  );
}
