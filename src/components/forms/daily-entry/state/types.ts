import type { WorkoutType } from '@/lib/workoutData';
import type { DailyEntry } from '@/types/dashboard';

// Form Data Interface
export interface DailyEntryFormData {
  date: string;
  timeInOffice: number;
  calories: number;
  protein: number;
  bodyWeight: string;
  gripStrength: string;
  activities: string;
  improvements: string;
  supplements: {
    creatine: boolean;
    vitaminC: boolean;
    vitaminD: boolean;
  };
  gymSession: {
    type: WorkoutType | null;
    exercises: Array<{
      id: string;
      name: string;
      weight: string;
      reps: string;
      order: number;
    }>;
  };
}

// Component Props Interface
export interface DailyEntryFormProps {
  initialData?: DailyEntry;  // For edit mode
  onSuccess?: () => void;    // Callback after successful submit
  mode?: 'create' | 'edit';  // To distinguish between create/edit modes
}

// Form Goals Constants
export const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
} as const;

// Handler Types
export type SupplementsChangeHandler = (supplements: {
  creatine: boolean;
  vitaminC: boolean;
  vitaminD: boolean;
}) => void;

export type GymSessionTypeChangeHandler = (type: WorkoutType) => void;

export type ExercisesChangeHandler = (exercises: Array<{
  id: string;
  name: string;
  weight: string;
  reps: string;
  order: number;
}>) => void;

export type FormChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;