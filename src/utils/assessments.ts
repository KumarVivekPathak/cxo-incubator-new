import { supabase } from "./supabase";

// ─── Types ─────────────────────────────────────────────
export type Option = {
  id: number;
  text: string;
  score: number;
  display_order: number;
};

export type Question = {
  id: number;
  text: string;
  display_order: number;
  options: Option[];
};

export type Dimension = {
  id: number;
  slug: string;
  label: string;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  questions: Question[];
};

export type AnswerInput = {
  question_id: number;
  option_id: number;
};

export type SubmitResult =
  | { success: true; total_score: number; dim_scores: Record<string, number> }
  | { success: false; error: string };

// ─── 1. Fetch the full active assessment ───────────────
export async function fetchAssessment(): Promise<Dimension[]> {
  // Fetch all three tables in parallel
  const [dimRes, qRes, oRes] = await Promise.all([
    supabase
      .from("dimensions")
      .select("id, slug, label, title, description, icon, display_order")
      .is("deleted_at", null)
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("questions")
      .select("id, dimension_id, text, display_order")
      .is("deleted_at", null)
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("question_options")
      .select("id, question_id, text, score, display_order")
      .is("deleted_at", null)
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
  ]);

  console.log("ejkfnsdkf \n\n\n", dimRes.data);
  console.log(qRes.data);
  console.log(oRes.data);

  if (dimRes.error || qRes.error || oRes.error) {
    console.error("Failed to load assessment:", {
      dim: dimRes.error,
      q: qRes.error,
      o: oRes.error,
    });
    throw new Error("Could not load assessment.");
  }

  const dimensions = dimRes.data || [];
  const questions = qRes.data || [];
  const options = oRes.data || [];

  console.log("Fetched:", {
    dimensions: dimensions.length,
    questions: questions.length,
    options: options.length,
  });

  // Group options by question_id
  const optsByQuestion = new Map<number, Option[]>();
  for (const o of options) {
    if (!optsByQuestion.has(o.question_id)) {
      optsByQuestion.set(o.question_id, []);
    }
    optsByQuestion.get(o.question_id)!.push({
      id: o.id,
      text: o.text,
      score: o.score,
      display_order: o.display_order,
    });
  }

  // Group questions by dimension_id, attaching their options
  const qsByDimension = new Map<number, Question[]>();
  for (const q of questions) {
    if (!qsByDimension.has(q.dimension_id)) {
      qsByDimension.set(q.dimension_id, []);
    }
    qsByDimension.get(q.dimension_id)!.push({
      id: q.id,
      text: q.text,
      display_order: q.display_order,
      options: optsByQuestion.get(q.id) || [],
    });
  }

  // Attach questions to each dimension
  const result: Dimension[] = dimensions.map((d: any) => ({
    id: d.id,
    slug: d.slug,
    label: d.label,
    title: d.title,
    description: d.description,
    icon: d.icon,
    display_order: d.display_order,
    questions: qsByDimension.get(d.id) || [],
  }));

  return result;
}

// ─── 2. Submit all answers + compute scores ────────────
export async function submitAssessment(
  leadId: number,
  answers: AnswerInput[],
  dimensions: Dimension[]
): Promise<SubmitResult> {
  try {
    // Build snapshots
    const rows = answers
      .map((ans) => {
        // Find the question + option + dimension for this answer
        let question: Question | undefined;
        let dimension: Dimension | undefined;
        let option: Option | undefined;

        for (const dim of dimensions) {
          const q = dim.questions.find((q) => q.id === ans.question_id);
          if (q) {
            question = q;
            dimension = dim;
            option = q.options.find((o) => o.id === ans.option_id);
            break;
          }
        }

        if (!question || !option || !dimension) {
          console.warn("Skipping unknown answer:", ans);
          return null;
        }

        return {
          lead_id: leadId,
          question_id: question.id,
          option_id: option.id,
          question_text: question.text,
          option_text: option.text,
          score_awarded: option.score,
          dimension_id: dimension.id,
          dimension_slug: dimension.slug,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (rows.length === 0) {
      return { success: false, error: "No valid answers to submit." };
    }

    // Use upsert so re-attempts don't fail on the unique constraint
    const { error: respError } = await supabase
      .from("assessment_responses")
      .upsert(rows, { onConflict: "lead_id,question_id" });

    if (respError) {
      console.error("Response insert failed:", respError);
      return { success: false, error: "Could not save your answers." };
    }

    // Compute totals + per-dimension scores
    let total_score = 0;
    const dim_scores: Record<string, number> = {};
    for (const row of rows) {
      total_score += row.score_awarded;
      dim_scores[row.dimension_slug] =
        (dim_scores[row.dimension_slug] || 0) + row.score_awarded;
    }

    // Compute band
    // const maxPossible = rows.length * 4; // since max score per question is 4
    // const percentage = (total_score / maxPossible) * 100;
    // const band =
    //   percentage >= 80 ? "Executive Ready" :
    //   percentage >= 60 ? "Established" :
    //   percentage >= 40 ? "Developing" :
    //   "Emerging";

    const dimMaxes: Record<string, number> = {};
    for (const dim of dimensions) {
      dimMaxes[dim.slug] = dim.questions.length * 4;
    }

    const dim_score_pct: Record<string, number> = {};
    for (const slug in dim_scores) {
      dim_score_pct[slug] = Math.round(
        (dim_scores[slug] / dimMaxes[slug]) * 100
      );
    }

    const maxPossible = rows.length * 4;
    const overall_pct = Math.round((total_score / maxPossible) * 100);

    const band =
      overall_pct >= 86
        ? "excellent"
        : overall_pct >= 71
        ? "promising"
        : overall_pct >= 56
        ? "good"
        : overall_pct >= 41
        ? "fair"
        : "poor";

    // Update the lead row with aggregate scores
    // const { error: leadError } = await supabase
    //   .from("leads")
    //   .update({
    //     dim_scores,
    //     total_score,
    //     band,
    //     scorecard_completed_at: new Date().toISOString(),
    //   })
    //   .eq("id", leadId);

    const { error: leadError } = await supabase
      .from("leads")
      .update({
        dim_scores, // raw points per dimension
        dim_score_pct, // NEW: percentages per dimension
        total_score, // raw total
        overall_pct, // NEW: overall percentage
        band, // NEW band slug
        scorecard_completed_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (leadError) {
      console.warn(
        "Lead score update failed (responses still saved):",
        leadError
      );
    }

    return { success: true, total_score, dim_scores };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
