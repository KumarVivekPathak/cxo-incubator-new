import GaugeComponent from "react-gauge-component";
import type { ResultsData } from "../../utils/types";
import { BAND_CONFIG } from "../../utils/types";

interface Props {
  data: ResultsData;
}

export default function ScoreHero({ data }: Props) {
  const band = BAND_CONFIG[data.band];

  return (
    <section className="bg-maroon px-6 py-14 text-center flex flex-col md:flex-row justify-evenly items-center">
      <div className="flex flex-col justify-between items-center">
        {/* Gauge */}
        <div className="w-lg mx-auto mb-2">
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
                  {
                    value: 70,
                    valueConfig: { formatTextValue: () => "Great" },
                  },
                  {
                    value: 90,
                    valueConfig: { formatTextValue: () => "Excl." },
                  },
                ],
                defaultTickValueConfig: {
                  style: { fontSize: "13px", fill: "white" },
                },
              },
            }}
          />
        </div>
        {/* Score number */}
        <div className="mb-2">
          <span className="text-5xl font-black text-white leading-none tracking-tighter">
            {data.overallScore}
          </span>
          <span className="text-3xl text-white font-light">%</span>
        </div>

        <p className="text-sm text-white mb-4">
          Your CXO Readiness Score — You Are on the Right Trajectory
        </p>

        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full mb-8">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: band.color }}
        />
        <span className="text-[10px] font-bold tracking-[2px] uppercase text-white">
          {band.label}
        </span>
      </div>
      </div>

      {/* Band badge */}
      <div className="flex flex-col">
      

      {/* Distance card */}
      <div className="max-w-lg mx-auto bg-black/25 border border-white/10 p-5 rounded-sm mb-10 text-left">
        <p className="text-sm font-regular tracking-[2px] text-white mb-3">
          Your Distance from CXO Readiness
        </p>

        {/* Colour bar */}
        <div className="h-3 bg-maroon/10 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${data.overallScore}%`,
              background: "linear-gradient(90deg,#C0392B,#E67E22,#27AE60)",
            }}
          />
        </div>

        <div className="flex justify-between mb-3">
          {["Foundation", "Fair", "Good", "Promising", "CXO Ready"].map((t) => (
            <span key={t} className="text-xs text-white">
              {t}
            </span>
          ))}
        </div>

        <p className="text-xs text-white leading-relaxed">
          You are{" "}
          <span className="font-bold text-gold">
            {data.pointsAway} points away
          </span>{" "}
          from full CXO readiness. Every gap identified here is coachable.
        </p>
      </div>

      {/* Personalized heading */}
      <h1 className="font-serif text-xl font-bold text-white leading-snug max-w-md mx-auto mb-3">
        {data.userName}, here is what your scorecard is really telling you.
      </h1>
      <p className="text-xs text-white/80 max-w-lg mx-auto leading-relaxed">
        You have answered 21 honest questions. What follows is not a generic
        report — it is a mirror. The patterns it reveals are the same ones that
        determine whether talented, hard-working professionals reach the C-suite
        — or stay just below it indefinitely.
      </p>

      </div>
    </section>
  );
}
