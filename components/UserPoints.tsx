import Link from "next/link";
import { Zap } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { getUserPoints } from "@/services/users";

export type UserPointsProps = {
  userId: string;
  points: number | undefined;
  setUserPoints: (value: SetStateAction<number>) => void
}

export default function UserPoints({ userId, points, setUserPoints }: UserPointsProps) {
  async function fetchUserPoints() {
    try {
      const points = await getUserPoints(userId);
      setUserPoints(points);
    } catch(error) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      }
    }
  }

  useEffect(() => {
    fetchUserPoints();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
      <div className="flex items-center">
        <Zap className="h-8 w-8 text-yellow-400 mr-3" />
        <div>
          <p className="text-sm text-gray-400">Available Points</p>
          <p className="text-2xl font-bold text-yellow-400">
            { points === undefined ? "Loading..." : points }
          </p>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full transition-colors">
        <Link href="/pricing">Get More Points</Link>
      </button>
    </div>
  )
}