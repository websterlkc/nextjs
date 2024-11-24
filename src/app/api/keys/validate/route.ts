import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/connection/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();
    
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
    
    return NextResponse.json({
      valid: true,
      message: 'Valid API key',
      usage: data.usage,
      limit: data.limit || 1000
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate API key' },
      { status: 500 }
    );
  }
} 