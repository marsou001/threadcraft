import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

export default function ({ content }: { content: string[] }) {
  return (
    <div className="text-black bg-white max-w-md mx-auto p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <div className="bg-gray-300 w-12 h-12 mr-3 rounded-full"></div>
        <div>
          <p className="font-bold">Your Name</p>
          <p className="text-gray-500">@yourhandle</p>
        </div>
      </div>
      {content.map((tweet, index) => (
        <div key={index} className="mb-4 pb-4 border-b border-gray-200">
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