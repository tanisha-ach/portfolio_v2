import PortfolioShell from "../components/PortfolioShell";
import { statement, body, stats } from "../data/about";

export default function About() {
  return (
    <PortfolioShell activeTab="About">
      <div className="flex flex-col items-start self-stretch">
        <h1 className="mb-7 max-w-205 font-black text-[30px] leading-[1.25] tracking-[-0.01em] text-white sm:text-[36px] lg:text-[44px] lg:leading-[1.18]">
          {statement}
        </h1>

        <p className="max-w-180 text-[16px] leading-[1.75] text-[#b5b5b5] lg:text-[17px] lg:leading-[1.7]">
          {body}
        </p>

        <div className="mt-10 flex flex-col gap-8 self-stretch pb-12 sm:flex-row sm:gap-14">
          {stats.map((stat, i) => (
            <div key={stat.figure} className="flex gap-8 sm:gap-14">
              {i > 0 && <div className="hidden w-px shrink-0 bg-[#2a2a2a] sm:block" />}
              <div className="flex flex-col gap-1">
                <div className="font-black text-[28px] leading-[1.15] text-white lg:text-[32px]">
                  {stat.figure}
                </div>
                <div className="whitespace-pre-line text-[13px] leading-[1.6] text-[#888]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortfolioShell>
  );
}
