import type { DimensionScore } from "../../utils/types";
import { BAND_CONFIG } from "../../utils/types";

interface Props { dimensions: DimensionScore[]; }

const BAND_SYMBOLS: Record<string, string> = {
  excellent: "★",
  promising: "+",
  good: "●",
  fair: "◀",
  poor: "△",
};

export default function DimensionScores({ dimensions }: Props) {
  return (
    <section className="bg-white px-6 md:px-12 py-12">

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#C49A3C]">
          Your Full Assessment
        </span>
        <div className="flex-1 h-px bg-gold/30" />
      </div>
      <h2 className="font-serif text-xl font-bold text-maroon mb-6">
        How You Scored Across All 7 Dimensions
      </h2>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {dimensions.map((dim) => {
          const cfg = BAND_CONFIG[dim.band];
          return (
            <div
              key={dim.id}
              className="border border-maroon p-5 flex items-start gap-4 rounded-sm bg-white"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center text-lg">
                {dim.icon}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                {/* Name + badge */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-sm font-bold text-black">
                    {dim.name}
                  </span>
                  <span
                    className="text-xs font-bold tracking-[1px] px-2 py-1 rounded-full"
                    style={{ background: cfg.bg, color: cfg.text }}
                  >
                    {BAND_SYMBOLS[dim.band]} {cfg.label}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-cream rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${dim.score}%`, background: cfg.color }}
                  />
                </div>

                <p className="text-xs text-black/52 leading-relaxed">
                  {dim.description}
                </p>
              </div>

              {/* Score */}
              <div
                className="text-lg font-black  min-w-[48px] text-right"
                style={{ color: cfg.color }}
              >
                {dim.score}
                <span className="text-xs font-normal">%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}