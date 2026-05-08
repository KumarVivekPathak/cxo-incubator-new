import { useInView } from "../../hooks/useInView";

const TIMELINE = [
  {
    days: "Days 1–5",
    phase: "Awareness",
    description: (gap: string) =>
      `You will see your specific ${gap} gap pattern with clinical precision — including the moments it shows up and the triggers that activate it. Most leaders carry this blind spot for years.`,
  },
  {
    days: "Days 6–10",
    phase: "Urgency",
    description: () =>
      `You will build your first concrete action: a personalised 90-day plan targeting your top 3 gaps with weekly milestones. You will feel the shift from "I should do something" to "I know exactly what I am doing."`,
  },
  {
    days: "Days 11–15",
    phase: "Momentum",
    description: () =>
      `You will have completed your first Axis module, produced a visible output (your Leadership Identity Statement), and experienced what structured coaching feels like. The door to the Incubator opens from here.`,
  },
];

interface Props {
  topGapName: string;
  journeyLevel: number;
  journeyMessage: string;
  userEmail: string;
}

export default function NextSteps({
  topGapName,
  journeyLevel,
  journeyMessage,
  userEmail,
}: Props) {
  const [topRef, topInView] = useInView<HTMLDivElement>(0.1);
  const [bottomRef, bottomInView] = useInView<HTMLDivElement>(0.15);

  const fadeUp = (v: boolean) => (v ? "animate-fade-in-up" : "opacity-0");

  return (
    <section className="bg-cream px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 overflow-hidden">

      {/* ─── TOP BLOCK: Timeline + Urgency ─── */}
      <div ref={topRef}>
        {/* Header */}
        <div
          className={`flex items-center gap-3 mb-2 ${fadeUp(topInView)}`}
          style={{ animationDelay: topInView ? "100ms" : undefined }}
        >
          <span className="text-[10px] sm:text-xs font-regular tracking-[2.5px] uppercase text-gold whitespace-nowrap">
            Your Immediate Pathway
          </span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>

        <h2
          className={`text-lg sm:text-xl md:text-2xl font-bold text-maroon mb-6 sm:mb-8 leading-snug ${fadeUp(topInView)}`}
          style={{ animationDelay: topInView ? "220ms" : undefined }}
        >
          What Changes in the Next 15 Days with My CXO Axis
        </h2>

        {/* Timeline cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 sm:mb-5">
          {TIMELINE.map((t, i) => (
            <div
              key={t.days}
              className={`group bg-white border border-maroon border-t-2 border-t-gold p-4 sm:p-5 rounded-sm text-center
                          transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:border-t-[3px]
                          ${topInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: topInView ? `${350 + i * 150}ms` : undefined,
              }}
            >
              <p className="text-[11px] sm:text-xs font-regular tracking-[2px] text-black/70 mb-2">
                {t.days}
              </p>
              <p className="text-base sm:text-lg font-bold italic text-maroon mb-3 transition-colors duration-300 group-hover:text-gold-dark">
                {t.phase}
              </p>
              <p className="text-xs sm:text-sm text-black/70 leading-relaxed text-left">
                {t.description(topGapName)}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency card */}
        <div
          className={`bg-maroon rounded-sm p-4 sm:p-5 flex gap-3 sm:gap-4 items-start mb-10 sm:mb-12 transition-shadow duration-500 hover:shadow-xl
                      ${fadeUp(topInView)}`}
          style={{ animationDelay: topInView ? "900ms" : undefined }}
        >
          <span className="text-xl sm:text-2xl shrink-0 mt-0.5" aria-hidden>⚡</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-bold text-white mb-2">
              The Cost of Waiting is Not Zero
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              Every month without a deliberate plan is a month your peers with
              one are pulling further ahead. The 15 days it takes to complete
              My CXO Axis will give you more clarity than most leaders get in a
              decade of hoping something changes.
            </p>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BLOCK: Journey level + Email ─── */}
      <div ref={bottomRef}>
        {/* Header */}
        <div
          className={`flex items-center gap-3 mb-2 ${fadeUp(bottomInView)}`}
          style={{ animationDelay: bottomInView ? "100ms" : undefined }}
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[2.5px] text-gold whitespace-nowrap">
            Your Recommended Next Step
          </span>
          <div className="flex-1 h-px bg-gold" />
        </div>

        <h2
          className={`font-serif text-lg sm:text-xl md:text-[22px] font-bold text-maroon mb-4 sm:mb-5 ${fadeUp(bottomInView)}`}
          style={{ animationDelay: bottomInView ? "220ms" : undefined }}
        >
          Where You Are in the CXO Journey
        </h2>

        {/* Journey level card */}
        <div
          className={`group bg-white border border-maroon p-4 sm:p-5 flex items-center gap-4 sm:gap-5 rounded-sm mb-3 transition-shadow duration-500 hover:shadow-lg
                      ${fadeUp(bottomInView)}`}
          style={{ animationDelay: bottomInView ? "350ms" : undefined }}
        >
          <div className="w-14 h-14 rounded-full bg-maroon flex flex-col items-center justify-center shrink-0 ring-2 ring-transparent transition-all duration-300 group-hover:ring-gold/40 group-hover:scale-105">
            <span className="text-lg font-black text-gold-dark leading-none">
              {journeyLevel}
            </span>
            <span className="text-[10px] font-bold tracking-[1px] uppercase text-white">
              Level
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-maroon mb-1">
              You Are Close. The Right Support Will Get You There.
            </p>
            <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
              {journeyMessage}
            </p>
          </div>
        </div>

        {/* Email note */}
        <div
          className={`bg-white border border-maroon p-4 flex items-start gap-3 rounded-sm transition-all duration-300 hover:border-gold
                      ${fadeUp(bottomInView)}`}
          style={{ animationDelay: bottomInView ? "500ms" : undefined }}
        >
          <span className="text-base shrink-0" aria-hidden>✉</span>
          <p className="text-xs sm:text-sm text-black/70 leading-relaxed">
            A personalised summary of your scorecard — including your specific
            pattern, top 3 gaps, and recommended pathway — is being sent to{" "}
            <span className="font-bold text-maroon break-all">{userEmail}</span>.
            Check your inbox in the next few minutes.
          </p>
        </div>
      </div>
    </section>
  );
}