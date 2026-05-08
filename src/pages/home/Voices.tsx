import { useInView } from "../../hooks/useInView";

const VOICES = [
  {
    quote:
      "Leadership is not a title. It is a decision you make every day — about who you are, what you stand for, and how you serve those around you. The CXO Incubator creates the space for that decision to be made with full clarity and conviction.",
    name: "Dr. Kiran Bedi",
    title:
      "India's First Female IPS Officer · Former Lt. Governor, Puducherry · Ramon Magsaysay Award Winner",
  },
  {
    quote:
      "The difference between leaders who make it to the top and those who stay just below it is rarely about capability. It is about clarity, conviction, and the quality of the community around them. This program builds all three.",
    name: "Harsh Mariwala",
    title:
      "Founder & Chairman, Marico Limited · Founder, ASCENT Foundation · Forbes India Top 50",
  },
  {
    quote:
      "Great leaders are not born in boardrooms. They are shaped in communities that demand honesty, model excellence, and refuse to let you settle for less than your full potential. That is precisely what this program does.",
    name: "Harish Bhat",
    title:
      "Brand Custodian, Tata Sons · Author · Marketing & Leadership Thinker",
  },
  {
    quote:
      'Chanakya said: "Before you act, learn. Before you speak, listen. Before you react, think." The CXO Incubator embodies this philosophy — it creates leaders who act from wisdom, not just ambition.',
    name: "Dr. Radhakrishnan Pillai",
    title:
      "Author, Corporate Chanakya · Director, Chanakya Institute of Public Leadership",
  },
];

const FEATURED = {
  initials: "RA",
  quote:
    "The most underinvested asset in most organisations is the leadership pipeline between Senior Management and the C-suite. The gap is not skill — it is identity, mindset, and the confidence to lead from conviction rather than compliance. The CXO Incubator closes exactly that gap.",
  name: "Dr. Ritu Anand",
  title:
    "Former Chief Leadership Officer, Tata Consultancy Services (TCS) · Talent & Leadership Development Expert",
};

export default function Voices() {
  const [topRef, topInView] = useInView<HTMLDivElement>(0.1);
  const [featuredRef, featuredInView] = useInView<HTMLDivElement>(0.2);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      ref={topRef}
      className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* ── Header ── */}
      <p
        className={`text-[10px] font-base tracking-[2.5px] uppercase text-gold mb-3 ${fadeUp(topInView)}`}
        style={{ animationDelay: topInView ? "80ms" : undefined }}
      >
        Voices That Matter
      </p>

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-maroon leading-snug max-w-lg mb-3 ${fadeUp(topInView)}`}
        style={{ animationDelay: topInView ? "180ms" : undefined }}
      >
        When India's Finest Leaders{" "}
        <br className="hidden md:block" />
        Take Notice
      </h2>

      <p
        className={`text-xs sm:text-[13px] text-black/70 leading-relaxed max-w-lg mb-10 sm:mb-12 ${fadeUp(topInView)}`}
        style={{ animationDelay: topInView ? "320ms" : undefined }}
      >
        These aren't testimonials. These are endorsements from people who have
        spent their careers in rooms where leadership is built, not claimed.
      </p>

      {/* ── 2x2 Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border border-maroon">
        {VOICES.map((v, i) => {
          // Mobile (1 col): every item except last gets border-b
          const isLastMobile = i === VOICES.length - 1;
          // Desktop (2 col): top row keeps border-b, bottom row removes it; left col gets border-r
          const isTopRowDesktop = i < 2;
          const isLeftColDesktop = i % 2 === 0;

          const borderClasses = [
            !isLastMobile ? "border-b border-maroon" : "",
            !isTopRowDesktop ? "md:border-b-0" : "md:border-b md:border-maroon",
            isLeftColDesktop ? "md:border-r md:border-maroon" : "",
          ].join(" ");

          return (
            <div
              key={v.name}
              className={`group relative p-6 sm:p-8 flex flex-col bg-white transition-colors duration-300 hover:bg-cream/40
                          ${borderClasses}
                          ${topInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: topInView ? `${500 + i * 110}ms` : undefined,
              }}
            >
              {/* Quote mark */}
              <span
                className="text-4xl font-serif text-maroon leading-none mb-5 sm:mb-6 select-none transition-transform duration-300 group-hover:scale-110 origin-left"
                aria-hidden
              >
                "
              </span>

              {/* Quote */}
              <p className="text-sm italic font-serif text-black leading-relaxed flex-1 mb-6">
                {v.quote}
              </p>

              {/* Gold accent line — extends on hover */}
              <div className="w-8 h-[2px] bg-gold mb-4 transition-all duration-500 group-hover:w-16" />

              {/* Person */}
              <p className="text-xs sm:text-xs font-bold text-maroon mb-1">
                {v.name}
              </p>
              <p className="text-[11px] sm:text-xs text-black/80 leading-relaxed">
                {v.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Featured Wide Card ── */}
      <div
        ref={featuredRef}
        className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 bg-cream border border-maroon p-6 sm:p-8 mt-10 sm:mt-12 transition-shadow duration-500 hover:shadow-xl group
                    ${featuredInView ? "animate-fade-in-up" : "opacity-0"}`}
      >
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full bg-maroon flex items-center justify-center shrink-0 ring-2 ring-transparent transition-all duration-500 group-hover:ring-gold/40 group-hover:scale-105 self-start sm:self-auto"
        >
          <span className="text-xs font-bold text-gold">
            {FEATURED.initials}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs italic font-serif text-black leading-relaxed mb-5">
            {FEATURED.quote}
          </p>

          {/* Gold line — extends on hover */}
          <div className="w-8 h-1 bg-gold mb-4 transition-all duration-500 group-hover:w-16" />

          <p className="text-sm font-bold text-maroon mb-1">{FEATURED.name}</p>
          <p className="text-xs text-black/80">{FEATURED.title}</p>
        </div>
      </div>
    </section>
  );
}