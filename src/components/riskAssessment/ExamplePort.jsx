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

function ExamplePort() {
  const riskResult = useRiskAssessmentStore((state) => state.riskResult.result);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ปิดการรักษาอัตราส่วน เพื่อให้ปรับขนาดได้
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          font: {
            size: 16,
            family: "Noto Sans Thai",
          },
        },
      },
      title: { display: false },
      datalabels: {
        display: true,
        color: "#fff",
        font: { weight: "bold", size: 14 },
        anchor: "center", // จัดให้อยู่ตรงกลาง
        align: "center", // จัดให้อยู่ตรงกลาง
        formatter: (value) => `${value.toFixed(1)}%`, // แสดงเป็นเปอร์เซ็นต์ 1 ตำแหน่ง
      },
    },
  };

  const labels = riskResult?.recommendPort.map((el) => el?.investmentType);

  const data = {
    labels,
    datasets: [
      {
        label: "สัดส่วน (%)",
        data: riskResult?.recommendPort.map((el) => el.weight * 100),
        backgroundColor: [
          "#06b9aa",
          "#FFBB38",
          "#2D60FF",
          "#FF82AC",
          "#539BFF",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-[800px] h-[350px]">
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default ExamplePort;
