"use client"; // Ensure this is at the top

import React, { useEffect } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

const MeetingChart: React.FC = () => {
  useEffect(() => {
    // Register the necessary components
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

    const ctx = document.getElementById("MeetingChart") as HTMLCanvasElement | null;
    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Accepted", "Pending", "Rejected"],
          datasets: [
            {
              data: [70, 10, 6],
              borderColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              backgroundColor: [
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom", // This positions the legend below the doughnut
              align: "center",    // Center-align the legend
            },
            title: {
              display: true,
              text: "Customer Status",
            },
          },
        },
      });
    }
  }, []);

  return null;
};

export default MeetingChart;