import { PrismaClient } from '@prisma/client';
import { EntryRequestData, transformEntryData, transformExerciseData } from './transformers';

const prisma = new PrismaClient();

/**
 * Deletes a daily entry and all related records
 */
export async function deleteDailyEntry(id: string) {
  try {
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
    
    return true;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Updates a daily entry and all related records
 */
export async function updateDailyEntry(id: string, body: EntryRequestData) {
  try {
    // Start a transaction to update everything
    const updatedEntry = await prisma.$transaction(async (tx) => {
      // 1. Update supplements
      await tx.supplementLog.deleteMany({
        where: { entryId: id }
      });

      // 2. Handle gym session
      if (body.gymSession?.type) {
        const existingSession = await tx.gymSession.findUnique({
          where: { entryId: id }
        });

        if (existingSession) {
          // Delete existing exercises
          await tx.gymExercise.deleteMany({
            where: { sessionId: existingSession.id }
          });

          // Update session and create new exercises
          await tx.gymSession.update({
            where: { id: existingSession.id },
            data: {
              type: body.gymSession.type,
              exercises: {
                create: body.gymSession.exercises.map(transformExerciseData),
              },
            },
          });
        } else {
          // Create new session if it didn't exist
          await tx.gymSession.create({
            data: {
              entryId: id,
              type: body.gymSession.type,
              exercises: {
                create: body.gymSession.exercises.map(transformExerciseData),
              },
            },
          });
        }
      } else {
        // Delete gym session if it's been removed
        await tx.gymSession.deleteMany({
          where: { entryId: id }
        });
      }

      // 3. Update the main entry
      const updated = await tx.dailyEntry.update({
        where: { id },
        data: transformEntryData(body),
        include: {
          supplements: true,
          gymSession: {
            include: {
              exercises: true,
            },
          },
        },
      });

      return updated;
    });

    return updatedEntry;
  } finally {
    await prisma.$disconnect();
  }
}
