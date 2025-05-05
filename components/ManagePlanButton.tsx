"use client"

import { cn } from "@/lib/utils";
import { createPortalSession } from "@/services/subscriptions";
import { useState } from "react"
import { toast } from "sonner";

export default function ManagePlanButton({ customerId }: { customerId: string}) {
  const [isOpeningPortal, setIsOpeningPortal] = useState(false);

  async function handleOpenPortalSession() {
    setIsOpeningPortal(true);
    try {
      const url = await createPortalSession(customerId)
      window.location.href = url;
    } catch(error) {
      if (error instanceof Error) {
        toast(error.message);
      }
    } finally {
      setIsOpeningPortal(false);
    }
  }

  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleOpenPortalSession}
        className={cn("text-black text-sm w-full py-2 rounded-full transition", {
          "bg-white hover:bg-gray-200 cursor-pointer": !isOpeningPortal,
          "bg-gray-400 hover:bg-gray-400 cursor-not-allowed": isOpeningPortal,
        })}
     >
        {isOpeningPortal ? "Opening Portal..." : "Manage Plan"}
      </button>
    </div>
  )
}