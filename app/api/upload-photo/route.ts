import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No photo received." },
        { status: 400 }
      );
    }

   const blob = await put(file.name, file, {
  access: "public",
});

return NextResponse.json({
  photoUrl: blob.url,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Photo upload failed." },
      { status: 500 }
    );
  }
}