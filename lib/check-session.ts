import assertIsError from "@/utils/assertIsError";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function fetchSession(sessionId: string) {
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    assertIsError(error);
    console.log("Error retrieving checkout session", error.message);
    throw new Error("Error retrieving checkout session, please refresh the page");
  }

  return session;
}