import { CreateCheckoutSessionParams } from "@/types";

export async function createCheckoutSession(params: CreateCheckoutSessionParams): Promise<string> {
  const body = {
    userId: params.userId,
    priceId: params.priceId,
    customerId: params.userHasCustomerId ? params.customerId : null,
    customerEmail: !params.userHasCustomerId ? params.customerEmail : null,
  };

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage);
  }

  const { sessionId } = await response.json();
  return sessionId;
}