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
    return (
      <>
        {/* ══════════════════════════════════
            SECTION 1 — Coach / About
        ══════════════════════════════════ */}
        <section className="bg-cream px-12 md:px-20 py-16">
          <div className="flex gap-12 items-start">
  
            {/* Photo placeholder */}
            <div className="shrink-0 w-[180px] h-[240px] bg-maroon flex items-center justify-center">
              <span className="text-white/20 text-sm tracking-widest">Photo</span>
            </div>
  
            {/* Content */}
            <div className="flex-1">
              {/* Label */}
              <p className="text-[9.5px] font-bold tracking-[2.5px] uppercase text-gold mb-4">
                The Coach Behind the Program
              </p>
  
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-maroon leading-snug mb-5">
                From CA to Banker to Coach — <br />
                The Long Way to Purpose
              </h2>
  
              {/* Blockquote */}
              <div className="flex gap-3 items-start mb-5 border-l-3 border-gold pl-4">
                <p className="text-sm italic font-serif text-maroon leading-relaxed">
                  "I took the long way to my purpose so my clients don't have to."
                </p>
              </div>
  
              {/* Body */}
              <p className="text-sm text-black leading-relaxed mb-4">
                Radhika's path — from Chartered Accountant to banker to executive
                coach — is not a detour. It is her greatest coaching asset. She has
                lived the transitions her clients face: the identity shifts, the
                career pivots, the quiet moments of wondering if the sacrifices are
                worth it.
              </p>
  
              <p className="text-sm text-black leading-relaxed mb-8">
                Today, she works with senior executives and founders across India,
                the Middle East, and beyond — not as a consultant who advises from
                the outside, but as a thinking partner who sits in the room with
                them and refuses to let them settle for less than they are capable of.
              </p>
  
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 border border-maroon text-maroon"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        <section className="bg-white px-12 md:px-20 py-16">
  
          {/* Header */}
          <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-gold mb-4">
            Your Pathway
          </p>
          <h2 className="text-3xl font-bold text-maroon mb-14">
            How This Works
          </h2>
  
          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col items-center text-center px-6 ${
                  i !== STEPS.length - 1
                    ? "border-r border-maroon/10"
                    : ""
                }`}
              >
                {/* Number circle */}
                <div className="w-11 h-11 rounded-full bg-maroon flex items-center justify-center mb-5 shrink-0">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>
  
                {/* Title */}
                <p className="text-sm font-bold text-maroon mb-3">
                  {step.title}
                </p>
  
                {/* Description */}
                <p className="text-sm text-black leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }