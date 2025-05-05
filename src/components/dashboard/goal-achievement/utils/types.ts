import type { DailyEntry } from '@/types/dashboard';

export interface GoalStats {
  timeSuccess: number;
  caloriesSuccess: number;
  proteinSuccess: number;
}

export interface GoalStreaks {
  timeStreak: number;
  caloriesStreak: number;
  proteinStreak: number;
}

export interface WeeklyGymStats {
  currentWeekSessions: number;
  weeklySuccessRate: number;
}

export interface GoalThresholds {
  timeInOffice: number;  // hours
  calories: number;      // max calories
  protein: number;       // grams
  weeklyGymSessions: number; // sessions per week
}
