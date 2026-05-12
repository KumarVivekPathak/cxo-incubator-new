import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";


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
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.15);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  // Timing constants — tweak in one place
  const CHIP_START = 550;
  const CHIP_STEP = 60;
  const POST_CHIPS = CHIP_START + DIMENSIONS.length * CHIP_STEP; // ~970ms

  return (
    <section
      ref={sectionRef}
      className="bg-maroon px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-16 md:py-20 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Label */}
      <p
        className={`text-[10px] font-bold tracking-[3px] uppercase text-gold/75 mb-5 sm:mb-6 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "80ms" : undefined }}
      >
        Free · Research-Backed · Instant
      </p>

      {/* Heading */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-1 sm:mb-2 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "200ms" : undefined }}
      >
        What Is Your
      </h2>
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gold leading-snug mb-6 sm:mb-8 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "320ms" : undefined }}
      >
        CXO Readiness Score?
      </h2>

      {/* Body */}
      <p
        className={`text-[13px] sm:text-sm text-offwhite leading-relaxed max-w-md mb-8 sm:mb-10 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "440ms" : undefined }}
      >
        Most senior professionals are one or two coachable steps away from the
        C-suite — and have no idea which ones. This scorecard shows you exactly
        where you stand across 7 dimensions of executive leadership.
      </p>

      {/* Dimension chips */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-2xl">
        {DIMENSIONS.map((d, i) => (
          <span
            key={d}
            className={`text-xs sm:text-sm font-base px-3 sm:px-4 py-1.5 sm:py-2 border border-gold text-gold rounded-full
                        transition-all duration-300 cursor-default
                        hover:bg-gold hover:text-maroon hover:scale-105
                        ${sectionInView ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{
              animationDelay: sectionInView
                ? `${CHIP_START + i * CHIP_STEP}ms`
                : undefined,
            }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        to="/scorecard"
        className={`relative overflow-hidden group px-8 sm:px-14 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-[2px] uppercase bg-gold-dark text-white mb-4 sm:mb-5
                    transition-transform duration-300 hover:scale-[1.03] rounded-full
                    ${fadeUp(sectionInView)}`}
        style={{
          animationDelay: sectionInView ? `${POST_CHIPS + 80}ms` : undefined,
        }}
      >
        <span className="relative z-10">Take the Free Scorecard Now →</span>
        <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </Link>

      {/* Fine print */}
      <p
        className={`text-[10px] text-white/70 tracking-wide px-2 ${
          sectionInView ? "animate-fade-in" : "opacity-0"
        }`}
        style={{
          animationDelay: sectionInView ? `${POST_CHIPS + 220}ms` : undefined,
        }}
      >
        Takes 8 minutes · Completely confidential · Instant personalised results
      </p>
    </section>
  );
}