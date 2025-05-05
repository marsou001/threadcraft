import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import DocSection from "@/components/DocSection";
import { docsSections } from "@/data";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <main className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">
          Documentation
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {docsSections.map((section) => (
            <DocSection key={section.title} section={section} />
          ))}
        </div>
      </main>
    </div>
  );
}