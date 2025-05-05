import { BaseChart } from './BaseChart';
import { createBodyWeightData } from '../utils/chartDatasets';
import type { EntryWithTimestamp } from '../utils/dataTransformers';

interface BodyWeightChartProps {
  entries: EntryWithTimestamp[];
  labels: string[];
}

export function BodyWeightChart({ entries, labels }: BodyWeightChartProps) {
  return (
    <BaseChart
      title="Body Weight"
      data={createBodyWeightData(entries, labels)}
      yAxisConfig={{
        title: 'Weight (lbs)'
      }}
    />
  );
}
