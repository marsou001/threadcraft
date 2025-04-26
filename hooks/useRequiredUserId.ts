import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function useRequiredUserId() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useRequiredUserId must be used within an AuthProvider");
  }

  return context.userId;
}