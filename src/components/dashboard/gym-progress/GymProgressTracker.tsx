'use client';

import type { GymProgressTrackerProps } from './utils/types';
import { Container } from './layout/Container';
import { useGymProgress } from './hooks/useGymProgress';
import { StrengthSection } from './sections/StrengthSection';
import { RecordsSection } from './sections/RecordsSection';

export default function GymProgressTracker({ sessions }: GymProgressTrackerProps) {
  const {
    selectedExercise,
    exerciseNames,
    exerciseHistory,
    personalRecords,
    latestBodyWeight,
    handleCardClick,
  } = useGymProgress(sessions);

  return (
    <Container title="Strength Progress">
      <StrengthSection 
        personalRecords={personalRecords}
        latestBodyWeight={latestBodyWeight}
      />

      <RecordsSection
        exerciseNames={exerciseNames}
        personalRecords={personalRecords}
        exerciseHistory={exerciseHistory}
        selectedExercise={selectedExercise}
        onCardClick={handleCardClick}
      />
    </Container>
  );
}
