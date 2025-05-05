'use client';

import { theme } from '@/styles/theme';
import { GOALS } from '../../state/types';
import MetricInput from './MetricInput';

interface CaloriesMetricProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CaloriesMetric({ value, onChange }: CaloriesMetricProps) {
  return (
    <div className="from-red-50/40 to-pink-50/30 border-red-100/30">
      <MetricInput
        id="calories"
        label="Calories"
        value={value}
        onChange={onChange}
        goal={GOALS.calories}
        progressColor={theme.colors.metrics.calories}
        isInverse={true}
        unit="cal"
      />
    </div>
  );
}
