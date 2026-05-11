import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreHero from "./ScoreHero";
import DimensionScores from "./DimensionScores";
import LeadershipPattern from "./LeadershipPattern";
import GrowthEdges from "./GrowthEdges";
import NextSteps from "./NextSteps";
import ResultsCTA from "./ResultsCTA";
import { fetchResults } from "../../utils/results";
import type { ResultsData } from "../../utils/types";

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const leadIdStr = localStorage.getItem("cxo_lead_id");
    if (!leadIdStr) {
      navigate("/scorecard");
      return;
    }

    const leadId = parseInt(leadIdStr, 10);
    if (isNaN(leadId)) {
      navigate("/scorecard");
      return;
    }

    fetchResults(leadId)
      .then((results) => setData(results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-sm tracking-[2px] text-maroon">Calculating your results...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <p className="text-sm text-red-600">
          {error || "Could not load your results."}
        </p>
      </div>
    );
  }

  return (
    <main>
      <ScoreHero data={data} />
      <DimensionScores dimensions={data.dimensions} />
      <LeadershipPattern
        title={data.patternTitle}
        description={data.patternDescription}
        experiencing={data.experiencing}
      />
      <GrowthEdges growthEdges={data.growthEdges} />
      <NextSteps
        topGapName={data.growthEdges[0]?.name || ""}
        journeyLevel={data.journeyLevel}
        journeyMessage={data.journeyMessage}
        userEmail={data.userEmail}
      />
      <ResultsCTA />
    </main>
  );
};

export default ResultPage;