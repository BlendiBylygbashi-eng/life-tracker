import { PrismaClient } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import CircularProgress from '@/components/ui/CircularProgress';
import WeeklyOverview from '@/components/dashboard/WeeklyOverview';
import { theme } from '@/styles/theme';
import GymProgressTracker from '@/components/dashboard/GymProgressTracker';
import GoalAchievement from '@/components/dashboard/GoalAchievement';

// Constants for goals (same as in DailyEntryForm)
const GOALS = {
  timeInOffice: 9, // hours
  calories: 2273, // max calories
  protein: 205, // grams
};

async function getDashboardData() {
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
  const timeProgress = Math.min(100, (mostRecent.timeInOffice / 9) * 100); // Goal: 9 hours
  const caloriesProgress = Math.min(100, Math.max(0, 100 - (mostRecent.calories / 2273) * 100)); // Goal: under 2273
  const proteinProgress = Math.min(100, (mostRecent.protein / 205) * 100); // Goal: 205g

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
              })),
              date: entry.date,
            }))}
        />
      </div>

      {/* Most Recent Entry Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Latest Entry ({formatDistanceToNow(new Date(mostRecent.date), { addSuffix: true })})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metrics */}
          <div className="space-y-4">
            <h3 className="font-medium">Daily Metrics</h3>
            <div className="space-y-2">
              <p>Time in Office: {mostRecent.timeInOffice} hours</p>
              <p>Calories: {mostRecent.calories}</p>
              <p>Protein: {mostRecent.protein}g</p>
              {mostRecent.bodyWeight && (
                <p>Body Weight: {mostRecent.bodyWeight} lbs</p>
              )}
              {mostRecent.gripStrength && (
                <p>Grip Strength: {mostRecent.gripStrength}kg</p>
              )}
            </div>
          </div>
          
          {/* Supplements */}
          <div className="space-y-4">
            <h3 className="font-medium">Supplements Taken</h3>
            <div className="space-y-2">
              {mostRecent.supplements.map(supp => (
                <p key={supp.id} className={supp.taken ? "text-green-600" : "text-red-600"}>
                  {supp.supplementName.replace('_', ' ').toUpperCase()}: {supp.taken ? '✓' : '✗'}
                </p>
              ))}
            </div>
          </div>
          
          {/* Gym Session */}
          <div className="space-y-4">
            <h3 className="font-medium">Gym Session</h3>
            {mostRecent.gymSession ? (
              <div className="space-y-2">
                <p className="font-medium">{mostRecent.gymSession.type.toUpperCase()} Day</p>
                <div className="text-sm space-y-1">
                  {mostRecent.gymSession.exercises.map(ex => (
                    <p key={ex.id}>
                      {ex.name}: {ex.weight}lbs × {ex.reps} reps
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No gym session recorded</p>
            )}
          </div>
        </div>
        
        {/* Reflections */}
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium">Activities</h3>
            <p className="text-gray-600">{mostRecent.activities}</p>
          </div>
          <div>
            <h3 className="font-medium">Areas for Improvement</h3>
            <p className="text-gray-600">{mostRecent.improvements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
