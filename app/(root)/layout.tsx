import { AuthContextProvider } from "@/context/AuthContext";

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>{ children }</AuthContextProvider>
  )
}