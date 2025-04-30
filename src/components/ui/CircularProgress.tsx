'use client';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  isInverse?: boolean; // For cases like calories where less is better
}

export default function CircularProgress({
  value,
  max,
  size = 40,
  strokeWidth = 4,
  progressColor = '#4F46E5', // Indigo color
  backgroundColor = '#E5E7EB', // Light gray
  isInverse = false,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let progress = (value / max) * 100;
  
  // For inverse goals (like calories where less is better)
  if (isInverse) {
    progress = Math.max(0, Math.min(100, ((max - value) / max) * 100));
  } else {
    progress = Math.min(100, progress);
  }

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
