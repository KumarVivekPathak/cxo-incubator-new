export type ScoreBand = "poor" | "fair" | "good" | "promising" | "excellent";

export interface DimensionScore {
  id: string;
  icon: string;
  name: string;
  score: number;
  band: ScoreBand;
  description: string;
}

export interface GrowthEdge {
  rank: number;
  icon: string;
  name: string;
  score: number;
  insight: string;
  howItHelps: string;
}

export interface ResultsData {
  userName: string;
  overallScore: number;
  band: ScoreBand;
  pointsAway: number;
  userEmail: string;
  journeyLevel: number;
  journeyMessage: string;
  patternTitle: string;
  patternDescription: string;
  experiencing: string[];
  dimensions: DimensionScore[];
  growthEdges: GrowthEdge[];
}

export const BAND_CONFIG: Record<ScoreBand, {
  label: string;
  color: string;
  bg: string;
  text: string;
}> = {
  poor:      { label: "Poor",      color: "#B91C1C", bg: "#FEF2F2", text: "#B91C1C" },
  fair:      { label: "Fair",      color: "#C2410C", bg: "#FFF7ED", text: "#C2410C" },
  good:      { label: "Good",      color: "#15803D", bg: "#F0FDF4", text: "#15803D" },
  promising: { label: "Promising", color: "#1D4ED8", bg: "#EFF6FF", text: "#1D4ED8" },
  excellent: { label: "Excellent", color: "#7C3AED", bg: "#F3E8FF", text: "#7C3AED" },
};

export const getBandFromScore = (score: number): ScoreBand => {
  if (score <= 40) return "poor";
  if (score <= 55) return "fair";
  if (score <= 70) return "good";
  if (score <= 85) return "promising";
  return "excellent";
};