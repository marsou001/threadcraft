"use client";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">
                Threadly AI
              </span>
            </Link>
          </div>
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div
            className={cn("max-sm:fixed max-sm:top-12 max-sm:inset-x-0 max-sm:text-center w-full sm:w-auto sm:block mt-4 sm:mt-0 transition-colors duration-300", {
              "block": isMenuOpen,
              "hidden": !isMenuOpen,
              "max-sm:bg-gray-900/80 max-sm:backdrop-blur-md": isScrolled,
              "max-sm:bg-black": !isScrolled,
            })}
          >
            <ul className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
              {["Home", "Pricing", "Docs"].map((item) => (
                <li className="py-2 sm:py-0" key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors relative sm:pb-1 group"
                  >
                    {item}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </li>
              ))}
              
              <SignedOut>
                <li className="mt-2 sm:mt-0">
                  <SignInButton>
                    <button className="text-gray-300 hover:text-white w-full transition-colors cursor-pointer">
                      <Link href="/sign-in">Sign In</Link>
                    </button>
                  </SignInButton>
                </li>
                <li className="mt-2 sm:mt-0">
                  <SignUpButton>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white w-full px-4 py-2 rounded-full transition-colors cursor-pointer">
                      <Link href="/sign-up">Sign Up</Link>
                    </button>
                  </SignUpButton>
                </li>
              </SignedOut>
              <SignedIn>
                <li className="py-2 sm:py-0">
                  <Link
                    href="/generate"
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    Generate
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </li>
                <li className="mt-2 sm:mt-0">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                      },
                    }}
                  />
                </li>
              </SignedIn>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}