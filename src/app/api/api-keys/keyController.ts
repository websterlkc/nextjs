import { supabase } from '@/app/connection/supabaseClient';
import { NextResponse } from 'next/server';
import { ApiKey } from '@/app/shared/types';

export class KeyController {
  static async getAllKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*');
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  }

  static async createKey(request: Request) {
    const body = await request.json();
    const { name, usage } = body;
    
    const key = Array.from({ length: 16 }, () => 
      Math.random().toString(36).charAt(2)).join('');
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ name, usage, key }])
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data[0]);
  }

  static async updateKey(id: string, data: Partial<ApiKey>) {
    const { error } = await supabase
      .from('api_keys')
      .update(data)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  static async deleteKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  static async validateKey(apiKey: string) {
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
      limit: data.limit || 1000 // Default limit if not specified
    });
  }
} 