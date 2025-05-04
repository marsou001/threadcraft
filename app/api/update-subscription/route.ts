import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { priceId, subscriptionId } = await req.json();
  if (!priceId) {
    return Response.json({ error: "Missing priceId or subscriptionId" }, { status: 400 });
  }

  let currentSubscription: Stripe.Subscription;

  try {
    currentSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching current subscription", { status: 502 });
  }

  try {
    await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: currentSubscription.items.data[0].id,
        price: priceId,
      }],
      proration_behavior: "always_invoice",
    });
  } catch(error) {
    console.error(error);
    return new Response("Error switching plans", { status: 502 });
  }

  return Response.json({ message: "You've changed your plan" }, { status: 201 });
}