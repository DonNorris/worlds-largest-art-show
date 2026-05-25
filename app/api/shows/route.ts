import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const show = await db.show.create({
      data: {
        showName: body.showName,
        artistName: body.artistName,
        county: body.county,
        state: body.state,
        town: body.town,
        plan: body.plan,
        status: "DRAFT",
      },
    });

    return NextResponse.json(show);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save show." }, { status: 500 });
  }
}
export async function GET() {
  try {
    const shows = await db.show.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(shows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch shows." }, { status: 500 });
  }
}