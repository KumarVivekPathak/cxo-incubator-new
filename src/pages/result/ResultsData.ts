import type { ResultsData } from "../../utils/types";


export const SAMPLE_RESULTS: ResultsData = {
  userName: "Ankit",
  overallScore: 67,
  band: "good",
  pointsAway: 33,
  userEmail: "ankit@company.com",
  journeyLevel: 3,
  journeyMessage:
    "Your scores reveal a leader genuinely on the right trajectory — with two or three specific gaps to close deliberately. A conversation with our team will map exactly what your personalised journey looks like from here.",
  patternTitle:
    "You Have Individual Presence — But You Have Not Built a Network That Amplifies It.",
  patternDescription:
    "You show up well in the rooms you're in. But your scorecard reveals that you are in too few of the right rooms — and the network that could expand your reach, opportunities, and reputation is significantly underdeveloped. Executive presence without a powerful ecosystem is a flame in an empty room.",
  experiencing: [
    "Your presence is strong one-on-one but your wider professional reach remains limited",
    "You don't have people in senior positions actively advocating for you in rooms you're not in",
    "Your name isn't being mentioned when relevant opportunities arise — even though it should be",
    "Others get referred for things you would have been better suited for — and you know it",
  ],
  dimensions: [
    {
      id: "purpose", icon: "🧭", name: "Purpose Clarity",
      score: 83, band: "promising",
      description: "You have strong purpose clarity — this is rare and genuinely sets you apart. The next step is making your purpose visible externally, so it becomes the lens through which others experience your leadership.",
    },
    {
      id: "leadership", icon: "👑", name: "Leadership Mindset",
      score: 100, band: "excellent",
      description: "You think, position, and move like a leader — not just a manager. Your next step is operationalising that mindset into a visible, accelerating trajectory with clear milestones and the right community around you.",
    },
    {
      id: "presence", icon: "⚡", name: "Executive Presence",
      score: 42, band: "poor",
      description: "Your presence is largely contained within your immediate function. The C-suite demands that you show up and be known — your ideas, your energy, your perspective — well beyond your team.",
    },
    {
      id: "resilience", icon: "🛡", name: "Emotional Resilience",
      score: 83, band: "promising",
      description: "You demonstrate genuine resilience — you stay clear, own outcomes, and grow from adversity in ways others can see and trust. The next level is modelling this behaviour so it spreads through your teams.",
    },
    {
      id: "agility", icon: "🔄", name: "Learning Agility",
      score: 67, band: "good",
      description: "You learn from experience — but not yet by design. The difference between good leaders and great ones is the ability to deliberately create uncomfortable learning and apply lessons visibly.",
    },
    {
      id: "ecosystem", icon: "🌐", name: "Ecosystem Readiness",
      score: 33, band: "poor",
      description: "Your professional ecosystem is largely internal and transactional. C-suite leaders are built by the quality of the communities they belong to, the mentors who challenge them, and the peers who raise their thinking.",
    },
    {
      id: "decisions", icon: "⚖", name: "Strategic Decisions",
      score: 58, band: "fair",
      description: "Your decision-making is cautious, consensus-dependent, and risk-averse under pressure. Learning to decide with conviction, own the outcome, and course-correct rapidly is the core skill to develop.",
    },
  ],
  growthEdges: [
    {
      rank: 1, icon: "🌐", name: "Ecosystem Readiness", score: 33,
      insight: "Research on C-suite transitions shows most leaders underestimate how much of their next opportunity will come not from people they know — but from people their contacts know. One deep, senior relationship activates a far larger network than ten shallow ones. Breadth is vanity. Depth is strategy.",
      howItHelps: "My CXO Axis Week 3 — The Ecosystem by Design — maps the 12 most critical relationships for your specific ambition, identifies the gaps, and gives you a 6-month ecosystem-building plan with specific actions for each relationship tier.",
    },
    {
      rank: 2, icon: "⚡", name: "Executive Presence", score: 42,
      insight: "Research reveals that executive presence is 26% appearance, 28% communication — and 46% gravitas. Gravitas is not confidence. It is the perception that you have something at stake. Leaders who are willing to be wrong in public consistently outperform those who are always polished.",
      howItHelps: "My CXO Axis Week 2 — Executive Presence Architecture — diagnoses your specific presence failure pattern from the four identified in global 360 data, and builds a targeted behavioural plan. Not generic confidence coaching — precise gap closure.",
    },
    {
      rank: 3, icon: "⚖", name: "Strategic Decisions", score: 58,
      insight: "The biggest decision-making gap at the C-suite level is not analytical ability — it is the willingness to decide under ambiguity and own the outcome publicly. Most senior professionals have the intelligence. Very few have trained the muscle of decisive ownership.",
      howItHelps: "My CXO Axis Week 4 — Decision Architecture — gives you a personal decision-making framework calibrated to your specific risk profile, and builds the habit of visible, owned, course-corrected decisions.",
    },
  ],
};