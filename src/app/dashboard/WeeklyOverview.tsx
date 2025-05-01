'use client';

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
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { theme } from '@/styles/theme';

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

interface DailyEntry {
  date: string;
  timeInOffice: number;
  calories: number;
  protein: number;
  gripStrength: number | null;
}

interface WeeklyOverviewProps {
  entries: DailyEntry[];
}

export default function WeeklyOverview({ entries }: WeeklyOverviewProps) {
  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Prepare data for the chart
  const labels = sortedEntries.map(entry => format(new Date(entry.date), 'MMM d'));

  const data = {
    labels,
    datasets: [
      {
        label: 'Time in Office (hours)',
        data: sortedEntries.map(entry => entry.timeInOffice),
        borderColor: theme.colors.metrics.office,
        backgroundColor: theme.colors.metrics.office + '20',
        tension: 0.4,
      },
      {
        label: 'Calories',
        data: sortedEntries.map(entry => entry.calories),
        borderColor: theme.colors.metrics.calories,
        backgroundColor: theme.colors.metrics.calories + '20',
        tension: 0.4,
      },
      {
        label: 'Protein (g)',
        data: sortedEntries.map(entry => entry.protein),
        borderColor: theme.colors.metrics.protein,
        backgroundColor: theme.colors.metrics.protein + '20',
        tension: 0.4,
      },
      {
        label: 'Grip Strength (kg)',
        data: sortedEntries.map(entry => entry.gripStrength),
        borderColor: theme.colors.primary[500],
        backgroundColor: theme.colors.primary[500] + '20',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Weekly Overview</h2>
      <div className="w-full h-[400px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
