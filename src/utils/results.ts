import { sendEmail } from "./email";
import { supabase } from "./supabase";

// Match the existing ResultsData shape your UI expects
export type DimensionResult = {
  id: string;
  icon: string;
  name: string;
  score: number;
  band: string;
  description: string;
};

export type GrowthEdge = {
  rank: number;
  icon: string;
  name: string;
  score: number;
  insight: string;
  howItHelps: string;
};

export type ResultsData = {
  userName: string;
  userEmail: string;
  overallScore: number;
  band: string;
  pointsAway: number;
  journeyLevel: number;
  journeyMessage: string;
  patternTitle: string;
  patternDescription: string;
  experiencing: string[];
  dimensions: DimensionResult[];
  growthEdges: GrowthEdge[];
};

function bandForScore(pct: number): string {
  if (pct >= 86) return "excellent";
  if (pct >= 71) return "promising";
  if (pct >= 56) return "good";
  if (pct >= 41) return "fair";
  return "poor";
}

export async function fetchResults(leadId: number): Promise<ResultsData> {
  // 1. Fetch the lead
  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .select("first_name, email, total_score, overall_pct, dim_scores, dim_score_pct, band")
    .eq("id", leadId)
    .single();

  if (leadErr || !lead) {
    throw new Error("Could not load your results.");
  }

  if (lead.overall_pct === null) {
    throw new Error("Your assessment is incomplete.");
  }

  // 2. Fetch dimensions (for icons, names, slugs)
  const { data: dims, error: dimErr } = await supabase
    .from("dimensions")
    .select("id, slug, title, icon, display_order")
    .is("deleted_at", null)
    .eq("is_active", true)
    .order("display_order");

  if (dimErr || !dims) {
    throw new Error("Could not load dimension info.");
  }

  // 3. Build per-dimension results with bands
  const dimResults: Array<DimensionResult & { dimensionId: number; slug: string }> =
    dims.map((d: any) => {
      const pct = lead.dim_score_pct?.[d.slug] ?? 0;
      return {
        dimensionId: d.id,
        slug: d.slug,
        id: d.slug,
        icon: d.icon || "",
        name: d.title,
        score: pct,
        band: bandForScore(pct),
        description: "", // filled in next step
      };
    });

  // 4. Fetch narratives in one query for all (dimension, band) pairs
  const narrativeKeys = dimResults.map((d) => ({
    dimension_id: d.dimensionId,
    band_slug: d.band,
  }));

  const { data: narratives, error: narrErr } = await supabase
    .from("dimension_narratives")
    .select("dimension_id, band_slug, description, growth_insight, how_it_helps")
    .in("dimension_id", narrativeKeys.map((k) => k.dimension_id));

  if (narrErr) {
    console.warn("Could not load narratives:", narrErr);
  }

  // 5. Attach descriptions to each dimension
  const narrMap = new Map<string, any>();
  for (const n of narratives || []) {
    narrMap.set(`${n.dimension_id}:${n.band_slug}`, n);
  }

  for (const d of dimResults) {
    const n = narrMap.get(`${d.dimensionId}:${d.band}`);
    d.description = n?.description || "";
  }

  // 6. Identify top 3 growth edges (lowest scoring dimensions)
  const sorted = [...dimResults].sort((a, b) => a.score - b.score);
  const topGaps = sorted.slice(0, 3);

  const growthEdges: GrowthEdge[] = topGaps.map((d, i) => {
    const n = narrMap.get(`${d.dimensionId}:${d.band}`);
    return {
      rank: i + 1,
      icon: d.icon,
      name: d.name,
      score: d.score,
      insight: n?.growth_insight || "",
      howItHelps: n?.how_it_helps || "",
    };
  });

  // 7. Find pattern narrative based on top 1-2 gaps
  const pairKey = `${topGaps[0].slug}__${topGaps[1].slug}`;
  const singleKey = topGaps[0].slug;

  const { data: patterns } = await supabase
    .from("pattern_narratives")
    .select("pattern_key, title, description, experiencing")
    .in("pattern_key", [pairKey, singleKey]);

  // Prefer pair-specific, fall back to single-dimension
  let pattern = (patterns || []).find((p: any) => p.pattern_key === pairKey)
              || (patterns || []).find((p: any) => p.pattern_key === singleKey);

  if (!pattern) {
    pattern = {
      title: "Your Scorecard Reveals Specific Growth Opportunities",
      description: "Based on your responses, there are focused areas where deliberate work will create the biggest leadership shift.",
      experiencing: [],
    };
  }

  // 8. Fetch journey message
  const { data: journey } = await supabase
    .from("journey_messages")
    .select("journey_level, message")
    .eq("band_slug", lead.band)
    .single();

  sendEmail(
    lead.email,
    "Get you CXO Scorecard",
    `
    <>
    <h1>Your Cxo scor is : ${lead.overall_pct}</h1>
    <p>Based on your responses, there are focused areas where deliberate work will create the biggest leadership shift.</p>
    <p>Click the link below to get your scorecard.</p>
    <p><a href='https://cxoincubator.com'>Get your scorecard</a></p>
    </>
    `
  );

  return {
    userName: lead.first_name,
    userEmail: lead.email,
    overallScore: lead.overall_pct,
    band: lead.band,
    pointsAway: Math.max(0, 100 - lead.overall_pct),
    journeyLevel: journey?.journey_level || 3,
    journeyMessage: journey?.message || "",
    patternTitle: pattern.title,
    patternDescription: pattern.description,
    experiencing: pattern.experiencing || [],
    dimensions: dimResults.map(({ dimensionId, slug, ...rest }) => rest),
    growthEdges,
  };
}