import { Line } from 'react-chartjs-2';
import type { ExerciseHistory } from '../utils/types';
import { chartOptions, createChartData } from '../utils/chartConfig';

interface ProgressChartProps {
  exerciseName: string;
  exerciseHistory: ExerciseHistory;
}

export function ProgressChart({ exerciseName, exerciseHistory }: ProgressChartProps) {
  const chartData = createChartData(exerciseName, exerciseHistory);

  return (
    <div className="mt-4 h-[200px]">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
