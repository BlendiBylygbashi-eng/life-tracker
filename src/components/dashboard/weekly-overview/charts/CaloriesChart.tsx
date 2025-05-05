import { BaseChart } from './BaseChart';
import { createCaloriesData } from '../utils/chartDatasets';
import type { EntryWithTimestamp } from '../utils/dataTransformers';

interface CaloriesChartProps {
  entries: EntryWithTimestamp[];
  labels: string[];
}

export function CaloriesChart({ entries, labels }: CaloriesChartProps) {
  return (
    <BaseChart
      title="Calories"
      data={createCaloriesData(entries, labels)}
      yAxisConfig={{
        max: 3000,
        title: 'Calories'
      }}
    />
  );
}
