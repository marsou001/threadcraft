import Stripe from "stripe";
import { headers } from "next/headers";
import { pricingPlans } from "@/data";
import { createSubscription, getUserByStripeCustomerId, updateSubscription, updateUser, updateUserPoints } from "@/drizzle/db/actions";
import waitForUserByCustomerId from "@/lib/wait-for-user-by-customer-id";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
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
      const checkout = event.data.object;
      const userId = checkout.client_reference_id;

      if (userId === null) {
        console.error("No user was attached to the session");
        return new Response("Invalid session data", { status: 400 });
      }

      // Setting user customer id
      if (checkout.customer === null) {
        return new Response("Error getting customer id", { status: 502 });
      }

      const stripeCustomerId = typeof checkout.customer === "string"
        ? checkout.customer
        : checkout.customer.id;

      try {
        const user = await updateUser(userId, { stripeCustomerId });
        console.log("user after update", user)
      } catch (error) {
        console.error(error);
        return new Response("Error updating user", { status: 500 });
      }
      break;
    case "customer.subscription.created":
      const subscription = event.data.object;
      const priceId = subscription.items.data[0].price.id;
      console.log("Price id", priceId);

      const plan = pricingPlans.find((plan) => plan.priceId === priceId);
      // Plan must not be Enterprise. Leave that to later
      if (plan === undefined || plan.priceId === null) {
        console.error("No plan found with price id", priceId);
        return new Response("No plan found", { status: 404 });
      }

      const customerId = typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;
      const { clerkId } = await waitForUserByCustomerId(customerId);
      await createSubscription({
        userId: clerkId,
        subcriptionId: subscription.id,
        plan: plan.name,
        currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
      })
      break;
    case "customer.subscription.updated":
      break;
    case "customer.subscription.deleted":
      break;
    case "invoice.paid":
      console.log("Event:", "invoice.paid");
      const invoicePaid = event.data.object as Stripe.Invoice;
      if (invoicePaid.customer === null) {
        return new Response("Error getting customer id", { status: 502 });
      }
      
      const id = typeof invoicePaid.customer === "string"
        ? invoicePaid.customer
        : invoicePaid.customer.id;
      console.log("id", id)
      const user = await waitForUserByCustomerId(id);
      if (!user) {
        console.error("No user found for Stripe customer ID:", id);
        return new Response("User not found", { status: 404 });
      }

      const invoicePriceId = invoicePaid.lines.data[0].pricing?.price_details?.price!;
      const plann = pricingPlans.find((plan) => plan.priceId === invoicePriceId);
      // Plan must not be Enterprise. Leave that to later
      if (plann === undefined || plann.priceId === null) {
        console.error("No plan found with price id", invoicePriceId);
        return new Response("No plan found", { status: 404 });
      }

      await updateUser(user.clerkId, { points: plann.points });
      break;
    case "invoice.payment_failed":
      const invoicePaymentFailed = event.data.object;
      console.log("Event:", "invoice.payment_failed");
      break;
    }
  return new Response('Webhook received', { status: 200 });
}