import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";


const SCORECARD_ITEMS = [
  "Purpose Clarity",
  "Leadership Mindset",
  "Executive Presence",
  "Emotional Resilience",
  "Learning Agility · Ecosystem",
];

const STATS = [
  { value: "250+", label: "Leaders Coached" },
  { value: "18", label: "Cohort Batches" },
  { value: "6", label: "Countries" },
  { value: "4+", label: "Years of Impact" },
];

export default function ScorecardItems() {
  const [heroRef, heroInView] = useInView<HTMLDivElement>(0.05);
  const [statsRef, statsInView] = useInView<HTMLDivElement>(0.3);

  // Helper — class string for fade-in-up tied to a visibility flag
  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <section className="flex flex-col">
      {/* ─── HERO ─── */}
      <div
        ref={heroRef}
        className="bg-maroon flex items-center min-h-[calc(100vh-64px)] py-12 lg:py-0 overflow-hidden"
      >
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12">

          {/* ─── LEFT CONTENT ─── */}
          <div className="w-full max-w-lg">
            {/* Badge */}
            <p
              className={`text-sm sm:text-md font-bold tracking-tight uppercase text-gold-dark mb-6 sm:mb-8 ${fadeUp(heroInView)}`}
              style={{ animationDelay: heroInView ? "100ms" : undefined }}
            >
              18 Batches · 6 Countries · 4 Years
            </p>

            {/* Headline */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-5 sm:mb-6 ${fadeUp(heroInView)}`}
              style={{ animationDelay: heroInView ? "220ms" : undefined }}
            >
              Your promotion to  

               <br className="hidden lg:block" />
               a <span className="text-gold">leadership role</span>
              <br />
              is closer than you think. 
            </h1>

            {/* Body */}
            <p
              className={`text-white/80 text-sm leading-relaxed mb-8 sm:mb-10 ${fadeUp(heroInView)}`}
              style={{ animationDelay: heroInView ? "380ms" : undefined }}
            >
              Many senior professionals feel stuck in their career without access to strategic mentorship and nuanced coaching, hindering their advancement. Their technical mastery is no longer enough to reach the next level, and the strategic roadmap to the C-suite remains invisible. 
              <br/>
              This is where CXO Incubator comes in to be your executive leadership partner. We have helped 250+ global leaders identify and bridge the gap between where they are and where they aspire to be. 
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:flex-wrap ${fadeUp(heroInView)}`}
              style={{ animationDelay: heroInView ? "520ms" : undefined }}
            >
              <Link
                to="/scorecard"
                className="relative overflow-hidden group p-3 text-xs sm:text-sm tracking-[2px] uppercase bg-gold-dark text-white text-center rounded-full transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Take Free Scorecard →</span>
                <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <button className="p-3 text-xs sm:text-sm tracking-[2px] uppercase border border-white text-white hover:border-white/50 hover:bg-white/5 transition rounded-full">
                See Transformations
              </button>
            </div>
          </div>

          {/* ─── RIGHT CARD ─── */}
          <div
            className={`w-full lg:w-80 lg:shrink-0 bg-white shadow-xl border border-gold/20 rounded-lg border-t-3 border-t-gold transition-shadow duration-500 hover:shadow-2xl
              ${heroInView ? "animate-fade-in-right" : "opacity-0"}`}
            style={{ animationDelay: heroInView ? "450ms" : undefined }}
          >
            <div className="p-6 sm:p-7 flex flex-col">
              {/* Meta */}
              <p className="text-xs font-regular text-gold mb-4 sm:mb-5">
                Free · 8 Minutes · Instant Results
              </p>

              {/* Heading */}
              <h2 className="text-maroon font-bold text-base sm:text-[16px] mb-3">
                Your CXO Readiness Scorecard
              </h2>

              {/* Description */}
              <p className="text-sm text-black/80 mb-5">
                Know exactly where you stand across 7 research-backed dimensions.
              </p>

              {/* List */}
              <ul className="flex flex-col gap-2 mb-6">
                {SCORECARD_ITEMS.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-center gap-2 text-sm text-black/80 transition-transform duration-300 hover:translate-x-1 ${heroInView ? "animate-fade-in" : "opacity-0"}`}
                    style={{
                      animationDelay: heroInView
                        ? `${700 + i * 80}ms`
                        : undefined,
                    }}
                  >
                    <span className="w-[5px] h-[5px] rounded-full bg-gold-dark shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Stats inside card */}
              <div className="grid grid-cols-3 border-t border-maroon/40 pt-4 mb-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-maroon">21</p>
                  <p className="text-[10px] sm:text-xs uppercase text-black/70 mt-1">
                    Questions
                  </p>
                </div>

                <div className="text-center border-x border-maroon/10">
                  <p className="text-lg font-bold text-maroon">7</p>
                  <p className="text-[10px] sm:text-xs uppercase text-black/70 mt-1">
                    Dimensions
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-maroon">Free</p>
                  <p className="text-[10px] sm:text-xs uppercase text-black/70 mt-1">
                    Always
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/scorecard"
                className="relative overflow-hidden group text-center py-3 text-sm font-medium tracking-[2px] uppercase bg-gold-dark text-white rounded-full transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10">Begin My Scorecard →</span>
                <span className="absolute inset-0 bg-gold-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM STATS BAR ─── */}
      <div ref={statsRef} className="w-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => {
            const mobileBorderR = i % 2 === 0;
            const mobileBorderB = i < 2;
            const desktopBorderR = i < STATS.length - 1;

            return (
              <div
                key={stat.label}
                className={[
                  "group flex flex-col items-center py-6 border-maroon/10 transition-colors duration-300 hover:bg-cream/40",
                  mobileBorderR ? "border-r" : "",
                  mobileBorderB ? "border-b md:border-b-0" : "",
                  desktopBorderR ? "md:border-r" : "md:border-r-0",
                  statsInView ? "animate-fade-in-up" : "opacity-0",
                ].join(" ")}
                style={{
                  animationDelay: statsInView ? `${i * 100}ms` : undefined,
                }}
              >
                <span className="text-xl sm:text-2xl font-bold text-maroon transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </span>
                <span className="text-[9px] tracking-[2px] uppercase text-black/35 mt-1 text-center px-2">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}