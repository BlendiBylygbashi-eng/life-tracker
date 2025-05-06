import type { GymSession } from '@/types/dashboard';
import { format } from 'date-fns';
import type { 
  Exercise, 
  ExerciseInstance, 
  ExerciseHistory, 
  PersonalRecords 
} from './types';

// Calculate One Rep Max using Brzycki formula
export function calculateOneRepMax(weight: number, reps: number): number {
  return weight * (36 / (37 - reps));
}

// Format the date to be more readable
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Get unique exercise names from sessions
export function getExerciseNames(sessions: GymSession[]): string[] {
  return Array.from(
    new Set(
      sessions.flatMap(session => 
        session.exercises.map(exercise => exercise.name)
      )
    )
  ).sort();
}

// Calculate exercise history with 1RM
export function calculateExerciseHistory(exerciseNames: string[], sessions: GymSession[]): ExerciseHistory {
  return exerciseNames.reduce((acc, exerciseName) => {
    const exerciseInstances = sessions
      .flatMap(session =>
        session.exercises
          .filter(exercise => exercise.name === exerciseName)
          .map(exercise => ({
            ...exercise,
            oneRepMax: calculateOneRepMax(exercise.weight, exercise.reps),
            date: new Date(session.date).toISOString(),
            createdAt: new Date(session.createdAt).toISOString()
          }))
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    acc[exerciseName] = exerciseInstances;
    return acc;
  }, {} as ExerciseHistory);
}

// Calculate personal records
export function calculatePersonalRecords(exerciseNames: string[], exerciseHistory: ExerciseHistory): PersonalRecords {
  return exerciseNames.reduce((acc, exerciseName) => {
    const instances = exerciseHistory[exerciseName];
    const maxOneRepMax = Math.max(...instances.map(instance => instance.oneRepMax));
    const prInstance = instances.find(instance => instance.oneRepMax === maxOneRepMax);

    acc[exerciseName] = prInstance ? {
      weight: prInstance.weight,
      reps: prInstance.reps,
      oneRepMax: maxOneRepMax,
      date: format(new Date(prInstance.date), 'MMM d'),
    } : null;

    return acc;
  }, {} as PersonalRecords);
}

// Get latest body weight from sessions
export function getLatestBodyWeight(sessions: GymSession[]): number | undefined {
  return sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .find(session => session.bodyWeight)?.bodyWeight;
}
