import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "../../utils/supabaseClient";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  //The line below isn't working as expected, see README.tx
  //   let authResult = await supabase.auth.api.getUserByCookie(req)
  let authResult = await getUser(req, ["admin", "moderator"]);
  if (authResult.error) {
    return NextResponse.redirect(req.nextUrl.origin);
  } else if (!authResult.user) {
    return NextResponse.redirect(req.nextUrl.origin);
  } else {
    return NextResponse.next();
  }
}

async function getUser(
  req: NextRequest,
  role_required: string[]
): Promise<any> {
  let token = req.cookies["sb-access-token"];
  if (!token) {
    return {
      user: null,
      data: null,
      error: "There is no supabase token in request cookies",
    };
  }

  let authRequestResult = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      },
    }
  );
  let result = await authRequestResult.json();
  if (authRequestResult.status != 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${authRequestResult.status}. See logs for details`,
    };
  } else if (result.aud === "authenticated") {
    if (role_required?.includes(result.app_metadata?.role)) {
      return {
        user: result,
        data: result,
        error: null,
      };
    } else {
      return {
        user: null,
        data: null,
        error: `Supabase auth returned ${authRequestResult.status} but ${role_required} is not confirmed. See logs for details`,
      };
    }
  }
}
