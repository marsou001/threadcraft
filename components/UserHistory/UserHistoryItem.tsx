import { GeneratedContent } from "@/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type HistoryItemProps = {
  item: GeneratedContent;
  isSelected: boolean;
  handleHistoryItemClick: (item: GeneratedContent) => void
}

export default function UserHistoryItem({ item, isSelected, handleHistoryItemClick }: HistoryItemProps) {
  return (
    <div
      key={item.id}
      className={cn("p-4 rounded-xl transition-colors cursor-pointer", {
        "bg-gray-600": isSelected,
        "bg-gray-700 hover:bg-gray-600": !isSelected,
      })}
      onClick={() => handleHistoryItemClick(item)}
    >
      <div className="flex items-center mb-2">
        <Image src={`/icons/${item.socialMedia}.png`} alt={item.socialMedia} width={24} height={24} className="mr-2 h-5 w-5" />
        <span className="text-sm font-medium">
          {item.socialMedia}
        </span>
      </div>
      <p className="text-sm text-gray-300 truncate">
        {item.prompt}
      </p>
      <div className="flex items-center text-xs text-gray-400 mt-2">
        <Clock className="mr-1 h-3 w-3" />
        {new Date(item.createdAt).toLocaleString()}
      </div>
    </div>
  )
}