import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { PersonalRecord, ExerciseHistory } from '../utils/types';
import { ProgressChart } from '../charts/ProgressChart';

interface PRCardProps {
  exerciseName: string;
  pr: PersonalRecord;
  isSelected: boolean;
  exerciseHistory: ExerciseHistory;
  onCardClick: (exerciseName: string) => void;
}

export function PRCard({ 
  exerciseName, 
  pr, 
  isSelected, 
  exerciseHistory,
  onCardClick 
}: PRCardProps) {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50/40 to-gray-100/30 border border-gray-100/30 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{exerciseName}</h4>
        <button 
          onClick={() => onCardClick(exerciseName)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isSelected ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium text-gray-900">{pr.weight} lbs</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Reps:</span>
          <span className="font-medium text-gray-900">{pr.reps}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated 1RM:</span>
          <span className="font-medium text-gray-900">{Math.round(pr.oneRepMax)} lbs</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Set on {pr.date}
        </div>
      </div>

      {isSelected && (
        <ProgressChart 
          exerciseName={exerciseName}
          exerciseHistory={exerciseHistory}
        />
      )}
    </div>
  );
}
