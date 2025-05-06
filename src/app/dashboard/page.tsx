import { PrismaClient } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import CircularProgress from '@/components/ui/CircularProgress';
import { WeeklyOverview } from '@/components/dashboard/weekly-overview';
import { theme } from '@/styles/theme';
import { GymProgressTracker } from '@/components/dashboard/gym-progress';
import { GoalAchievement } from '@/components/dashboard/goal-achievement';
import type { DailyEntry, GymSession } from '@/types/dashboard';
import { EntryViewerContainer } from '@/components/dashboard/entry-viewer';

// Constants for goals (same as in DailyEntryForm)
const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
};

async function getDashboardData(): Promise<DailyEntry[]> {
  const prisma = new PrismaClient();
  const entries = await prisma.dailyEntry.findMany({
    include: {
      supplements: true,
      gymSession: {
        include: {
          exercises: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 30  // Increased to get more history for PRs
  });
  
  await prisma.$disconnect();
  return entries;
}

export default async function DashboardPage() {
  const entries = await getDashboardData();
  const mostRecent = entries[0];
  
  // Calculate progress percentages with capping at 100%
  const timeProgress = Math.min(100, (mostRecent.timeInOffice / GOALS.timeInOffice) * 100);
  const caloriesProgress = Math.min(100, Math.max(0, 100 - (mostRecent.calories / GOALS.calories) * 100));
  const proteinProgress = Math.min(100, (mostRecent.protein / GOALS.protein) * 100);

  console.log('Progress values:', {
    timeProgress,
    caloriesProgress,
    proteinProgress,
    timeInOffice: mostRecent.timeInOffice,
    calories: mostRecent.calories,
    protein: mostRecent.protein
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Goal Achievement */}
      <div className="mb-8">
        <GoalAchievement entries={entries} />
      </div>

      {/* Progress Rings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Daily Goals Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {/* Individual ring containers */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50/40 to-indigo-50/30 border border-blue-100/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm w-full max-w-[200px]">
            <CircularProgress
              value={mostRecent.timeInOffice}
              max={GOALS.timeInOffice}
              size={120}
              strokeWidth={12}
              progressColor={theme.colors.metrics.office}
              backgroundColor="rgba(229, 231, 235, 0.5)"
            />
            <div className="mt-4">
              <div className="font-medium text-gray-900">Office Time</div>
              <div className="text-sm text-gray-600 mt-1">{mostRecent.timeInOffice}h / {GOALS.timeInOffice}h</div>
            </div>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50/40 to-pink-50/30 border border-red-100/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm w-full max-w-[200px]">
            <CircularProgress
              value={mostRecent.calories}
              max={GOALS.calories}
              size={120}
              strokeWidth={12}
              progressColor={theme.colors.metrics.calories}
              backgroundColor="rgba(229, 231, 235, 0.5)"
              isInverse={true}
            />
            <div className="mt-4">
              <div className="font-medium text-gray-900">Calories</div>
              <div className="text-sm text-gray-600 mt-1">{mostRecent.calories} / {GOALS.calories}</div>
            </div>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50/40 to-emerald-50/30 border border-green-100/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm w-full max-w-[200px]">
            <CircularProgress
              value={mostRecent.protein}
              max={GOALS.protein}
              size={120}
              strokeWidth={12}
              progressColor={theme.colors.metrics.protein}
              backgroundColor="rgba(229, 231, 235, 0.5)"
            />
            <div className="mt-4">
              <div className="font-medium text-gray-900">Protein</div>
              <div className="text-sm text-gray-600 mt-1">{mostRecent.protein}g / {GOALS.protein}g</div>
            </div>
          </div>
        </div>
      </div>

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
