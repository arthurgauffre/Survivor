"use client";

import React, { useEffect } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

type genderDoughnutChart = {
  data: number[];
};

const GenderDoughnutChart: React.FC<genderDoughnutChart> = ({ data }) => {
  useEffect(() => {
    // Register the necessary components
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

    const ctx = document.getElementById(
      "GenderDoughnutChart"
    ) as HTMLCanvasElement | null;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Male", "Female", "Other"],
          datasets: [
            {
              data: data,
              borderColor: ["#48dbfb", "#ff9ff3", "#1dd1a1"],
              backgroundColor: ["#48dbfb", "#ff9ff3", "#1dd1a1"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              align: "center",
            },
            title: {
              display: true,
              text: "Gender Customers",
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      }
    }
  }, []);

  return <canvas id="GenderDoughnutChart"></canvas>;
};

export default GenderDoughnutChart;
