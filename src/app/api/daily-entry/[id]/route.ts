import { createSuccessResponse, createErrorResponse } from '../utils/error-handling';
import { deleteDailyEntry, updateDailyEntry } from '../utils/db-operations';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const entry = await prisma.dailyEntry.findUnique({
      where: { id }
    });
    
    if (!entry) {
      return createErrorResponse('Entry not found', 404);
    }
    
    await deleteDailyEntry(id);
    return createSuccessResponse({ message: 'Entry deleted successfully' });
  } catch (error) {
    return createErrorResponse('Failed to delete entry');
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const updatedEntry = await updateDailyEntry(id, body);
    return createSuccessResponse(updatedEntry);
  } catch (error) {
    return createErrorResponse('Failed to update entry');
  }
}
