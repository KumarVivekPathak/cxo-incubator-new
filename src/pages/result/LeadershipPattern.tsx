interface Props {
    title: string;
    description: string;
    experiencing: string[];
  }
  
  export default function LeadershipPattern({ title, description, experiencing }: Props) {
    return (
      <section className="bg-cream px-6 md:px-12 py-12">
  
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold tracking-[2.5px] uppercase text-gold">
            Your Leadership Pattern
          </span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>
        <h2 className="text-xl font-bold text-maroon mb-6">
          What Your Scorecard is Really Telling You
        </h2>
  
        <div className="bg-white border border-maroon p-6 rounded-sm">
  
          {/* Inner label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-regular tracking-[2px] uppercase text-gold">
              Your Specific Leadership Pattern
            </span>
            <div className="flex-1 h-px bg-gold" />
          </div>
  
          <h3 className="text-md font-bold text-maroon mb-4">
            {title}
          </h3>
  
          <p className="text-sm text-black/70 leading-relaxed mb-5">
            {description}
          </p>
  
          <p className="text-xs font-bold tracking-[2px] uppercase text-black mb-3">
            What you are likely experiencing right now:
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {experiencing.map((item, i) => (
              <div
                key={i}
                className="border-l-2 border-maroon pl-3 py-2 bg-offwhite text-xs text-black/60 leading-relaxed"
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