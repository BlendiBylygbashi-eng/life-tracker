import { BaseChart } from './BaseChart';
import { createGripStrengthData } from '../utils/chartDatasets';
import type { EntryWithTimestamp } from '../utils/dataTransformers';

interface GripStrengthChartProps {
  entries: EntryWithTimestamp[];
  labels: string[];
}

export function GripStrengthChart({ entries, labels }: GripStrengthChartProps) {
  return (
    <BaseChart
      title="Grip Strength"
      data={createGripStrengthData(entries, labels)}
      yAxisConfig={{
        max: 100,
        title: 'Kilograms'
      }}
    />
  );
}
