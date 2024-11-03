"use client";

import browserClient from "@/utils/supabase/client";

const supabase = browserClient;

export async function logOut() {
  await supabase.auth.signOut();
  localStorage.removeItem("loginInfoStore");
  window.location.replace("/");
}
