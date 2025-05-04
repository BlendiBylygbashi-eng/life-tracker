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
import type { DailyEntry } from '@/types/dashboard';

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

interface WeeklyOverviewProps {
  entries: DailyEntry[];
}

export default function WeeklyOverview({ entries }: WeeklyOverviewProps) {
  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => {
    // Use createdAt directly since it already contains both date and time
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  // Simplify the label creation
  const sortedEntriesWithTimestamp = sortedEntries.map((entry) => ({
    ...entry,
    displayLabel: format(new Date(entry.createdAt), 'MMM d HH:mm')
  }));

  // Update the labels line to use our new displayLabel
  const labels = sortedEntriesWithTimestamp.map(entry => entry.displayLabel);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,  // This is important for consistent sizing
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#f0f0f0',
        },
        ticks: {
          maxRotation: 0,  // Prevent label rotation
          autoSkip: true,  // Skip labels that would overlap
          maxTicksLimit: 5,  // Limit the number of x-axis labels
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#f0f0f0',
        },
      }
    },
  };

  // Update each dataset to use the same ordered array
  const timeData = {
    labels,
    datasets: [{
      label: 'Hours',
      data: sortedEntriesWithTimestamp.map(entry => entry.timeInOffice),
      borderColor: theme.colors.metrics.office,
      backgroundColor: `${theme.colors.metrics.office}15`,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'white',
      pointBorderColor: theme.colors.metrics.office,
      pointHoverBackgroundColor: theme.colors.metrics.office,
      pointHoverBorderColor: 'white',
    }]
  };

  const caloriesData = {
    labels,
    datasets: [{
      label: 'Calories',
      data: sortedEntriesWithTimestamp.map(entry => entry.calories),
      borderColor: theme.colors.metrics.calories,
      backgroundColor: theme.colors.metrics.calories + '20',
      tension: 0.4,
      fill: true,
    }]
  };

  const proteinData = {
    labels,
    datasets: [{
      label: 'Protein (g)',
      data: sortedEntriesWithTimestamp.map(entry => entry.protein),
      borderColor: theme.colors.metrics.protein,
      backgroundColor: theme.colors.metrics.protein + '20',
      tension: 0.4,
      fill: true,
    }]
  };

  const gripStrengthData = {
    labels,
    datasets: [{
      label: 'Grip Strength (kg)',
      data: sortedEntriesWithTimestamp.map(entry => entry.gripStrength),
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[500] + '20',
      tension: 0.4,
      fill: true,
    }]
  };

  const bodyWeightData = {
    labels,
    datasets: [{
      label: 'Body Weight (lbs)',
      data: sortedEntriesWithTimestamp.map(entry => entry.bodyWeight),
      borderColor: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[500] + '20',
      tension: 0.4,
      fill: true,
    }]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
      <h2 className="text-xl font-semibold mb-6">Weekly Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        <div className="aspect-[16/9] w-full max-h-[400px]">
          <div className="h-full">
            <h3 className="text-sm font-medium mb-2">Time in Office</h3>
            <div className="h-[calc(100%-2rem)]">
              <Line 
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      ...commonOptions.scales.y,
                      max: 14,
                      title: {
                        display: true,
                        text: 'Hours',
                        padding: { top: 10, bottom: 10 }
                      }
                    }
                  }
                }} 
                data={timeData} 
              />
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] w-full max-h-[400px]">
          <div className="h-full">
            <h3 className="text-sm font-medium mb-2">Calories</h3>
            <div className="h-[calc(100%-2rem)]">
              <Line 
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      ...commonOptions.scales.y,
                      max: 3000,
                      title: {
                        display: true,
                        text: 'Calories',
                        padding: { top: 10, bottom: 10 }
                      }
                    }
                  }
                }} 
                data={caloriesData} 
              />
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] w-full max-h-[400px]">
          <div className="h-full">
            <h3 className="text-sm font-medium mb-2">Protein</h3>
            <div className="h-[calc(100%-2rem)]">
              <Line 
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      ...commonOptions.scales.y,
                      max: 250,
                      title: {
                        display: true,
                        text: 'Grams',
                        padding: { top: 10, bottom: 10 }
                      }
                    }
                  }
                }} 
                data={proteinData} 
              />
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] w-full max-h-[400px]">
          <div className="h-full">
            <h3 className="text-sm font-medium mb-2">Grip Strength</h3>
            <div className="h-[calc(100%-2rem)]">
              <Line 
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      ...commonOptions.scales.y,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Kilograms',
                        padding: { top: 10, bottom: 10 }
                      }
                    }
                  }
                }} 
                data={gripStrengthData} 
              />
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] w-full max-h-[400px]">
          <div className="h-full">
            <h3 className="text-sm font-medium mb-2">Body Weight</h3>
            <div className="h-[calc(100%-2rem)]">
              <Line 
                options={{
                  ...commonOptions,
                  scales: {
                    ...commonOptions.scales,
                    y: {
                      ...commonOptions.scales.y,
                      title: {
                        display: true,
                        text: 'Weight (lbs)',
                        padding: { top: 10, bottom: 10 }
                      }
                    }
                  }
                }} 
                data={bodyWeightData} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
