import Link from "next/link";
import { Zap } from "lucide-react";

export default function UserPoints({ points }: { points: number }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
      <div className="flex items-center">
        <Zap className="h-8 w-8 text-yellow-400 mr-3" />
        <div>
          <p className="text-sm text-gray-400">Available Points</p>
          <p className="text-2xl font-bold text-yellow-400">{ points }</p>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full transition-colors">
        <Link href="/pricing">Get More Points</Link>
      </button>
    </div>
  )
}