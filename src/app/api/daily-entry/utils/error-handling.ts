import { NextResponse } from 'next/server';

/**
 * Creates a standardized success response
 */
export function createSuccessResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(message: string, status = 500) {
  console.error(`API Error (${status}):`, message);
  return NextResponse.json(
    { error: message },
    { status }
  );
}
