import { nav } from "../data/caseStudy";

export default function Sidebar({ activeId }) {
  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => n.id === activeId)
  );
  const progress = ((activeIndex + 1) / nav.length) * 100;

  return (
    <aside className="sticky top-0 flex h-screen w-55 shrink-0 flex-col border-r border-[#2a2a2a] bg-[#111111] py-7">
      {/* Identity */}
      <div className="border-b border-[#2a2a2a] px-6 pb-7">
        <div className="mb-2.5 text-[13px] font-semibold tracking-[-0.01em] text-white">
          Tanisha Acharya
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-[3px] border border-[#333] bg-[#1e1e1e] px-2 py-1">
          <span className="size-1.5 rounded-full bg-[#4a9eff]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#888]">
            B2B · 0-1
          </span>
        </div>
      </div>

      {/* Contents */}
      <nav className="flex grow flex-col pt-6">
        <div className="mb-3.5 px-6 text-[9px] font-bold uppercase tracking-[0.12em] text-[#555]">
          Contents
        </div>
        <ul className="flex flex-col gap-px">
          {nav.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={
                    "flex items-center border-l-2 px-6 py-2 text-[11px] transition-colors duration-200 " +
                    (active
                      ? "border-white bg-white/5 font-semibold text-white"
                      : "border-transparent font-medium text-[#555] hover:text-[#888]")
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Progress */}
        <div className="mt-auto px-6">
          <div className="h-0.5 w-full overflow-hidden rounded-[1px] bg-[#222]">
            <div
              className="h-full rounded-[1px] bg-white transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-[9px] tracking-[0.04em] text-[#444]">
            {activeIndex + 1} of {nav.length} sections
          </div>
        </div>
      </nav>
    </aside>
  );
}
