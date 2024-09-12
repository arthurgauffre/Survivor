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

type ageDoughnutChart = {
  data: number[];
};

const AgeDoughnutChart: React.FC<ageDoughnutChart> = ({ data }) => {
  useEffect(() => {
    // Register the necessary components
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

    const ctx = document.getElementById(
      "AgeDoughnutChart"
    ) as HTMLCanvasElement | null;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["18-30", "31-50", "50+"],
          datasets: [
            {
              data: data,
              borderColor: ["#f6e58d", "#ffbe76", "#ff7979"],
              backgroundColor: ["#f6e58d", "#ffbe76", "#ff7979"],
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
              text: "Age Stats",
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      }
    }
  }, [data]);

  return <canvas id="AgeDoughnutChart"></canvas>;
};

export default AgeDoughnutChart;
