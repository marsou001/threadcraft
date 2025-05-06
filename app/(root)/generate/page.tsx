import type { Metadata } from "next";
import GeneratePage from "@/components/GeneratePage";
import { getCurrentUser } from "@/lib/current-user";
import getUserHistory from "@/lib/user.history";
import fetchSession from "@/lib/check-session";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Generate content with ThreadlyAI",
};

export default async function Generate({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { session_id } = await searchParams;
  let sessionPaymentStatus: Stripe.Checkout.Session.PaymentStatus | null = null;
  if (session_id !== undefined) {
    try {
      const session = await fetchSession(session_id);
      sessionPaymentStatus = session.payment_status;
    } catch {
      return (
        <div className="text-white min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
            <p>Something went wrong, please refresh the page</p>
          </div>
        </div>
      )
    }
  }

  const user = await getCurrentUser();
  const history = await getUserHistory(user.clerkId);

  return (
    <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
      <GeneratePage history={history} user={user} sessionPaymentStatus={sessionPaymentStatus} />
    </div>
  )
}