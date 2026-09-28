import { type NextRequest, NextResponse } from "next/server";
import { hasSupabaseConfig } from "./app/utils/supabase/config";
import { updateSession } from "./app/utils/supabase/middleware";

export function proxy(request: NextRequest) {
  if (!hasSupabaseConfig()) return NextResponse.next({ request });
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};