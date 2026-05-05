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
      title: "Brand Custodian, Tata Sons · Author · Marketing & Leadership Thinker",
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
    return (
      <section className="bg-white px-12 md:px-20 py-16">
  
        {/* ── Header ── */}
        <p className="text-[10px] font-base tracking-[2.5px] uppercase text-gold">
          Voices That Matter
        </p>
  
        <h2 className="text-3xl md:text-4xl font-bold text-maroon leading-snug max-w-lg">
          When India's Finest Leaders <br /> Take Notice
        </h2>
  
        <p className="text-xs text-black/70 leading-relaxed max-w-lg mb-12">
          These aren't testimonials. These are endorsements from people who have
          spent their careers in rooms where leadership is built, not claimed.
        </p>
  
        {/* ── 2x2 Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-maroon/10 mb-0">
          {VOICES.map((v, i) => (
            <div
              key={v.name}
              className={`p-8 flex flex-col ${
                i < 2 ? "border-b border-maroon/10" : ""
              } ${
                i % 2 === 0 ? "border-r border-maroon/10" : ""
              }`}
            >
              {/* Quote mark */}
              <span className="text-4xl font-serif text-maroon leading-none mb-6 select-none">
                "
              </span>
  
              {/* Quote */}
              <p className="text-sm italic font-serif text-black leading-relaxed flex-1 mb-6">
                {v.quote}
              </p>
  
              {/* Gold line */}
              <div className="w-8 h-[2px] bg-gold mb-4" />
  
              {/* Person */}
              <p className="text-xs font-bold text-maroon mb-1">{v.name}</p>
              <p className="text-xs text-black leading-relaxed">{v.title}</p>
            </div>
          ))}
        </div>
  
        {/* ── Featured Wide Card ── */}
        <div className="flex items-center gap-10 bg-cream border border-t border-maroon/10 p-8 mt-12  ">
  
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-maroon flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-gold">
              {FEATURED.initials}
            </span>
          </div>
  
          {/* Content */}
          <div className="flex-1">
            <p className="text-xs italic font-serif text-black/60 leading-relaxed mb-5">
              {FEATURED.quote}
            </p>
  
            {/* Gold line */}
            <div className="w-8 h-[2px] bg-gold mb-4" />
  
            <p className="text-xs font-bold text-maroon mb-1">{FEATURED.name}</p>
            <p className="text-[10px] text-black/38">{FEATURED.title}</p>
          </div>
        </div>
  
      </section>
    );
  }