"use client"

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import copyToClipboard from "@/utils/copyToClipboard";
import { SocialMedia } from "@/types";
import { Copy, CopyCheck } from "lucide-react";

export type GeneratedContentDisplayProps = {
  title: string;
  socialMedia: SocialMedia;
  generatedContent: string | string[];
};

export default function GeneratedContentDisplay({ title, socialMedia, generatedContent }: GeneratedContentDisplayProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  async function copy(text: string) {
    try {
      await copyToClipboard(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-blue-400 text-2xl font-semibold mb-4">{ title }</h2>
      {socialMedia === "X" ? (
        <div className="space-y-4">
          {(typeof generatedContent === "string"
            ? generatedContent.split("\n\n")
            : generatedContent
          ).map((tweet) => (
            <div key={tweet} className="bg-gray-700 relative p-4 rounded-xl">
              <ReactMarkdown>{ tweet }</ReactMarkdown>
              <div className="text-gray-400 text-xs flex justify-between items-center mt-2">
                <span>{ tweet.length }/{ 280 }</span>
                <button
                  onClick={() => copy(tweet)}
                  className="text-white bg-gray-600 hover:bg-gray-500 p-2 rounded-full cursor-pointer transition-colors"
                >
                  {
                    copiedText === tweet ?
                      (<CopyCheck className="text-green-400 w-4 h-4" />) :
                      (<Copy className="w-4 h-4" />)
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-700 p-4 rounded-xl">
          <ReactMarkdown>
            {typeof generatedContent === "string"
              ? generatedContent
              : generatedContent[0]}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}