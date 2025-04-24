import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import Image from "next/image";

export default function InstagramMock({ content, image }: { content: string, image: File | null }) {
  const objectURL = image === null ? "" : URL.createObjectURL(image);

  return (
    <div className="text-black bg-white max-w-md mx-auto p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <div className="bg-gray-300 w-8 h-8 mr-3 rounded-full"></div>
        <p className="font-bold">Your Name</p>
      </div>
      {objectURL.length === 0 ? (
        <div className="bg-gray-200 overflow-hidden flex justify-center items-center h-64 mb-3">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
      ) : (
        <div className="overflow-hidden flex justify-center items-center h-64 mb-3">
          <Image src={objectURL} alt="Image" width={200} height={200} className="w-full" />
        </div>
      )}
      <div className="flex justify-between mb-3">
        <div className="flex space-x-4">
          <Heart size={24} />
          <MessageCircle size={24} />
          <Send size={24} />
        </div>
        <Bookmark size={24} />
      </div>
      <p className="text-sm">{content}</p>
    </div>
  );
};