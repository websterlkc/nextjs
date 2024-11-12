import { KeyController } from '../keyController';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return new Response('Missing ID parameter', { status: 400 });
  }
  return await KeyController.deleteKey(id);
} 