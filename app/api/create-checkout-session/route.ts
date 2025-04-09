import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId, priceId } = await req.json();
  
  if (!userId || !priceId) {
    return Response.json({ error: "Missing userId or priceId" }, { status: 400 });
  }

  // Get headers
  const headerPayload = await headers();
  const origin = headerPayload.get("origin");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/generate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      client_reference_id: userId,
    });

    return Response.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error creating checkout session" }, { status: 502 });
  }
}