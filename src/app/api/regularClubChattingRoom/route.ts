import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createClient();

  try {
    const url = new URL(req.url);
    const r_c_id = url.searchParams.get("r_c_id");

    const { data, error } = await supabase.from("r_c_n_chatting").select(`*`).eq("r_c_id", r_c_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "요청을 잘못 보냈습니다" }, { status: 400 });
  }
}