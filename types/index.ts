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