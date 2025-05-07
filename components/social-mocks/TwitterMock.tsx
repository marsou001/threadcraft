import { cn } from "@/lib/utils";
import getTodayDateForX from "@/utils/getTodayDateForX";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

export default function ({ content }: { content: string[] }) {
  const today = getTodayDateForX();

  return (
    <div className="text-black bg-white max-w-md mx-auto p-4 rounded-lg">
      <div className="flex mb-2">
        <div className="bg-gray-300 w-12 h-12 mr-2 rounded-full"></div>
        <div className="pt-1">
          <p className="font-bold">Your Name <span className="text-gray-500 font-normal">@yourhandle • {today}</span></p>
        </div>
      </div>
      {content.map((tweet, index) => (
        <div key={tweet} className={cn("pt-4", { "mt-4 border-t border-gray-200": index !== 0 })}>
          <p>{tweet}</p>
          <div className="text-gray-500 flex justify-between mt-3">
            <MessageCircle size={18} />
            <Repeat size={18} />
            <Heart size={18} />
            <Share size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};