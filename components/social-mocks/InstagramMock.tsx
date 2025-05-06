import Image from "next/image";
import Actions from "./Actions";

export default function InstagramMock({ content, image }: { content: string, image: File | null }) {
  const objectURL = image === null ? "" : URL.createObjectURL(image);

  return (
    <div className="text-black bg-white max-w-md mx-auto p-4 rounded-lg">
      <div className="flex items-center mb-3">
        <div className="bg-gray-300 w-8 h-8 mr-1.5 rounded-full"></div>
        <p className="text-sm font-semibold">your_name <span className="text-gray-400 font-normal">• 2d</span></p>
      </div>
      {objectURL.length === 0 ? (
        <div className="bg-gray-200 overflow-hidden flex justify-center items-center h-64 mb-2 rounded-sm">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
      ) : (
        <div className="overflow-hidden flex justify-center items-center mb-2 rounded-sm">
          <Image src={objectURL} alt="Image" width={200} height={200} className="w-full" />
        </div>
      )}
      <div className="mb-1">
        <Actions />
      </div>
      <p className="text-md font-semibold">143 likes</p>
      <p className="text-sm"><span className="font-semibold">your_name</span> {content}</p>
    </div>
  );
};