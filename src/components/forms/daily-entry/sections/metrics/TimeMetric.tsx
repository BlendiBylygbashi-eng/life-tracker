'use client';

import { theme } from '@/styles/theme';
import { GOALS } from '../../state/types';
import MetricInput from './MetricInput';

interface TimeMetricProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeMetric({ value, onChange }: TimeMetricProps) {
  return (
    <div className="from-blue-50/40 to-indigo-50/30 border-blue-100/30">
      <MetricInput
        id="timeInOffice"
        label="Time in Office"
        value={value}
        onChange={onChange}
        goal={GOALS.timeInOffice}
        progressColor={theme.colors.metrics.office}
        unit="hours"
        step="0.5"
        max="24"
      />
    </div>
  );
}
