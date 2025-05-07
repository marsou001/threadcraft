import { benefits } from "@/data";
import { CheckCircleIcon } from "lucide-react";

export default function Benefits() {
  return (
    <section className="bg-gray-900 relative my-20 px-4 py-20 rounded-3xl">
      <div className="relative z-10">
        <h2 className="text-white text-3xl font-bold tracking-wider leading-[1.5] text-center mb-12">
          Why Choose Our AI Content Generator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center space-x-3">
              <CheckCircleIcon className="text-green-500  w-6 h-6" />
              <span className="text-gray-300 tracking-wider">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}