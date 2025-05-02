"use client"

import { createPortalSession } from "@/services/subscriptions";
import { useState } from "react"

export default function ManagePlanButton({ customerId }: { customerId: string}) {
  const [isOpening, setIsOpening] = useState(false);

  async function handleOpenPortalSession() {
    setIsOpening(true);
    try {
      const url = await createPortalSession(customerId)
      window.location.href = url;
    } catch(error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsOpening(false);
    }
  }

  return (
    <div className="mt-8 text-center">
      <button
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition cursor-pointer"
        onClick={handleOpenPortalSession}
     >
        {isOpening ? "Opening Portal..." : "Manage Plan"}
      </button>
    </div>
  )
}