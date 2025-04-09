export type PricingPlan = "Basic" | "Pro" | "Enterprise";

export type Plan = {
  name: PricingPlan,
  price: number | "Custom",
  priceId: string | null,
  features: string[],
}