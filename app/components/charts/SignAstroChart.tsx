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
import { Sign } from "crypto";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const generateRandomData = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

type signAstroChart = {
    signAstroNumber: number[];
};

type SignAstroChartProps = {
    data: number[];
};

const SignAstroChart: React.FC<SignAstroChartProps> = ({ data }) => {
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const canvasElement = document.getElementById("SignAstroChart") as HTMLCanvasElement | null;
        if (canvasElement) {
            const ctx = canvasElement.getContext("2d");

            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const chartInstance = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
                        datasets: [
                            {
                                label: "Astrological Sign",
                                data: data,
                                backgroundColor: "#74b9ff",
                                borderColor: "#0984e3",
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
                                    text: 'Sign',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of Sign',
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
                                text: "Astrological Sign Statistics",
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

    return <canvas id="SignAstroChart"></canvas>;
};

export default SignAstroChart;
