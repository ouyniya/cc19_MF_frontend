import React from 'react'
import SaveRiskLevel from '../../components/riskAssessment/SaveRiskLevel'
import RiskLevel from '../../components/riskAssessment/RiskLevel'
import PortSuggest from '../../components/riskAssessment/PortSuggest'
import PortCriteria from '../../components/riskAssessment/PortCriteria'
import ExamplePort from '../../components/riskAssessment/ExamplePort'

function RiskResult() {
  return (
    <>
    <RiskLevel />
    <PortSuggest />
    <PortCriteria />
    <PortCriteria />
    <ExamplePort />
    </>
  )
}

export default RiskResult