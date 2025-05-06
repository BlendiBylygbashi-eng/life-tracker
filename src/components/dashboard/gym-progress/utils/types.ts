import type { GymSession } from '@/types/dashboard';

export interface Exercise {
  name: string;
  weight: number;
  reps: number;
  date: string;
  createdAt: string;
}

export interface ExerciseInstance extends Exercise {
  oneRepMax: number;
}

export interface PersonalRecord {
  weight: number;
  reps: number;
  oneRepMax: number;
  date: string;
}

export interface ExerciseHistory {
  [exerciseName: string]: ExerciseInstance[];
}

export interface PersonalRecords {
  [exerciseName: string]: PersonalRecord | null;
}

export interface GymProgressTrackerProps {
  sessions: GymSession[];
}
