export type PricingPlan = "Basic" | "Pro" | "Enterprise";

export type SocialMedia = "x" | "instagram" | "linkedin";

export type Plan = {
  name: PricingPlan;
  price: number | "Custom";
  priceId: string | null;
  features: string[];
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
  socialMedia: "x";
  label: "Twitter Thread";
} | {
  socialMedia: "instagram";
  label: "Instagram Caption";
} | {
  socialMedia: "linkedin";
  label: "LinkedIn Post";
}