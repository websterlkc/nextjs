import { KeyController } from '@/app/controllers/keyController';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return await KeyController.createKey(request);
} 