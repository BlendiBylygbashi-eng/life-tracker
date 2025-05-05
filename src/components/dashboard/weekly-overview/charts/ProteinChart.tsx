import { BaseChart } from './BaseChart';
import { createProteinData } from '../utils/chartDatasets';
import type { EntryWithTimestamp } from '../utils/dataTransformers';

interface ProteinChartProps {
  entries: EntryWithTimestamp[];
  labels: string[];
}

export function ProteinChart({ entries, labels }: ProteinChartProps) {
  return (
    <BaseChart
      title="Protein"
      data={createProteinData(entries, labels)}
      yAxisConfig={{
        max: 250,
        title: 'Grams'
      }}
    />
  );
}
