"use client"

import { createContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<{ userId: string } | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isLoaded && !isSignedIn) return router.push("/sign-in");
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return;
  if (isLoaded && !isSignedIn) return;

  return (
    <AuthContext.Provider value={{ userId }}>{ children }</AuthContext.Provider>
  )
}