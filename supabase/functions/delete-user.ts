
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

// Required environment variables for elevated deletion
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

serve(async (req) => {
  try {
    // Auth token required (from client)
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ error: "No user ID provided" }), { status: 400 });
    }

    // Delete from public.profiles (CASCADE removes associated rows with FK)
    await supabase.from("profiles").delete().eq("id", user_id);

    // Delete the user's journal entries, white flags, love notes, notifications, etc.
    const tablesToDelete = [
      "journal_entries",
      "white_flag_logs",
      "love_notes",
      "notification_history",
      "subscriptions",
      "device_tokens",
      "motivation",
      "shared_notes",
      "feature_usage",
      // Add more custom tables as needed
    ];
    for (const table of tablesToDelete) {
      await supabase.from(table).delete().eq("user_id", user_id);
    }

    // Finally, delete the user in auth
    const { error } = await supabase.auth.admin.deleteUser(user_id);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Unexpected error" }), { status: 500 });
  }
});
