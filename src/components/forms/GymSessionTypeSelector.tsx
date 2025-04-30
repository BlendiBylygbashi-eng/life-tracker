'use client';

import { WORKOUT_TYPES, WorkoutType } from '@/lib/workoutData';

interface GymSessionTypeSelectorProps {
  value: WorkoutType | null;
  onChange: (type: WorkoutType | null) => void;
}

export default function GymSessionTypeSelector({ value, onChange }: GymSessionTypeSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gym Session</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {WORKOUT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(value === type ? null : type)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium capitalize
              transition-colors duration-200
              ${value === type
                ? 'bg-sky-100 text-sky-700 border-2 border-sky-400'
                : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {value && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: <span className="font-medium capitalize">{value}</span>
        </p>
      )}
    </div>
  );
}