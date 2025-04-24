export type PricingPlan = "Basic" | "Pro" | "Enterprise";
export type SocialMedia = "X" | "Instagram" | "LinkedIn";
export type Tone = "Casual" | "Conversational" | "Humorous" | "Professional" | "Empathetic" | "Enthusiastic" | "Authoritative" | "Serious" | "Neutral" | "Joyful" | "Friendly" | "Encouraging";
export type History = GeneratedContent[];

export type Plan = {
  name: PricingPlan;
  price: number | "Custom";
  priceId: string | null;
  features: string[];
}

export type User = {
  id: number;
  clerkId: string;
  email: string;
  name: string;
  points: number;
  createdAt: Date;
}

export type GeneratedContent = {
  id: number;
  content: string;
  createdAt: Date;
} & Settings;

export type ContentType = {
  socialMedia: "X";
  label: "Twitter Thread";
} | {
  socialMedia: "Instagram";
  label: "Instagram Caption";
} | {
  socialMedia: "LinkedIn";
  label: "LinkedIn Post";
}

export type CommonSettings = {
  tone: Tone;
  prompt: string;
  numberOfHashtags: number;
}

export type Settings =
  CommonSettings & { socialMedia: "X" } & XSettings 
| CommonSettings & { socialMedia: "Instagram" } & InstagramSettings
| CommonSettings & { socialMedia: "LinkedIn" } & LinkedInSettings

export enum SettingsActionType {
  UPDATE_TONE = "UPDATE_TONE",
  UPDATE_PROMPT = "UPDATE_PROMPT",
  UPDATE_NUMBER_OF_HASHTAGS = "UPDATE_NUMBER_OF_HASHTAGS",
}

export type SettingsAction = {
  type: SettingsActionType.UPDATE_TONE;
  payload: Tone;
} | {
  type: SettingsActionType.UPDATE_PROMPT;
  payload: string;
} | {
  type: SettingsActionType.UPDATE_NUMBER_OF_HASHTAGS;
  payload: number;
};

type XSettings = {
  numberOfTweets: number;
};

type InstagramSettings = {
  imagePrompt: string | null;
};

type LinkedInSettings = {};