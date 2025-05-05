'use client';

import { TimeMetric, CaloriesMetric, ProteinMetric } from './';

interface MetricsSectionProps {
  timeInOffice: number;
  calories: number;
  protein: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MetricsSection({ 
  timeInOffice, 
  calories, 
  protein, 
  onChange 
}: MetricsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Goals</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeMetric value={timeInOffice} onChange={onChange} />
        <CaloriesMetric value={calories} onChange={onChange} />
        <ProteinMetric value={protein} onChange={onChange} />
      </div>
    </div>
  );
}
