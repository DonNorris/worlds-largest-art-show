import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const showId = String(body.showId || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!showId || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter both your Art Show number and email address.",
        },
        { status: 400 }
      );
    }

    const show = await db.show.findUnique({
      where: {
        id: showId,
      },
    });

    if (!show) {
      return NextResponse.json(
        {
          success: false,
          error: "We could not find an Art Show with that number.",
        },
        { status: 404 }
      );
    }

    const registeredEmail = String(show.email || "")
      .trim()
      .toLowerCase();

    if (!registeredEmail || registeredEmail !== email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The email address does not match the email used to register this Art Show.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      show: {
        id: show.id,
        showName: show.showName,
        artistName: show.artistName,
        email: show.email,
        town: show.town,
        state: show.state,
        country: show.county,
        upgradePackage: show.upgradePackage,
      },
    });
  } catch (error) {
    console.error("Find show error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while looking for your Art Show.",
      },
      { status: 500 }
    );
  }
}