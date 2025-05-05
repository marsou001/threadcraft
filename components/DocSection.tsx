import Link from "next/link";
import type { DocSection } from "@/types";

export default function DocSection({ section }: { section: DocSection}) {
  return (
    <div
      key={section.title}
      className="p-6 border border-gray-800 rounded-lg"
    >
      <h2 className="text-white text-2xl font-bold mb-3">
        {section.title}
      </h2>
      <p className="text-gray-400 mb-4">
        {section.description}
      </p>
      <button
        className="text-black bg-white hover:bg-gray-200 text-sm w-full rounded-full py-2 cursor-pointer"
      >
        <Link href="#">Read More</Link>
      </button>
    </div>
  )
}