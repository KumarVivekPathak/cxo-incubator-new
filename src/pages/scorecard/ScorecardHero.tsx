import { Link } from "react-router-dom";

const PILLS = [
  "Free Assessment",
  "Research-Backed",
  "Personalised Results",
  "Takes 8 Minutes",
];

export default function ScorecardHero() {
  return (
    <section className="min-h-[80vh] bg-maroon flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Label with lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gold" />
          <p className="text-xs font-bold tracking-[4px] uppercase text-gold">
            Know Your Starting Point
          </p>
          <div className="h-px w-12 bg-gold" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Your{" "}
          <span className="italic text-gold font-serif">CXO Readiness</span>
          <br />
          Scorecard
        </h1>

        {/* Stats */}
        <p className="text-xs font-base tracking-[3px] text-white mb-6">
          7 Dimensions · 21 Questions · Instant Results
        </p>

        {/* Body */}
        <p className="text-md text-white leading-relaxed max-w-xl mx-auto mb-10">
          Most senior professionals are closer to the C-suite than they realise —
          and held back by two or three specific, coachable gaps. This assessment
          reveals exactly which ones.
        </p>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PILLS.map((p) => (
            <span
              key={p}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-gold text-sm text-gold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {p}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to=""
          className="inline-block relative overflow-hidden group px-12 py-4 text-sm font-bold tracking-[2.5px] uppercase bg-gold-dark text-white rounded-full"
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