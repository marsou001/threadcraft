import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThreadlyAI",
  description: "ThreadlyAI helps you craft engaging, AI-powered social media threads in seconds. Boost your content game with smart automation and creativity.",
  keywords: "AI social media, thread generator, AI threads, content creation, social media automation, Twitter threads, AI copywriting, AI content tool, ThreadlyAI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ClerkProvider>
            <Navbar />
            {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
