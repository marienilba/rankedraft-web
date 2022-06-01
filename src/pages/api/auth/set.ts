import { supabase } from "../../../utils/supabaseClient";

export default async function handler(req, res) {
  await supabase.auth.api.setAuthCookie(req, res);
}
