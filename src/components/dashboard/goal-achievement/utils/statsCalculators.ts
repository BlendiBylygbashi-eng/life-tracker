import type { DailyEntry } from '@/types/dashboard';
import type { GoalStats, GoalStreaks } from './types';
import { GOALS } from './goalConfig';

export function calculateGoalStats(entries: DailyEntry[]): GoalStats {
  return entries.reduce(
    (acc, entry) => {
      if (entry.timeInOffice >= GOALS.timeInOffice) {
        acc.timeSuccess++;
      }
      if (entry.calories <= GOALS.calories) {
        acc.caloriesSuccess++;
      }
      if (entry.protein >= GOALS.protein) {
        acc.proteinSuccess++;
      }
      return acc;
    },
    { timeSuccess: 0, caloriesSuccess: 0, proteinSuccess: 0 }
  );
}

export function calculateCurrentStreaks(entries: DailyEntry[]): GoalStreaks {
  return entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce(
      (acc, entry) => {
        if (entry.timeInOffice >= GOALS.timeInOffice) {
          acc.timeStreak++;
        } else {
          acc.timeStreak = 0;
        }
        if (entry.calories <= GOALS.calories) {
          acc.caloriesStreak++;
        } else {
          acc.caloriesStreak = 0;
        }
        if (entry.protein >= GOALS.protein) {
          acc.proteinStreak++;
        } else {
          acc.proteinStreak = 0;
        }
        return acc;
      },
      { timeStreak: 0, caloriesStreak: 0, proteinStreak: 0 }
    );
}
