import { useInView } from "../../hooks/useInView";
import RadhikaImage from "../../assets/RadhikaCXO.jpeg";

const TAGS = [
  "Executive Coaching",
  "C-Suite Transitions",
  "Leadership Identity",
  "CA · Banker · Coach",
  "6 Countries",
  "18 Batches",
];

const STEPS = [
  {
    number: "1",
    title: "Take the Scorecard",
    desc: "Free. 8 minutes. Instantly reveals your 7-dimension CXO readiness profile and your specific growth edges.",
  },
  {
    number: "2",
    title: "Get Your Results",
    desc: "A personalised report that names your pattern — not generic advice, but a mirror that shows exactly what's holding you back.",
  },
  {
    number: "3",
    title: "Connect With Us",
    desc: "A brief, confidential conversation with our team to map your personalised coaching journey from where you are right now.",
  },
  {
    number: "4",
    title: "Lead With Purpose",
    desc: "Join a cohort of leaders who are done waiting to be noticed — and are ready to step into the version of themselves always possible.",
  },
];

export default function AboutAndProcess() {
  const [aboutRef, aboutInView] = useInView<HTMLDivElement>(0.15);
  const [processRef, processInView] = useInView<HTMLDivElement>(0.15);

  const fadeUp = (visible: boolean) =>
    visible ? "animate-fade-in-up" : "opacity-0";

  return (
    <>
      {/* ══════════════════════════════════
          SECTION 1 — Coach / About
      ══════════════════════════════════ */}
      <section
        ref={aboutRef}
        className="bg-cream px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Photo */}
          <div
            className={`shrink-0 w-[180px] h-[240px] bg-maroon flex items-center justify-center mx-auto md:mx-0
                        transition-transform duration-500 hover:scale-[1.02] hover:shadow-xl
                        ${aboutInView ? "animate-fade-in-scale" : "opacity-0"}`}
            style={{ animationDelay: aboutInView ? "100ms" : undefined }}
          >
            <img src={RadhikaImage} alt="Radhika Balakrishnan" />
          </div>

          {/* Content */}
          <div className="flex-1 w-full">
            {/* Label */}
            <p
              className={`text-[9.5px] font-bold tracking-[2.5px] uppercase text-gold mb-4 ${fadeUp(aboutInView)}`}
              style={{ animationDelay: aboutInView ? "200ms" : undefined }}
            >
              The Coach Behind the Program
            </p>

            {/* Heading */}
            <h2
              className={`text-2xl sm:text-3xl font-bold text-maroon leading-snug mb-5 ${fadeUp(aboutInView)}`}
              style={{ animationDelay: aboutInView ? "320ms" : undefined }}
            >
              From CA to Banker to Coach —{" "}
              <br className="hidden sm:block" />
              The Long Way to Purpose
            </h2>

            {/* Blockquote */}
            <div
              className={`group flex gap-3 items-start mb-5 border-l-[3px] border-gold pl-4 transition-all duration-500 hover:border-l-[5px] ${fadeUp(aboutInView)}`}
              style={{ animationDelay: aboutInView ? "440ms" : undefined }}
            >
              <p className="text-sm italic font-serif text-maroon leading-relaxed">
                "I took the long way to my purpose so my clients don't have to."
              </p>
            </div>

            {/* Body */}
            <p
              className={`text-sm text-black/85 leading-relaxed mb-4 ${fadeUp(aboutInView)}`}
              style={{ animationDelay: aboutInView ? "560ms" : undefined }}
            >
              Radhika's path — from Chartered Accountant to banker to executive
              coach — is not a detour. It is her greatest coaching asset. She has
              lived the transitions her clients face: the identity shifts, the
              career pivots, the quiet moments of wondering if the sacrifices are
              worth it.
            </p>

            <p
              className={`text-sm text-black/85 leading-relaxed mb-8 ${fadeUp(aboutInView)}`}
              style={{ animationDelay: aboutInView ? "660ms" : undefined }}
            >
              Today, she works with senior executives and founders across India,
              the Middle East, and beyond — not as a consultant who advises from
              the outside, but as a thinking partner who sits in the room with
              them and refuses to let them settle for less than they are capable of.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className={`text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 border border-maroon text-maroon rounded-full
                              transition-all duration-300 cursor-default
                              hover:bg-maroon hover:text-gold hover:scale-105
                              ${aboutInView ? "animate-fade-in-scale" : "opacity-0"}`}
                  style={{
                    animationDelay: aboutInView
                      ? `${800 + i * 60}ms`
                      : undefined,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SECTION 2 — Process Steps
      ══════════════════════════════════ */}
      <section
        ref={processRef}
        className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden"
      >
        {/* Header */}
        <p
          className={`text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-3 sm:mb-4 ${fadeUp(processInView)}`}
          style={{ animationDelay: processInView ? "80ms" : undefined }}
        >
          Your Pathway
        </p>
        <h2
          className={`text-2xl sm:text-3xl font-bold text-maroon mb-10 sm:mb-14 ${fadeUp(processInView)}`}
          style={{ animationDelay: processInView ? "180ms" : undefined }}
        >
          How This Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STEPS.map((step, i) => {
            // Mobile (2 cols, 2 rows)
            const mobileBorderR = i % 2 === 0;       // items 0, 2
            const mobileBorderB = i < 2;             // items 0, 1
            // Desktop (4 cols, 1 row)
            const desktopBorderR = i < STEPS.length - 1; // items 0, 1, 2

            const borderClasses = [
              "border-maroon/10",
              mobileBorderR ? "border-r" : "",
              mobileBorderB ? "border-b md:border-b-0" : "",
              desktopBorderR ? "md:border-r" : "md:border-r-0",
            ].join(" ");

            return (
              <div
                key={step.number}
                className={`group flex flex-col items-center text-center px-4 sm:px-6 py-6
                            ${borderClasses}
                            ${processInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  animationDelay: processInView
                    ? `${300 + i * 120}ms`
                    : undefined,
                }}
              >
                {/* Number circle */}
                <div className="w-11 h-11 rounded-full bg-maroon flex items-center justify-center mb-4 sm:mb-5 shrink-0
                                ring-2 ring-transparent transition-all duration-300
                                group-hover:ring-gold/40 group-hover:scale-110">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <p className="text-sm font-bold text-maroon mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-gold-dark">
                  {step.title}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}