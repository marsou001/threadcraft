import { ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";

export default function LinkedInMock({ content }: { content: string }) {
  return (
    <div className="text-black bg-white max-w-md mx-auto p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <div className="bg-gray-300 w-12 h-12 mr-3 rounded-full"></div>
        <div>
          <p className="font-bold">Your Name</p>
          <p className="text-gray-500 text-sm">Your Title • 1st</p>
        </div>
      </div>
      <p className="mb-4">{content}</p>
      <div className="text-gray-500 flex justify-between">
        <ThumbsUp size={18} />
        <MessageSquare size={18} />
        <Repeat size={18} />
        <Send size={18} />
      </div>
    </div>
  );
};