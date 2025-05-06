import { theme } from '@/styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ExerciseHistory } from './types';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const instance = context.chart.data.instances[context.dataIndex];
          return [
            `1RM: ${Math.round(instance.oneRepMax)} lbs`,
            `Weight: ${instance.weight} lbs`,
            `Reps: ${instance.reps}`,
          ];
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Estimated 1RM (lbs)',
      },
    },
  },
};

export function createChartData(exerciseName: string, exerciseHistory: ExerciseHistory) {
  const instances = exerciseHistory[exerciseName];
  return {
    labels: instances.map(instance => format(new Date(instance.date), 'MMM d')),
    datasets: [
      {
        label: 'Estimated 1RM (lbs)',
        data: instances.map(instance => Math.round(instance.oneRepMax)),
        borderColor: theme.colors.primary[500],
        backgroundColor: theme.colors.primary[500] + '20',
        tension: 0.4,
        fill: true,
      }
    ],
    instances, // Keep reference to original instances for tooltip
  };
}
