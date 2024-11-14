import { KeyController } from '../keyController';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const response = await KeyController.validateKey(apiKey);
    const { valid } = await response.json();
    
    if (!valid) {
      return NextResponse.json(
        { valid: false, message: 'Invalid API key' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { valid: true, message: 'API key validated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}