"use client"

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { adjustSaturation, ensureBrightness } from '@/utils/colorHelper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = { 
  scales: {
    y: {
        grid: {
            color: '#111111'
        },
        border: {
            color: '#111111'
        }
    },
    x: {
        border: {
            color: '#111111'
        },
        grid: {
            color: '#111111'
        }
    }
},
    barPercentage: 0.7,
    categoryPercentage: 0.6,
    responsive: true,
    plugins: {
    tooltip: { 
        padding: 18,
        displayColors: false,
        titleFont: {
          size: 16,
          weight: 600
        },
        bodyFont: {
          size: 14,
        }
      },
  },
};

type DataType = {
    labels: string[],
    mainData: number[],
    subData: number[],
    color: (string | null)[],
}

export default function DoubleBarChart({ data: {labels, mainData, subData, color} }: { data: DataType }) {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'points',
                data: mainData,
                borderWidth: 1.5,
                borderColor: '#FEF27ABF',
                backgroundColor: '#FEF27ABF',
                hoverBackgroundColor: color.map(item => adjustSaturation(ensureBrightness(item), 0.15) + "99"),
                hoverBorderColor: color.map(item => adjustSaturation(ensureBrightness(item), 0.15) + "CC"),
            },
            {
                label: 'raw points',
                data: subData,
                borderWidth: 1.5,
                borderColor: '#464748BF',
                backgroundColor: '#464748BF',
                hoverBackgroundColor: color.map(item => adjustSaturation(ensureBrightness(item), 0.15) + "1A"),
                hoverBorderColor: color.map(item => adjustSaturation(ensureBrightness(item), 0.15) + "CC"),
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
