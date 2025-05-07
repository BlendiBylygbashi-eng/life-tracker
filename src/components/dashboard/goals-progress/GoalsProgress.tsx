import { theme } from '@/styles/theme';
import { GoalProgressRing } from './GoalProgressRing';
import type { DailyEntry } from '@/types/dashboard';

interface GoalsProgressProps {
  entry: DailyEntry;
  goals: {
    timeInOffice: number;
    calories: number;
    protein: number;
  };
}

export function GoalsProgress({ entry, goals }: GoalsProgressProps) {
  if (!entry) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Daily Goals Progress</h2>
        <p className="text-gray-500 text-center py-4">No recent entries available</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Daily Goals Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {/* Office Time */}
        <GoalProgressRing
          value={entry.timeInOffice}
          max={goals.timeInOffice}
          title="Office Time"
          unit="h"
          progressColor={theme.colors.metrics.office}
          gradientFrom="blue-50"
          gradientTo="indigo-50"
          borderColor="blue-100"
        />

        {/* Calories */}
        <GoalProgressRing
          value={entry.calories}
          max={goals.calories}
          title="Calories"
          progressColor={theme.colors.metrics.calories}
          gradientFrom="red-50"
          gradientTo="pink-50"
          borderColor="red-100"
          isInverse={true}
        />

        {/* Protein */}
        <GoalProgressRing
          value={entry.protein}
          max={goals.protein}
          title="Protein"
          unit="g"
          progressColor={theme.colors.metrics.protein}
          gradientFrom="green-50"
          gradientTo="emerald-50"
          borderColor="green-100"
        />
      </div>
    </div>
  );
}
