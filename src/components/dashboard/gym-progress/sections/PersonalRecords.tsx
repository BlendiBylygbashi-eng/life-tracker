import type { ExerciseHistory, PersonalRecords as PersonalRecordsType } from '../utils/types';
import { PRCard } from '../cards/PRCard';
import { createChartData } from '../utils/chartConfig';

interface PersonalRecordsProps {
  exerciseNames: string[];
  personalRecords: PersonalRecordsType;
  exerciseHistory: ExerciseHistory;
  selectedExercise: string | null;
  onCardClick: (exerciseName: string) => void;
}

export function PersonalRecords({ 
  exerciseNames,
  personalRecords,
  exerciseHistory,
  selectedExercise,
  onCardClick
}: PersonalRecordsProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Records</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exerciseNames.map(exerciseName => {
          const pr = personalRecords[exerciseName];
          if (!pr) return null;

          return (
            <PRCard
              key={exerciseName}
              exerciseName={exerciseName}
              pr={pr}
              isSelected={selectedExercise === exerciseName}
              exerciseHistory={exerciseHistory}
              onCardClick={onCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}
