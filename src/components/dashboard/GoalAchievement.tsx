'use client';

import { theme } from '@/styles/theme';
import type { DailyEntry } from '@/types/dashboard';

interface GoalAchievementProps {
  entries: DailyEntry[];
}

// Constants for goals (same as in DailyEntryForm)
const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
};

export default function GoalAchievement({ entries }: GoalAchievementProps) {
  // Calculate success rates
  const stats = entries.reduce(
    (acc, entry) => {
      // Time in office goal (≥ 9 hours)
      if (entry.timeInOffice >= GOALS.timeInOffice) {
        acc.timeSuccess++;
      }
      
      // Calories goal (≤ 2273)
      if (entry.calories <= GOALS.calories) {
        acc.caloriesSuccess++;
      }
      
      // Protein goal (≥ 205g)
      if (entry.protein >= GOALS.protein) {
        acc.proteinSuccess++;
      }

      return acc;
    },
    { timeSuccess: 0, caloriesSuccess: 0, proteinSuccess: 0 }
  );

  // Calculate current streaks
  const currentStreaks = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce(
      (acc, entry) => {
        // Time streak
        if (entry.timeInOffice >= GOALS.timeInOffice) {
          acc.timeStreak++;
        } else {
          acc.timeStreak = 0;
        }

        // Calories streak
        if (entry.calories <= GOALS.calories) {
          acc.caloriesStreak++;
        } else {
          acc.caloriesStreak = 0;
        }

        // Protein streak
        if (entry.protein >= GOALS.protein) {
          acc.proteinStreak++;
        } else {
          acc.proteinStreak = 0;
        }

        return acc;
      },
      { timeStreak: 0, caloriesStreak: 0, proteinStreak: 0 }
    );

  const totalEntries = entries.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Goal Achievement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Time in Office */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
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
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
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
        <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
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
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
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
      </div>
    </div>
  );
}
