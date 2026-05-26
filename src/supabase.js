import { createClient } from '@supabase/supabase-js'

// URL Project Supabase kamu
const supabaseUrl = 'https://hymvhwraowjhojelgzok.supabase.co'

// Kunci ANON PUBLIC (Aman ditaruh di frontend)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bXZod3Jhb3dqaG9qZWxnem9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NzA0MDksImV4cCI6MjA5NTM0NjQwOX0.HqzEr4LQWi4pwwRKFSOwTcKc_mmfdh-9k8RUc7CyWqg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)