import { GeneratedContent, History as HistoryType } from "@/types";
import { Clock } from "lucide-react";
import UserHistoryItem from "./UserHistoryItem";

export type HistoryProps = {
  history: HistoryType | undefined;
  selectedHistoryItemId: number | undefined;
  handleHistoryItemClick: (item: GeneratedContent) => void
}

export default function UserHistory({ history, selectedHistoryItemId, handleHistoryItemClick }: HistoryProps) {
  return (
    <div className="lg:col-span-1 bg-gray-800 rounded-2xl p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-400">History</h2>
        <Clock className="h-6 w-6 text-blue-400" />
      </div>
      <div className="space-y-4">
        {history === undefined ? "Loading..." : history.map((item) => (
          <UserHistoryItem key={item.id} item={item} isSelected={item.id === selectedHistoryItemId} handleHistoryItemClick={handleHistoryItemClick} />
        ))}
      </div>
    </div>
  )
}