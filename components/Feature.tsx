import Image from "next/image";

export type FeatureProps = {
  title: string;
  icon: string;
  iconAltTitle: string;
  description: string;
}

export default function Feature({ title, icon, iconAltTitle, description }: FeatureProps) {
  return (
    <div
      className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="text-center leading-[1.7] flex flex-col items-center">
        <Image src={icon} alt={iconAltTitle} width={56} height={56} className="mb-4" />
        <h3 className="text-white text-2xl font-semibold tracking-wider mb-3">
          {title}
        </h3>
        <p className="text-gray-300 tracking-wider">{description}</p>
      </div>
    </div>
  )
}