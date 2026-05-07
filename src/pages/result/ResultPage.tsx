import React from "react";
import ScoreHero from "./ScoreHero";
import { SAMPLE_RESULTS } from "./ResultsData";
import DimensionScores from "./DimensionScores";
import LeadershipPattern from "./LeadershipPattern";
import GrowthEdges from "./GrowthEdges";
import NextSteps from "./NextSteps";
import ResultsCTA from "./ResultsCTA";

const ResultPage : React.FC = () => {
    const data = SAMPLE_RESULTS; 

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
          topGapName={data.growthEdges[0].name}
          journeyLevel={data.journeyLevel}
          journeyMessage={data.journeyMessage}
          userEmail={data.userEmail}
        />
  
        <ResultsCTA />
      </main>
  
    );
};

export default ResultPage;