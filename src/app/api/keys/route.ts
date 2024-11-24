import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/connection/supabaseClient';
import { getAuthenticatedUserId } from '@/app/utils/auth';

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return NextResponse.json(data);
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    const body = await request.json();
    const { name, usage } = body;
    
    const key = Array.from({ length: 16 }, () => 
      Math.random().toString(36).charAt(2)).join('');
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ name, usage, key, user_id: userId }])
      .select();
      
    if (error) throw error;
    return NextResponse.json(data[0]);
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
} 