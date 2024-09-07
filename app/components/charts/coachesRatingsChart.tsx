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

type coachesRatingChart = {
  data: number[];
};

const CoachesRatingsChart: React.FC<coachesRatingChart> = ({ data }) => {
  useEffect(() => {
    // Register the necessary components
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

    const ctx = document.getElementById("coachesRatingsChart") as HTMLCanvasElement | null;
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["1*", "2*", "3*", "4*", "5*"],
          datasets: [
            {
              data: data,
              borderColor: [
                "#f53b57",
                "#3c40c6",
                "#0fbcf9",
                "#00d8d6",
                "#05c46b",
              ],
              backgroundColor: [
                "#f53b57",
                "#3c40c6",
                "#0fbcf9",
                "#00d8d6",
                "#05c46b",
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
              position: "bottom",
              align: "center",
            },
            title: {
              display: true,
              text: "Meeting ratings",
            },
          },
        },

      });
      return () => {
        myChart.destroy();
      }
    }
  }, []);

  return <canvas id="coachesRatingsChart"></canvas>;
};

export default CoachesRatingsChart;