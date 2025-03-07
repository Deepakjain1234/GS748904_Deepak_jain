import React from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addStore, updateStore, deleteStore } from "../redux/slices/storeSlice";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const GMChart: React.FC = () => {
  const gmData = useAppSelector((state) => state.gmData);

  const labels = gmData.map((d: { week: any; }) => d.week);
  const gmDollars = gmData.map((d: { gmDollars: any; }) => d.gmDollars);
  const gmPercent = gmData.map((d: { gmPercent: any; }) => d.gmPercent);

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "GM Dollars",
        data: gmDollars,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        yAxisID: "y",
      },
      {
        type: "line" as const,
        label: "GM %",
        data: gmPercent,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "GM Dollars" },
      },
      y1: {
        beginAtZero: true,
        position: "right" as const,
        title: { display: true, text: "GM %" },
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "GM Dollars & GM % Chart" },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

export default GMChart;
