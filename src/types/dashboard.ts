export interface DailyEntry {
  id: string;
  date: Date;
  timeInOffice: number;
  calories: number;
  protein: number;
  bodyWeight: number | null;
  gripStrength: number | null;
  activities: string | null;
  improvements: string | null;
  supplements: {
    id: string;
    entryId: string;
    supplementName: string;
    taken: boolean;
  }[];
  gymSession: {
    id: string;
    type: string;
    exercises: {
      id: string;
      name: string;
      weight: number;
      reps: number;
      order: number;
    }[];
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  name: string;
  weight: number;
  reps: number;
  date: Date;
  createdAt: Date;
}

export interface GymSession {
  type: string;
  exercises: Exercise[];
  date: Date;
  bodyWeight: number | null;
  createdAt: Date;
}
