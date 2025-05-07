import { PrismaClient } from '@prisma/client';
import type { DailyEntry } from '@/types/dashboard';

export async function getDashboardData(): Promise<DailyEntry[]> {
  const prisma = new PrismaClient();
  
  try {
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
    
    return entries; // This will be an empty array if no entries exist
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return []; // Return empty array on error
  } finally {
    await prisma.$disconnect(); // Ensure connection is closed even if there's an error
  }
}
