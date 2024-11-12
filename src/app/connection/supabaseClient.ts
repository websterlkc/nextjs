import { createClient } from '@supabase/supabase-js';

// Extracted from the connection string
const supabaseUrl = 'https://twyrfczbkayuzfixyctn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3eXJmY3pia2F5dXpmaXh5Y3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1OTY3ODQsImV4cCI6MjA0NjE3Mjc4NH0.6CGCChJf9K8C80ktoMjiwkoC0wIN0wyqFlkgZkgYlpk';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

