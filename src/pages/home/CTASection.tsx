import { Link } from "react-router-dom";

const DIMENSIONS = [
  "Purpose Clarity",
  "Leadership Mindset",
  "Executive Presence",
  "Emotional Resilience",
  "Learning Agility",
  "Ecosystem",
  "Strategic Decisions",
];

export default function CTASection() {
  return (
    <section className="bg-maroon px-12 md:px-20 py-20 flex flex-col items-center text-center">

      {/* Label */}
      <p className="text-[10px] font-bold tracking-[3px] uppercase text-gold/75 mb-6">
        Free · Research-Backed · Instant
      </p>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-2">
        What Is Your
      </h2>
      <h2 className="text-3xl md:text-4xl font-bold text-gold leading-snug mb-8">
        CXO Readiness Score?
      </h2>

      {/* Body */}
      <p className="text-[13px] text-offwhite leading-relaxed max-w-md mb-10">
        Most senior professionals are one or two coachable gaps away from the
        C-suite — and have no idea which ones. This scorecard shows you exactly
        where you stand across 7 dimensions of executive leadership.
      </p>

      {/* Dimension chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {DIMENSIONS.map((d) => (
          <span
            key={d}
            className="text-sm font-base px-4 py-2 border border-gold text-gold"
          >
            {d}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        to="/scorecard"
        className="relative overflow-hidden group px-14 py-4 text-sm font-bold uppercase bg-gold-dark text-white mb-5"
      >
        <span className="relative z-10">Take the Free Scorecard Now →</span>
        <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </Link>

      {/* Fine print */}
      <p className="text-[10px] text-white/70 tracking-wide">
        Takes 8 minutes · Completely confidential · Instant personalised results
      </p>

    </section>
  );
}