import type { GrowthEdge } from "../../utils/types";
import { useInView } from "../../hooks/useInView";

interface Props { growthEdges: GrowthEdge[]; }

export default function GrowthEdges({ growthEdges }: Props) {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.1);
  const fadeUp = (v: boolean) => (v ? "animate-fade-in-up" : "opacity-0");

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 mb-2 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "100ms" : undefined }}
      >
        <span className="text-[10px] sm:text-xs font-regular tracking-[2.5px] uppercase text-gold whitespace-nowrap">
          Your Growth Edge
        </span>
        <div className="flex-1 h-px bg-gold/30" />
      </div>

      <h2
        className={`text-lg sm:text-xl md:text-2xl font-bold text-maroon mb-6 sm:mb-8 leading-snug ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "220ms" : undefined }}
      >
        The 3 Dimensions That Will Most Accelerate Your C-Suite Journey
      </h2>

      <div className="flex flex-col gap-4">
        {growthEdges.map((edge, i) => (
          <div
            key={edge.rank}
            className={`group bg-white border border-maroon border-t-2 border-t-gold p-4 sm:p-5 md:p-6 rounded-sm
                        transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5
                        ${sectionInView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{
              animationDelay: sectionInView
                ? `${350 + i * 150}ms`
                : undefined,
            }}
          >
            {/* Card top */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-cream rounded-lg flex items-center justify-center text-base shrink-0 transition-transform duration-300 group-hover:scale-110">
                {edge.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-black">
                  {edge.name}
                </p>
                <p className="text-[10px] sm:text-xs text-black/60 mt-0.5">
                  Current score: {edge.score}% — {100 - edge.score} points of growth available
                </p>
              </div>
              <span className="text-base sm:text-lg font-black text-gold shrink-0 transition-transform duration-300 group-hover:scale-110">
                #{edge.rank}
              </span>
            </div>

            {/* Insight */}
            <div className="border-l-2 border-gold pl-3 sm:pl-4 py-2 bg-offwhite mb-3 transition-all duration-300 hover:border-l-[4px]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[2px] uppercase text-gold mb-2 flex items-center gap-1">
                💡 Counterintuitive Insight
              </p>
              <p className="text-[11px] sm:text-xs text-black/70 leading-relaxed">
                {edge.insight}
              </p>
            </div>

            {/* How it helps */}
            <div className="border-l-2 border-maroon pl-3 sm:pl-4 py-2 bg-[#FFF9F0] transition-all duration-300 hover:border-l-[4px]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[2px] text-maroon mb-2">
                How My CXO Axis Closes This Gap
              </p>
              <p className="text-[11px] sm:text-xs text-black/70 leading-relaxed">
                {edge.howItHelps}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}