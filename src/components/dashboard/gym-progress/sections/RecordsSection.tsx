import type { ExerciseHistory, PersonalRecords } from '../utils/types';
import { PersonalRecords as PersonalRecordsComponent } from './PersonalRecords';

interface RecordsSectionProps {
  exerciseNames: string[];
  personalRecords: PersonalRecords;
  exerciseHistory: ExerciseHistory;
  selectedExercise: string | null;
  onCardClick: (exerciseName: string) => void;
}

export function RecordsSection({
  exerciseNames,
  personalRecords,
  exerciseHistory,
  selectedExercise,
  onCardClick
}: RecordsSectionProps) {
  return (
    <PersonalRecordsComponent
      exerciseNames={exerciseNames}
      personalRecords={personalRecords}
      exerciseHistory={exerciseHistory}
      selectedExercise={selectedExercise}
      onCardClick={onCardClick}
    />
  );
}
