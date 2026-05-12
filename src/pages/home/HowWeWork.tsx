import { useInView } from "../../hooks/useInView";

const PHILOSOPHY = {
  eyebrow: "How We Work",
  heading: "Transformation Isn't a Single Conversation. It's a Sustained Process.",
  description:
    `Insight without implementation is just information.<br />At CXO Incubator, we don't just identify your executive gaps; we walk the path with you to close them.<br />Our signature Hanson Handholding approach is a partnership designed for the critical "18 months" of your transition.<br />We provide real-time feedback, shadow your decision-making processes, and offer a safety net as you refine your new leadership identity.<br />It's not just coaching; it's co-piloting your ascent in your respective career.`,
};

const MODALITIES = [
  {
    number: "01",
    icon: "🧭",
    title: "1:1 Executive Coaching",
    description:
      "Personalised, confidential coaching sessions designed around your specific transition, role, and edge. Not generic advice — a thinking partner who sees you clearly and refuses to let you settle.",
    tag: "Personalised",
  },
  {
    number: "02",
    icon: "👥",
    title: "CXO Cohort Programs",
    description:
      "Structured peer cohorts of senior leaders walking the same path together. The relationships formed here routinely outlast the program by years, becoming a lifelong leadership network.",
    tag: "Peer Learning",
  },
  {
    number: "03",
    icon: "🏔",
    title: "Leadership Retreats",
    description:
      "Immersive multi-day retreats in carefully chosen settings — designed for the deep introspection, reset, and breakthroughs that cannot happen between back-to-back meetings.",
    tag: "Immersive",
  },
  {
    number: "04",
    icon: "📚",
    title: "Live Workshops & Masterclasses",
    description:
      "Hands-on, skill-building sessions on the specific capabilities the C-suite demands — executive presence, strategic decisions, board navigation, and the language of senior leadership.",
    tag: "Hands-on Learning",
  },
  {
    number: "05",
    icon: "🤝",
    title: "Mentorship & Handholding",
    description:
      "Continuous support between sessions. Real-world challenges don't wait for your next scheduled call — we walk alongside you through the moments that matter, not just the calendar ones.",
    tag: "Ongoing Support",
  },
  {
    number: "06",
    icon: "🌐",
    title: "Network & Community",
    description:
      "Lifetime access to the CXO Incubator community — a curated network of senior leaders, board members, and ecosystem partners who open doors you didn't know existed.",
    tag: "Lifelong Network",
  },
];

export default function HowWeWork() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>(0.15);
  const [gridRef, gridInView] = useInView<HTMLDivElement>(0.05);
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>(0.4);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      id="methodology"
      className="bg-cream px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-18 md:py-24 overflow-hidden scroll-mt-[80px]"
    >
      {/* ── Header ─────────────────────────────── */}
      <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <p
          className={`text-xs sm:text-md font-bold tracking-[2.5px] uppercase text-gold mb-3 sm:mb-4 ${fadeUp(
            headerInView
          )}`}
          style={{ animationDelay: headerInView ? "80ms" : undefined }}
        >
          {PHILOSOPHY.eyebrow}
        </p>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-maroon leading-snug mb-5 sm:mb-6 ${fadeUp(
            headerInView
          )}`}
          style={{ animationDelay: headerInView ? "180ms" : undefined }}
        >
          {PHILOSOPHY.heading}
        </h2>

        <p
          className={`text-base sm:text-md text-black/75 leading-relaxed max-w-2xl mx-auto ${fadeUp(
            headerInView
          )}`}
          style={{ animationDelay: headerInView ? "300ms" : undefined }}
        >
          {PHILOSOPHY.description}
        </p>
      </div>

      {/* ── Grid of modalities ──────────────────── */}
      <div
        ref={gridRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        {MODALITIES.map((m, i) => (
          <div
            key={m.number}
            className={`group relative bg-white border border-maroon/15 rounded-md p-6 sm:p-7
                        transition-all duration-300
                        hover:border-maroon hover:shadow-xl hover:-translate-y-1
                        ${gridInView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{
              animationDelay: gridInView ? `${200 + i * 100}ms` : undefined,
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md" />

            {/* Number */}
            <p className="text-[10px] font-bold tracking-[2.5px] text-gold mb-3">
              {m.number}
            </p>

            {/* Icon */}
            <div className="w-12 h-12 rounded-md bg-maroon/5 flex items-center justify-center mb-4 text-2xl transition-all duration-300 group-hover:bg-maroon group-hover:scale-110">
              <span className="group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-maroon mb-3 leading-snug transition-colors duration-300 group-hover:text-gold-dark">
              {m.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-black/75 leading-relaxed mb-5">
              {m.description}
            </p>

            {/* Tag */}
            <span className="inline-block text-[9.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 border border-maroon/30 text-maroon/80 rounded-full transition-all duration-300 group-hover:border-gold group-hover:text-gold-dark">
              {m.tag}
            </span>
          </div>
        ))}
      </div>

      {/* ── Bottom CTA strip ───────────────────── */}
      <div
        ref={ctaRef}
        className={`max-w-3xl mx-auto mt-14 sm:mt-16 text-center ${fadeUp(
          ctaInView
        )}`}
        style={{ animationDelay: ctaInView ? "100ms" : undefined }}
      >
        <p className="text-sm sm:text-base text-black/75 italic font-serif leading-relaxed mb-6 sm:mb-7">
          "The leaders who shift into the C-suite don't do it through a single
          intervention. They do it through layered, sustained work — with people
          who don't let them quit on themselves."
        </p>

        <a
          href="/scorecard"
          className="inline-block bg-maroon text-white text-xs sm:text-sm font-bold tracking-[2px] uppercase
                     px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                     transition-all duration-300
                     hover:bg-deep-maroon hover:scale-[1.02] hover:shadow-lg"
        >
          Take the Scorecard →
        </a>
      </div>
    </section>
  );
}