import Stripe from 'stripe';
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { customerId } = await request.json();
  const header = await headers();

  if (customerId === undefined || customerId === null) {
    return new Response("Customer Id must be present to open the portal session", { status: 400 });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${header.get('origin')}/pricing`,
    });
    return Response.json({ url: session.url }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 502 });
  }
}