import { features } from "@/data";
import Feature from "./Feature";

export default function Features() {
  return (
    <section className="py-20" id="features">
      <h2 className="text-white text-3xl font-bold tracking-wider leading-[1.5] text-center mb-16">
        Supercharge Your Social Media Presence
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}