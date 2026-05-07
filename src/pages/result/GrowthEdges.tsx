import type { GrowthEdge } from "../../utils/types";

interface Props { growthEdges: GrowthEdge[]; }

export default function GrowthEdges({ growthEdges }: Props) {
  return (
    <section className="bg-cream px-6 md:px-12 py-12">

      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-regular tracking-[2.5px] uppercase text-gold">
          Your Growth Edge
        </span>
        <div className="flex-1 h-px bg-gold/30" />
      </div>
      <h2 className="text-xl font-bold text-maroon mb-6">
        The 3 Dimensions That Will Most Accelerate Your C-Suite Journey
      </h2>

      <div className="flex flex-col gap-4">
        {growthEdges.map((edge) => (
          <div
            key={edge.rank}
            className="bg-white border border-maroon border-t-2 border-t-gold p-5 rounded-sm"
          >
            {/* Card top */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-cream rounded-lg flex items-center justify-center text-base shrink-0">
                {edge.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-black">{edge.name}</p>
                <p className="text-xs text-black/60 mt-0.5">
                  Current score: {edge.score}% — {100 - edge.score} points of growth available
                </p>
              </div>
              <span className="text-lg font-black text-gold">
                #{edge.rank}
              </span>
            </div>

            {/* Insight */}
            <div className="border-l-2 border-gold pl-4 py-2 bg-offwhite mb-3">
              <p className="text-xs font-bold tracking-[2px] uppercase text-gold mb-2 flex items-center gap-1">
                💡 Counterintuitive Insight
              </p>
              <p className="text-xs text-black/70 leading-relaxed">
                {edge.insight}
              </p>
            </div>

            {/* How it helps */}
            <div className="border-l-2 border-maroon pl-4 py-2 bg-[#FFF9F0]">
              <p className="text-xs font-bold tracking-[2px] text-maroon mb-2">
                How My CXO Axis Closes This Gap
              </p>
              <p className="text-xs text-black/70 leading-relaxed">
                {edge.howItHelps}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}