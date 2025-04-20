import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  console.log("Is webhook listening...?")
  const headerPayload = await headers();
  const sig = headerPayload.get('stripe-signature');
  
  if (!sig) {
    console.error("No Stripe signature found");
    return Response.json({ error: "No Stripe signature" }, { status: 400 });
  }
  
  let event: Stripe.Event;
  const body = await req.text();
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    if (error !== null && typeof error === "object" && "message" in error) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return Response.json(
        { error: `Webhook Error: ${error.message}` },
        { status: 400 }
      );
    }
    console.log("Webhook signature error", error);
    return;
  }

  switch(event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const subscription = session.subscription;

      if (subscription === null) {
        console.error("This is not a subscription checkout!", session.id);
        return Response.json({ error: "Invalid session data" }, { status: 400 });
      }

      const userId = session.client_reference_id;

      if (userId === null) {
        console.error("No user was attached to the session");
        return Response.json({ error: "Invalid session data" }, { status: 400 });
      }

      console.log("Event:", "checkout.session.completed")
      console.log(session.customer_email)
      case "payment_intent.succeeded":
        const paymentIntentPaymentSucceeded = event.data.object;
        console.log("Event:", "payment_intent.succeeded")
      case "payment_intent.payment_failed":
        const paymentIntentPaymentFailed = event.data.object;
        console.log("Event:", "payment_intent.payment_failed");
      default:
        return new Response('Webhook received', { status: 200 });
  }
}