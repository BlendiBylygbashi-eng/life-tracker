import { createSuccessResponse, createErrorResponse } from '../utils/error-handling';
import { deleteDailyEntry, updateDailyEntry } from '../utils/db-operations';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
