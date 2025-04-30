export async function createCheckoutSession(userId: string, priceId: string): Promise<string> {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, priceId }),
  });

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage);
  }

  const { sessionId } = await response.json();
  return sessionId;
}