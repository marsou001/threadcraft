import { SparklesIcon, TrendingUpIcon, ZapIcon } from "lucide-react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 overflow-hidden pt-20">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 animate-float">
          <SparklesIcon className="text-yellow-400 opacity-50 w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 animate-float animation-delay-2000">
          <ZapIcon className="text-blue-400 opacity-50 w-10 h-10" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float animation-delay-4000">
          <TrendingUpIcon className="text-green-400 opacity-50 w-12 h-12" />
        </div>

        <Hero />
        <Features />
        <Benefits />
        <CallToActionSection />
      </div>
    </main>
  );
}
