'use client';

import { theme } from '@/styles/theme';
import { GOALS } from '../../state/types';
import MetricInput from './MetricInput';

interface ProteinMetricProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProteinMetric({ value, onChange }: ProteinMetricProps) {
  return (
    <div className="from-green-50/40 to-emerald-50/30 border-green-100/30">
      <MetricInput
        id="protein"
        label="Protein"
        value={value}
        onChange={onChange}
        goal={GOALS.protein}
        progressColor={theme.colors.metrics.protein}
        unit="g"
      />
    </div>
  );
}
