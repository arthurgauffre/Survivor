"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const generateLast30DaysLabels = (): string[] => {
  const labels = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    labels.push(formattedDate);
  }
  return labels;
};

const generateRandomData = (length: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

const EventsChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvasElement = document.getElementById("eventChart") as HTMLCanvasElement | null;
    if (canvasElement) {
      const ctx = canvasElement.getContext("2d");

      if (ctx) {

        if (chartRef.current) {
          chartRef.current.destroy();
        }


        const chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: generateLast30DaysLabels(),
            datasets: [
              {
                label: "Number of Events",
                data: generateRandomData(30),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Events',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Events in the Last 30 Days",
              },
            },
          },
        });


        chartRef.current = chartInstance;
      }
    }


    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas id="eventChart"></canvas>;
};

export default EventsChart;
