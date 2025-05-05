'use client';

import type { DailyEntry } from '@/types/dashboard';
import {
  GOALS,
  calculateGoalStats,
  calculateCurrentStreaks,
  getWeeklyGymSessions
} from './utils';
import {
  TimeGoalCard,
  CaloriesGoalCard,
  ProteinGoalCard,
  GymGoalCard
} from './cards';

interface GoalAchievementProps {
  entries: DailyEntry[];
}

export default function GoalAchievement({ entries }: GoalAchievementProps) {
  const stats = calculateGoalStats(entries);
  const currentStreaks = calculateCurrentStreaks(entries);
  const totalEntries = entries.length;
  const weeklyGymStats = getWeeklyGymSessions(entries);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <h2 className="text-xl font-semibold mb-6">Goal Achievement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TimeGoalCard
          successCount={stats.timeSuccess}
          totalEntries={totalEntries}
          currentStreak={currentStreaks.timeStreak}
          goalValue={GOALS.timeInOffice}
        />
        
        <CaloriesGoalCard
          successCount={stats.caloriesSuccess}
          totalEntries={totalEntries}
          currentStreak={currentStreaks.caloriesStreak}
          goalValue={GOALS.calories}
        />
        
        <ProteinGoalCard
          successCount={stats.proteinSuccess}
          totalEntries={totalEntries}
          currentStreak={currentStreaks.proteinStreak}
          goalValue={GOALS.protein}
        />
        
        <GymGoalCard
          weeklySuccessRate={weeklyGymStats.weeklySuccessRate}
          currentWeekSessions={weeklyGymStats.currentWeekSessions}
          goalValue={GOALS.weeklyGymSessions}
        />
      </div>
    </div>
  );
}
