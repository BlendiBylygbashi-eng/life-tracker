import type { DailyEntry } from '@/types/dashboard';

interface DailyMetricsProps {
  entry: DailyEntry;
}

export function DailyMetrics({ entry }: DailyMetricsProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
      <h3 className="font-medium text-gray-900 mb-4">Daily Metrics</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Time in Office</span>
          <span className="font-medium">{entry.timeInOffice} hours</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Calories</span>
          <span className="font-medium">{entry.calories}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Protein</span>
          <span className="font-medium">{entry.protein}g</span>
        </div>
        {entry.bodyWeight && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Body Weight</span>
            <span className="font-medium">{entry.bodyWeight} lbs</span>
          </div>
        )}
        {entry.gripStrength && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Grip Strength</span>
            <span className="font-medium">{entry.gripStrength}kg</span>
          </div>
        )}
      </div>
    </div>
  );
}