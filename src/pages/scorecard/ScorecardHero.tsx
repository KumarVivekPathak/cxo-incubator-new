import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";

const PILLS = [
  "Free Assessment",
  "Research-Backed",
  "Personalised Results",
  "Takes 8 Minutes",
];

export default function ScorecardHero() {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.05);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] bg-maroon flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 text-center relative overflow-hidden"
    >
      {/* Decorative background glows */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Label with lines */}
        <div
          className={`flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 ${
            sectionInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: sectionInView ? "100ms" : undefined }}
        >
          <div className="h-px w-8 sm:w-12 bg-gold" />
          <p className="text-[10px] sm:text-xs font-bold tracking-[3px] sm:tracking-[4px] uppercase text-gold">
            Know Your Starting Point
          </p>
          <div className="h-px w-8 sm:w-12 bg-gold" />
        </div>

        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 sm:mb-6 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "250ms" : undefined }}
        >
          Your{" "}
          <span className="italic text-gold font-serif">CXO Readiness</span>
          <br />
          Scorecard
        </h1>

        {/* Stats */}
        <p
          className={`text-[11px] sm:text-xs font-base tracking-[2.5px] sm:tracking-[3px] text-white/90 mb-5 sm:mb-6 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "400ms" : undefined }}
        >
          7 Dimensions · 21 Questions · Instant Results
        </p>

        {/* Body */}
        <p
          className={`text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "520ms" : undefined }}
        >
          Most senior professionals are closer to the C-suite than they realise —
          and held back by two or three specific, coachable gaps. This assessment
          reveals exactly which ones.
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {PILLS.map((p, i) => (
            <span
              key={p}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gold text-xs sm:text-sm text-gold
                          transition-all duration-300 cursor-default
                          hover:bg-gold hover:text-maroon hover:scale-105
                          ${sectionInView ? "animate-fade-in-scale" : "opacity-0"}`}
              style={{
                animationDelay: sectionInView
                  ? `${650 + i * 90}ms`
                  : undefined,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {p}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to=""
          className={`inline-block relative overflow-hidden group px-10 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-[2px] sm:tracking-[2.5px] uppercase bg-gold-dark text-white rounded-full
                      transition-transform duration-300 hover:scale-[1.03]
                      ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "1100ms" : undefined }}
        >
          <span className="relative z-10">Begin My Scorecard →</span>
          <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
      </div>

      {/* Gold bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold" />
    </section>
  );
}