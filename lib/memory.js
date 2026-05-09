import { supabase } from "./supabase";

export async function saveMessage(role, content, sessionId) {
  var sid = sessionId || "default";
  var { error } = await supabase.from("core_memory").insert({
    role: role,
    content: content,
    session_id: sid
  });
  if (error) {
    console.error("[memory] saveMessage failed:", error.message);
  }
}

export async function getHistory(sessionId, limit) {
  var sid = sessionId || "default";
  var lim = limit || 20;
  var { data, error } = await supabase
    .from("core_memory")
    .select("role, content")
    .eq("session_id", sid)
    .order("created_at", { ascending: true })
    .limit(lim);
  if (error) {
    console.error("[memory] getHistory failed:", error.message);
    return [];
  }
  return data || [];
}
