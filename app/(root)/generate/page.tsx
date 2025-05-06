import type { Metadata } from "next";
import GeneratePage from "@/components/GeneratePage";
import { getCurrentUser } from "@/lib/current-user";
import getUserHistory from "@/lib/user.history";
import fetchSession from "@/lib/check-session";
import Stripe from "stripe";
import type { History, User } from "@/types";
import ErrorComponent from "@/components/ErrorComponent";
import assertIsError from "@/utils/assertIsError";

export const metadata: Metadata = {
  title: "Generate content with ThreadlyAI",
};

export default async function Generate({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { session_id } = await searchParams;
  let sessionPaymentStatus: Stripe.Checkout.Session.PaymentStatus | null = null,
      user: User, history: History;
  
  try {
    if (session_id !== undefined) {
      const session = await fetchSession(session_id);
      sessionPaymentStatus = session.payment_status;
    }
    user = await getCurrentUser();
    history = await getUserHistory(user.clerkId);
  } catch(error) {
    assertIsError(error);
    return <ErrorComponent errorMessage={error.message} />
  }

  return (
    <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
      <GeneratePage history={history} user={user} sessionPaymentStatus={sessionPaymentStatus} />
    </div>
  )
}