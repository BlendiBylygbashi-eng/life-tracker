import { WeeklyOverview } from '@/components/dashboard/weekly-overview';
import { GymProgressTracker } from '@/components/dashboard/gym-progress';
import { GoalAchievement } from '@/components/dashboard/goal-achievement';
import { GoalsProgress } from '@/components/dashboard/goals-progress/GoalsProgress';
import type { DailyEntry, GymSession } from '@/types/dashboard';
import { EntryViewerContainer } from '@/components/dashboard/entry-viewer';
import { getDashboardData } from './utils/data-fetching';
import { GOALS } from './utils/constants';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const entries = await getDashboardData();
  
  if (!entries || entries.length === 0) {
    return (
      <div className="p-4 pt-0 pb-20 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Dashboard</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Welcome to Life Tracker</h2>
          <p className="mb-6">Start tracking your daily activities to see your progress here</p>
          <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Create Your First Entry
          </a>
        </div>
      </div>
    );
  }
  
  const mostRecent = entries[0];
  
  return (
    <div className="p-4 pt-0 pb-20 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Dashboard</h1>
      
      {/* Goal Achievement */}
      <div className="mb-8">
        <GoalAchievement entries={entries} />
      </div>

      {/* Progress Rings */}
      <GoalsProgress entry={mostRecent} goals={GOALS} />

      {/* Weekly Overview Chart */}
      <div className="mb-8">
        <WeeklyOverview entries={entries} />
      </div>

      {/* Gym Progress Tracker */}
      <div className="mb-8">
        <GymProgressTracker 
          sessions={entries
            .filter(entry => entry.gymSession)
            .map(entry => ({
              type: entry.gymSession!.type,
              exercises: entry.gymSession!.exercises.map(ex => ({
                name: ex.name,
                weight: ex.weight,
                reps: ex.reps,
                date: entry.date,
                createdAt: entry.createdAt
              })),
              date: entry.date,
              bodyWeight: entry.bodyWeight,
              createdAt: entry.createdAt
            } as GymSession))}
        />
      </div>

      {/* Entry Viewer */}
      <EntryViewerContainer entries={entries} />
    </div>
  );
}
