import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";
import type { ResultsData } from "../../utils/types";
import { BAND_CONFIG } from "../../utils/types";
import { useInView } from "../../hooks/useInView";

interface Props {
  data: ResultsData;
}

const BAR_LABELS = ["Foundation", "Fair", "Good", "Promising", "CXO Ready"];

export default function ScoreHero({ data }: Props) {
  const band = BAND_CONFIG[data.band];
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.05);

  // Animate the progress bar from 0 to the actual score after section enters view
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    if (!sectionInView) return;
    const t = setTimeout(() => setBarWidth(data.overallScore), 900);
    return () => clearTimeout(t);
  }, [sectionInView, data.overallScore]);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      className="bg-maroon px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-14 md:py-16 overflow-hidden relative"
    >
      {/* Subtle background glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">

        {/* ─── LEFT: Gauge + Score + Band badge ─── */}
        <div className="flex flex-col items-center text-center w-full md:flex-1">

          {/* Gauge */}
          <div
            className={`w-full max-w-xs sm:max-w-sm mx-auto mb-2
                        ${sectionInView ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{ animationDelay: sectionInView ? "100ms" : undefined }}
          >
            <GaugeComponent
              value={data.overallScore}
              type="radial"
              arc={{
                colorArray: [
                  "#C0392B",
                  "#E67E22",
                  "#27AE60",
                  "#2980B9",
                  "#8E44AD",
                ],
                padding: 0.02,
                width: 0.2,
                subArcs: [
                  { limit: 20, showTick: true },
                  { limit: 40, showTick: true },
                  { limit: 60, showTick: true },
                  { limit: 80, showTick: true },
                  { limit: 100, showTick: true },
                ],
              }}
              pointer={{
                type: "needle",
                color: "#ffffff",
                length: 0.7,
                width: 15,
                elastic: true,
              }}
              labels={{
                valueLabel: { hide: true },
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 10, valueConfig: { formatTextValue: () => "Poor" } },
                    { value: 30, valueConfig: { formatTextValue: () => "Fair" } },
                    { value: 50, valueConfig: { formatTextValue: () => "Good" } },
                    { value: 70, valueConfig: { formatTextValue: () => "Great" } },
                    { value: 90, valueConfig: { formatTextValue: () => "Excl." } },
                  ],
                  defaultTickValueConfig: {
                    style: { fontSize: "12px", fill: "white" },
                  },
                },
              }}
            />
          </div>

          {/* Score number */}
          <div
            className={`mb-2 ${fadeUp(sectionInView)}`}
            style={{ animationDelay: sectionInView ? "400ms" : undefined }}
          >
            <span className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tighter">
              {data.overallScore}
            </span>
            <span className="text-2xl sm:text-3xl text-white font-light">%</span>
          </div>

          {/* Tagline */}
          <p
            className={`text-xs sm:text-sm text-white/90 mb-4 px-2 ${fadeUp(sectionInView)}`}
            style={{ animationDelay: sectionInView ? "520ms" : undefined }}
          >
            Your CXO Readiness Score — You Are on the Right Trajectory
          </p>

          {/* Band badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full
                        ${sectionInView ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{ animationDelay: sectionInView ? "640ms" : undefined }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: band.color }}
            />
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-white whitespace-nowrap">
              {band.label}
            </span>
          </div>
        </div>

        {/* ─── RIGHT: Distance card + Heading ─── */}
        <div className="flex flex-col w-full md:flex-1 max-w-lg mx-auto md:mx-0">

          {/* Distance card */}
          <div
            className={`bg-black/25 border border-white/10 p-5 rounded-sm mb-6 sm:mb-8
                        ${fadeUp(sectionInView)}`}
            style={{ animationDelay: sectionInView ? "550ms" : undefined }}
          >
            <p className="text-xs sm:text-sm font-regular tracking-[1.5px] sm:tracking-[2px] text-white mb-3">
              Your Distance from CXO Readiness
            </p>

            {/* Bar — animates from 0 → score */}
            <div className="h-3 bg-white/10 rounded-full mb-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1400 ease-out"
                style={{
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg,#C0392B,#E67E22,#27AE60)",
                }}
              />
            </div>

            <div className="flex justify-between mb-3">
              {BAR_LABELS.map((t) => (
                <span
                  key={t}
                  className="text-[8px] sm:text-[10px] md:text-xs text-white/85 whitespace-nowrap"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed">
              You are{" "}
              <span className="font-bold text-gold">
                {data.pointsAway} points away
              </span>{" "}
              from full CXO readiness. Every gap identified here is coachable.
            </p>
          </div>

          {/* Personalized heading */}
          <h1
            className={`font-serif text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug mb-3 text-center md:text-left
                        ${fadeUp(sectionInView)}`}
            style={{ animationDelay: sectionInView ? "750ms" : undefined }}
          >
            {data.userName}, here is what your scorecard is really telling you.
          </h1>

          <p
            className={`text-xs sm:text-[13px] text-white/80 leading-relaxed text-center md:text-left
                        ${fadeUp(sectionInView)}`}
            style={{ animationDelay: sectionInView ? "870ms" : undefined }}
          >
            You have answered 21 honest questions. What follows is not a generic
            report — it is a mirror. The patterns it reveals are the same ones
            that determine whether talented, hard-working professionals reach
            the C-suite — or stay just below it indefinitely.
          </p>
        </div>
      </div>
    </section>
  );
}