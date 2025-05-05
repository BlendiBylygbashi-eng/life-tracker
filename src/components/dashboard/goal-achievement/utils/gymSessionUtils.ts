import type { DailyEntry } from '@/types/dashboard';
import type { WeeklyGymStats } from './types';
import { GOALS } from './goalConfig';

export function getWeeklyGymSessions(entries: DailyEntry[]): WeeklyGymStats {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Count sessions in current week
  const currentWeekSessions = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entry.gymSession && entryDate >= startOfWeek && entryDate <= endOfWeek;
  }).length;

  // Calculate success rate (weeks with 3+ sessions)
  const weekMap = new Map<string, number>();
  
  entries.forEach(entry => {
    if (entry.gymSession) {
      const entryDate = new Date(entry.date);
      const weekStart = new Date(entryDate);
      weekStart.setDate(entryDate.getDate() - entryDate.getDay() + (entryDate.getDay() === 0 ? -6 : 1));
      const weekKey = weekStart.toISOString().split('T')[0];
      
      weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + 1);
    }
  });

  const successfulWeeks = Array.from(weekMap.values()).filter(sessions => sessions >= GOALS.weeklyGymSessions).length;
  const totalWeeks = weekMap.size;

  return {
    currentWeekSessions,
    weeklySuccessRate: totalWeeks > 0 ? (successfulWeeks / totalWeeks) * 100 : 0
  };
}
