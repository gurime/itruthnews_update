import { cookies } from "next/headers";
import { createClient } from "../../utils/supabase/server";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email: submittedEmail, website } = payload as {
    email?: unknown;
    website?: unknown;
  };

  if (typeof website === "string" && website.trim()) {
    return Response.json({ success: true });
  }

  if (typeof submittedEmail !== "string") {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = submittedEmail.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const supabase = createClient(await cookies());
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (error?.code === "42P01" || error?.code === "PGRST205") {
      return Response.json(
        { error: "Newsletter signup is not configured yet. Apply the newsletter subscribers migration." },
        { status: 503 },
      );
    }

    if (error?.code === "42501") {
      return Response.json(
        { error: "Newsletter signup permissions are not configured. Apply the newsletter subscribers migration." },
        { status: 503 },
      );
    }

    if (error && error.code !== "23505") {
      console.error("Newsletter signup insert failed", {
        code: error.code,
        message: error.message,
      });
      return Response.json(
        { error: "Could not save your signup. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Newsletter signup is temporarily unavailable." },
      { status: 503 },
    );
  }
}