import { pricingPlans } from "@/data";
import PricingPlan from "@/components/PricingPlan";

export default function PricingPage() {
  return (
    <main className="text-gray-100 bg-black">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingPlan key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </main>
  );
}