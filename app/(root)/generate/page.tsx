"use client";
import { useState, useEffect, ChangeEvent, useRef, FormEvent, useReducer } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Upload,
  Clock,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Settings, ContentType, History, GeneratedContent, SettingsAction, SettingsActionType, SocialMedia, Tone, CommonSettings } from "@/types";
import { tones } from "@/data";
import { getUserPoints, updateUserPoints } from "@/services/users";
import { cn } from "@/lib/utils";
import TwitterMock from "@/components/social-mocks/TwitterMock";
import InstagramMock from "@/components/social-mocks/InstagramMock";
import LinkedInMock from "@/components/social-mocks/LinkedInMock";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { generateContent, getHistory } from "@/services/content";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import imageToDataURL from "@/utils/imageToDataURL";
import dataURLToImage from "@/utils/dataURLToImage";
import GeneratedContentDisplay from "@/components/GeneratedContentDisplay";

const contentTypes: ContentType[] = [
  { socialMedia: "X", label: "Twitter Thread" },
  { socialMedia: "Instagram", label: "Instagram Caption" },
  { socialMedia: "LinkedIn", label: "LinkedIn Post" },
];

const POINTS_PER_GENERATION = 5;

const initialCommonSettings: CommonSettings = {
  tone: "Casual",
  prompt: "",
  numberOfHashtags: 5,
}

function commonSettingsReducer(state: CommonSettings, action: SettingsAction): CommonSettings {
  switch(action.type) {
    case SettingsActionType.UPDATE_TONE:
      return { ...state, tone: action.payload };
    case SettingsActionType.UPDATE_PROMPT:
      return { ...state, prompt: action.payload };
    case SettingsActionType.UPDATE_NUMBER_OF_HASHTAGS:
      return { ...state, numberOfHashtags: action.payload };
    default:
      return state;
  }
}

export default function GenerateContent() {
  const [commonSettings, dispatch] = useReducer(commonSettingsReducer, initialCommonSettings);
  const [history, setHistory] = useState<History>();
  const [socialMedia, setSocialMedia] = useState<SocialMedia>("LinkedIn");
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<GeneratedContent | null>(null);
  const [userPoints, setUserPoints] = useState<number>();
  const [numberOfTweets, setNumberOfTweets] = useState<number>(5);
  const [shouldAddAIDescription, setShouldAddAIDescription] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isContentFromHistory, setIsContentFromHistory] = useState(false);

  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();

  const isSubmitButtonDisabled = isGenerating || commonSettings.prompt === "" || userPoints === undefined || userPoints < POINTS_PER_GENERATION;

  async function fetchUserHistory() {
    try {
      const history = await getHistory(userId!);
      setHistory(history);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      }
    }
  };

  function handleHistoryItemClick(item: GeneratedContent) {
    setSelectedHistoryItem(item);
    setSocialMedia(item.socialMedia);
    dispatch({ type: SettingsActionType.UPDATE_TONE, payload: item.tone });
    dispatch({ type: SettingsActionType.UPDATE_PROMPT, payload: item.prompt });
    dispatch({ type: SettingsActionType.UPDATE_NUMBER_OF_HASHTAGS, payload: item.numberOfHashtags });
    
    if (item.socialMedia === "X") {
      setNumberOfTweets(item.numberOfTweets)
    } else if (item.socialMedia === "Instagram" && item.imagePrompt !== null) {
      const image = dataURLToImage(item.imagePrompt);
      setImage(image);
    }
    setGeneratedContent(
      item.socialMedia === "X"
        ? item.content.split("\n\n")
        : [item.content]
    );
    setIsContentFromHistory(true);
  };

  async function fetchUserPoints() {
    try {
      const points = await getUserPoints(userId!);
      setUserPoints(points);
    } catch(error) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      }
    }
  }

  function toggleShouldAddAIDescription() {
    setShouldAddAIDescription(prev => !prev);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setImage(e.target.files[0]);
  }

  async function handleGenerateContent(e: FormEvent) {
    e.preventDefault();
    
    if (userPoints === undefined || userPoints < 5) {
      console.log("Not enough points");
      // Maybe redirect to pricing page?
      return;
    }

    setIsGenerating(true);
    const settings = { ...commonSettings, socialMedia } as Settings;

    if (settings.socialMedia === "X") {
      settings.numberOfTweets = numberOfTweets;
    }

    if (settings.socialMedia === "Instagram") {
      let imagePrompt: string | null = null;
      if (image !== null) {
        try {
          imagePrompt = await imageToDataURL(image);
        } catch (error) {
          if (error instanceof Error) {
            console.log("Error: ", error.message);
          }
          return;
        }
      }
      settings.imagePrompt = imagePrompt;
    }

    // Generate content
    let newlyGeneratedContent: GeneratedContent;
    try {
      newlyGeneratedContent = await generateContent(userId!, settings);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error: ", error.message);
      }
      return;
    }

    if (socialMedia === "X") {
      const threads = newlyGeneratedContent.content.split(/\n\n/);
      setGeneratedContent(threads);
    } else {
      setGeneratedContent([newlyGeneratedContent.content]);
    }

    setHistory((history) => [newlyGeneratedContent, ...history!]);
    setSelectedHistoryItem(newlyGeneratedContent);
    setIsContentFromHistory(false);
    // Update user points
    // const newUserPoints = userPoints - POINTS_PER_GENERATION;
    // try {
    //   await updateUserPoints(userId!, newUserPoints);
    //   setUserPoints(newUserPoints)
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.log("error: ", error.message);
    //   }
    // }
    
    setIsGenerating(false);
  }


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
  
  useEffect(() => {
    if (!isLoaded) return;

    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    fetchUserHistory();
    fetchUserPoints();
  }, [isLoaded, isSignedIn]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 mt-14 lg:grid-cols-3 gap-8">
          {/* Left sidebar - History */}
          <div className="lg:col-span-1 bg-gray-800 rounded-2xl p-6 h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-blue-400">History</h2>
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <div className="space-y-4">
              {history === undefined ? "Loading..." : history.map((item) => (
                <div
                  key={item.id}
                  className={cn("p-4 rounded-xl transition-colors cursor-pointer", {
                    "bg-gray-600": item.id === selectedHistoryItem?.id,
                    "bg-gray-700 hover:bg-gray-600": item.id !== selectedHistoryItem?.id,
                  })}
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <div className="flex items-center mb-2">
                    <Image src={`/icons/${item.socialMedia}.png`} alt={item.socialMedia} width={24} height={24} className="mr-2 h-5 w-5" />
                    <span className="text-sm font-medium">
                      {item.socialMedia}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">
                    {item.prompt}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <Clock className="mr-1 h-3 w-3" />
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Points display */}
            <div className="bg-gray-800 p-6 rounded-2xl flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Available Points</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    { userPoints === undefined ? "Loading..." : userPoints }
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full transition-colors">
                <Link href="/pricing">Get More Points</Link>
              </button>
            </div>

            {/* Content generation form */}
            <form onSubmit={handleGenerateContent} className="bg-gray-800 p-6 rounded-2xl space-y-6">
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Content Type
                </label>
                <Select onValueChange={(v) => setSocialMedia(v as SocialMedia)}>
                  <SelectTrigger className="bg-gray-700 w-full border-none rounded-xl cursor-pointer">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-gray-800">
                    {contentTypes.map((type) => (
                      <SelectItem key={type.socialMedia} value={type.socialMedia} className="cursor-pointer">
                        <div className="flex items-center">
                          <Image src={`/icons/${type.socialMedia}.png`} alt={type.socialMedia} width={24} height={24} className="mr-2 h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Tone
                </label>
                <Select
                  onValueChange={(v) => dispatch({ type: SettingsActionType.UPDATE_TONE, payload: v as Tone })}
                >
                  <SelectTrigger className="bg-gray-700 w-full border-none rounded-xl cursor-pointer">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-gray-800">
                    {tones.map((tone) => (
                      <SelectItem key={tone} value={tone} className="cursor-pointer">
                        <div className="flex items-center">{ tone }</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {socialMedia === "X" && (
                <div>
                  <label htmlFor="number-of-tweets" className="text-gray-300 text-sm font-medium block mb-2">
                    Number of tweets - {numberOfTweets}
                  </label>
                  <Slider
                    id="number-of-tweets"
                    defaultValue={[numberOfTweets]}
                    max={30}
                    step={1}
                    value={[numberOfTweets]}
                    onValueChange={(value) => setNumberOfTweets(value[0])}
                    className="cursor-pointer" 
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="prompt"
                  className="text-gray-300 text-sm font-medium block mb-2"
                >
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  placeholder="Enter your prompt here..."
                  value={commonSettings.prompt}
                  onChange={(e) => dispatch({ type: SettingsActionType.UPDATE_PROMPT, payload: e.target.value })}
                  rows={4}
                  className="bg-gray-700 w-full p-3 border-none rounded-xl resize-none"
                />
              </div>

              {/* TODO: number of characters */}
              
              <div>
                <label
                  htmlFor="number-of-hashtags"
                  className="text-gray-300 text-sm font-medium block mb-2"
                >
                  Number of hashtags - {commonSettings.numberOfHashtags}
                </label>
                <Slider
                  id="number-of-hashtags"
                  defaultValue={[initialCommonSettings.numberOfHashtags]}
                  max={30}
                  step={1}
                  value={[commonSettings.numberOfHashtags]}
                  onValueChange={(value) => dispatch({ type: SettingsActionType.UPDATE_NUMBER_OF_HASHTAGS, payload: value[0] })}
                  className="cursor-pointer" 
                />
              </div>

              {socialMedia === "Instagram" && (
                <div className="flex items-center">
                  <Checkbox
                    id="describe-image"
                    checked={shouldAddAIDescription}
                    onCheckedChange={toggleShouldAddAIDescription}
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="describe-image" className="text-gray-300 text-md font-medium cursor-pointer">Add AI description to your image</label>
                </div>
              )}

              {(socialMedia === "Instagram" && shouldAddAIDescription) && (
                <div>
                  <label id="image-upload" className="block text-sm font-medium mb-2 text-gray-300">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      ref={hiddenFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      aria-hidden
                      className="text-sm font-medium bg-gray-700 hover:bg-gray-600 flex justify-center items-center px-4 py-2 rounded-xl cursor-pointer transition-colors"
                      onClick={() => hiddenFileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      <span>Upload Image</span>
                    </button>
                    {image && (
                      <span className="text-sm text-gray-400">
                        {image.name}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitButtonDisabled}
                className={cn("text-white flex justify-center items-center w-full py-3 rounded-xl transition-colors", {
                  "text-gray-300 bg-gray-500 cursor-not-allowed": isSubmitButtonDisabled,
                  "bg-blue-600 hover:bg-blue-700 cursor-pointer": !isSubmitButtonDisabled,
                })}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  `Generate Content (${POINTS_PER_GENERATION} points)`
                )}
              </button>
            </form>

            {/* Generated content display */}
            {generatedContent.length > 0 && (
              <GeneratedContentDisplay isContentFromHistory={isContentFromHistory} socialMedia={socialMedia} generatedContent={generatedContent} />
            )}

            {/* Content preview */}
            {generatedContent.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                  Preview
                </h2>
                {renderContentMock()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}