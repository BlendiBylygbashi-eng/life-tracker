import { PrismaClient } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import CircularProgress from '@/components/ui/CircularProgress';
import WeeklyOverview from '@/components/dashboard/WeeklyOverview';
import { theme } from '@/styles/theme';
import GymProgressTracker from '@/components/dashboard/GymProgressTracker';
import GoalAchievement from '@/components/dashboard/GoalAchievement';
import type { DailyEntry, GymSession } from '@/types/dashboard';
import LatestEntry from '@/components/dashboard/LatestEntry';

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
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Daily Goals Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <div className="text-center">
            <CircularProgress
              value={mostRecent.timeInOffice}
              max={GOALS.timeInOffice}
              size={120}
              strokeWidth={10}
              progressColor={theme.colors.metrics.office}
              backgroundColor="#E5E7EB"
            />
            <div className="mt-2">
              <div className="font-medium">Office Time</div>
              <div className="text-sm text-gray-600">{mostRecent.timeInOffice}h / {GOALS.timeInOffice}h</div>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress
              value={mostRecent.calories}
              max={GOALS.calories}
              size={120}
              strokeWidth={10}
              progressColor={theme.colors.metrics.calories}
              backgroundColor="#E5E7EB"
              isInverse={true}
            />
            <div className="mt-2">
              <div className="font-medium">Calories</div>
              <div className="text-sm text-gray-600">{mostRecent.calories} / {GOALS.calories}</div>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress
              value={mostRecent.protein}
              max={GOALS.protein}
              size={120}
              strokeWidth={10}
              progressColor={theme.colors.metrics.protein}
              backgroundColor="#E5E7EB"
            />
            <div className="mt-2">
              <div className="font-medium">Protein</div>
              <div className="text-sm text-gray-600">{mostRecent.protein}g / {GOALS.protein}g</div>
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

      {/* Latest Entry */}
      <LatestEntry entry={mostRecent} />
    </div>
  );
}
