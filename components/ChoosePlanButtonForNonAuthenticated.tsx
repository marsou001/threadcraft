"use client"

import { useRouter } from "next/navigation"

export default function ChoosePlanButtonForNonAuthenticated() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/sign-in")}
      className="text-white bg-blue-600 hover:bg-blue-700 text-sm w-full py-2 rounded-full cursor-pointer"
    >
      Choose Plan
    </button>
  )
}