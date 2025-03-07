import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
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
  const [chartType, setChartType] = useState<"bar" | "line" | "mixed">("mixed");

  const labels = gmData.map((d: { week: any }) => d.week);
  const gmDollars = gmData.map((d: { gmDollars: any }) => d.gmDollars);
  const gmPercent = gmData.map((d: { gmPercent: any }) => d.gmPercent);

  const getChartData = () => {
    if (chartType === "mixed") {
      return {
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
    }
    return {
      labels,
      datasets: [
        {
          label: chartType === "bar" ? "GM Dollars" : "GM %",
          data: chartType === "bar" ? gmDollars : gmPercent,
          backgroundColor:
            chartType === "bar" ? "rgba(75, 192, 192, 0.6)" : "rgba(255, 99, 132, 0.6)",
          borderColor:
            chartType === "line" ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: chartType === "line",
        },
      ],
    };
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
      title: { display: true, text: `GM Chart (${chartType.toUpperCase()})` },
    },
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "15px" }}>
        GM Chart
      </h2>

      {/* Dropdown to select chart type */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) =>
            setChartType(e.target.value as "bar" | "line" | "mixed")
          }
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value="bar">Bar Chart (GM Dollars)</option>
          <option value="line">Line Chart (GM %)</option>
          <option value="mixed">Bar & Line Combined</option>
        </select>
      </div>

      {/* Chart Component */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Chart type={chartType === "mixed" ? "bar" : chartType} data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default GMChart;
