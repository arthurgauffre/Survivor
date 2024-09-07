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

const generateRandomData = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

type CoachesChartEventsStatisticsProps = {
    data: any;
};

const CoachesChartEventsStatistics: React.FC<CoachesChartEventsStatisticsProps> = ({ data }) => {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const canvasElement = document.getElementById("CoachesChartEventsStatistics") as HTMLCanvasElement | null;
        if (canvasElement) {
            const ctx = canvasElement.getContext("2d");

            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const chartInstance = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: data.map((item: any) => item.date),
                        datasets: [
                            {
                                label: "Events",
                                data: data.map((item: any) => item.max_participants),
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
                                    text: 'Max Participants',
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: "bottom",
                            },
                            title: {
                                display: true,
                                text: "Events Statistics",
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

    return <canvas id="CoachesChartEventsStatistics"></canvas>;
};

export default CoachesChartEventsStatistics;
