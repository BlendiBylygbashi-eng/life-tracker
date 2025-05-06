import { useState } from 'react';
import type { GymSession } from '@/types/dashboard';
import {
  getExerciseNames,
  calculateExerciseHistory,
  calculatePersonalRecords,
  getLatestBodyWeight,
} from '../utils/calculations';
import type { ExerciseHistory, PersonalRecords } from '../utils/types';

interface GymProgressData {
  selectedExercise: string | null;
  exerciseNames: string[];
  exerciseHistory: ExerciseHistory;
  personalRecords: PersonalRecords;
  latestBodyWeight: number | undefined;
  handleCardClick: (exerciseName: string) => void;
}

export function useGymProgress(sessions: GymSession[]): GymProgressData {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const exerciseNames = getExerciseNames(sessions);
  const exerciseHistory = calculateExerciseHistory(exerciseNames, sessions);
  const personalRecords = calculatePersonalRecords(exerciseNames, exerciseHistory);
  const latestBodyWeight = getLatestBodyWeight(sessions);

  const handleCardClick = (exerciseName: string) => {
    setSelectedExercise(selectedExercise === exerciseName ? null : exerciseName);
  };

  return {
    selectedExercise,
    exerciseNames,
    exerciseHistory,
    personalRecords,
    latestBodyWeight,
    handleCardClick,
  };
}
