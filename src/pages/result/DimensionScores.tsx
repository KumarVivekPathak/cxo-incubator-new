import { useEffect, useState } from "react";
import type { DimensionScore } from "../../utils/types";
import { BAND_CONFIG } from "../../utils/types";
import { useInView } from "../../hooks/useInView";

interface Props { dimensions: DimensionScore[]; }

const BAND_SYMBOLS: Record<string, string> = {
  excellent: "★",
  promising: "+",
  good: "●",
  fair: "◀",
  poor: "△",
};

export default function DimensionScores({ dimensions }: Props) {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.1);

  // All 7 progress bars fill simultaneously, with per-bar 80ms stagger
  const [barsActive, setBarsActive] = useState(false);
  useEffect(() => {
    if (!sectionInView) return;
    const t = setTimeout(() => setBarsActive(true), 800);
    return () => clearTimeout(t);
  }, [sectionInView]);

  const fadeUp = (v: boolean) => (v ? "animate-fade-in-up" : "opacity-0");

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 mb-2 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "100ms" : undefined }}
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[2.5px] uppercase text-gold whitespace-nowrap">
          Your Full Assessment
        </span>
        <div className="flex-1 h-px bg-gold/30" />
      </div>

      <h2
        className={`font-serif text-lg sm:text-xl md:text-2xl font-bold text-maroon mb-6 sm:mb-8 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "220ms" : undefined }}
      >
        How You Scored Across All 7 Dimensions
      </h2>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {dimensions.map((dim, i) => {
          const cfg = BAND_CONFIG[dim.band];
          return (
            <div
              key={dim.id}
              className={`group border border-maroon p-4 sm:p-5 flex items-start gap-3 sm:gap-4 rounded-sm bg-white
                          transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                          ${sectionInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: sectionInView ? `${350 + i * 100}ms` : undefined,
              }}
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cream rounded-lg flex items-center justify-center text-base sm:text-lg shrink-0 transition-transform duration-300 group-hover:scale-110">
                {dim.icon}
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                {/* Name + badge */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-black">
                    {dim.name}
                  </span>
                  <span
                    className="text-[10px] sm:text-xs font-bold tracking-[1px] px-2 py-0.5 sm:py-1 rounded-full"
                    style={{ background: cfg.bg, color: cfg.text }}
                  >
                    {BAND_SYMBOLS[dim.band]} {cfg.label}
                  </span>
                </div>

                {/* Progress bar — fills from 0 with per-bar stagger */}
                <div className="h-2 bg-cream rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-1000 ease-out"
                    style={{
                      width: `${barsActive ? dim.score : 0}%`,
                      background: cfg.color,
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </div>

                <p className="text-[11px] sm:text-xs text-black/52 leading-relaxed">
                  {dim.description}
                </p>
              </div>

              {/* Score */}
              <div
                className="text-base sm:text-lg font-black min-w-[42px] sm:min-w-[48px] text-right shrink-0"
                style={{ color: cfg.color }}
              >
                {dim.score}
                <span className="text-[10px] sm:text-xs font-normal">%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}