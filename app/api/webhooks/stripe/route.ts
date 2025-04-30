import Stripe from "stripe";
import { headers } from "next/headers";
import { pricingPlans } from "@/data";
import { createSubscription, updateUser, updateUserPoints } from "@/drizzle/db/actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  console.log("Is webhook listening...?")
  const headerPayload = await headers();
  const sig = headerPayload.get('stripe-signature');
  
  if (!sig) {
    console.error("No Stripe signature found");
    return new Response("No Stripe signature", { status: 400 });
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
      return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }
    console.log("Webhook signature error", error);
    return;
  }

  switch(event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = session.client_reference_id;

      if (userId === null) {
        console.error("No user was attached to the session");
        return new Response("Invalid session data", { status: 400 });
      }
      
      if (session.subscription === null) {
        console.error("This is not a subscription checkout!", session.id);
        return new Response("Invalid session data", { status: 400 });
      }

      const subscription = typeof session.subscription === "string"
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription;

      console.log("Retrieved subscription", subscription);

      if (subscription.items.data.length === 0) {
        console.error("No items found in subscription", subscription);
        return new Response("Invalid subscription data", { status: 400 });
      }

      const priceId = subscription.items.data[0].price.id;
      console.log("Price id", priceId);
      
      const plan = pricingPlans.find((plan) => plan.priceId === priceId);
      if (plan === undefined || plan.priceId === null) {
        console.error("No plan found with price id", priceId);
        return new Response("No plan found", { status: 404 });
      }

      await createSubscription({
        userId,
        subcriptionId: subscription.id,
        plan: plan.name,
        currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
      });

      // Setting user customer id and points
      if (session.customer === null) {
        return new Response("Error getting customer id", { status: 502 });
      }

      const stripeCustomerId = typeof session.customer === "string"
        ? session.customer
        : session.customer.id;

      try {
        await updateUser(userId, { stripeCustomerId, points: plan.points });
      } catch (error) {
        console.error(error);
        return new Response("Error updating user", { status: 500 });
      }
      break;
    case "payment_intent.succeeded":
      const paymentIntentPaymentSucceeded = event.data.object;
      console.log("Event:", "payment_intent.succeeded")
      break;
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      console.log("Event:", "payment_intent.payment_failed");
      break;
    }
  return new Response('Webhook received', { status: 200 });
}