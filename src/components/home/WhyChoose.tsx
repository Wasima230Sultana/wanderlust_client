import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-brand/10 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Your trusted partner for exceptional travel experiences.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-zinc-200/70 bg-white p-6 shadow-sm"
            >
              <Image src={icon} alt="" width={48} height={48} className="size-7" />
              <h3 className="mt-4 text-base font-semibold text-zinc-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
