import { Metadata } from "next";
import DocSection from "@/components/DocSection";
import { docsSections } from "@/data";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocsPage() {
  return (
    <main className="text-gray-100 bg-black min-h-screen mx-auto px-8 py-20">
      <h1 className="text-white text-5xl font-bold text-center mb-12">
        Documentation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {docsSections.map((section) => (
          <DocSection key={section.title} section={section} />
        ))}
      </div>
    </main>
  );
}