import { EnterprisePlan, Plan, Tone } from "@/types";

export const features = [
  {
    title: "Twitter Threads",
    icon: "/icons/x.png",
    iconAltTitle: "X logo",
    description: "Generate compelling Twitter threads that engage your audience and boost your reach.",
  },
  {
    title: "Instagram Captions",
    icon: "/icons/instagram.png",
    iconAltTitle: "Instagram logo",
    description: "Create catchy captions for your Instagram posts that increase engagement and followers.",
  },
  {
    title: "LinkedIn Posts",
    icon: "/icons/linkedin.png",
    iconAltTitle: "LinkedInlogo",
    description: "Craft professional content for your LinkedIn network to establish thought leadership.",
  },
];

export const benefits = [
  "Save time and effort on content creation",
  "Consistently produce high-quality posts",
  "Increase engagement across all platforms",
  "Stay ahead of social media trends",
  "Customize content to match your brand voice",
  "Scale your social media presence effortlessly",
];

export const pricingPlans: [...Plan[], EnterprisePlan] = [
  {
    name: "Basic",
    price: 9,
    priceId: process.env.PRICE_ID_BASIC!,
    points: 200,
    features: [
      "200 AI-generation points per month",
      "All social media platforms",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: 29,
    priceId: process.env.PRICE_ID_PRO!,
    points: 500,
    features: [
      "500 AI-generation points per month",
      "All social media platforms",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: 79,
    priceId: null,
    points: 33,
    features: [
      "Unlimited AI-generation points",
      "All social media platforms",
      "Custom AI model training", 
      "Dedicated account manager",
    ],
  },
];

export const tones: Tone[] = ["Casual", "Conversational", "Humorous", "Professional", "Empathetic", "Enthusiastic", "Authoritative", "Serious", "Neutral", "Joyful", "Friendly", "Encouraging"];