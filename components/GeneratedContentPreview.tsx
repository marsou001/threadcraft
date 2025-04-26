import { SocialMedia } from "@/types";
import InstagramMock from "./social-mocks/InstagramMock";
import LinkedInMock from "./social-mocks/LinkedInMock";
import TwitterMock from "./social-mocks/TwitterMock";

export type GeneratedContentPreviewProps = {
  generatedContent: string[];
  socialMedia: SocialMedia;
  image: File | null;
}

export default function GeneratedContentPreview({ generatedContent, socialMedia, image }: GeneratedContentPreviewProps) {
  console.log("image", image)
  function renderContentMock() {
    if (generatedContent.length === 0) return null;

    switch(socialMedia) {
      case "X":
        return <TwitterMock content={generatedContent} />;
      case "Instagram":
        return <InstagramMock content={generatedContent[0]} image={image} />;
      case "LinkedIn":
        return <LinkedInMock content={generatedContent[0]} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">
        Preview
      </h2>
      {renderContentMock()}
    </div>
  )
}