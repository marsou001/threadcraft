import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteAllGeneratedContentForUser, deleteUser, getUserByClerkId, getUserSubscription, updateUser } from '@/drizzle/db/actions'
import sendMail from '@/utils/sendMail'
import assertIsError from '@/utils/assertIsError'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  const eventType = evt.type
  switch (eventType) {
    case "user.created": {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;
      const name = `${first_name} ${last_name}`;

      try {
        await createUser(id, email, name);
        // TODO: send welcome email
        // await sendMail(email, first_name!);
        console.log(`User ${id} created/updated successfully`);
      } catch (error) {
        assertIsError(error)
        console.error("Error creating/updating user:", error.message);
        return new Response("Error creating user " + id, { status: 500 });
      }
      return new Response(`User ${id} created successfully`, { status: 201 });
    }
    case "user.updated": {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;
      const name = `${first_name} ${last_name}`;
      
      const user = await getUserByClerkId(id);
      if (user.email !== email || user.name !== name) {
        await updateUser(user.id, { name, email });
        return new Response(`User ${id} updated successfully`, { status: 201 });
      }
      break;
    }
    case "user.deleted": {
      const { id } = evt.data;
      if (id === undefined) {
        console.log("User id not defined while deleting");
        return new Response("Something went wrong while deleting user", { status: 502 });
      }
      try {
        const user = await getUserByClerkId(id);
        await deleteAllGeneratedContentForUser(user.id);
        if (user.stripeCustomerId !== null) {
          const subscription = await getUserSubscription(user.id);
          if (subscription !== undefined) {
            await stripe.subscriptions.cancel(subscription.subscriptionId);
          }
        }
        await deleteUser(user.id);
      } catch (error) {
        assertIsError(error);
        console.error("Error while deleting user", id, error.message);
        return new Response("Something went wrong while deleting user", { status: 502 });
      }
      return new Response(`User ${id} deleted successfully`, { status: 201 });
    }
  }
  return new Response('Webhook received', { status: 200 });
}