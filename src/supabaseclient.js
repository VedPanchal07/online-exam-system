import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rcuqvyeicmzuglbdfyla.supabase.co"
const supabaseKey = "sb_publishable_rx6gJi8h82c5ZbqWnCDUzQ_OBEXaJDx"

export const supabase = createClient(supabaseUrl, supabaseKey)