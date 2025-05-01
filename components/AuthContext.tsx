"use client"

import React, { createContext } from "react";
import type { User } from "@/types";

export const authContext = createContext<User | null>(null);

export default function AuthContext({ user, children }: { user: User, children: React.ReactNode }) {
  return <authContext.Provider value={user}>{ children }</authContext.Provider>
}