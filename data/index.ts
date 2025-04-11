import { Plan } from "@/types";

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

export const pricingPlans: Plan[] = [
  {
    name: "Basic",
    price: 9,
    priceId: process.env.PRICE_ID_BASIC!,
    features: [
      "100 AI-generated posts per month",
      "Twitter thread generation",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: 29,
    priceId: process.env.PRICE_ID_PRO!,
    features: [
      "500 AI-generated posts per month",
      "Twitter, Instagram, and LinkedIn content",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: null,
    features: [
      "Unlimited AI-generated posts",
      "All social media platforms",
      "Custom AI model training", 
      "Dedicated account manager",
    ],
  },
];