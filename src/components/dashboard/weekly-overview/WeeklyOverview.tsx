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
import type { DailyEntry } from '@/types/dashboard';
import { sortEntriesByDate, addDisplayLabels, getLabels } from './utils/dataTransformers';
import {
  TimeChart,
  CaloriesChart,
  ProteinChart,
  GripStrengthChart,
  BodyWeightChart
} from './charts';

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
  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
        <h2 className="text-xl font-semibold mb-6">Weekly Overview</h2>
        <p className="text-gray-500 text-center py-4">No data available for charts</p>
      </div>
    );
  }
  
  const sortedEntries = sortEntriesByDate(entries);
  const sortedEntriesWithTimestamp = addDisplayLabels(sortedEntries);
  const labels = getLabels(sortedEntriesWithTimestamp);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
      <h2 className="text-xl font-semibold mb-6">Weekly Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        <TimeChart entries={sortedEntriesWithTimestamp} labels={labels} />
        <CaloriesChart entries={sortedEntriesWithTimestamp} labels={labels} />
        <ProteinChart entries={sortedEntriesWithTimestamp} labels={labels} />
        <GripStrengthChart entries={sortedEntriesWithTimestamp} labels={labels} />
        <BodyWeightChart entries={sortedEntriesWithTimestamp} labels={labels} />
      </div>
    </div>
  );
}
