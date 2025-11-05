
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qztiitzjciagbxdqkcoc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dGlpdHpqY2lhZ2J4ZHFrY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5ODAwNzUsImV4cCI6MjA3NzU1NjA3NX0.DLl0gLFxpmpQCy1FHQ2_-jOCOxTYUI4k5kBuwY2_i1s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
