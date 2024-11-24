import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/connection/supabaseClient';
import { getAuthenticatedUserId } from '@/app/utils/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getAuthenticatedUserId();
    const body = await request.json();
    
    // First verify the key belongs to the user
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('id', params.id)
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
      .eq('id', params.id)
      .eq('user_id', userId);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getAuthenticatedUserId();
    
    // First verify the key belongs to the user
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('user_id')
      .eq('id', params.id)
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
      .eq('id', params.id)
      .eq('user_id', userId);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
} 