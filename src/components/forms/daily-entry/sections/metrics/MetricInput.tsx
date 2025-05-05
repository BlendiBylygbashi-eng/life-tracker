'use client';

import CircularProgress from '@/components/ui/CircularProgress';

interface MetricInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goal: number;
  progressColor: string;
  isInverse?: boolean;
  unit?: string;
  step?: string;
  min?: string;
  max?: string;
}

export default function MetricInput({
  id,
  label,
  value,
  onChange,
  goal,
  progressColor,
  isInverse = false,
  unit,
  step = "1",
  min = "0",
  max
}: MetricInputProps) {
  return (
    <div className="relative p-4 rounded-xl bg-gradient-to-br from-opacity-40 to-opacity-30 border border-opacity-30">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="w-16 h-16">
          <CircularProgress
            value={value}
            max={goal}
            progressColor={progressColor}
            isInverse={isInverse}
            size={64}
            strokeWidth={6}
          />
        </div>
      </div>
      <input
        type="number"
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder="0"
        step={step}
        min={min}
        max={max}
        className="w-full p-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-all"
        required
      />
      <p className="mt-2 text-sm text-gray-600">
        Goal: {isInverse ? `under ${goal}` : goal}{unit ? ` ${unit}` : ''}
      </p>
    </div>
  );
}
