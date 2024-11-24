import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/connection/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { valid: false, message: 'API key is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();
      
    if (error || !data) {
      return NextResponse.json(
        { valid: false, message: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Check if the key has usage limits
    if (data.usage > 0 && data.used >= data.usage) {
      return NextResponse.json(
        { valid: false, message: 'API key usage limit exceeded' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      valid: true,
      message: 'Valid API key',
      usage: data.used || 0,
      limit: data.usage || null
    });
    
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate API key' },
      { status: 500 }
    );
  }
} 