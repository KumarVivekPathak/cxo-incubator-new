import { useInView } from "../../hooks/useInView";

interface Props {
  title: string;
  description: string;
  experiencing: string[];
}

export default function LeadershipPattern({
  title,
  description,
  experiencing,
}: Props) {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>(0.15);
  const fadeUp = (v: boolean) => (v ? "animate-fade-in-up" : "opacity-0");

  return (
    <section
      ref={sectionRef}
      className="bg-cream px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 overflow-hidden"
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 mb-2 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "100ms" : undefined }}
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[2.5px] uppercase text-gold whitespace-nowrap">
          Your Leadership Pattern
        </span>
        <div className="flex-1 h-px bg-gold/30" />
      </div>

      <h2
        className={`text-lg sm:text-xl md:text-2xl font-bold text-maroon mb-6 sm:mb-8 ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "220ms" : undefined }}
      >
        What Your Scorecard is Really Telling You
      </h2>

      {/* Main card */}
      <div
        className={`bg-white border border-maroon p-5 sm:p-6 md:p-8 rounded-sm transition-shadow duration-500 hover:shadow-xl
                    ${fadeUp(sectionInView)}`}
        style={{ animationDelay: sectionInView ? "350ms" : undefined }}
      >
        {/* Inner label */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] sm:text-xs font-regular tracking-[2px] uppercase text-gold whitespace-nowrap">
            Your Specific Leadership Pattern
          </span>
          <div className="flex-1 h-px bg-gold" />
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-maroon mb-3 sm:mb-4">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-black/70 leading-relaxed mb-5">
          {description}
        </p>

        <p className="text-[11px] sm:text-xs font-bold tracking-[2px] uppercase text-black mb-3">
          What you are likely experiencing right now:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {experiencing.map((item, i) => (
            <div
              key={i}
              className={`border-l-2 border-maroon pl-3 py-2 bg-offwhite text-[11px] sm:text-xs text-black/65 leading-relaxed
                          transition-all duration-300 hover:border-l-4 hover:bg-cream hover:translate-x-0.5
                          ${sectionInView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: sectionInView
                  ? `${550 + i * 90}ms`
                  : undefined,
              }}
            >
              <span className="text-maroon font-bold mr-1">→</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}