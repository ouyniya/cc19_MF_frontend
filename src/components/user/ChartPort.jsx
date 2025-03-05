import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useRiskAssessmentStore from "../../stores/useRiskAssessmentStore";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  ArcElement
);

function ChartPort(props) {
  const { options, data } = props;

  return (
    <div>
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default ChartPort;
