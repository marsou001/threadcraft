import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function fetchSession(sessionId: string) {
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
    session.payment_intent
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error retrieving checkout session", error.message);
    }
    throw new Error("Error retrieving checkout session");
  }

  return session;
}