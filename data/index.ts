import type { DocSection, EnterprisePlan, Plan, Tone } from "@/types";

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

export const docsSections: DocSection[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to set up your account and create your first AI-generated content.",
    link: "/docs/getting-started",
  },
  {
    title: "Twitter Threads",
    description:
      "Discover how to create engaging Twitter threads using our AI technology.",
    link: "/docs/twitter-threads",
  },
  {
    title: "Instagram Captions",
    description:
      "Learn the best practices for generating Instagram captions that boost engagement.",
    link: "/docs/instagram-captions",
  },
  {
    title: "LinkedIn Posts",
    description:
      "Explore techniques for crafting professional LinkedIn content with AI assistance.",
    link: "/docs/linkedin-posts",
  },
  {
    title: "API Reference",
    description:
      "Detailed documentation for integrating our AI content generation into your applications.",
    link: "/docs/api-reference",
  },
];