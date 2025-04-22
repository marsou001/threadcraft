export type PricingPlan = "Basic" | "Pro" | "Enterprise";

export type SocialMedia = "X" | "Instagram" | "LinkedIn";

export type Tone = "Casual" | "Conversational" | "Humorous" | "Professional" | "Empathetic" | "Enthusiastic" | "Authoritative" | "Serious" | "Neutral" | "Joyful" | "Friendly" | "Encouraging";

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

export type History = HistoryItem[];

export type HistoryItem = {
  id: number;
  socialMedia: SocialMedia;
  prompt: string;
  content: string;
  createdAt: Date;
}

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
  socialMedia: SocialMedia;
  tone: Tone;
  prompt: string;
  numberOfHashtags: number;
}

export type XSettings = {
  socialMedia: "X";
  numberOfTweets: number;
};

export type InstagramSettings = {
  socialMedia: "Instagram";
  imagePrompt?: string;
};

export type LinkedInSettings = {
  socialMedia: "LinkedIn";
};

export type CustomSettings = XSettings | LinkedInSettings | InstagramSettings;

export enum SettingsActionType {
  UPDATE_SOCIAL_MEDIA = "UPDATE_SOCIAL_MEDIA",
  UPDATE_TONE = "UPDATE_TONE",
  UPDATE_PROMPT = "UPDATE_PROMPT",
  UPDATE_NUMBER_OF_HASHTAGS = "UPDATE_NUMBER_OF_HASHTAGS",
}
export type SettingsAction = {
  type: SettingsActionType.UPDATE_SOCIAL_MEDIA;
  payload: SocialMedia;
} | {
  type: SettingsActionType.UPDATE_TONE;
  payload: Tone;
} | {
  type: SettingsActionType.UPDATE_PROMPT;
  payload: string;
} | {
  type: SettingsActionType.UPDATE_NUMBER_OF_HASHTAGS;
  payload: number;
};