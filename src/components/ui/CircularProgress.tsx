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
      {/* Reduce the glow effect opacity */}
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-10"
        style={{ backgroundColor: progressColor }}
      />
      
      <svg
        className="-rotate-90 transform transition-transform duration-500"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Make background circle more visible */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"  // Darker but still subtle background
          strokeWidth={strokeWidth}
          className="transition-all duration-500"
        />
        {/* Progress circle with reduced shadow */}
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
          className="transition-all duration-500 drop-shadow-sm"  // Reduced shadow
        />
      </svg>
      
      {/* Center percentage with adjusted styling */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-2xl font-medium"  // Reduced font weight
          style={{ 
            color: progressColor,
            opacity: 0.9  // Slightly reduced opacity
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
