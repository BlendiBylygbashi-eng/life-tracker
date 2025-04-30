import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const dailyEntry = await prisma.dailyEntry.create({
      data: {
        date: new Date(body.date),
        timeInOffice: parseFloat(body.timeInOffice),
        calories: parseInt(body.calories),
        protein: parseInt(body.protein),
        gripStrength: body.gripStrength ? parseFloat(body.gripStrength) : null,
        activities: body.dailyActivities,
        improvements: body.improvements,
        supplements: {
          create: [
            { supplementName: 'creatine', taken: body.supplements.creatine },
            { supplementName: 'vitamin_c', taken: body.supplements.vitaminC },
            { supplementName: 'vitamin_d', taken: body.supplements.vitaminD },
          ],
        },
        ...(body.gymSession.type && {
          gymSession: {
            create: {
              type: body.gymSession.type,
              exercises: {
                create: body.gymSession.exercises.map((exercise: any) => ({
                  name: exercise.name,
                  weight: parseFloat(exercise.weight),
                  reps: parseInt(exercise.reps),
                  order: exercise.order,
                })),
              },
            },
          },
        }),
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

    return NextResponse.json(dailyEntry, { status: 201 });
  } catch (error) {
    console.error('Failed to create daily entry:', error);
    return NextResponse.json(
      { error: 'Failed to create daily entry' },
      { status: 500 }
    );
  }
}
