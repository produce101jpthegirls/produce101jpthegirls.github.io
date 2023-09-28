import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, ChartDataLabels, LinearScale, Title, Tooltip, Legend);

type BarChartProps = {
  labels: string[];
  data: number[];
  title: string;
  height: number;
  datasetLabel: string;
};

export const BarChart: FC<BarChartProps> = ({ labels, data, title, height, datasetLabel }) => {
  return (
    <Bar
      height={height}
      options={{
        indexAxis: "y" as const,
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
        layout: {
          padding: {
            left: 16,
            right: 16,
          },
        },
        scales: {
          y: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
            },
          },
        },
        responsive: true,
        plugins: {
          datalabels: {
            display: true,
            color: "black",
            anchor: "end",
            align: "end",
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: datasetLabel,
            data: data,
            backgroundColor: "#ff99be",
          },
        ]
      }}
    />
  );
};
