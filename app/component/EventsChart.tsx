"use client"; // Ensure this is at the top

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

// Register the necessary components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// Function to generate the last 30 days labels
const generateLast30DaysLabels = (): string[] => {
  const labels = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`; // MM/DD format
    labels.push(formattedDate);
  }
  return labels;
};

// Function to generate random data for the last 30 days
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
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create a new chart instance
        const chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: generateLast30DaysLabels(), // Labels for the last 30 days
            datasets: [
              {
                label: "Number of Events",
                data: generateRandomData(30), // Random data for the last 30 days
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

        // Store the chart instance in the ref
        chartRef.current = chartInstance;
      }
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas id="eventChart"></canvas>; // Render the canvas element
};

export default EventsChart;
