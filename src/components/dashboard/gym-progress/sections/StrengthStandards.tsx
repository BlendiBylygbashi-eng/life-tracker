'use client';

import { 
  COMPOUND_LIFTS,
  calculateStrengthLevel,
  type CompoundLift,
  type StrengthLevel 
} from '@/lib/StrengthStandards';

const STRENGTH_LEVELS: StrengthLevel[] = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];

interface StrengthStandardsProps {
  personalRecords: Record<string, { weight: number; reps: number; oneRepMax: number; date: string; } | null>;
  bodyWeight: number;
}

export function StrengthStandards({ personalRecords, bodyWeight }: StrengthStandardsProps) {
  if (!bodyWeight) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">
          Please record your body weight to see strength standards.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Strength Standards</h3>
      <div className="grid gap-4">
        {COMPOUND_LIFTS.map(exercise => {
          const pr = personalRecords[exercise];
          if (!pr) return null;

          const { currentLevel, progress } = calculateStrengthLevel(
            exercise as CompoundLift,
            pr.oneRepMax,
            bodyWeight
          );

          // Find the index of current level in the progression
          const currentLevelIndex = STRENGTH_LEVELS.indexOf(currentLevel);
          // Calculate overall progress (0 to 4, representing Beginner to Elite)
          const overallProgress = currentLevelIndex + progress;
          // Convert to percentage (0 to 100)
          const progressPercentage = (overallProgress / (STRENGTH_LEVELS.length - 1)) * 100;

          return (
            <div key={exercise} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{exercise}</h4>
                <span className="text-sm font-semibold text-primary-600">
                  {currentLevel}
                </span>
              </div>
              
              {/* Progress bar container */}
              <div className="relative h-2 bg-gray-100/60 rounded-full overflow-hidden backdrop-blur-[2px] mb-3">
                {/* Progress bar */}
                <div 
                  className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
                {/* Level separators - now above the progress bar with stronger visibility */}
                <div className="absolute inset-0 flex z-10">
                  {STRENGTH_LEVELS.map((_, index) => (
                    <div 
                      key={index}
                      className="flex-1 border-r-[3px] border-white/70 last:border-0 shadow-[1px_0_1px_rgba(0,0,0,0.1)]"
                    />
                  ))}
                </div>
              </div>

              {/* Level labels */}
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                {STRENGTH_LEVELS.map(level => (
                  <span key={level} className="text-center" style={{ width: '20%' }}>
                    {level}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-3 text-sm text-gray-600">
                <p>Current 1RM: {Math.round(pr.oneRepMax)}lbs</p>
                <p>Body Weight: {Math.round(bodyWeight)}lbs</p>
                <p>Ratio: {(pr.oneRepMax / bodyWeight).toFixed(2)}x BW</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
