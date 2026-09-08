import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const prices: Record<string, number> = {
      LINK_PACKAGE: 500,
      SHOWCASE_PACKAGE: 500,
      COMPLETE_PACKAGE: 800,
    };

    const amount = prices[body.upgradePackage];

    if (!amount) {
      return NextResponse.json(
        { error: "Invalid package." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      metadata: {
  upgradePackage: body.upgradePackage,
},
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.upgradePackage.replaceAll("_", " "),
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
     success_url: "http://localhost:3000/submit?payment=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/submit?payment=cancelled",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 }
    );
  }
}