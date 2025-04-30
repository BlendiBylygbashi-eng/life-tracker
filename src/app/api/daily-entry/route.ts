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
        activities: body.dailyActivities,
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
