import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("PHOTO URL RECEIVED:", body.photoUrl);

    const show = await db.show.create({
    data: {
  showName: body.showName,
  artistName: body.artistName,
  email: body.email,
  county: body.county,
  state: body.state,
  town: body.town,
  mainMedium: body.mainMedium,
  startDate: body.startDate,
  endDate: body.endDate,
  showHours: body.showHours,
  description: body.description,
  photoUrl: body.photoUrl,
  photoUrl2: body.photoUrl2,
  photoUrl3: body.photoUrl3,
  photoUrl4: body.photoUrl4,
  photoUrl5: body.photoUrl5,
  artistPhotoUrl: body.artistPhotoUrl,
  bio: body.bio,
  classes: body.classes,
  services: body.services,
  commissions: body.commissions,
  upcomingShows: body.upcomingShows,
  website: body.website,
  instagram: body.instagram,
  facebook: body.facebook,
  tiktok: body.tiktok,
  xTwitter: body.xTwitter,
  onlineStore: body.onlineStore,
  videoLink: body.videoLink,
  galleryStudioLink: body.galleryStudioLink,
  contactEmail: body.contactEmail,
  mailingListLink: body.mailingListLink,
  plan: body.plan,
  upgradePackage: body.upgradePackage,
  
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