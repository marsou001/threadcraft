import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId, priceId, customerId, customerEmail } = await req.json();
  if (!userId || !priceId) {
    return Response.json({ error: "Missing userId or priceId" }, { status: 400 });
  }

  // Get headers
  const headerPayload = await headers();
  const origin = headerPayload.get("origin");

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
    client_reference_id: String(userId),
  };

  if (customerId !== null) {
    sessionParams.customer = customerId;
  } else if (customerEmail !== null) {
    sessionParams.customer_email = customerEmail;
  } else {
    return new Response("Either customerId or customerEmail must be present", { status: 400 });
  }

  let session: Stripe.Response<Stripe.Checkout.Session>;
  try {
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (error) {
    console.error(error);
    return new Response("Error creating checkout session", { status: 502 });
  }
  
  return Response.json({ sessionId: session.id });
}