export type WorkoutType = 'push' | 'pull' | 'legs & shoulder' | 'other';

export const WORKOUT_TYPES: WorkoutType[] = ['push', 'pull', 'legs & shoulder', 'other'];

export const EXERCISE_OPTIONS: Record<WorkoutType, string[]> = {
  'push': [
    'Flat Bench Press',
    'Incline Dumbbell Press',
    'Pec Fly Machine',
    'EZ Bar Skullcrusher',
    'Tricep Bar Pushdown',
  ],
  'pull': [
    'Deadlift',
    'Pullups',
    'T-Bar Row',
    'EZ Bar Curl',
    'Fat Grip Dumbbell Hammer Curl',
  ],
  'legs & shoulder': [
    'Squats',
    'Barbell Standing Shoulder Press',
    'Dumbbell Lateral Raise',
  ],
  'other': [], // Keep empty for custom exercises
};
