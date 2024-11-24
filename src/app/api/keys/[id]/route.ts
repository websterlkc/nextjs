import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/connection/supabaseClient';
import { getAuthenticatedUserId } from '@/app/utils/auth';

// Updated type definition for route params
type RouteParams = { params: { id: string } }

export async function PUT(
  request: NextRequest,
  context: RouteParams  // Changed to use the correct type
) {
  try {
    const userId = await getAuthenticatedUserId();
    const body = await request.json();
    
    // First verify the key belongs to the user
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('id', context.params.id)  // Using context.params
      .single();
      
    if (!keyData || keyData.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    const { error } = await supabase
      .from('api_keys')
      .update(body)
      .eq('id', context.params.id)  // Using context.params
      .eq('user_id', userId);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteParams  // Changed to use the correct type
) {
  try {
    const userId = await getAuthenticatedUserId();
    
    // First verify the key belongs to the user
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('id', context.params.id)  // Using context.params
      .single();
      
    if (!keyData || keyData.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', context.params.id)  // Using context.params
      .eq('user_id', userId);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
    
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
} 