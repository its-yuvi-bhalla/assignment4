import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zdtwrxyfncfsnjoqxxmx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdHdyeHlmbmNmc25qb3F4eG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMjU0MDMsImV4cCI6MjA1OTkwMTQwM30.a5h1eCAKFOxfZL4flo3_Ci3DkF4P5nQdI4GI7cAgW_M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
