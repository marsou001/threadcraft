export type PricingPlan = "Basic" | "Pro";
export type SocialMedia = "X" | "Instagram" | "LinkedIn";
export type Tone = "Casual" | "Conversational" | "Humorous" | "Professional" | "Empathetic" | "Enthusiastic" | "Authoritative" | "Serious" | "Neutral" | "Joyful" | "Friendly" | "Encouraging";
export type History = GeneratedContent[];

export type Plan = {
  name: PricingPlan;
  price: number;
  priceId: string;
  points: number;
  features: string[];
}

export type EnterprisePlan = {
  name: "Enterprise";
  price: number;
  priceId: null;
  points: number;
  features: string[];
}

export type Subscription = {
  id: number;
  subscriptionId: string;
  userId: string;
  priceId: string;
}

export type User = {
  id: number;
  clerkId: string;
  stripeCustomerId: string | null;
  email: string;
  name: string;
  points: number;
  createdAt: Date;
}

export type GeneratedContent = {
  id: number;
  content: string;
  userId: string;
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
| CommonSettings & { socialMedia: "X" } & XSettings 
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

export type CreateCheckoutSessionParams = {
  userHasCustomerId: true,
  userId: string;
  priceId: string;
  customerId: string;
} | {
  userHasCustomerId: false,
  userId: string;
  priceId: string;
  customerEmail: string;
}

export type DocSection = {
  title: string;
  description: string;
  link: string;
}

type XSettings = {
  numberOfTweets: number;
  maxCharactersCountPerTweet: number;
};

type InstagramSettings = {
  imagePrompt: string | null;
};

type LinkedInSettings = {};