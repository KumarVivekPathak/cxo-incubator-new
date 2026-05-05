import { Link } from "react-router-dom";

const SCORECARD_ITEMS = [
  "Purpose Clarity",
  "Leadership Mindset",
  "Executive Presence",
  "Emotional Resilience",
  "Learning Agility · Ecosystem",
];

export default function ScorecardItems() {
  return (
    <section className="relative bg-maroon min-h-[calc(100vh-64px)] flex items-center">

      {/* ─── CONTAINER (IMPORTANT FIX) ─── */}
      <div className="w-full flex items-center justify-between px-6 md:px-12 ">

        {/* ─── LEFT CONTENT ─── */}
        <div className="max-w-lg">

          {/* Badge */}
          <p className="text-sm font-bold tracking-tight uppercase text-gold/80 mb-8">
            18 Batches · 6 Countries · 4 Years
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.15] mb-6">
            Become the Leader <br />
            You{" "}
            <span className="text-gold">Already Are</span>
            <br />
            But Haven't <br />
            Stepped Into Yet.
          </h1>

          {/* Body */}
          <p className="text-white/80 text-sm leading-relaxed mb-10">
            Most senior professionals are one or two coachable gaps away from
            the C-suite. The CXO Incubator has helped 250+ leaders across 6
            countries find — and close — exactly those gaps.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/scorecard"
              className="relative overflow-hidden group p-3 text-sm tracking-[2px] uppercase bg-gold-dark text-white"
            >
              <span className="relative z-10">
                Take Free Scorecard →
              </span>
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <button className="p-3 text-sm tracking-[2px] uppercase border border-white/25 text-white/70 hover:border-white/50 hover:text-white transition">
              See Transformations
            </button>
          </div>
        </div>

        {/* ─── RIGHT CARD ─── */}
        <div className="w-80 bg-white shadow-xl border border-[#C49A3C]/20 rounded-lg border-t-3 border-t-gold">

          <div className="p-7 flex flex-col">

            {/* Meta */}
            <p className="text-xs font-regular text-gold mb-5">
              Free · 8 Minutes · Instant Results
            </p>

            {/* Heading */}
            <h2 className="text-[#6B1A1A] font-bold text-[16px] mb-3">
              Your CXO Readiness Scorecard
            </h2>

            {/* Description */}
            <p className="text-sm text-black/80 mb-5">
              Know exactly where you stand across 7 research-backed dimensions.
            </p>

            {/* List */}
            <ul className="flex flex-col gap-2 mb-6">
              {SCORECARD_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-black/80">
                  <span className="w-[5px] h-[5px] rounded-full bg-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-3 border-t border-maroon/40 pt-4 mb-6">
              <div className="text-center">
                <p className="text-lg font-bold text-maroon">21</p>
                <p className="text-xs uppercase text-black/70 mt-1">
                  Questions
                </p>
              </div>

              <div className="text-center border-x border-[#6B1A1A]/10">
                <p className="text-lg font-bold text-maroon">7</p>
                <p className="text-xs uppercase text-black/70 mt-1">
                  Dimensions
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold text-maroon">Free</p>
                <p className="text-xs uppercase text-black/70 mt-1">
                  Always
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/scorecard"
              className="relative overflow-hidden group text-center py-3 text-sm font-medium tracking-[2px] uppercase bg-gold-dark text-white rounded-lg"
            >
              <span className="relative z-10">
                Begin My Scorecard →
              </span>
              <span className="absolute inset-0 bg-gold-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}