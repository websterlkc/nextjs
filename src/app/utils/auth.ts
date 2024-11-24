import { supabase } from '@/app/connection/supabaseClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function getUserIdFromEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
    
  if (error || !data) {
    throw new Error('User not found');
  }
  
  return data.id;
}

export async function getAuthenticatedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  
  return getUserIdFromEmail(session.user.email);
} 