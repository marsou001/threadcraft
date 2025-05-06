import { SearchX } from "lucide-react";
import Link from "next/link";
 
export default function NotFound() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <div className="grid place-items-center">

        <SearchX className="size-76" />
        </div>
        <p className="text-2xl text-bold mb-6">Page Not Found</p>
        <button className="text-md bg-blue-600 hover:bg-blue-700 text-semibold px-8 py-3 rounded-full cursor-pointer">
          <Link href="/">Return Home</Link>
        </button>
      </div>
    </div>
  )
}