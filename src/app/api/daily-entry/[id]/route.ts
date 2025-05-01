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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

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
                create: body.gymSession.exercises.map((ex: any) => ({
                  name: ex.name,
                  weight: parseFloat(ex.weight),
                  reps: parseInt(ex.reps),
                  order: ex.order,
                })),
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
                create: body.gymSession.exercises.map((ex: any) => ({
                  name: ex.name,
                  weight: parseFloat(ex.weight),
                  reps: parseInt(ex.reps),
                  order: ex.order,
                })),
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
        data: {
          date: new Date(body.date),
          timeInOffice: parseFloat(body.timeInOffice),
          calories: parseInt(body.calories),
          protein: parseInt(body.protein),
          bodyWeight: body.bodyWeight ? parseFloat(body.bodyWeight) : null,
          gripStrength: body.gripStrength ? parseFloat(body.gripStrength) : null,
          activities: body.activities,
          improvements: body.improvements,
          supplements: {
            create: [
              { supplementName: 'creatine', taken: body.supplements.creatine },
              { supplementName: 'vitamin_c', taken: body.supplements.vitaminC },
              { supplementName: 'vitamin_d', taken: body.supplements.vitaminD },
            ],
          },
        },
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

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error updating entry:', error);
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
