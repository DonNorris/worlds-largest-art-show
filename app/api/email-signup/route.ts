import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    await db.emailSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.redirect(new URL("/#email-signup", request.url));
  } catch (error) {
    console.error("Email signup error:", error);

    return NextResponse.json(
      { error: "Unable to join email list." },
      { status: 500 }
    );
  }
}