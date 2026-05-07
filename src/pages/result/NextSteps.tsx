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
  
  export default function NextSteps({ topGapName, journeyLevel, journeyMessage, userEmail }: Props) {
    return (
      <section className="bg-cream px-6 md:px-12 py-12">
  
        {/* Timeline */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-regular tracking-[2.5px] uppercase text-gold">
            Your Immediate Pathway
          </span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>
        <h2 className="text-xl font-bold text-maroon mb-6">
          What Changes in the Next 15 Days with My CXO Axis
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {TIMELINE.map((t) => (
            <div
              key={t.days}
              className="bg-white border border-maroon border-t-2 border-t-gold p-5 rounded-sm text-center"
            >
              <p className="text-xs font-regular tracking-[2px] text-black mb-2">
                {t.days}
              </p>
              <p className="text-md font-bold italic text-maroon mb-3">
                {t.phase}
              </p>
              <p className="text-sm text-black/70 leading-relaxed text-left">
                {t.description(topGapName)}
              </p>
            </div>
          ))}
        </div>
  
        {/* Urgency card */}
        <div className="bg-maroon rounded-sm p-5 flex gap-4 items-start mb-10">
          <span className="text-xl shrink-0 mt-0.5">⚡</span>
          <div>
            <p className="text-md font-bold text-white mb-2">
              The Cost of Waiting is Not Zero
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Every month without a deliberate plan is a month your peers with one are pulling further ahead. The 15 days it takes to complete My CXO Axis will give you more clarity than most leaders get in a decade of hoping something changes.
            </p>
          </div>
        </div>
  
        {/* Journey level */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold tracking-[2.5px] text-gold">
            Your Recommended Next Step
          </span>
          <div className="flex-1 h-px bg-gold" />
        </div>
        <h2 className="font-serif text-[22px] font-bold text-maroon mb-4">
          Where You Are in the CXO Journey
        </h2>
  
        <div className="bg-white border border-maroon p-5 flex items-center gap-5 rounded-sm mb-3">
          <div className="w-14 h-14 rounded-full bg-maroon flex flex-col items-center justify-center shrink-0">
            <span className="text-lg font-black text-gold-dark leading-none">
              {journeyLevel}
            </span>
            <span className="text-xs font-bold tracking-[1px] uppercase text-white">
              Level
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-maroon mb-1">
              You Are Close. The Right Support Will Get You There.
            </p>
            <p className="text-sm text-black/70 leading-relaxed">{journeyMessage}</p>
          </div>
        </div>
  
        {/* Email note */}
        <div className="bg-white border border-maroon p-4 flex items-start gap-3 rounded-sm">
          <span className="text-base shrink-0">✉</span>
          <p className="text-sm text-black/70 leading-relaxed">
            A personalised summary of your scorecard — including your specific
            pattern, top 3 gaps, and recommended pathway — is being sent to{" "}
            <span className="font-bold text-maroon">{userEmail}</span>. Check
            your inbox in the next few minutes.
          </p>
        </div>
      </section>
    );
  }