"use client"

import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="relative text-center py-20">
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
        <SignUpButton>
          <div>
            <button className="text-white bg-blue-600 hover:bg-blue-700 text-lg mx-auto px-8 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/sign-up" className="flex items-center">
                Get Started Free <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </button>
            <p className="mt-4 text-gray-400">No credit card required</p>
          </div>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 text-lg mx-auto px-8 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href="/generate" className="flex items-center">
            Generate Content Now <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </button>
      </SignedIn>
    </section>
  )
}