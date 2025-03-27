"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CheckCircleIcon, SparklesIcon, TrendingUpIcon, ZapIcon, RocketIcon } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { benefits, features } from "@/data";

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

        {/* Hero Section */}
        <div className="relative text-center py-20 lg:py-32">
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
        </div>

        {/* Features Section */}
        <div className="py-20" id="features">
          <h2 className="text-white text-3xl font-bold tracking-wider leading-[1.5] text-center mb-16">
            Supercharge Your Social Media Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="text-center leading-[1.7] flex flex-col items-center">
                  <Image src={feature.icon} alt={feature.iconAltTitle} width={56} height={56} className="mb-4" />
                  <h3 className="text-white text-2xl font-semibold tracking-wider mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 tracking-wider">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-900 relative my-20 px-4 py-20 rounded-3xl">
          <div className="relative z-10">
            <h2 className="text-white text-3xl font-bold tracking-wider leading-[1.5] text-center mb-12">
              Why Choose Our AI Content Generator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <CheckCircleIcon className="text-green-500  w-6 h-6" />
                  <span className="text-gray-300 tracking-wider">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative text-center py-20">
          <div className="absolute top-10 right-10 animate-spin">
            <svg
              className="w-20 h-20 text-blue-500 opacity-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-white text-4xl font-bold tracking-wider leading-[1.5] mb-8">
            Ready to revolutionize your social media strategy?
          </h2>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="text-white bg-blue-600 hover:bg-blue-700 text-lg flex items-center mx-auto px-8 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                Get Started Free <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 text-lg flex items-center mx-auto px-8 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link href="/generate">
                Generate Content Now <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </button>
          </SignedIn>
          <p className="mt-4 text-gray-400">No credit card required</p>
        </div>
      </div>
    </main>
  );
}
