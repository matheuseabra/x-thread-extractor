import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = 'https://ljtpgcmhznftngtzztty.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdHBnY21oem5mdG5ndHp6dHR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTE1NzM3NSwiZXhwIjoyMDYwNzMzMzc1fQ.UOc2zfxkaWsoo9vtJ1znpHRgAVXCljU7-HrPmMJgiVA';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServerClient = createClient(supabaseUrl, supabaseServiceRoleKey);
