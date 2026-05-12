import { useInView } from "../../hooks/useInView";

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
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.1);

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20"
    >
      {/* ── Header ── */}
      <div
        className={sectionInView ? "animate-fade-in-up" : "opacity-0"}
      >
        <p className="text-xs sm:text-sm font-base tracking-[2.5px] uppercase text-gold mb-4 sm:mb-5">
          Real Transformations
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon leading-snug mb-3 sm:mb-4 max-w-xl">
          What Happens When a Leader{" "}
          <br className="hidden md:block" />
          Finally Sees Their Own Potential
        </h2>

        <p className="text-sm text-black/55 leading-relaxed max-w-lg mb-10 sm:mb-12">
          These are no before-and-after slides. These are real professionals
          who stopped waiting for someone else to notice them — and started
          building their path with intention.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {TRANSFORMATIONS.map((t, i) => (
          <article
            key={t.name}
            className={`group relative flex flex-col bg-white p-6 sm:p-7 rounded-md shadow-sm 
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 
                        border-t-[3px] border-t-gold overflow-hidden
                        ${sectionInView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{
              animationDelay: sectionInView ? `${200 + i * 130}ms` : undefined,
            }}
          >
            {/* Decorative oversized quote mark */}
            <span
              className="absolute top-2 right-5 text-7xl font-serif text-gold/15 
                         leading-none select-none pointer-events-none 
                         transition-all duration-500 group-hover:text-gold/25 group-hover:scale-110"
              aria-hidden
            >
              "
            </span>

            {/* Quote */}
            <p className="relative text-sm italic text-black/70 leading-relaxed flex-1 mb-8 font-serif z-10">
              {t.quote}
            </p>

            {/* Before / After */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-cream p-3 transition-colors duration-300 group-hover:bg-cream/60">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1">
                  Before
                </p>
                <p className="text-[11px] text-black/60 leading-snug">
                  {t.before}
                </p>
              </div>
              <div className="bg-cream p-3 transition-colors duration-300 group-hover:bg-cream/60">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-maroon mb-1">
                  After
                </p>
                <p className="text-[11px] text-black/60 leading-snug">
                  {t.after}
                </p>
              </div>
            </div>

            {/* Person */}
            <div className="flex items-center gap-3 pt-4 border-t border-maroon/5">
              <div
                className="w-10 h-10 rounded-full bg-maroon flex items-center justify-center shrink-0 
                           ring-2 ring-transparent transition-all duration-300 
                           group-hover:ring-gold/40 group-hover:scale-105"
              >
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

            {/* Bottom accent line — slides in on hover */}
            <span
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold 
                         transition-all duration-500 group-hover:w-full"
              aria-hidden
            />
          </article>
        ))}
      </div>
    </section>
  );
}