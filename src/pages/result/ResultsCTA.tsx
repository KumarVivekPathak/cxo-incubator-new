export default function ResultsCTA() {
    return (
      <section className="bg-maroon px-6 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-white mb-1">
          Ready to Close the Gap?
        </h2>
        <h2 className="font-serif text-2xl font-bold italic text-gold mb-5">
          Connect With Our Team.
        </h2>
        <p className="text-xs text-white/80 max-w-sm mx-auto leading-relaxed mb-8">
          Your scorecard is just the starting point. A brief, confidential
          conversation with our team will show you exactly what your personalised
          CXO journey looks like — and whether My CXO Axis or the Incubator is
          the right next step for you right now.
        </p>
  
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button className="relative overflow-hidden group px-8 py-3.5 text-xs font-bold tracking-[2px] uppercase bg-gold-dark text-white rounded-full">
            <span className="relative z-10">Connect With Our Team →</span>
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          <button className="flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[1.5px] uppercase border border-white text-white hover:border-white/70 transition-colors duration-200 rounded-full">
            💬 WhatsApp Us
          </button>
        </div>
  
        <p className="text-xs text-white mt-5 tracking-wide">
          30 minutes · Completely confidential · No commitment required
        </p>
      </section>
    );
  }