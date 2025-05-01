import { useContext } from "react";
import { authContext } from "@/components/AuthContext";

export default function useUser() {
  const user = useContext(authContext)
  if (user === null) throw new Error("User must not be null");
  return user;
}