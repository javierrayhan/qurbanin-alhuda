import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

export const supabase = createClient(
  'https://lcwxragoszrmlzhetutq.supabase.co',      // Ganti dengan URL dari Supabase Project kamu
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd3hyYWdvc3pybWx6aGV0dXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjU3MDUsImV4cCI6MjA2OTcwMTcwNX0.8lNnybmzGQuk5Z57CMc0KEtxVqvrTTVX-tgVlK7MSjw'                  // Ganti dengan anon key kamu dari Supabase
)
