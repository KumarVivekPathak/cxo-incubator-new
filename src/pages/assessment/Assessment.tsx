import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAssessment,
  submitAssessment,
  type Dimension,
} from "../../utils/assessments";

export default function Assessment() {
  const navigate = useNavigate();

  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [dimIndex, setDimIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  // answers keyed by question_id for cleaner lookup
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // ─── Load assessment data on mount ──────────────
  useEffect(() => {
    fetchAssessment()
      .then((data) => {
        if (data.length === 0) {
          setLoadError("Assessment is not configured yet.");
        } else {
          setDimensions(data);
        }
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ─── Loading / error states ─────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-sm tracking-[2px] text-maroon">Loading assessment...</p>
      </div>
    );
  }

  if (loadError || dimensions.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <p className="text-sm text-red-600">
          {loadError || "Could not load assessment."}
        </p>
      </div>
    );
  }

  const dim = dimensions[dimIndex];
  const question = dim.questions[qIndex];
  const selectedOptionId = answers[question.id];

  const totalQuestions = dimensions.reduce((s, d) => s + d.questions.length, 0);
  const answeredSoFar =
    dimensions.slice(0, dimIndex).reduce((s, d) => s + d.questions.length, 0) + qIndex;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  const handleSelect = (optionId: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const isLast =
    dimIndex === dimensions.length - 1 && qIndex === dim.questions.length - 1;

  const handleNext = async () => {
    if (selectedOptionId === undefined) return;

    if (qIndex < dim.questions.length - 1) {
      setQIndex((q) => q + 1);
      return;
    }

    if (dimIndex < dimensions.length - 1) {
      setDimIndex((d) => d + 1);
      setQIndex(0);
      return;
    }

    // Last question — submit
    await handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);

    const leadIdStr = localStorage.getItem("cxo_lead_id");
    if (!leadIdStr) {
      setSubmitError("Lead session expired. Please start over.");
      setSubmitting(false);
      navigate("/scorecard");
      return;
    }

    const leadId = parseInt(leadIdStr, 10);
    if (isNaN(leadId)) {
      setSubmitError("Invalid session. Please start over.");
      setSubmitting(false);
      return;
    }

    const answerArray = Object.entries(answers).map(([qid, oid]) => ({
      question_id: parseInt(qid, 10),
      option_id: oid,
    }));

    const result = await submitAssessment(leadId, answerArray, dimensions);

    if (result.success) {
      navigate("/results");
    } else {
      setSubmitError(result.error);
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex((q) => q - 1);
    } else if (dimIndex > 0) {
      const prevDim = dimensions[dimIndex - 1];
      setDimIndex((d) => d - 1);
      setQIndex(prevDim.questions.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Assessment Navbar ── */}
      <div className="bg-white border-b border-maroon/10 sticky top-0 z-50">
        <div className="h-2 bg-maroon/20">
          <div
            className="h-full bg-maroon transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-8 md:px-16">
          <div className="flex items-center justify-between h-14">
            <p className="text-xs font-semibold tracking-[2.5px] text-maroon">
              CXO Readiness Assessment
            </p>
            <p className="text-xs font-semibold tracking-[2.5px] text-maroon">
              Dimension {String(dimIndex + 1).padStart(2, "0")} of{" "}
              {String(dimensions.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex items-center gap-0 overflow-x-auto pb-0">
            {dimensions.map((d, i) => (
              <button
                key={d.id}
                onClick={() => { setDimIndex(i); setQIndex(0); }}
                className={`px-5 py-3 text-sm font-bold tracking-[1.5px] border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  i === dimIndex
                    ? "border-maroon text-maroon"
                    : i < dimIndex
                    ? "border-maroon text-maroon"
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

        {/* Dimension header */}
        <div className="bg-maroon rounded-lg p-7 mb-6 flex gap-5 items-start">
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
            {dim.icon}
          </div>
          <div>
            <p className="text-[8.5px] font-bold tracking-[2.5px] uppercase text-[#C49A3C]/80 mb-2">
              Dimension {String(dimIndex + 1).padStart(2, "0")} of {dimensions.length}
            </p>
            <h2 className="text-2xl font-bold text-white font-serif italic mb-2">
              {dim.title}
            </h2>
            <p className="text-xs text-white/70 leading-relaxed max-w-xl">
              {dim.description}
            </p>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white border border-maroon rounded-lg p-7 mb-4">
          <p className="text-sm font-bold tracking-[2px] text-maroon mb-4">
            Question {qIndex + 1} of {dim.questions.length}
          </p>

          <h3 className="text-md font-semibold text-black leading-snug mb-6">
            {question.text}
          </h3>

          <div className="flex flex-col gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center gap-4 w-full text-left px-5 py-4 border rounded-sm transition-all duration-200 ${
                  selectedOptionId === opt.id
                    ? "border-maroon bg-maroon/04"
                    : "border-maroon/12 hover:border-maroon/30 hover:bg-cream"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                  selectedOptionId === opt.id
                    ? "border-maroon bg-maroon"
                    : "border-maroon/25"
                }`}>
                  {selectedOptionId === opt.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>

                <span className={`text-sm leading-snug transition-colors duration-200 ${
                  selectedOptionId === opt.id ? "text-maroon font-medium" : "text-black"
                }`}>
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Question dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {dim.questions.map((q, i) => (
            <div
              key={q.id}
              className={`rounded-full transition-all duration-200 ${
                i === qIndex
                  ? "w-6 h-2 bg-maroon"
                  : answers[q.id] !== undefined
                  ? "w-2 h-2 bg-gold"
                  : "w-2 h-2 bg-maroon"
              }`}
            />
          ))}
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-xs text-red-600">{submitError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={dimIndex === 0 && qIndex === 0}
            className="px-6 py-3 text-sm font-bold tracking-[2px] border border-maroon text-maroon hover:border-maroon/40 hover:text-maroon/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            ← Back
          </button>

          <p className="text-xs text-black">
            {Object.keys(answers).length} of {totalQuestions} answered
          </p>

          <button
            onClick={handleNext}
            disabled={selectedOptionId === undefined || submitting}
            className="relative overflow-hidden group px-8 py-3 text-sm font-bold tracking-[2px] bg-maroon text-white disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-200"
          >
            <span className="relative z-10">
              {submitting
                ? "Submitting..."
                : isLast
                ? "See My Results →"
                : "Next →"}
            </span>
            <span className="absolute inset-0 bg-deep-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
      </div>
    </div>
  );
}