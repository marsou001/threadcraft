import Link from "next/link";
import { RocketIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative text-center py-20 lg:py-32">
      <RocketIcon className="text-purple-500 w-16 h-16 mx-auto mb-6 animate-bounce" />
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide leading-[1.2] mb-6">
        AI-Powered Social Media Content Generator
      </h1>
      <p className="text-gray-300 text-xl tracking-wider leading-[1.7] mb-10 max-w-2xl mx-auto">
        Create engaging content for Twitter, Instagram, and LinkedIn with
        cutting-edge AI technology.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href="/generate">Start Creating</Link>
        </button>
        <button
          className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-2 rounded-full text-lg transition duration-300 ease-in-out"
        >
          <Link href="#features">Learn More</Link>
        </button>
      </div>
    </section>
  )
}