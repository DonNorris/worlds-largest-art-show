import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = body.sessionId;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const pendingForm = body.pendingForm;

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { paid: false },
        { status: 402 }
      );
    }
    if (!pendingForm) {
  return NextResponse.json(
    { error: "Missing show information." },
    { status: 400 }
  );
}
const show = await db.show.create({
  data: {
    showName: pendingForm.showName,
    artistName: pendingForm.artistName,
    email: pendingForm.email,
    county: pendingForm.county,
    state: pendingForm.state,
    town: pendingForm.town,
    mainMedium: pendingForm.mainMedium,
    startDate: pendingForm.startDate,
    endDate: pendingForm.endDate,
    showHours: pendingForm.showHours,
    description: pendingForm.description,
    photoUrl: pendingForm.photoUrl,
    photoUrl2: pendingForm.photoUrl2,
    photoUrl3: pendingForm.photoUrl3,
    photoUrl4: pendingForm.photoUrl4,
    photoUrl5: pendingForm.photoUrl5,
    artistPhotoUrl: pendingForm.artistPhotoUrl,
    bio: pendingForm.bio,
    classes: pendingForm.classes,
    services: pendingForm.services,
    commissions: pendingForm.commissions,
    upcomingShows: pendingForm.upcomingShows,
    website: pendingForm.website,
    instagram: pendingForm.instagram,
    facebook: pendingForm.facebook,
    tiktok: pendingForm.tiktok,
    xTwitter: pendingForm.xTwitter,
    onlineStore: pendingForm.onlineStore,
    videoLink: pendingForm.videoLink,
    galleryStudioLink: pendingForm.galleryStudioLink,
    contactEmail: pendingForm.contactEmail,
    mailingListLink: pendingForm.mailingListLink,
    plan: pendingForm.plan,
    upgradePackage: session.metadata?.upgradePackage ?? "FREE",
    paymentStatus: "PAID",
    status: "DRAFT",
  },
});

return NextResponse.json({
  paid: true,
  showId: show.id,
  package: session.metadata?.upgradePackage ?? null,
  sessionId: session.id,
  paymentStatus: "PAID",
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to verify payment." },
      { status: 500 }
    );
  }
}