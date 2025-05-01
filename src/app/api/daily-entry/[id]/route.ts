import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Delete in order to respect foreign key constraints
    await prisma.$transaction(async (tx) => {
      // 1. Delete all supplements for this entry
      await tx.supplementLog.deleteMany({
        where: { entryId: id }
      });

      // 2. Delete all exercises for the gym session (if exists)
      const gymSession = await tx.gymSession.findUnique({
        where: { entryId: id }
      });
      
      if (gymSession) {
        await tx.gymExercise.deleteMany({
          where: { sessionId: gymSession.id }
        });
        
        // 3. Delete the gym session
        await tx.gymSession.delete({
          where: { id: gymSession.id }
        });
      }

      // 4. Finally delete the daily entry
      await tx.dailyEntry.delete({
        where: { id }
      });
    });

    return NextResponse.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
