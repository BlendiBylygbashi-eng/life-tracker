import { PrismaClient } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

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
    take: 7 // Get last 7 days for recent history
  });
  
  await prisma.$disconnect();
  return entries;
}

export default async function DashboardPage() {
  const entries = await getDashboardData();
  const mostRecent = entries[0];
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
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
