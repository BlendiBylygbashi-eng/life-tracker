import CircularProgress from '@/components/ui/CircularProgress';

interface GoalProgressRingProps {
  value: number;
  max: number;
  title: string;
  unit?: string;
  progressColor: string;
  isInverse?: boolean;
  backgroundColor?: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}

export function GoalProgressRing({
  value,
  max,
  title,
  unit = '',
  progressColor,
  isInverse = false,
  backgroundColor = "rgba(229, 231, 235, 0.5)",
  gradientFrom,
  gradientTo,
  borderColor
}: GoalProgressRingProps) {
  return (
    <div className={`text-center p-6 rounded-xl bg-gradient-to-br from-${gradientFrom}/40 to-${gradientTo}/30 border border-${borderColor}/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm w-full max-w-[200px]`}>
      <CircularProgress
        value={value}
        max={max}
        size={120}
        strokeWidth={12}
        progressColor={progressColor}
        backgroundColor={backgroundColor}
        isInverse={isInverse}
      />
      <div className="mt-4">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600 mt-1">
          {value}{unit} / {max}{unit}
        </div>
      </div>
    </div>
  );
}