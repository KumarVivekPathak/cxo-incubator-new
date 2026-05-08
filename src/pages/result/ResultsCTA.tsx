import { useInView } from "../../hooks/useInView";

export default function ResultsCTA() {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.15);
  const fadeUp = (v: boolean) => (v ? "animate-fade-in-up" : "opacity-0");

  return (
    <section
      ref={sectionRef}
      className="bg-maroon px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-20 text-center relative overflow-hidden"
    >
      {/* Soft gold glows */}
      <div
        className="absolute -top-32 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-2xl mx-auto">
        {/* Heading line 1 */}
        <h2
          className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "100ms" : undefined }}
        >
          Ready to Close the Gap?
        </h2>

        {/* Heading line 2 */}
        <h2
          className={`font-serif text-xl sm:text-2xl md:text-3xl font-bold italic text-gold mb-5 sm:mb-6 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "240ms" : undefined }}
        >
          Connect With Our Team.
        </h2>

        {/* Body */}
        <p
          className={`text-xs sm:text-sm text-white/80 max-w-sm sm:max-w-md mx-auto leading-relaxed mb-7 sm:mb-8 ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "380ms" : undefined }}
        >
          Your scorecard is just the starting point. A brief, confidential
          conversation with our team will show you exactly what your personalised
          CXO journey looks like — and whether My CXO Axis or the Incubator is
          the right next step for you right now.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:flex-wrap ${fadeUp(sectionInView)}`}
          style={{ animationDelay: sectionInView ? "520ms" : undefined }}
        >
          <button className="relative overflow-hidden group px-7 sm:px-8 py-3.5 text-xs font-bold tracking-[2px] uppercase bg-gold-dark text-white rounded-full transition-transform duration-300 hover:scale-[1.03]">
            <span className="relative z-10">Connect With Our Team →</span>
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          <button className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-xs font-semibold tracking-[1.5px] uppercase border border-white text-white hover:bg-white/5 hover:border-white/70 transition-all duration-200 rounded-full">
            💬 WhatsApp Us
          </button>
        </div>

        {/* Fine print */}
        <p
          className={`text-[11px] sm:text-xs text-white/80 mt-5 tracking-wide ${
            sectionInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: sectionInView ? "680ms" : undefined }}
        >
          30 minutes · Completely confidential · No commitment required
        </p>
      </div>
    </section>
  );
}