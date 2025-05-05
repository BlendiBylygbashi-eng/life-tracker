'use client';

import { theme } from '@/styles/theme';
import type { DailyEntry } from '@/types/dashboard';
import {
  GOALS,
  calculateGoalStats,
  calculateCurrentStreaks,
  getWeeklyGymSessions
} from './utils';

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
        {/* Time in Office */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/90 border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Time in Office</h3>
            <span className="text-sm text-blue-600 font-medium">
              Goal: ≥{GOALS.timeInOffice}h
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-blue-600">
                  {Math.round((stats.timeSuccess / totalEntries) * 100)}%
                </span>
              </div>
              <div className="h-2.5 bg-blue-100/50 rounded-full overflow-hidden backdrop-blur-[2px]">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(stats.timeSuccess / totalEntries) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-medium text-blue-600">{currentStreaks.timeStreak} days</span>
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-red-50/80 to-pink-50/90 border border-red-100/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Calories</h3>
            <span className="text-sm text-red-600 font-medium">
              Goal: ≤{GOALS.calories}
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-red-600">
                  {Math.round((stats.caloriesSuccess / totalEntries) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.caloriesSuccess / totalEntries) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-medium text-red-600">{currentStreaks.caloriesStreak} days</span>
            </div>
          </div>
        </div>

        {/* Protein */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-green-50/80 to-emerald-50/90 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Protein</h3>
            <span className="text-sm text-green-600 font-medium">
              Goal: ≥{GOALS.protein}g
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-green-600">
                  {Math.round((stats.proteinSuccess / totalEntries) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.proteinSuccess / totalEntries) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-medium text-green-600">{currentStreaks.proteinStreak} days</span>
            </div>
          </div>
        </div>

        {/* Gym Sessions */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50/80 to-violet-50/90 border border-purple-100/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Weekly Gym</h3>
            <span className="text-sm text-purple-600 font-medium">
              Goal: ≥{GOALS.weeklyGymSessions}x
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium text-purple-600">
                  {Math.round(weeklyGymStats.weeklySuccessRate)}%
                </span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${weeklyGymStats.weeklySuccessRate}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">This Week</span>
              <span className="font-medium text-purple-600">
                {weeklyGymStats.currentWeekSessions} / {GOALS.weeklyGymSessions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
