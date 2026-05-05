const TRANSFORMATIONS = [
    {
      quote:
        "\"I had been a VP for six years. Everyone knew I was good. What nobody told me — what the Incubator showed me — was that 'good' is exactly the ceiling. The gap was not skill. It was identity.\"",
      before: "Respected VP, no CXO pathway",
      after: "Chief People Officer, FMCG Listed",
      initials: "SR",
      name: "Sunita R.",
      role: "CPO · Mumbai",
    },
    {
      quote:
        "\"I was technically brilliant and personally known as a safe pair of hands. What I did not know was that 'safe' is the most dangerous reputation to have when you want the top job.\"",
      before: "CFO-in-waiting, competent but invisible",
      after: "Group CFO, multi-national within a year",
      initials: "AD",
      name: "Amit D.",
      role: "Group CFO · Dubai",
    },
    {
      quote:
        "\"I had the results, the relationships, and the reputation. What I lacked was the clarity to articulate my leadership purpose — and the conviction to own it publicly.\"",
      before: "GM, Fractured sense of career direction",
      after: "COO with full board-level visibility",
      initials: "PM",
      name: "Priya M.",
      role: "COO · Bangalore",
    },
  ];
  
  export default function Transformations() {
    return (
      <section className="bg-cream px-12 md:px-20 py-16">
  
        {/* ── Header ── */}
        <p className="text-sm font-base tracking-[2.5px] uppercase text-gold mb-5">
          Real Transformations
        </p>
  
        <h2 className="text-3xl md:text-4xl font-bold text-maroon leading-snug mb-4 max-w-xl">
          What Happens When a Leader <br />
          Finally Sees Their Own Potential
        </h2>
  
        <p className="text-sm text-black/50 leading-relaxed max-w-lg mb-12">
          These are not before-and-after slides. These are real professionals
          who stopped waiting for someone else to notice them — and started
          building their path with intention.
        </p>
  
        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TRANSFORMATIONS.map((t, i) => (
            <div
              key={t.name}
              className={`flex flex-col bg-white p-7 border-t-3 border-t-gold rounded-md`}
            >
              {/* Quote */}
              <p className="text-sm italic text-black/65 leading-relaxed flex-1 mb-8 font-serif">
                {t.quote}
              </p>
  
              {/* Before / After */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="bg-cream p-3">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1">
                    Before
                  </p>
                  <p className="text-[10px] text-black/60 leading-snug">{t.before}</p>
                </div>
                <div className="bg-cream p-3">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase text-maroon mb-1">
                    After
                  </p>
                  <p className="text-[10px] text-black/60 leading-snug">{t.after}</p>
                </div>
              </div>
  
              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-maroon flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-gold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-maroon leading-none">
                    {t.name}
                  </p>
                  <p className="text-xs text-black/60 mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
  
      </section>
    );
  }