import React, { useEffect } from "react";
import RiskLevel from "../../components/riskAssessment/RiskLevel";
import useRiskAssessmentStore from "../../stores/useRiskAssessmentStore";

function RiskResult() {
  const score = useRiskAssessmentStore((state) => state.score);
  const getRiskResult = useRiskAssessmentStore((state) => state.getRiskResult);
  const riskResult = useRiskAssessmentStore((state) => state.riskResult.result);

  useEffect(() => {
    if (score) {
      getRiskResult(score)
    }
  }, [])

  // console.log(riskResult)

  return (
    <>
      {/* {score ? score : null} */}
      <RiskLevel />
    </>
  );
}

export default RiskResult;
