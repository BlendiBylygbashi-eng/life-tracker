import { BaseChart } from './BaseChart';
import { createTimeData } from '../utils/chartDatasets';
import type { EntryWithTimestamp } from '../utils/dataTransformers';

interface TimeChartProps {
  entries: EntryWithTimestamp[];
  labels: string[];
}

export function TimeChart({ entries, labels }: TimeChartProps) {
  return (
    <BaseChart
      title="Time in Office"
      data={createTimeData(entries, labels)}
      yAxisConfig={{
        max: 14,
        title: 'Hours'
      }}
    />
  );
}
