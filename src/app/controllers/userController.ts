import { supabase } from '@/app/connection/supabaseClient';
import { NextResponse } from 'next/server';

interface User {
  email: string;
  name?: string | null;
  created_datetime?: string;
}

export class UserController {
  static async searchUser(email: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;

      return NextResponse.json({ data, error: null });
    } catch (error) {
      console.error('Error searching user:', error);
      return NextResponse.json({ data: null, error });
    }
  }

  static async addUser(userData: User) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: userData.email,
            name: userData.name,
            created_datetime: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({ data, error: null });
    } catch (error) {
      console.error('Error adding user:', error);
      return NextResponse.json({ data: null, error });
    }
  }

  static async addUserLogging(email: string) {
    try {
      const { data, error } = await supabase
        .from('user_logging')
        .insert([
          {
            email,
            created_datetime: new Date().toISOString(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({ data, error: null });
    } catch (error) {
      console.error('Error adding user logging:', error);
      return NextResponse.json({ data: null, error });
    }
  }
} 