import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DIMENSIONS = [
  {
    id: "purpose", label: "Purpose", icon: "🧭",
    title: "Purpose Clarity",
    description: 'Your "why" is the compass that guides every great C-suite decision. This dimension reveals whether you lead from external validation — or from a deep, unshakeable internal purpose.',
    questions: [
      {
        text: "The last time you made a significant career move, what drove it most?",
        options: [
          "A deliberate step toward a bigger leadership mission I had already defined for myself",
          "A larger role with more scope and visibility",
          "A better salary or title — the opportunity was too good to pass up",
          "Escaping a difficult situation — boss, culture, or stagnation",
        ],
      },
      {
        text: "When you imagine yourself at your leadership peak, what does success look like?",
        options: [
          "A clearly articulated impact I've made on people, systems, or society",
          "A prestigious title and a seat at the most influential tables",
          "Financial freedom and the recognition of my peers",
          "I haven't thought that far ahead — I focus on what's in front of me",
        ],
      },
      {
        text: "How often do you consciously connect your daily decisions to a long-term leadership purpose?",
        options: [
          "Almost always — my purpose is my filter for every major decision",
          "Sometimes — when I step back and reflect",
          "Rarely — I'm mostly responding to what the role demands",
          "Never — purpose feels abstract compared to execution",
        ],
      },
    ],
  },
  {
    id: "leadership", label: "Leadership", icon: "👑",
    title: "Leadership Mindset",
    description: "The gap between a senior manager and a C-suite leader is rarely technical. This dimension assesses whether your mindset has made the shift.",
    questions: [
      {
        text: "When a team member underperforms, your first instinct is to:",
        options: [
          "Have an honest, direct conversation about impact and expectations",
          "Give them more time and check in more frequently",
          "Reassign the work to someone more reliable",
          "Escalate to HR or my manager",
        ],
      },
      {
        text: "How do you typically respond when your idea is rejected by leadership?",
        options: [
          "Seek to understand the reasoning and refine my thinking",
          "Accept it and move on, but internally question the decision",
          "Feel frustrated but keep it to myself",
          "Lose confidence in my ability to influence at this level",
        ],
      },
      {
        text: "How comfortable are you making high-stakes decisions with incomplete information?",
        options: [
          "Very comfortable — I use frameworks and instinct to move forward",
          "Moderately comfortable — I gather as much data as possible first",
          "Uncomfortable — I prefer consensus before deciding",
          "Very uncomfortable — uncertainty makes me delay",
        ],
      },
    ],
  },
  {
    id: "presence", label: "Presence", icon: "⚡",
    title: "Executive Presence",
    description: "Presence isn't performance. It's the quality of attention you command and the trust you generate before you say a word.",
    questions: [
      {
        text: "When you walk into a room of senior leaders, how do you typically feel?",
        options: [
          "Confident and ready — I belong here and have something to contribute",
          "Prepared but slightly aware of the hierarchy",
          "Cautious — I wait to read the room before contributing",
          "Anxious — I worry about being judged or dismissed",
        ],
      },
      {
        text: "How do peers and seniors typically describe your communication style?",
        options: [
          "Clear, direct, and influential — I move rooms",
          "Thorough and credible — people trust my analysis",
          "Collaborative and careful — I rarely ruffle feathers",
          "Reserved — I contribute when asked",
        ],
      },
    ],
  },
  {
    id: "resilience", label: "Resilience", icon: "🛡",
    title: "Emotional Resilience",
    description: "The higher you go, the more you absorb. This dimension reveals your capacity to lead under sustained pressure without losing clarity or compassion.",
    questions: [
      {
        text: "During a prolonged period of high pressure, how do you typically show up?",
        options: [
          "I remain largely steady — stress sharpens my focus",
          "I manage well but notice some irritability or withdrawal",
          "My performance dips and I need time to recover",
          "I struggle significantly and it affects my team",
        ],
      },
      {
        text: "When you receive critical feedback about your leadership, your first response is:",
        options: [
          "Curiosity — I want to understand and grow",
          "Defensiveness that I quickly regulate",
          "Self-doubt that takes a few days to shake",
          "Avoidance — I find critical feedback very difficult",
        ],
      },
    ],
  },
  {
    id: "agility", label: "Agility", icon: "🔄",
    title: "Learning Agility",
    description: "The C-suite demands perpetual reinvention. This dimension measures how quickly and comfortably you learn, unlearn, and adapt.",
    questions: [
      {
        text: "When entering a domain where you have limited expertise, you tend to:",
        options: [
          "Dive in with curiosity and actively seek mentors and frameworks",
          "Proceed carefully and rely on trusted team members",
          "Stick to what I know and delegate the unfamiliar",
          "Feel exposed and avoid situations where I might be wrong",
        ],
      },
      {
        text: "How often do you deliberately seek out perspectives that challenge your worldview?",
        options: [
          "Regularly — it's how I stay sharp",
          "Occasionally — when something forces me to",
          "Rarely — I prefer views that align with my experience",
          "Almost never — I trust my own judgment",
        ],
      },
    ],
  },
  {
    id: "ecosystem", label: "Ecosystem", icon: "🌐",
    title: "Ecosystem Intelligence",
    description: "C-suite leaders don't just manage organisations. They navigate ecosystems — boards, industries, governments, and communities of influence.",
    questions: [
      {
        text: "How deliberately do you invest in relationships outside your immediate organisation?",
        options: [
          "Very deliberately — I maintain a diverse network across sectors and geographies",
          "Moderately — I attend industry events and stay loosely connected",
          "Minimally — I focus on internal relationships",
          "Not at all — networking feels inauthentic to me",
        ],
      },
      {
        text: "How aware are you of the industry trends that will affect your organisation in 3–5 years?",
        options: [
          "Very aware — I actively study and discuss macro forces",
          "Somewhat aware — I follow the headlines",
          "Vaguely aware — I trust others to track this",
          "Not aware — I focus on what's in front of me",
        ],
      },
    ],
  },
  {
    id: "decisions", label: "Decisions", icon: "⚖",
    title: "Strategic Decisions",
    description: "At the C-suite, every decision carries consequences that ripple across the organisation. This dimension measures the quality and confidence of your strategic thinking.",
    questions: [
      {
        text: "When making a major strategic decision, how do you typically approach trade-offs?",
        options: [
          "I map the trade-offs explicitly and decide based on long-term organisational value",
          "I consult widely and synthesise diverse inputs before deciding",
          "I default to the option that minimises short-term risk",
          "I find trade-off situations very difficult and tend to delay",
        ],
      },
      {
        text: "How comfortable are you disagreeing with the prevailing view in a senior leadership meeting?",
        options: [
          "Very comfortable — I see it as my responsibility",
          "Comfortable when I have strong data to support my position",
          "Uncomfortable — I choose my battles carefully",
          "Very uncomfortable — I rarely voice dissent",
        ],
      },
    ],
  },
];

export default function Assessment() {
  const navigate = useNavigate();
  const [dimIndex, setDimIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const dim = DIMENSIONS[dimIndex];
  const question = dim.questions[qIndex];
  const answerKey = `${dimIndex}-${qIndex}`;
  const selected = answers[answerKey];

  const totalQuestions = DIMENSIONS.reduce((s, d) => s + d.questions.length, 0);
  const answeredSoFar = DIMENSIONS.slice(0, dimIndex).reduce((s, d) => s + d.questions.length, 0) + qIndex;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  const handleSelect = (i: number) => {
    setAnswers((p) => ({ ...p, [answerKey]: i }));
  };

  const handleNext = () => {
    if (selected === undefined) return;
    if (qIndex < dim.questions.length - 1) {
      setQIndex((q) => q + 1);
    } else if (dimIndex < DIMENSIONS.length - 1) {
      setDimIndex((d) => d + 1);
      setQIndex(0);
    } else {
      navigate("/scorecard/results");
    }
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex((q) => q - 1);
    } else if (dimIndex > 0) {
      setDimIndex((d) => d - 1);
      setQIndex(DIMENSIONS[dimIndex - 1].questions.length - 1);
    }
  };

  const isLast = dimIndex === DIMENSIONS.length - 1 && qIndex === dim.questions.length - 1;

  return (
    <div className="min-h-screen bg-[#F8F4EE]">

      {/* ── Assessment Navbar ── */}
      <div className="bg-white border-b border-[#6B1A1A]/08 sticky top-0 z-50">
        {/* Progress bar */}
        <div className="h-[3px] bg-[#6B1A1A]/08">
          <div
            className="h-full bg-[#C49A3C] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-8 md:px-16">
          <div className="flex items-center justify-between h-14">
            <p className="text-[9px] font-bold tracking-[2.5px] uppercase text-[#6B1A1A]/40">
              CXO Readiness Assessment
            </p>
            <p className="text-[11px] font-bold text-[#6B1A1A]">
              Dimension {String(dimIndex + 1).padStart(2, "0")} of{" "}
              {String(DIMENSIONS.length).padStart(2, "0")}
            </p>
          </div>

          {/* Dimension tabs */}
          <div className="flex items-center gap-0 overflow-x-auto pb-0">
            {DIMENSIONS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => { setDimIndex(i); setQIndex(0); }}
                className={`px-5 py-3 text-[9.5px] font-bold tracking-[1.5px] uppercase border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  i === dimIndex
                    ? "border-[#6B1A1A] text-[#6B1A1A]"
                    : i < dimIndex
                    ? "border-[#C49A3C]/40 text-[#C49A3C]/60"
                    : "border-transparent text-black/30"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Dimension header card */}
        <div className="bg-[#6B1A1A] rounded-lg p-7 mb-6 flex gap-5 items-start">
          <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
            {dim.icon}
          </div>
          <div>
            <p className="text-[8.5px] font-bold tracking-[2.5px] uppercase text-[#C49A3C]/80 mb-2">
              Dimension {String(dimIndex + 1).padStart(2, "0")} of{" "}
              {DIMENSIONS.length}
            </p>
            <h2 className="text-2xl font-bold text-white font-serif italic mb-2">
              {dim.title}
            </h2>
            <p className="text-[12px] text-white/55 leading-relaxed max-w-xl">
              {dim.description}
            </p>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white border border-[#6B1A1A]/08 rounded-lg p-7 mb-4">
          <p className="text-[9px] font-bold tracking-[2px] uppercase text-[#C49A3C] mb-4">
            Question {qIndex + 1} of {dim.questions.length}
          </p>

          <h3 className="text-[16px] font-semibold text-[#1A1A1A] leading-snug mb-6">
            {question.text}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`flex items-center gap-4 w-full text-left px-5 py-4 border rounded-sm transition-all duration-200 ${
                  selected === i
                    ? "border-[#6B1A1A] bg-[#6B1A1A]/04"
                    : "border-[#6B1A1A]/12 hover:border-[#6B1A1A]/30 hover:bg-[#F8F4EE]"
                }`}
              >
                {/* Radio circle */}
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
                  selected === i
                    ? "border-[#6B1A1A] bg-[#6B1A1A]"
                    : "border-[#6B1A1A]/25"
                }`}>
                  {selected === i && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                <span className={`text-[13px] leading-snug transition-colors duration-200 ${
                  selected === i ? "text-[#6B1A1A] font-medium" : "text-black/60"
                }`}>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Question dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {dim.questions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${
                i === qIndex
                  ? "w-6 h-2 bg-[#6B1A1A]"
                  : answers[`${dimIndex}-${i}`] !== undefined
                  ? "w-2 h-2 bg-[#C49A3C]"
                  : "w-2 h-2 bg-[#6B1A1A]/15"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={dimIndex === 0 && qIndex === 0}
            className="px-6 py-3 text-[10px] font-bold tracking-[2px] uppercase border border-[#6B1A1A]/20 text-[#6B1A1A]/50 hover:border-[#6B1A1A]/40 hover:text-[#6B1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            ← Back
          </button>

          <p className="text-[10px] text-black/30">
            {answeredSoFar + (selected !== undefined ? 1 : 0)} of {totalQuestions} answered
          </p>

          <button
            onClick={handleNext}
            disabled={selected === undefined}
            className="relative overflow-hidden group px-8 py-3 text-[10px] font-bold tracking-[2px] uppercase bg-[#6B1A1A] text-white disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-200"
          >
            <span className="relative z-10">
              {isLast ? "See My Results →" : "Next →"}
            </span>
            <span className="absolute inset-0 bg-deep-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
      </div>
    </div>
  );
}