import { PrismaClient } from '@prisma/client';
import type { DailyEntry } from '@/types/dashboard';

export async function getDashboardData(): Promise<DailyEntry[]> {
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
