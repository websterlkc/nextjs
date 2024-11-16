import { KeyController } from '@/app/controllers/keyController';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return new Response('Missing ID parameter', { status: 400 });
  }
  const data = await request.json();
  return await KeyController.updateKey(id, data);
} 