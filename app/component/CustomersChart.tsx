"use client"; // Ensure this is at the top

import React, { useEffect } from "react";
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

const CustomersChart: React.FC = () => {
    useEffect(() => {
        // Register the necessary components
        Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

        const ctx = document.getElementById("CustomersChart") as HTMLCanvasElement | null;
        if (ctx) {
            new Chart(ctx, {
                type: "line", // Set the chart type to line
                data: {
                    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    datasets: [
                        {
                            label: "Number of Customers",
                            data: [6, 3, 2, 2, 7, 0, 16],
                            borderColor: "rgba(75, 128, 255, 1)", // Line color
                            backgroundColor: "rgba(75, 128, 255, 1)", // Fill area under the line
                            borderWidth: 2,
                            // fill: true, // Fill area under the line
                            pointRadius: 0, // Remove the points from the line
                            pointHoverRadius: 0, // Remove the points when hovering
                        }
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom", // Position the legend at the bottom
                            align: "center",    // Center-align the legend
                        },
                        title: {
                            display: true,
                            text: "Customer Status", // Title of the chart
                        },
                    },
                },
            });
        }
    }, []);

    return <canvas id="CustomersChart"></canvas>; // Render the canvas element
};

export default CustomersChart;
