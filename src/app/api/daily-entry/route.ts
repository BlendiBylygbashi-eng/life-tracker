import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the received data
    console.log('Received body:', body);

    const dailyEntry = await prisma.dailyEntry.create({
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
        ...(body.gymSession?.type && {
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
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to create daily entry',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
